import { MedusaService } from "@medusajs/framework/utils"
import Manufacturer from "./models/manufacturer"

class ManufacturerModuleService extends MedusaService({
  Manufacturer,
}) {}

export default ManufacturerModuleService
