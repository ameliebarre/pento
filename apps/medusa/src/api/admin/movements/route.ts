import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MOVEMENT_MODULE } from "../../../modules/movement"
import type MovementModuleService from "../../../modules/movement/service"
import { createMovementWorkflow } from "../../../workflows/create-movement"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const movementModuleService: MovementModuleService = req.scope.resolve(MOVEMENT_MODULE)
  const movements = await movementModuleService.listMovements()
  res.json({ movements })
}

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: movement } = await createMovementWorkflow(req.scope).run({ input: req.body })
  res.status(201).json({ movement })
}
