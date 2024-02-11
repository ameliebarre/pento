"use client";

import useCategoryContext from "@/hooks/useCategoryContext";
import useProductContext from "@/hooks/useProductContext";
import createProductSchema from "@/schemas/createProductSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, KeyboardEvent } from "react";
import { BlockPicker } from "react-color";
import Select, { StylesConfig } from "react-select";
import Switch from "react-switch";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

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
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [hasShipping, setHasShipping] = useState(true);
  const [currentColor, setCurrentColor] = useState("");
  const {
    updatedProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploading,
    setUploading,
    uploadImages,
    deleteImage,
  } = useProductContext();

  const { categories, fetchCategories } = useCategoryContext();

  useEffect(() => {
    fetchCategories();
  }, []);

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
    reset,
  } = useForm<IFormInput>({
    mode: "onChange",
    resolver: yupResolver(createProductSchema),
  });

  const handleChangeColor = (color: any) => {
    // setShowColorPicker(false);
    setCurrentColor(color.hex);
  };

  const handleChangeShippingStatus = (status: boolean) => {
    setHasShipping(status);
  };

  const handlePriceChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Backspace" || e.key == "ArrowRight" || e.key == "ArrowLeft") {
      return true;
    } else if (e.key < "0" || e.key > "9") {
      e.preventDefault();
    }
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    console.log("DATA : ", {
      ...data,
      color: currentColor ? currentColor : "",
      shipping: hasShipping,
    });
  };

  const categoriesOptions = categories.map((category) => {
    return {
      value: category._id,
      label: category.name,
    };
  });

  // TODO: refacto form with UI components
  return (
    <div className="w-[60%] overflow-auto mx-auto mb-8 px-4">
      <h2 className="text-2xl font-semibold pb-2 mb-5 border-b border-b-black">
        Add a new product
      </h2>
      <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-4 w-full">
          {/* Title */}
          <label htmlFor="title">Title</label>
          <input
            {...register("title", { required: true })}
            id="title"
            name="title"
            type="text"
            className={[
              "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
              "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
            ].join(" ")}
          />
          {errors.title && (
            <p className="text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4 w-full">
          {/* Description */}
          <label htmlFor="description">Description</label>
          <textarea
            {...register("description", { required: true })}
            id="description"
            name="description"
            className={[
              "h-32 max-h-52 mt-1 bg-neutral-100 rounded-md p-2 text-gray-900 resize-y",
              "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
            ].join(" ")}
          />
          {errors.description && (
            <p className="text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>
        <div className="flex flex-col mb-4 w-full">
          <label htmlFor="category" className="mb-1">
            Category
          </label>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => (
              <Select
                options={categoriesOptions}
                id="category"
                styles={colourStyles}
                value={categoriesOptions.find(
                  (option) => option.value === value,
                )}
                onChange={(value) => onChange(value)}
              />
            )}
          />
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col mb-4 w-full">
            {/* Price */}
            <label htmlFor="price">Price</label>
            <input
              {...register("price", { required: true })}
              id="price"
              name="price"
              className={[
                "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
                "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
              ].join(" ")}
              onKeyDown={handlePriceChange}
            />
            {errors.price && (
              <p className="text-red-500 mt-1">{errors.price.message}</p>
            )}
          </div>
          <div className="flex flex-col mb-4 w-full">
            {/* Previous price */}
            <label htmlFor="previousPrice">Previous price</label>
            <input
              type="text"
              {...register("previousPrice", { required: false })}
              id="previousPrice"
              className={[
                "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
                "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
              ].join(" ")}
              onKeyDown={handlePriceChange}
            />
            {errors.previousPrice && (
              <p className="text-red-500 mt-1">
                {errors.previousPrice.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col mb-4 w-full relative">
            {/* Color */}
            <label htmlFor="color">Color</label>
            <Controller
              control={control}
              name="color"
              render={({ field: { onChange } }) => (
                <input
                  id="color"
                  name="color"
                  value={currentColor}
                  className={[
                    "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
                    "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
                    currentColor ? "pl-[58px]" : "",
                  ].join(" ")}
                  onChange={() => onChange(currentColor)}
                  onFocus={() => setShowColorPicker(true)}
                  onBlur={() => setShowColorPicker(false)}
                />
              )}
            />
            {/* <input
              {...register("color")}
              id="color"
              name="color"
              value={currentColor}
              className={[
                "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
                "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
                currentColor ? "pl-[58px]" : "",
              ].join(" ")}
              onFocus={() => setShowColorPicker(true)}
              onBlur={() => setShowColorPicker(false)}
            /> */}
            {currentColor ? (
              <span
                style={{ backgroundColor: currentColor }}
                className={`absolute inset-y-0 top-[42px] left-[10px] flex items-center px-2 w-[40px] h-[20px]`}
              />
            ) : null}
            {errors.color && (
              <p className="text-red-500 mt-1">{errors.color.message}</p>
            )}
            {showColorPicker ? (
              <BlockPicker
                color={currentColor}
                onSwatchHover={handleChangeColor}
              />
            ) : null}
          </div>
          <div className="flex flex-col mb-4 w-full">
            {/* Brand */}
            <label htmlFor="brand">Brand</label>
            <input
              {...register("brand", { required: true })}
              id="brand"
              name="brand"
              className={[
                "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
                "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
              ].join(" ")}
            />
            {errors.brand && (
              <p className="text-red-500 mt-1">{errors.brand.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <div className="flex flex-col mb-4 w-full">
            {/* Stock */}
            <label htmlFor="stock">Stock</label>
            <input
              {...register("stock", { required: true })}
              id="stock"
              name="stock"
              className={[
                "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900",
                "focus:ring-1 focus:ring-primary-600 focus:ring-offset-4 focus:ring-offset-white focus:outline-none",
              ].join(" ")}
            />
            {errors.stock && (
              <p className="text-red-500 mt-1">{errors.stock.message}</p>
            )}
          </div>
          <label className="flex gap-4 py-2 items-center">
            <span>Shipping</span>
            <Switch
              onChange={handleChangeShippingStatus}
              checked={hasShipping}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#C8B2A4"
              onHandleColor="#A27A60"
              handleDiameter={20}
              height={30}
              width={55}
            />
          </label>
        </div>
        <button
          type="submit"
          className={[
            "rounded-lg bg-primary w-[250px] block h-12 text-white cursor-pointer ease-out duration-300",
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
