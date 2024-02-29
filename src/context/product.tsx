"use client";

import { PropsWithChildren, createContext, useState } from "react";
import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { IProduct, ProductContextType } from "@/@types/product";
import { Image } from "@/@types/common";

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);

  const router = useRouter();

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
            820,
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

  const deleteImage = (public_id: string) => {
    fetch(`${process.env.API}/admin/upload/image`, {
      method: "PUT",
      body: JSON.stringify({ public_id }),
    })
      .then((response) => response.json())
      .then(() => {
        const filteredImages = uploadedImages?.filter(
          (image) => image?.public_id !== public_id,
        );

        setUploadedImages(filteredImages);
      })
      .catch((err) => {
        toast.error("An error occured during image deletion. Try later.");
      });
  };

  const createProduct = async (
    product: IProduct,
  ): Promise<Response | undefined> => {
    try {
      const response = await fetch(`${process.env.API}/admin/product`, {
        method: "POST",
        body: JSON.stringify(product),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
      } else {
        toast.success(`Product was successfully created.`);
        setUploadedImages([]);

        return response;
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

  const updateProduct = async (updatedProduct: IProduct) => {
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

  const deleteProduct = async (updatedProduct: IProduct) => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/product/${updatedProduct?._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await response.json();
      products.filter((product) => product._id !== updatedProduct?._id);

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
        uploading,
        setUploading,
        uploadImages,
        deleteImage,
        createProduct,
        fetchProducts,
        updateProduct,
        deleteProduct,
        uploadedImages,
        setUploadedImages,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
