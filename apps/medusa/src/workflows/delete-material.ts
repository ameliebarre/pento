import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { MATERIAL_MODULE } from "../modules/material"
import type MaterialModuleService from "../modules/material/service"

type DeleteMaterialInput = { id: string }

const deleteMaterialStep = createStep("delete-material", async (input: DeleteMaterialInput, { container }) => {
  const materialModuleService: MaterialModuleService = container.resolve(MATERIAL_MODULE)
  await materialModuleService.deleteMaterials([input.id])
  return new StepResponse({ id: input.id })
})

export const deleteMaterialWorkflow = createWorkflow(
  "delete-material",
  (input: DeleteMaterialInput) => {
    const result = deleteMaterialStep(input)
    return new WorkflowResponse(result)
  },
)
