import { Model, model, models, Schema } from 'mongoose';
import { Product } from '../interfaces';

const productSchema = new Schema<Product>({
  description: { type: String, required: true },
  images: [{ type: String }],
  inStock: { type: Number, required: true, default: 0 },
  price: { type: Number, required: true, default: 0 },
  sizes: [
    {
      type: String,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    }
  ],
  slug: { type: String, required: true, unique: true },
  tags: [{ type: String }],
  title: { type: String, required: true },
  type: {
    type: String,
    enum: ['shirts', 'hoodies', 'jacket', 'pants', 'hats'],
  },
  gender: {
    type: String,
    enum: ['men', 'women', 'kid', 'unisex']
  }
}, { timestamps: true, versionKey: false });

productSchema.index({ title: 'text', tags: 'text' });

const product: Model<Product> = models.Product || model<Product>('Product', productSchema);
export default product;