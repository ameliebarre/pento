import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MANUFACTURER_MODULE } from "../../../modules/manufacturer"
import type ManufacturerModuleService from "../../../modules/manufacturer/service"
import { createManufacturerWorkflow } from "../../../workflows/create-manufacturer"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const manufacturerModuleService: ManufacturerModuleService = req.scope.resolve(MANUFACTURER_MODULE)
  const manufacturers = await manufacturerModuleService.listManufacturers()
  res.json({ manufacturers })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: manufacturer } = await createManufacturerWorkflow(req.scope).run({ input: req.body })
  res.status(201).json({ manufacturer })
}
