import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { MATERIAL_MODULE } from "../modules/material"
import type MaterialModuleService from "../modules/material/service"

type CreateMaterialInput = Record<string, unknown>

const createMaterialStep = createStep(
  "create-material",
  async (input: CreateMaterialInput, { container }) => {
    const materialModuleService: MaterialModuleService = container.resolve(MATERIAL_MODULE)
    const material = await materialModuleService.createMaterials(input)
    return new StepResponse(material, material.id)
  },
  async (materialId: string | undefined, { container }) => {
    if (!materialId) return
    const materialModuleService: MaterialModuleService = container.resolve(MATERIAL_MODULE)
    await materialModuleService.deleteMaterials([materialId])
  },
)

export const createMaterialWorkflow = createWorkflow(
  "create-material",
  (input: CreateMaterialInput) => {
    const material = createMaterialStep(input)
    return new WorkflowResponse(material)
  },
)
