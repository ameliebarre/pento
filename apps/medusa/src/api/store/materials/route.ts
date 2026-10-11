import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MATERIAL_MODULE } from "../../../modules/material"
import type MaterialModuleService from "../../../modules/material/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const materialModuleService: MaterialModuleService = req.scope.resolve(MATERIAL_MODULE)

  const materials = await materialModuleService.listMaterials()

  res.json({ materials })
}
