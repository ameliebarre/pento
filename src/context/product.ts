"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IProduct, ProductContextType } from "@/@types/product";

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatedProduct, setUpdatedProduct] = useState<IProduct | null>(null);
  const [uploading, setUploading] = useState(false);

  const router = useRouter();

  const uploadImages = (e: any) => {};

  const deleteImage = (public_id: string) => {};

  const createProduct = async () => {
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
};
