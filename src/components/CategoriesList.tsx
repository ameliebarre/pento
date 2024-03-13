import Image from "next/image";
import clsx from "clsx";

import { ICategory } from "@/@types/category";

interface CategoriesListProps {
  categories: ICategory[];
}

export default function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {categories.map((category) => {
        return (
          <div
            className="flex flex-col items-center justify-center"
            key={category?._id}
          >
            <div
              className={`group w-[100%] h-[300px] relative bg-cover bg-center mb-2`}
            >
              <div
                className={clsx(
                  "group-hover:flex group-hover:w-full group-hover:h-full group-hover:absolute group-hover:bg-black",
                  "group-hover:rounded-tl-3xl group-hover:rounded-br-3xl group-hover:z-20 group-hover:items-center",
                )}
              >
                <span className="text-white text-md p-2 border-white border-2 border-solid mx-5 w-full cursor-pointer text-center">
                  Update product
                </span>
              </div>
              <Image
                src={category?.images[0].secure_url}
                alt={category?.name}
                className="rounded-tl-3xl rounded-br-3xl z-10"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                  height: "100%",
                  width: "100%",
                }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                priority
              />
            </div>
            <h3 className="text-lg">{category?.name}</h3>
          </div>
        );
      })}
    </div>
  );
}
