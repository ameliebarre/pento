"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { CategoryContextType, ICategory } from "@/@types/category";

export const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: PropsWithChildren<{}>) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [updatedCategory, setUpdatedCategory] = useState<ICategory | null>(
    null,
  );

  const createCategory = async (categoryName: string) => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: categoryName }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData);
      } else {
        toast.success("Category was successfully created.");
        setCategories([responseData.category, ...categories]);
      }
    } catch (err) {
      toast.error("An error occured. Try again.");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`);
      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
      } else {
        setCategories(data);
      }
    } catch (err) {
      toast.error("An error occured. Try again.");
    }
  };

  const updateCategory = async (name: string) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatedCategory?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        },
      );

      const data = await response.json();
      const updatedCategoryData = categories.map((category) =>
        category._id === updatedCategory?._id ? data : category,
      );

      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success("The category was successfully updated");
        setCategories(updatedCategoryData);
      }
    } catch (err) {
      toast.error("An error occured. Try again.");
    }
  };

  const deleteCategory = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/category/${updatedCategory?._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();
      const deletedCategoryData = categories.filter(
        (category) => category._id !== updatedCategory?._id,
      );

      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success("The category was successfully deleted");
        setCategories(deletedCategoryData);
        setUpdatedCategory(null);
      }
    } catch (err) {
      toast.error("An error occured. Try again.");
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        updatedCategory,
        setUpdatedCategory,
        createCategory,
        fetchCategories,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
