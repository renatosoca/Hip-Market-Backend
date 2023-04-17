import { Request, Response } from 'express';
import { productModel } from '../models';

export const getProducts = async (_: Request, res: Response) => {
  try {
    const products = await productModel.find().select('title images price inStock slug -_id ').lean();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, ' });
  }
}