import { CategoryContext } from "@/context/category";
import { useContext } from "react";

const useCategoryContext = () => {
  const categoryContext = useContext(CategoryContext);

  if (!categoryContext) {
    throw new Error(
      "categoryContext has to be used within <CategoryContext.Provider>",
    );
  }

  return categoryContext;
};

export default useCategoryContext;
