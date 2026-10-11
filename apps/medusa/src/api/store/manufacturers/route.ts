import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MANUFACTURER_MODULE } from "../../../modules/manufacturer"
import type ManufacturerModuleService from "../../../modules/manufacturer/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const manufacturerModuleService: ManufacturerModuleService = req.scope.resolve(MANUFACTURER_MODULE)

  const manufacturers = await manufacturerModuleService.listManufacturers()

  res.json({ manufacturers })
}
