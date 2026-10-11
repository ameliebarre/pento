import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { DESIGNER_MODULE } from "../../../modules/designer"
import type DesignerModuleService from "../../../modules/designer/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const designerModuleService: DesignerModuleService = req.scope.resolve(DESIGNER_MODULE)

  const designers = await designerModuleService.listDesigners()

  res.json({ designers })
}
