import { Model, model, models, Schema } from 'mongoose';
import { IOrder } from '../interfaces';

const orderSchema = new Schema<IOrder>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  orderItems: [{
    _id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    size: { type: String, required: true },
    slug: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
  }],

  shippingAddress: {
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    address: { type: String, required: true },
    address2: { type: String },
    zip: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },

  numberOfProducts: { type: Number, required: true },
  subTotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  total: { type: Number, required: true },

  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
}, { timestamps: true, versionKey: false });

const order: Model<IOrder> = models.Order || model<IOrder>('Order', orderSchema);
export default order;