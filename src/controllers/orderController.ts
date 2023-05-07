import { Request, Response } from 'express';

export const createOrder = async (_: Request, res: Response) => {
  res.json({ msg: 'createOrder' });
}