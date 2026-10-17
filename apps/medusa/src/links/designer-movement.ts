import { defineLink } from "@medusajs/framework/utils"
import DesignerModule from "../modules/designer"
import MovementModule from "../modules/movement"

export default defineLink(
  {
    linkable: MovementModule.linkable.movement,
    isList: true,
  },
  {
    linkable: DesignerModule.linkable.designer,
    isList: true,
  },
)
