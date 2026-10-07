import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { linkProductCatalogWorkflow } from "../../../../../workflows/link-product-catalog"

type Body = {
  designer_ids?: string[]
  movement_id?: string
  material_ids?: string[]
  manufacturer_id?: string
}

export async function POST(req: MedusaRequest<Body>, res: MedusaResponse) {
  const { result } = await linkProductCatalogWorkflow(req.scope).run({
    input: { product_id: req.params.id, ...req.body },
  })
  res.status(201).json(result)
}
