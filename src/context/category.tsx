"use client";

import { PropsWithChildren, createContext, useState } from "react";
import toast from "react-hot-toast";
import Resizer from "react-image-file-resizer";

import { CategoryContextType, ICategory } from "@/@types/category";
import { Image } from "@/@types/common";

export const CategoryContext = createContext<CategoryContextType | null>(null);

export const CategoryProvider = ({ children }: PropsWithChildren<{}>) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [updatedCategory, setUpdatedCategory] = useState<ICategory | null>(
    null,
  );
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);

  const uploadImages = (files: File[], folder: string) => {
    const allUploadedFiles: any[] = [];

    if (files) {
      setUploading(true);
      const uploadPromises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const promise = new Promise((resolve) => {
          Resizer.imageFileResizer(
            file,
            1280,
            1280,
            "JPEG",
            100,
            0,
            (uri) => {
              fetch(`${process.env.API}/admin/upload/image`, {
                method: "POST",
                body: JSON.stringify({ image: uri, folder }),
              })
                .then((response) => {
                  return response.json();
                })
                .then((data) => {
                  allUploadedFiles.unshift(data);
                  resolve(data);
                })
                .catch((err) => {
                  toast.error(
                    "An error occured during image uplad. Try later.",
                  );
                  resolve(err);
                });
            },
            "base64",
          );
        });
        uploadPromises.push(promise);
      }

      Promise.all(uploadPromises)
        .then(() => {
          setUploadedImages(allUploadedFiles);
          setUploading(false);
        })
        .catch(() => {
          toast.error("An error occured during image uplad. Try later.");
          setUploading(false);
        });
    }
  };

  const createCategory = async (
    category: ICategory,
  ): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${process.env.API}/admin/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });

      const responseData = await response.json();

      if (!response.ok) {
        toast.error(responseData);
      } else {
        toast.success("Category was successfully created.");
        setCategories([responseData.category, ...categories]);
        setUploadedImages([]);

        return response;
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
        uploadImages,
        uploading,
        setUploading,
        uploadedImages,
        setUploadedImages,
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
