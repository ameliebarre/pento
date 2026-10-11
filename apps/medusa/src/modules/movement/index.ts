import { Module } from "@medusajs/framework/utils"
import MovementModuleService from "./service"

export const MOVEMENT_MODULE = "movement"

export default Module(MOVEMENT_MODULE, {
  service: MovementModuleService,
})
