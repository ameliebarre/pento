import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { DESIGNER_MODULE } from "../modules/designer"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"

type UnlinkProductCatalogInput = {
  product_id: string
  designer_ids?: string[]
  manufacturer_id?: string
}

function buildLinks(input: UnlinkProductCatalogInput) {
  const links: Record<string, Record<string, string>>[] = []

  for (const designerId of input.designer_ids ?? []) {
    links.push({
      [DESIGNER_MODULE]: { designer_id: designerId },
      [Modules.PRODUCT]: { product_id: input.product_id },
    })
  }

  if (input.manufacturer_id) {
    links.push({
      [MANUFACTURER_MODULE]: { manufacturer_id: input.manufacturer_id },
      [Modules.PRODUCT]: { product_id: input.product_id },
    })
  }

  return links
}

const unlinkProductCatalogStep = createStep(
  "unlink-product-catalog",
  async (input: UnlinkProductCatalogInput, { container }) => {
    const link = container.resolve(ContainerRegistrationKeys.LINK)
    const links = buildLinks(input)

    if (links.length) {
      await link.dismiss(links)
    }

    return new StepResponse({ unlinked: links.length }, links)
  },
  async (links: Record<string, Record<string, string>>[] | undefined, { container }) => {
    if (!links?.length) return
    const link = container.resolve(ContainerRegistrationKeys.LINK)
    await link.create(links)
  },
)

export const unlinkProductCatalogWorkflow = createWorkflow(
  "unlink-product-catalog",
  (input: UnlinkProductCatalogInput) => {
    const result = unlinkProductCatalogStep(input)
    return new WorkflowResponse(result)
  },
)
