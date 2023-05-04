import { Request, Response } from 'express';
import { comparePassword, generateJWT } from '../helpers';
import { findUserByTerm, registerUser } from '../services';

export const userAuth = async ({ body }: Request, res: Response,) => {
  const { email, password } = body;

  try {
    const user = await findUserByTerm(email);
    if (!user) return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });

    const isValidatePassword = comparePassword(password, user.password!);
    if (!isValidatePassword) return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });

    const { _id, name, lastname, role } = user;

    return res.status(200).json({
      ok: true,
      user: { _id, name, lastname, email, role },
      jwt: generateJWT(_id.toString(), email),
    });
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comuniquese con el administrador' });
  }
}

export const userRegister = async ({ body }: Request, res: Response,) => {
  const { email } = body;

  try {
    const userExist = await findUserByTerm(email);
    if (userExist) return res.status(400).json({ msg: 'El correo electrónico ya está en uso' });

    const { _id, name, lastname, role } = await registerUser(body);

    return res.status(201).json({
      ok: true,
      user: { _id, name, lastname, email, role },
      jwt: generateJWT(_id.toString(), email),
    })
  } catch (error) {
    return res.status(500).json({ msg: 'Error del sistema, comuniquese con el administrador' });
  }
}

export const revalidateAuth = async ({ cookies }: Request, res: Response,) => {
  const { jwt = '' } = cookies;

  return res.status(200).json({
    ok: true,
    cookies: jwt
  });
}