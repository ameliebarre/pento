"use client";

import useCategoryContext from "@/hooks/useCategoryContext";
import CreateCategorySchema, {
  CreateCategorySchemaType,
} from "@/schemas/createCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";

interface IFormInput {
  name: string;
}

export default function CreateCategoryForm() {
  const { createCategory } = useCategoryContext();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
  } = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    createCategory(data.name);
    reset();
  };

  return (
    <div className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-4 rounded-xl">
      <form
        action=""
        method="POST"
        className="flex items-center gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col w-full">
          <input
            {...register("name", { required: true })}
            id="name"
            name="name"
            type="text"
            className={[
              "h-12 mt-1 bg-neutral-100 rounded-md px-2 text-gray-900 focus:outline-none",
            ].join(" ")}
            placeholder="Armchairs"
          />
        </div>
        <button
          type="submit"
          className={[
            "rounded-lg bg-primary w-[250px] block h-12 text-white cursor-pointer ease-out duration-300",
            "hover:bg-primary-800 active:bg-primary-900",
            "disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-default",
          ].join(" ")}
          disabled={!isValid}
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
