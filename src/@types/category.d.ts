import { Image } from "./common";

export interface ICategory {
  _id?: string;
  name: string;
  slug?: string;
  images: Array<Image>;
  createdAt?: string;
  updatedAt?: string;
}

export type CategoryContextType = {
  categories: ICategory[];
  setCategories: Dispatch<SetStateAction<ICategory[]>>;
  uploading: boolean;
  setUploading: Dispatch<SetStateAction<boolean>>;
  uploadedImages: Image[];
  setUploadedImages: Dispatch<SetStateAction<Image[]>>;
  uploadImages: (files: File[], folder: string) => void;
  // deleteImage: (public_id: string) => void;
  createCategory: (category: ICategory) => Promise<Response | undefined>;
  fetchCategories: () => void;
  updateCategory: (name: string) => void;
  deleteCategory: () => void;
};
