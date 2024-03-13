"use client";

import { useEffect, useState } from "react";
import { MdCategory as CategoryIcon } from "react-icons/md";
import { FaPlus as PlusIcon } from "react-icons/fa";

import Modal from "@/components/Modal";
import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import CategoriesList from "@/components/CategoriesList";
import { Button } from "@/ui";
import useCategoryContext from "@/hooks/useCategoryContext";

export default function AdminCategories() {
  const [isOpen, setIsOpen] = useState(false);
  const { categories, fetchCategories } = useCategoryContext();

  useEffect(() => {
    fetchCategories();
  }, []);

  const onCloseModal = () => setIsOpen(false);

  return (
    <div>
      <section className="flex items-center gap-3 mb-4">
        <CategoryIcon size={40} />
        <div>
          <h3 className="text-[34px] font-semibold leading-none">Categories</h3>
          <h5>Create and manage the product's categories</h5>
        </div>
        <Button
          label="Add new"
          Icon={PlusIcon}
          iconSize={12}
          iconFill="#FFFFFF"
          handleOnClick={() => setIsOpen(true)}
        />
      </section>
      <section className="mt-12">
        <CategoriesList categories={categories} />
      </section>
      <Modal
        handleClose={() => setIsOpen(false)}
        isOpen={isOpen}
        className="h-auto"
      >
        <CreateCategoryForm handleCloseModal={onCloseModal} />
      </Modal>
    </div>
  );
}
