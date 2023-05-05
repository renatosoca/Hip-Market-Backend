import { Request } from 'express';

export interface IUser {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: Roles;
  createdAt?: string;
  updatedAt?: string;
}

export interface IUserRequest extends Request {
  user?: IUser;
}

export type Roles = 'admin' | 'client'