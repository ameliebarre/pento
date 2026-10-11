import { createStep, createWorkflow, StepResponse, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { DESIGNER_MODULE } from "../modules/designer"
import { MOVEMENT_MODULE } from "../modules/movement"
import { MATERIAL_MODULE } from "../modules/material"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"

type LinkProductCatalogInput = {
  product_id: string
  designer_ids?: string[]
  movement_id?: string
  material_ids?: string[]
  manufacturer_id?: string
}

function buildLinks(input: LinkProductCatalogInput) {
  const links: Record<string, Record<string, string>>[] = []

  for (const designerId of input.designer_ids ?? []) {
    links.push({
      [DESIGNER_MODULE]: { designer_id: designerId },
      [Modules.PRODUCT]: { product_id: input.product_id },
    })
  }

  if (input.movement_id) {
    links.push({
      [MOVEMENT_MODULE]: { movement_id: input.movement_id },
      [Modules.PRODUCT]: { product_id: input.product_id },
    })
  }

  for (const materialId of input.material_ids ?? []) {
    links.push({
      [MATERIAL_MODULE]: { material_id: materialId },
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

const linkProductCatalogStep = createStep(
  "link-product-catalog",
  async (input: LinkProductCatalogInput, { container }) => {
    const link = container.resolve(ContainerRegistrationKeys.LINK)
    const links = buildLinks(input)

    if (links.length) {
      await link.create(links)
    }

    return new StepResponse({ linked: links.length }, links)
  },
  async (links: Record<string, Record<string, string>>[] | undefined, { container }) => {
    if (!links?.length) return
    const link = container.resolve(ContainerRegistrationKeys.LINK)
    await link.dismiss(links)
  },
)

export const linkProductCatalogWorkflow = createWorkflow(
  "link-product-catalog",
  (input: LinkProductCatalogInput) => {
    const result = linkProductCatalogStep(input)
    return new WorkflowResponse(result)
  },
)
