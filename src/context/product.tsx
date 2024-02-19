"use client";

import { ChangeEvent, PropsWithChildren, createContext, useState } from "react";
import Resizer from "react-image-file-resizer";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { IProduct, ProductContextType, ProductImage } from "@/@types/product";

export const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: PropsWithChildren<{}>) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [updatedProduct, setUpdatedProduct] = useState<IProduct | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<ProductImage[]>([]);

  const router = useRouter();

  const uploadImages = (files: File[], folder: string) => {
    const uploadingData: ProductImage[] = [];
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

    // for (let i = 0; i < files?.length; i++) {
    //   const imageFile = files[i];
    //   const reader = new FileReader();

    //   reader.onload = async (e) => {
    //     const uri = e.target?.result;

    //     return fetch(`${process.env.API}/admin/upload/image`, {
    //       method: "POST",
    //       body: JSON.stringify({ image: uri, folder }),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         uploadingData.push(data);
    //       })
    //       .catch(() => {
    //         toast.error("An error occured during image uplad. Try later.");
    //       })
    //       .finally(() => setUploading(false));
    //   };

    //   reader.readAsDataURL(imageFile);
    // }
  };

  const deleteImage = (public_id: string) => {
    setUploading(true);
    fetch(`${process.env.API}/admin/upload/image`, {
      method: "PUT",
      body: JSON.stringify({ public_id }),
    })
      .then((response) => response.json())
      .then(() => {
        const filteredImages = uploadedImages?.filter(
          (image) => image?.public_id !== public_id,
        );

        setUploadedImages(
          (prev) => [...prev, filteredImages] as ProductImage[],
        );
      })
      .catch((err) => {
        toast.error("An error occured during image deletion. Try later.");
      })
      .finally(() => setUploading(false));
  };

  const createProduct = async (product: IProduct) => {
    try {
      const response = await fetch(`${process.env.API}/admin/product`, {
        method: "POST",
        body: JSON.stringify({ product }),
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
        product,
        setProduct,
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
        uploadedImages,
        setUploadedImages,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
