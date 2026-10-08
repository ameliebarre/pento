import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

type DeleteDesignerInput = { id: string }

const deleteDesignerStep = createStep("delete-designer", async (input: DeleteDesignerInput, { container }) => {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
  await designerModuleService.deleteDesigners([input.id])
  return new StepResponse({ id: input.id })
})

export const deleteDesignerWorkflow = createWorkflow(
  "delete-designer",
  (input: DeleteDesignerInput) => {
    const result = deleteDesignerStep(input)
    return new WorkflowResponse(result)
  },
)
