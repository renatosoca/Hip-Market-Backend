import { model, Model, models, Schema } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'client'],
    default: 'client',
    required: true,
  }
}, { timestamps: true, versionKey: false });

const user: Model<IUser> = models.User || model<IUser>('User', userSchema);
export default user;