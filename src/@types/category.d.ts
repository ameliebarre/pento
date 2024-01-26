export interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

export type CategoryContextType = {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  categories: ICategory[];
  setCategories: Dispatch<SetStateAction<ICategory[]>>;
  updatedCategory: ICategory | null;
  setUpdatedCategory: Dispatch<SetStateAction<ICategory>>;
  createCategory: () => void;
  fetchCategories: () => void;
  updateCategory: () => void;
  deleteCategory: () => void;
};
