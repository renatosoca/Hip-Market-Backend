import { IUser } from './user.interface';

export interface IOrder {
  _id: string;
  user?: IUser | string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod?: string;

  numberOfProducts: number;
  subTotal: number;
  tax: number;
  total: number;

  isPaid: boolean;
  paidAt?: string;
}

export interface IOrderItem {
  _id: string;
  title: string;
  image: string;
  size: string;
  slug: string;
  price: number;
  quantity: number;
}

export interface IShippingAddress {
  name: string;
  lastname: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}