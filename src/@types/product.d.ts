import { ICategory } from "./category";
import { ILike } from "./like";
import { IRating } from "./rating";

export interface IProduct {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  previousPrice: number;
  color: string;
  brand: string;
  shipping: boolean;
  category: ICategory;
  images: Array<{ secure_url: string; public_id: string }>;
  sold: number;
  likes: [ILike];
  ratings: [IRating];
}

export type ProductContextType = {
  product: IProduct;
};
