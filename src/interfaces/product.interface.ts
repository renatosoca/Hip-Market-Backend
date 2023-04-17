
export interface Product {
  _id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: ISizes[];
  slug: string;
  tags: string[];
  title: string;
  type: ITypes;
  gender: IGender;
  createdAt: string;
  updatedAt: string;
}

export type ISizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';
export type ITypes = 'shirts' | 'hoodies' | 'jacket' | 'pants' | 'hats';
export type IGender = 'men' | 'women' | 'kid' | 'unisex';