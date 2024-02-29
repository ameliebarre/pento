import { ChangeEvent } from "react";

import { ICategory } from "./category";
import { ILike } from "./like";
import { IRating } from "./rating";
import { Image } from "./common";

export interface IProduct {
  _id?: string;
  title: string;
  slug?: string;
  description: string;
  price: number;
  previousPrice?: number;
  color: string;
  brand?: string;
  shipping: boolean;
  category: { _id: string; name: string };
  images: Array<Image>;
  sold?: number;
  likes?: Array<ILike>;
  ratings?: Array<IRating>;
}

export type ProductContextType = {
  products: IProduct[];
  setProducts: Dispatch<SetStateAction<IProduct[]>>;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  setTotalPages: Dispatch<SetStateAction<number>>;
  uploading: boolean;
  setUploading: Dispatch<SetStateAction<boolean>>;
  uploadedImages: Image[];
  setUploadedImages: Dispatch<SetStateAction<Image[]>>;
  uploadImages: (files: File[], folder: string) => void;
  deleteImage: (public_id: string) => void;
  createProduct: (product: IProduct) => Promise<Response | undefined>;
  fetchProducts: () => void;
  updateProduct: (product: IProduct) => void;
  deleteProduct: (product: IProduct) => void;
};
