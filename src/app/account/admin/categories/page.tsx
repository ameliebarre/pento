import CreateCategoryForm from "@/components/forms/CreateCategoryForm";
import { MdCategory as CategoryIcon } from "react-icons/md";

export default function AdminCategories() {
  return (
    <>
      <section className="flex items-center gap-3 mb-4">
        <CategoryIcon size={40} />
        <div>
          <h3 className="text-[34px] font-semibold leading-none">Categories</h3>
          <h5>Create and manage the product's categories</h5>
        </div>
      </section>
      <CreateCategoryForm />
    </>
  );
}
