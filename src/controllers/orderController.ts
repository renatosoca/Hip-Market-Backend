import axios from 'axios';
import { Response } from 'express';
import { IOrder, IPaypalOrderStatusResponse, IUserRequest } from '../interfaces';
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

export const payOrder = async ({ body }: IUserRequest, res: Response) => {
  const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || '';
  const PAYPAL_SECRET_KEY = process.env.PAYPAL_SECRET_KEY || '';

  //Validar Sesion del usuario

  const { transactionId = '', orderId = '' } = body as { orderId: string; transactionId: string };

  try {
    const encodedToken = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET_KEY}`, 'utf-8').toString("base64");
    const body = new URLSearchParams('grant_type=client_credentials');

    const responseToken = await axios.post(process.env.PAYPAL_OAUTH_URL || "", body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${encodedToken}`,
      }
    });

    const { access_token } = responseToken.data;
    if (!access_token) return res.status(400).json({ ok: false, msg: 'Token de paypal no confirmado' });

    const { data } = await axios.get<IPaypalOrderStatusResponse>(`${process.env.PAYPAL_ORDERS_URL}/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      }
    });

    if (data.status !== 'COMPLETED') return res.status(401).json({ ok: false, msg: 'Orden no reconocida' });

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ ok: false, msg: 'Orden no encontrada' });

    if (order.total !== Number(data.purchase_units[0].amount.value)) {
      return res.status(400).json({ ok: false, msg: `Los montos de Paypal y la orden ${order._id.toString()} no coinciden` });
    }

    order.transactionId = transactionId;
    order.isPaid = true;

    await order.save();

    return res.status(201).json({
      ok: true,
      msg: `Orden ${order._id.toString()} pagada correctamente.`
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Error del sistema, comuniquese con el administrador' });
  }
}