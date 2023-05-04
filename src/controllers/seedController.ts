import { Request, Response } from 'express';
import { initialData } from '../database';
import { productModel } from '../models';

export const seed = async (_: Request, res: Response) => {
  try {
    await productModel.deleteMany();
    const products = await productModel.insertMany(initialData.products);

    return res.status(200).json({ msg: 'Productos de prueba insertados correctamente', products: products.length });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, ' });
  }
}