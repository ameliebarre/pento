import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"
import type ManufacturerModuleService from "../modules/manufacturer/service"

type UpdateManufacturerInput = Record<string, unknown> & { id: string }

const updateManufacturerStep = createStep(
  "update-manufacturer",
  async (input: UpdateManufacturerInput, { container }) => {
    const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)
    const previous = await manufacturerModuleService.retrieveManufacturer(input.id)
    const manufacturer = await manufacturerModuleService.updateManufacturers(input)
    return new StepResponse(manufacturer, previous)
  },
  async (previous: Record<string, unknown> | undefined, { container }) => {
    if (!previous) return
    const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)
    await manufacturerModuleService.updateManufacturers(previous)
  },
)

export const updateManufacturerWorkflow = createWorkflow(
  "update-manufacturer",
  (input: UpdateManufacturerInput) => {
    const manufacturer = updateManufacturerStep(input)
    return new WorkflowResponse(manufacturer)
  },
)
