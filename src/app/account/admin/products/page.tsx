import { RiShoppingCart2Fill as ProductsIcon } from "react-icons/ri";
import { FaPlus as PlusIcon } from "react-icons/fa";

export default function AdminUsers() {
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
        <button
          type="button"
          className={[
            "rounded-md bg-primary px-4 block h-9 text-white cursor-pointer ease-out duration-300",
            "flex items-center flex-row justify-center gap-2",
            "hover:bg-primary-800 active:bg-primary-900",
            "disabled:opacity-50 disabled:hover:bg-primary disabled:cursor-default",
          ].join(" ")}
        >
          <PlusIcon size={12} />
          Add new
        </button>
      </section>
    </>
  );
}
