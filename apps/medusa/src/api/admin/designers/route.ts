import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { DESIGNER_MODULE } from "../../../modules/designer"
import type DesignerModuleService from "../../../modules/designer/service"
import { createDesignerWorkflow } from "../../../workflows/create-designer"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const designerModuleService: DesignerModuleService = req.scope.resolve(DESIGNER_MODULE)

  const q = typeof req.query.q === "string" ? req.query.q.trim() : ""
  const limit = Number(req.query.limit ?? 20) || 20
  const offset = Number(req.query.offset ?? 0) || 0

  const filters = q
    ? {
        $or: [
          { first_name: { $ilike: `%${q}%` } },
          { last_name: { $ilike: `%${q}%` } },
          { slug: { $ilike: `%${q}%` } },
          { nationality: { $ilike: `%${q}%` } },
        ],
      }
    : {}

  const [designers, count] = await designerModuleService.listAndCountDesigners(filters, {
    take: limit,
    skip: offset,
    order: { last_name: "ASC" },
  })

  res.json({ designers, count, limit, offset })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: designer } = await createDesignerWorkflow(req.scope).run({
    input: req.body as Record<string, unknown>,
  })
  res.status(201).json({ designer })
}
