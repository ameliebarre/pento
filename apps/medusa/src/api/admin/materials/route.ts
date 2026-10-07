import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MATERIAL_MODULE } from "../../../modules/material"
import type MaterialModuleService from "../../../modules/material/service"
import { createMaterialWorkflow } from "../../../workflows/create-material"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const materialModuleService: MaterialModuleService = req.scope.resolve(MATERIAL_MODULE)
  const materials = await materialModuleService.listMaterials()
  res.json({ materials })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: material } = await createMaterialWorkflow(req.scope).run({ input: req.body })
  res.status(201).json({ material })
}
