"use client";

import useCategoryContext from "@/hooks/useCategoryContext";
import createProductSchema from "@/schemas/createProductSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useEffect,
  useState,
  KeyboardEvent,
  useMemo,
  useCallback,
} from "react";
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
    _id?: string;
    name?: string;
    slug?: string;
    createdAt?: string;
    updatedAt?: string;
  };
}

const colourStyles: StylesConfig = {
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

export default function CreateProductForm() {
  const [displayImages, setDisplayImages] = useState<ProductImage[]>([]);
  const [hasShipping, setHasShipping] = useState(true);
  const [currentColor, setCurrentColor] = useState("");
  const { uploadImages, uploading, deleteImage, uploadedImages } =
    useProductContext();

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

  const onDrop = (files: File[]) => {
    uploadImages(files, PRODUCT_FOLDER);
  };

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
  } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    noKeyboard: true,
    noClick: true,
    onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  const { categories, fetchCategories } = useCategoryContext();

  useEffect(() => {
    fetchCategories();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(createProductSchema),
  });

  const handleChangeColor = (color: ColorResult) => setCurrentColor(color.hex);

  const handleChangeShippingStatus = (status: boolean) =>
    setHasShipping(status);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("DATA : ", {
      ...data,
      color: currentColor ? currentColor : "",
      shipping: hasShipping,
      images: uploadedImages,
    });
  };

  const categoriesOptions: Options[] = categories.map((category) => {
    return {
      value: category._id,
      label: category.name,
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
          colourStyles={colourStyles}
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
        <div className="flex flex-col mb-4 w-full">
          <label>Upload product images</label>
          <div className="mt-2">
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              <FileUploadIcon size={35} />
              {isDragActive ? (
                <p className="mt-3 mb-2 text-xl">Drop images here</p>
              ) : (
                <p className="mt-3 mb-2 text-xl">
                  Drag and drop images here or click to select
                </p>
              )}

              <Button
                label="Open file dialog"
                handleOnClick={open}
                className="text-md"
              />
            </div>
          </div>
          {uploading ? (
            <ClipLoader size="20px" color="#A2A2A2" className="mt-2" />
          ) : (
            <aside className="flex flex-row flex-wrap mt-4">
              {displayImages?.map((img) => (
                <div
                  className="inline-flex p-2 border border-black mb-2 mr-2 w-[100px] h-[100px] box-border"
                  key={img.public_id}
                >
                  <div className="flex min-w-0 overflow-hidden">
                    <img src={img.secure_url} className="block w-auto h-full" />
                  </div>
                </div>
              ))}
            </aside>
          )}
        </div>
        <button
          type="submit"
          className={[
            "rounded-lg bg-primary w-[250px] block h-12 text-white cursor-pointer ease-out duration-300 mt-5",
            "hover:bg-primary-800 active:bg-primary-900",
            "disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-default",
          ].join(" ")}
          //disabled={!isValid}
        >
          {isSubmitting ? (
            <ClipLoader size="20px" color="#FFFFFF" className="mt-2" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
}
