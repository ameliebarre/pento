import { FaPlus as PlusIcon } from "react-icons/fa";

type AddProductButtonProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function AddProductButton({ setIsOpen }: AddProductButtonProps) {
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
    </>
  );
}
