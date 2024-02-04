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
  products: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  updatedProduct: IProduct | null;
  setUpdatedProduct: Dispatch<SetStateAction<IProduct>>;
  uploading: boolean;
  setUploading: Dispatch<SetStateAction<boolean>>;
  uploadImages: (e: any) => void;
  deleteImage: (public_id: string) => void;
  createProduct: (product: IProduct) => void;
  fetchProducts: () => void;
  updateProduct: (product: IProduct) => void;
  deleteProduct: () => void;
};
