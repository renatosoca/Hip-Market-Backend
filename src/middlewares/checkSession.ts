import { NextFunction, Response } from 'express';
import { verifyJWT } from '../helpers';
import { IUserRequest } from '../interfaces';
import { findUserById } from '../services';

export const checkSession = async (req: IUserRequest, res: Response, next: NextFunction) => {
  const token: string = `${req.headers.authorization?.split(' ')[1]}`;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const { _id } = verifyJWT(token);

      req.user = await findUserById(_id) || undefined;

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'No autorizado' });
    }
  }

  if (!token) return res.status(401).json({ message: 'Sin autorización' });
  return next();
}