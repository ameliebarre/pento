"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IProduct, ProductContextType } from "@/@types/product";

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatedProduct, setUpdatedProduct] = useState<IProduct | null>(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const uploadImages = (e: any) => {};

  const deleteImage = (public_id: string) => {};

  const createProduct = async (product: IProduct) => {
    try {
      const response = await fetch(`${process.env.API}/admin/product`, {
        method: "POST",
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(`Product ${data?.title} was successfully created.`);
        router.push("/");
      }
    } catch (error: any) {
      toast.error("An error occured. Try again.");
    }
  };

  const fetchProducts = async (page = 1) => {
    try {
      const response = await fetch(`${process.env.API}/products?page=${page}`, {
        method: "GET",
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error);
      } else {
        setProducts(data?.products);
        setCurrentPage(data?.currentPage);
        setTotalPages(data?.totalPages);
      }
    } catch (error: any) {
      toast.error("An error occured. Try again.");
    }
  };

  const updateProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${updatedProduct?._id}`,
        {
          method: "PUT",
          body: JSON.stringify(updatedProduct),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data?.error);
      } else {
        toast.success(`Product ${data?.title} was successfully updated.`);
        router.back();
      }
    } catch (error: any) {
      toast.error("An error occured. Try again.");
    }
  };

  const deleteProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${updatedProduct?._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();
      const deletedProductData = products.filter(
        (product) => product._id !== updatedProduct?._id,
      );

      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(`Product ${data?.title} was successfully deleted`);
        router.back();
      }
    } catch (err) {
      toast.error("An error occured. Try again.");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        currentPage,
        setCurrentPage,
        totalPages,
        setTotalPages,
        updatedProduct,
        setUpdatedProduct,
        uploading,
        setUploading,
        uploadImages,
        deleteImage,
        createProduct,
        fetchProducts,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
