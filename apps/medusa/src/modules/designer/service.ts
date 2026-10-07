import { MedusaService } from "@medusajs/framework/utils"
import Designer from "./models/designer"

class DesignerModuleService extends MedusaService({
  Designer,
}) {}

export default DesignerModuleService
