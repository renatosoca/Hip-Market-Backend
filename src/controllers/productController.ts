import { Request, Response } from 'express';
import { Product } from '../interfaces';
import { productModel } from '../models';

export const getAllProducts = async ({ query }: Request, res: Response) => {
  let condition = {};
  const { gender = 'all' } = query;

  try {
    if (gender.toString() !== 'all' && ['kid', 'men', 'women', 'unisex'].includes(gender.toString())) condition = { gender };

    const products = await productModel.find(condition)
      .select('title images price inStock slug -_id ')
      .lean();

    return res.status(200).json({ ok: true, products });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, ' });
  }
}

export const getAllProductsSlugs = async (_: Request, res: Response) => {
  try {
    const slugs = await productModel.find()
      .select('slug -_id')
      .lean();

    return res.status(201).json({
      ok: true,
      slugs
    })
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comuniquese con el administrador' });
  }
}

export const getProduct = async ({ params }: Request, res: Response) => {
  const { slug = '' } = params;

  try {
    const product = await productModel.findOne({ slug })
      .select('-createdAt -updatedAt -__v')
      .lean();
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });

    return res.status(200).json({ product });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comunicate con el administrador' });
  }
}

export const createProduct = async ({ body }: Request, res: Response) => {
  const { images = [], slug } = body as Product;
  delete body._id;

  if (images.length < 2) return res.status(400).json({ msg: 'Debes agregar al menos 2 imagenes' });

  try {
    const productExist = await productModel.findOne({ slug }).lean();
    if (productExist) return res.status(400).json({ msg: 'Ya existe un producto con ese slug' });

    const product = new productModel(body);
    const createdProduct = await product.save();

    return res.status(201).json({ ok: true, product: createdProduct });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ msg: 'Error del sistema, comunicate con el administrador' });
  }
}

export const updatedProduct = async ({ params, body }: Request, res: Response) => {
  const { id = '' } = params;
  const { images = [] } = body as Product;

  if (images.length < 2) return res.status(400).json({ msg: 'Debes agregar al menos 2 imagenes' });

  try {
    const product = await productModel.findById(id);
    if (!product) return res.status(404).json({ msg: 'Producto no encontrado' });

    const updatedProduct = await productModel.findByIdAndUpdate(id, body, { new: true });

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comunicate con el administrador' });
  }
}

export const searchProducts = async ({ params }: Request, res: Response) => {
  const { query } = params;

  try {
    const products = await productModel.find({ $text: { $search: query } })
      .select('title images price inStock slug -_id ')
      .lean();

    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comunicate con el administrador' });
  }
}