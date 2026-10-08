import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { MOVEMENT_MODULE } from "../modules/movement"
import type MovementModuleService from "../modules/movement/service"

type DeleteMovementInput = { id: string }

const deleteMovementStep = createStep("delete-movement", async (input: DeleteMovementInput, { container }) => {
  const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
  await movementModuleService.deleteMovements([input.id])
  return new StepResponse({ id: input.id })
})

export const deleteMovementWorkflow = createWorkflow(
  "delete-movement",
  (input: DeleteMovementInput) => {
    const result = deleteMovementStep(input)
    return new WorkflowResponse(result)
  },
)
