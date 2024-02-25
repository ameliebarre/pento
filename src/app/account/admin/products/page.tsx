"use client";

import { useState } from "react";
import { RiShoppingCart2Fill as ProductsIcon } from "react-icons/ri";
import { FaPlus as PlusIcon } from "react-icons/fa";

import Modal from "@/components/Modal";
import CreateProductForm from "@/components/forms/CreateProductForm";
import { Button } from "@/ui";

export default function AdminUsers() {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseModal = () => setIsOpen(false);

  return (
    <>
      <section className="flex items-center gap-8 mb-4">
        <div className="flex gap-3">
          <ProductsIcon size={40} />
          <div>
            <h3 className="text-[34px] font-semibold leading-none">Products</h3>
            <h5>Create and manage the products</h5>
          </div>
        </div>
        <Button
          label="Add new"
          Icon={PlusIcon}
          iconSize={12}
          iconFill="#FFFFFF"
          handleOnClick={() => setIsOpen(true)}
        />
      </section>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        <CreateProductForm handleCloseModal={onCloseModal} />
      </Modal>
    </>
  );
}
