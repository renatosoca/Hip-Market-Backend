import { hashPassword } from '../helpers';
import { IUser } from '../interfaces';
import { userModel } from '../models';

export const registerUser = async (user: IUser): Promise<IUser> => {
  user.password = hashPassword(user.password!);

  const createdUser = await userModel.create(user);
  return createdUser;
}

export const updateUser = async (id: string, user: IUser): Promise<IUser | null> => {

  const updatedUser = await userModel.findByIdAndUpdate(id, user, { new: true }).lean();

  return updatedUser;
}

export const deleteUser = async (id: string): Promise<IUser | null> => {

  const deletedUser = await userModel.deleteOne({ _id: id }).lean();

  return deletedUser;
}

export const findUserByTerm = async (term: string) => {
  const userExist = await userModel.findOne({ term });

  return userExist;
}

export const findUserById = async (id: string) => {

  const userExist = await userModel.findById({ id });

  return userExist;
}