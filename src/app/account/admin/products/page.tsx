import { RiShoppingCart2Fill as ProductsIcon } from "react-icons/ri";

import AddProductButton from "@/components/buttons/AddProductButton";

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
        <AddProductButton />
      </section>
    </>
  );
}
