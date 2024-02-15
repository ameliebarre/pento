"use client";

import useCategoryContext from "@/hooks/useCategoryContext";
import useProductContext from "@/hooks/useProductContext";
import createProductSchema from "@/schemas/createProductSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState, KeyboardEvent } from "react";
import { StylesConfig } from "react-select";

import { SubmitHandler, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import {
  ColorPicker,
  InputForm,
  Options,
  SelectForm,
  SwitchForm,
  TextareaForm,
} from "@/ui";
import { ColorResult } from "react-color";

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
  const [hasShipping, setHasShipping] = useState(true);
  const [currentColor, setCurrentColor] = useState("");

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

  // Allow only numbers, backpspace and arrow keys
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
            register={register}
            name="price"
            label="Price"
            onKeyDown={handlePriceChange}
            error={errors.price}
          />

          {/* Previous price */}
          <InputForm
            register={register}
            name="previousPrice"
            label="Previous price"
            onKeyDown={handlePriceChange}
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
