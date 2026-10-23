import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MOVEMENT_MODULE } from "../../../modules/movement"
import type MovementModuleService from "../../../modules/movement/service"
import { createMovementWorkflow } from "../../../workflows/create-movement"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const movementModuleService: MovementModuleService = req.scope.resolve(MOVEMENT_MODULE)

  const q = typeof req.query.q === "string" ? req.query.q.trim() : ""
  const limit = Number(req.query.limit ?? 20) || 20
  const offset = Number(req.query.offset ?? 0) || 0

  const filters = q
    ? {
        $or: [{ name: { $ilike: `%${q}%` } }, { slug: { $ilike: `%${q}%` } }],
      }
    : {}

  const [movements, count] = await movementModuleService.listAndCountMovements(filters, {
    take: limit,
    skip: offset,
    order: { name: "ASC" },
  })

  res.json({ movements, count, limit, offset })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: movement } = await createMovementWorkflow(req.scope).run({
    input: req.body as Record<string, unknown>,
  })
  res.status(201).json({ movement })
}
