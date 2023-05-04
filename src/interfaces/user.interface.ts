
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

export type Roles = 'admin' | 'client'