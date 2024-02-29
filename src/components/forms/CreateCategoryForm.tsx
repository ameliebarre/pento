"use client";

import { Image } from "@/@types/common";
import useCategoryContext from "@/hooks/useCategoryContext";
import CreateCategorySchema, {
  CreateCategorySchemaType,
} from "@/schemas/createCategorySchema";
import { Button, FileUploader, InputForm } from "@/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  name: string;
}

const CATEGORY_FOLDER = "pento/categories";

interface CreateCategoryFormProps {
  handleCloseModal: () => void;
}

export default function CreateCategoryForm({
  handleCloseModal,
}: CreateCategoryFormProps) {
  const [displayImages, setDisplayImages] = useState<Image[]>([]);
  const { createCategory, uploadImages, uploading, uploadedImages } =
    useCategoryContext();

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

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<CreateCategorySchemaType>({
    resolver: zodResolver(CreateCategorySchema),
  });

  const handleUploadFiles = (files: File[]) => {
    uploadImages(files, CATEGORY_FOLDER);
  };

  const handleDeleteFile = (public_id: string) => {
    console.log("PUBLIC_ID : ", public_id);
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const response = await createCategory({
      ...data,
      images: uploadedImages,
    });

    if (response?.ok) {
      handleCloseModal();
    }
  };

  return (
    <div className="w-[60%] mx-auto mb-8 px-4">
      <h2 className="text-2xl font-semibold pb-2 mb-5 border-b border-b-black">
        Add a new category
      </h2>
      <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <InputForm
          register={register}
          name="name"
          label="Name"
          error={errors.name}
          required
        />
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
          label="Create category"
          type="submit"
          className="text-md"
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
