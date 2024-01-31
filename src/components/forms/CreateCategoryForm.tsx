"use client";

import { createCategorySchema } from "@/schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

interface IFormInput {
  name?: string;
}

export default function CreateCategoryForm() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ resolver: yupResolver(createCategorySchema) });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {};

  return (
    <div className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-4 rounded-xl">
      <form
        action=""
        method="POST"
        className="flex items-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full">
          {/* Email Input */}
          <input
            {...register("name", { required: true })}
            id="name"
            name="name"
            type="text"
            className={[
              "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900 focus:outline-none",
            ].join(" ")}
            placeholder="Armchairs"
            autoComplete="off"
          />
        </div>
        <button
          type="submit"
          className={[
            "rounded-xl bg-primary w-[250px] block h-12 text-white cursor-pointer ease-out duration-300",
            "hover:bg-primary-800 active:bg-primary-900",
            "disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-default",
          ].join(" ")}
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader size="20" color="#FFFFFF" className="mt-2" />
          ) : (
            "Create"
          )}
        </button>
      </form>
    </div>
  );
}
