export interface ICategory {
  _id: string;
  name: string;
  slug: string;
}

export type CategoryContextType = {
  categories: ICategory[];
  setCategories: Dispatch<SetStateAction<ICategory[]>>;
  updatedCategory: ICategory | null;
  setUpdatedCategory: Dispatch<SetStateAction<ICategory>>;
  createCategory: (name: string) => void;
  fetchCategories: () => void;
  updateCategory: (name: string) => void;
  deleteCategory: () => void;
};
