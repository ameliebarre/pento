import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

type CreateDesignerInput = Record<string, unknown>

const createDesignerStep = createStep(
  "create-designer",
  async (input: CreateDesignerInput, { container }) => {
    const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
    const designer = await designerModuleService.createDesigners(input)
    return new StepResponse(designer, designer.id)
  },
  async (designerId: string | undefined, { container }) => {
    if (!designerId) return
    const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
    await designerModuleService.deleteDesigners([designerId])
  },
)

export const createDesignerWorkflow = createWorkflow(
  "create-designer",
  (input: CreateDesignerInput) => {
    const designer = createDesignerStep(input)
    return new WorkflowResponse(designer)
  },
)
