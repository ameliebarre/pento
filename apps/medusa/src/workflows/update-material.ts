import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { MATERIAL_MODULE } from "../modules/material"
import type MaterialModuleService from "../modules/material/service"

type UpdateMaterialInput = Record<string, unknown> & { id: string }

const updateMaterialStep = createStep(
  "update-material",
  async (input: UpdateMaterialInput, { container }) => {
    const materialModuleService: MaterialModuleService = container.resolve(MATERIAL_MODULE)
    const previous = await materialModuleService.retrieveMaterial(input.id)
    const material = await materialModuleService.updateMaterials(input)
    return new StepResponse(material, previous)
  },
  async (previous: Record<string, unknown> | undefined, { container }) => {
    if (!previous) return
    const materialModuleService: MaterialModuleService = container.resolve(MATERIAL_MODULE)
    await materialModuleService.updateMaterials(previous)
  },
)

export const updateMaterialWorkflow = createWorkflow(
  "update-material",
  (input: UpdateMaterialInput) => {
    const material = updateMaterialStep(input)
    return new WorkflowResponse(material)
  },
)
