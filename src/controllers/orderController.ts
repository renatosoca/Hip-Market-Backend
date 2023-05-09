import { Response } from 'express';
import { IOrder, IUserRequest } from '../interfaces';
import { orderModel, productModel } from '../models';

export const createOrder = async ({ body, user }: IUserRequest, res: Response) => {
  if (!user) return res.status(401).json({ msg: 'Necesita autenticarse para realizar esta acción' });
  const { orderItems, total } = body as IOrder;

  const productsIds = orderItems.map(product => product._id);
  const products = await productModel.find({ _id: { $in: productsIds } });

  try {
    const subTotal = orderItems.reduce((prev, current) => {
      const currentPrice = products.find(product => product._id.toString() === current._id.toString())?.price || 0;
      if (!currentPrice) throw new Error('Verifique el carrito de compras de nuevo, producto no encontrado');

      return (currentPrice * current.quantity) + prev;
    }, 0);

    const taxRate = Number(process.env.TAX_RATE || 0);
    const backendTotal = subTotal * (taxRate + 1);

    if (backendTotal !== total) return res.status(400).json({ msg: 'Verifique el carrito de compras de nuevo, el total no coincide' });

    console.log('Holaaaaa')
    const newOrder = new orderModel({
      ...body,
      user: user._id,
      isPaid: false,
    });

    const order = await newOrder.save();

    return res.json({ order });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comuniquese con el administrador' });
  }
}

export const getOrderById = async ({ params }: IUserRequest, res: Response) => {
  const { id = '' } = params;

  try {
    const order = await orderModel.findById(id);

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comuniquese con el administrador' });
  }
}

export const getOrdersByUser = async (_: IUserRequest, res: Response) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comuniquese con el administrador' });
  }
}

export const payOrder = async (_: IUserRequest, res: Response) => {
  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
  const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY || '';

  try {
    const encodedToken = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`).toString("base64");

    const resp = await fetch(process.env.PAYPAL_OAUTH_URL || "", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Basic ${encodedToken}`,
      },
      body: 'grant_type=client_credentials',
    })

    const { access_token } = await resp.json();

    return res.status(201).json({ access_token });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Error del sistema, comuniquese con el administrador' });
  }
}