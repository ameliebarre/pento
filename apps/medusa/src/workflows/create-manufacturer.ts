import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"
import type ManufacturerModuleService from "../modules/manufacturer/service"

type CreateManufacturerInput = Record<string, unknown>

const createManufacturerStep = createStep(
  "create-manufacturer",
  async (input: CreateManufacturerInput, { container }) => {
    const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)
    const manufacturer = await manufacturerModuleService.createManufacturers(input)
    return new StepResponse(manufacturer, manufacturer.id)
  },
  async (manufacturerId: string | undefined, { container }) => {
    if (!manufacturerId) return
    const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)
    await manufacturerModuleService.deleteManufacturers([manufacturerId])
  },
)

export const createManufacturerWorkflow = createWorkflow(
  "create-manufacturer",
  (input: CreateManufacturerInput) => {
    const manufacturer = createManufacturerStep(input)
    return new WorkflowResponse(manufacturer)
  },
)
