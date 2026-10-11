import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"
import ManufacturerModule from "../modules/manufacturer"

export default defineLink(ManufacturerModule.linkable.manufacturer, {
  linkable: ProductModule.linkable.product,
  isList: true,
})
