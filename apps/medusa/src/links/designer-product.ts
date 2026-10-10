import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"
import DesignerModule from "../modules/designer"

export default defineLink(
  {
    linkable: DesignerModule.linkable.designer,
    isList: true,
  },
  {
    linkable: ProductModule.linkable.product,
    isList: true,
  },
)
