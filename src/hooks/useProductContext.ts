import { ProductContext } from "@/context/product";
import { useContext } from "react";

const useProductContext = () => {
  const productContext = useContext(ProductContext);

  if (!productContext) {
    throw new Error(
      "productContext has to be used within <ProductContext.Provider>",
    );
  }

  return productContext;
};

export default useProductContext;
