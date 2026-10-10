import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { MOVEMENT_MODULE } from "../modules/movement"
import type MovementModuleService from "../modules/movement/service"

type UpdateMovementInput = Record<string, unknown> & { id: string }

const updateMovementStep = createStep(
  "update-movement",
  async (input: UpdateMovementInput, { container }) => {
    const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
    const previous = await movementModuleService.retrieveMovement(input.id)
    const movement = await movementModuleService.updateMovements(input)
    return new StepResponse(movement, previous)
  },
  async (previous: Record<string, unknown> | undefined, { container }) => {
    if (!previous) return
    const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
    await movementModuleService.updateMovements(previous)
  },
)

export const updateMovementWorkflow = createWorkflow(
  "update-movement",
  (input: UpdateMovementInput) => {
    const movement = updateMovementStep(input)
    return new WorkflowResponse(movement)
  },
)
