"use client";

import useCategoryContext from "@/hooks/useCategoryContext";
import createProductSchema from "@/schemas/createProductSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, useMemo } from "react";
import { StylesConfig } from "react-select";
import { ColorResult } from "react-color";
import { useDropzone } from "react-dropzone";
import { SubmitHandler, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import { FaFileUpload as FileUploadIcon } from "react-icons/fa";

const PRODUCT_FOLDER = "pento/products";

import {
  Button,
  ColorPicker,
  FileUploader,
  InputForm,
  Options,
  SelectForm,
  SwitchForm,
  TextareaForm,
} from "@/ui";
import useProductContext from "@/hooks/useProductContext";
import { ProductImage } from "@/@types/product";

interface IFormInput {
  title: string;
  description: string;
  price: number;
  previousPrice?: number;
  color?: string;
  brand?: string;
  stock: number;
  shipping?: boolean;
  category: {
    label: string;
    value: string;
  };
}

const selectColourStyles: StylesConfig = {
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderWidth: "1px",
    borderBlockStyle: "solid",
    borderColor: state.isFocused ? "#A27A60" : "#ACACAC",
    boxShadow: "none",
    ":hover": {
      border: "1px solid #A27A60",
    },
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color: "#000000",
    background: isFocused
      ? "hsla(20, 16%, 93%, 1)"
      : isSelected
      ? "hsla(24, 26%, 51%, 1)"
      : undefined,
    zIndex: 1,
  }),
};

interface CreateProductFormProps {
  handleCloseModal: () => void;
}

export default function CreateProductForm({
  handleCloseModal,
}: CreateProductFormProps) {
  const [displayImages, setDisplayImages] = useState<ProductImage[]>([]);
  const [hasShipping, setHasShipping] = useState(true);
  const [currentColor, setCurrentColor] = useState("");
  const {
    uploadImages,
    uploading,
    uploadedImages,
    createProduct,
    deleteImage,
  } = useProductContext();

  useEffect(() => {
    setDisplayImages(uploadedImages);
  }, [uploadedImages]);

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#8E8E8E",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#8E8E8E",
    outline: "none",
    transition: "border .24s ease-in-out",
    height: 250,
  };

  const focusedStyle = {
    borderColor: "#A27A60",
  };

  const acceptStyle = {
    backgroundColor: "#EFEBE9",
    borderColor: "#A27A60",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const handleUploadFiles = (files: File[]) => {
    uploadImages(files, PRODUCT_FOLDER);
  };

  const handleDeleteFile = (public_id: string) => {
    deleteImage(public_id);
  };

  const { categories, fetchCategories } = useCategoryContext();

  useEffect(() => {
    fetchCategories();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(createProductSchema),
  });

  const handleChangeColor = (color: ColorResult) => setCurrentColor(color.hex);

  const handleChangeShippingStatus = (status: boolean) =>
    setHasShipping(status);

  const categoryInputValue = watch("category");

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await createProduct({
      ...data,
      color: currentColor ? currentColor : "",
      shipping: hasShipping,
      images: uploadedImages,
      category: {
        _id: categoryInputValue.value,
        name: categoryInputValue.label,
      },
    });

    if (response?.ok) {
      handleCloseModal();
    }
  };

  const categoriesOptions: Options[] = categories.map((category) => {
    return {
      value: category?._id,
      label: category?.name,
    };
  });

  return (
    <div className="w-[60%] mx-auto mb-8 px-4">
      <h2 className="text-2xl font-semibold pb-2 mb-5 border-b border-b-black">
        Add a new product
      </h2>
      <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
        {/* Title */}
        <InputForm
          register={register}
          name="title"
          label="Title"
          error={errors.title}
          required
        />

        {/* Description */}
        <TextareaForm
          register={register}
          label="Description"
          name="description"
          error={errors.description}
          required
        />

        {/* Categories */}
        <SelectForm
          options={categoriesOptions}
          control={control}
          name="category"
          colourStyles={selectColourStyles}
        />

        <div className="flex flex-row gap-4">
          {/* Price */}
          <InputForm
            type="number"
            register={register}
            name="price"
            label="Price"
            error={errors.price}
          />

          {/* Previous price */}
          <InputForm
            type="number"
            register={register}
            name="previousPrice"
            label="Previous price"
            error={errors.previousPrice}
          />
        </div>
        <div className="flex flex-row gap-4">
          <ColorPicker
            control={control}
            name="color"
            label="Select product color"
            currentColor={currentColor}
            handleChangeColor={handleChangeColor}
            error={errors.color}
          />

          {/* Description */}
          <InputForm
            register={register}
            label="Brand"
            name="brand"
            error={errors.brand}
            required={false}
          />
        </div>
        <div className="flex flex-row gap-4">
          {/* Stock */}
          <InputForm
            register={register}
            name="stock"
            label="Stock"
            error={errors.stock}
            required
          />
          {/* Shipping */}
          <SwitchForm
            label="Shipping"
            onColor="#C8B2A4"
            onHandleColor="#A27A60"
            onChange={handleChangeShippingStatus}
            checked={hasShipping}
          />
        </div>
        <FileUploader
          displayImages={displayImages}
          uploading={uploading}
          onUploadFiles={handleUploadFiles}
          onDeleteFile={handleDeleteFile}
          baseStyle={baseStyle}
          acceptStyle={acceptStyle}
          rejectStyle={rejectStyle}
          focusedStyle={focusedStyle}
        />
        <Button
          label="Create product"
          type="submit"
          className="text-md"
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
