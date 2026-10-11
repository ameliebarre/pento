import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MOVEMENT_MODULE } from "../../../modules/movement"
import type MovementModuleService from "../../../modules/movement/service"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const movementModuleService: MovementModuleService = req.scope.resolve(MOVEMENT_MODULE)

  const movements = await movementModuleService.listMovements()

  res.json({ movements })
}
