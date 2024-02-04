"use client";

import { FaPlus as PlusIcon } from "react-icons/fa";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function AddProductButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={[
          "rounded-md bg-primary px-4 block h-9 text-white cursor-pointer ease-out duration-300",
          "flex items-center flex-row justify-center gap-2",
          "hover:bg-primary-800 active:bg-primary-900",
          "disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-default",
        ].join(" ")}
        onClick={() => setIsOpen(true)}
      >
        <PlusIcon size={12} />
        Add new
      </button>
      <Modal handleClose={() => setIsOpen(false)} isOpen={isOpen}>
        This is Modal Content!
      </Modal>
    </>
  );
}
