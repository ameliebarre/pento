import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"
import MaterialModule from "../modules/material"

export default defineLink(
  {
    linkable: MaterialModule.linkable.material,
    isList: true,
  },
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
)
