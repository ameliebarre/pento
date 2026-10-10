import { MedusaService } from "@medusajs/framework/utils"
import Movement from "./models/movement"

class MovementModuleService extends MedusaService({
  Movement,
}) {}

export default MovementModuleService
