import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"
import MovementModule from "../modules/movement"

export default defineLink(MovementModule.linkable.movement, {
  linkable: ProductModule.linkable.product,
  isList: true,
})
