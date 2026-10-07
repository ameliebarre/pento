import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { MOVEMENT_MODULE } from "../modules/movement"
import type MovementModuleService from "../modules/movement/service"

type CreateMovementInput = Record<string, unknown>

const createMovementStep = createStep(
  "create-movement",
  async (input: CreateMovementInput, { container }) => {
    const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
    const movement = await movementModuleService.createMovements(input)
    return new StepResponse(movement, movement.id)
  },
  async (movementId: string | undefined, { container }) => {
    if (!movementId) return
    const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
    await movementModuleService.deleteMovements([movementId])
  },
)

export const createMovementWorkflow = createWorkflow(
  "create-movement",
  (input: CreateMovementInput) => {
    const movement = createMovementStep(input)
    return new WorkflowResponse(movement)
  },
)
