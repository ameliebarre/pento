import { Module } from "@medusajs/framework/utils"
import ManufacturerModuleService from "./service"

export const MANUFACTURER_MODULE = "manufacturer"

export default Module(MANUFACTURER_MODULE, {
  service: ManufacturerModuleService,
})
