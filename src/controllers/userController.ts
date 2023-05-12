import { Request, Response } from "express";
import { IUser } from "../interfaces";
import { userModel } from "../models";

export const getUsers = async (_: Request, res: Response) => {
  //Solo users admins pueden ver todos los usuarios

  try {
    const users = await userModel.find().select('-password').lean();

    return res.status(200).json({
      ok: true,
      users,
    })
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, contacte con el administrador' });
  }
}

export const updateUser = async ({ body }: Request, res: Response) => {
  const { _id = '', role = 'client' } = body as IUser;

  const validRoles = ['admin', 'super-user', 'client'];
  if (!validRoles.includes(role)) return res.status(400).json({ msg: `El rol no es válido: ${validRoles.join(', ')}` });

  console.log(body)
  try {
    const user = await userModel.findById(_id);
    console.log(user, 'Usuario')
    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    user.role = role;
    await user.save();

    return res.status(200).json({
      ok: true,
      msg: 'update user',
    })
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, contacte con el administrador' });
  }
}