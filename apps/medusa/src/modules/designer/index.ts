import { Module } from "@medusajs/framework/utils"
import DesignerModuleService from "./service"

export const DESIGNER_MODULE = "designer"

export default Module(DESIGNER_MODULE, {
  service: DesignerModuleService,
})
