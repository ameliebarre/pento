import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"
import type ManufacturerModuleService from "../modules/manufacturer/service"

type DeleteManufacturerInput = { id: string }

const deleteManufacturerStep = createStep(
  "delete-manufacturer",
  async (input: DeleteManufacturerInput, { container }) => {
    const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)
    await manufacturerModuleService.deleteManufacturers([input.id])
    return new StepResponse({ id: input.id })
  },
)

export const deleteManufacturerWorkflow = createWorkflow(
  "delete-manufacturer",
  (input: DeleteManufacturerInput) => {
    const result = deleteManufacturerStep(input)
    return new WorkflowResponse(result)
  },
)
