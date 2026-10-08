import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

type UpdateDesignerInput = Record<string, unknown> & { id: string }

const updateDesignerStep = createStep(
  "update-designer",
  async (input: UpdateDesignerInput, { container }) => {
    const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
    const previous = await designerModuleService.retrieveDesigner(input.id)
    const designer = await designerModuleService.updateDesigners(input)
    return new StepResponse(designer, previous)
  },
  async (previous: Record<string, unknown> | undefined, { container }) => {
    if (!previous) return
    const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
    await designerModuleService.updateDesigners(previous)
  },
)

export const updateDesignerWorkflow = createWorkflow(
  "update-designer",
  (input: UpdateDesignerInput) => {
    const designer = updateDesignerStep(input)
    return new WorkflowResponse(designer)
  },
)
