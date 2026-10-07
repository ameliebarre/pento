import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY)

  const { data: products } = await query.graph({
    entity: "product",
    fields: [
      "id",
      "title",
      "handle",
      "description",
      "status",
      "thumbnail",
      "images.*",
      "categories.*",
      "tags.*",
      "variants.*",
      "variants.prices.*",
      "designers.*",
      "movement.*",
      "materials.*",
      "manufacturer.*",
    ],
    filters: { id: req.params.id },
  })

  const product = products[0]

  if (!product) {
    res.status(404).json({ message: "Product not found" })
    return
  }

  res.json({ product })
}
