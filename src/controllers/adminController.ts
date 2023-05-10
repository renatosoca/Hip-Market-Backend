import { Response } from "express";
import { IUserRequest } from "../interfaces";
import { orderModel, productModel, userModel } from "../models";

export const getDashboard = async (_: IUserRequest, res: Response) => {
  try {
    const [
      numberOfOrders, paidOrders, numberOfClients, numberOfUsers, numberOfProducts, productsWithNoInventory, lowInventory
    ] = await Promise.all([
      orderModel.countDocuments(),
      orderModel.countDocuments({ isPaid: true }),
      userModel.countDocuments({ role: 'client' }),
      userModel.countDocuments({ role: { $ne: 'client' } }),
      productModel.countDocuments(),
      productModel.countDocuments({ inStock: 0 }),
      productModel.countDocuments({ inStock: { $lte: 10 } }),
    ]);

    return res.status(200).json({
      numberOfOrders,
      paidOrders,
      notPaidOrders: (numberOfOrders - paidOrders),
      numberOfClients,
      numberOfUsers,
      numberOfProducts,
      productsWithNoInventory,
      lowInventory
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comuniquese con el administrador' });
  }
}