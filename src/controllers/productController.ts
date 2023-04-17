import { Request, Response } from 'express';
import { productModel } from '../models';

export const getProducts = async ({ query }: Request, res: Response) => {
  let condition = {};
  const { gender = 'all' } = query;

  try {
    if (gender.toString() !== 'all' && ['kid', 'men', 'women', 'unisex'].includes( gender.toString() )) condition = { gender }; 

    const products = await productModel.find(condition).select('title images price inStock slug -_id ').lean();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, ' });
  }
}

export const getProduct = async ({ params }: Request, res: Response) => {
  const { slug } = params;

  try {
    const product = await productModel.findOne({ slug }).select('-_id -__v').lean();
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comunicate con el administrador' });
  }
}

export const searchProducts = async ({ params }: Request, res: Response) => {
  const { query } = params;

  try {
    const products = await productModel.find({ $text: { $search: query } }).select('title images price inStock slug -_id ').lean();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comunicate con el administrador' });
  }
}