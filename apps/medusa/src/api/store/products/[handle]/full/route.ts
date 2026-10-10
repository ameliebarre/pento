import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { PRODUCT_FULL_FIELDS } from "../../product-full-fields"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: products } = await query.graph({
    entity: "product",
    fields: PRODUCT_FULL_FIELDS,
    filters: { handle: req.params.handle, status: "published" },
  })

  const product = products[0]

  if (!product) {
    res.status(404).json({ message: "Product not found" })
    return
  }

  res.json({ product })
}
