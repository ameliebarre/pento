import { createStep, createWorkflow, StepResponse, WorkflowResponse, when } from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { deleteProductsWorkflow } from "@medusajs/medusa/core-flows"
import { DESIGNER_MODULE } from "../modules/designer"
import type DesignerModuleService from "../modules/designer/service"

type DeleteDesignerInput = { id: string }

// Deleting a designer cascades to every product linked to them, even if a
// product also has other designers (e.g. a co-designed piece) — matching
// how this catalogue treats a designer's page as the source of truth for
// which products exist.
const getDesignerProductIdsStep = createStep(
  "get-designer-product-ids",
  async (input: DeleteDesignerInput, { container }) => {
    const query = container.resolve(ContainerRegistrationKeys.QUERY)
    const { data } = await query.graph({
      entity: "designer",
      fields: ["id", "products.id"],
      filters: { id: input.id },
    })
    const productIds = (data[0]?.products ?? [])
      .map((p) => p?.id)
      .filter((id): id is string => Boolean(id))
    return new StepResponse(productIds)
  },
)

const deleteDesignerStep = createStep("delete-designer", async (input: DeleteDesignerInput, { container }) => {
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
  await designerModuleService.deleteDesigners([input.id])
  return new StepResponse({ id: input.id })
})

export const deleteDesignerWorkflow = createWorkflow(
  "delete-designer",
  (input: DeleteDesignerInput) => {
    const productIds = getDesignerProductIdsStep(input)

    when(productIds, (ids) => ids.length > 0).then(() => {
      deleteProductsWorkflow.runAsStep({ input: { ids: productIds } })
    })

    const result = deleteDesignerStep(input)
    return new WorkflowResponse(result)
  },
)
