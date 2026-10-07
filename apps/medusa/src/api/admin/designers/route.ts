import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { DESIGNER_MODULE } from "../../../modules/designer"
import type DesignerModuleService from "../../../modules/designer/service"
import { createDesignerWorkflow } from "../../../workflows/create-designer"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const designerModuleService: DesignerModuleService = req.scope.resolve(DESIGNER_MODULE)
  const designers = await designerModuleService.listDesigners()
  res.json({ designers })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: designer } = await createDesignerWorkflow(req.scope).run({ input: req.body })
  res.status(201).json({ designer })
}
