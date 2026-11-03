/**
 * Creates the Storage and Desks categories that were missing from the
 * catalogue, then retroactively assigns them to the products that had been
 * left uncategorised for lack of a fitting category: Componibili and
 * Bookworm (Storage), and Indiscret (Desks).
 *
 *   npx medusa exec ./src/scripts/seed-storage-desks-categories.ts
 */
import { createProductCategoriesWorkflow, updateProductsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

const CATEGORIES = [
  { handle: "storage", name: "Storage", is_active: true },
  { handle: "desks", name: "Desks", is_active: true },
]

const ASSIGNMENTS = [
  { productHandle: "componibili", categoryHandle: "storage" },
  { productHandle: "bookworm", categoryHandle: "storage" },
  { productHandle: "indiscret", categoryHandle: "desks" },
]

export default async function seedStorageAndDesksCategories({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: existingCategories } = await query.graph({ entity: "product_category", fields: ["id", "handle"] })
  const existingHandles = new Set(existingCategories.map((category) => category.handle))

  const categoriesToCreate = CATEGORIES.filter((category) => !existingHandles.has(category.handle))
  if (categoriesToCreate.length > 0) {
    await createProductCategoriesWorkflow(container).run({
      input: { product_categories: categoriesToCreate },
    })
    console.log(`Created categor(y/ies): ${categoriesToCreate.map((c) => c.handle).join(", ")}`)
  }

  const { data: allCategories } = await query.graph({ entity: "product_category", fields: ["id", "handle"] })
  const categoryIdByHandle = new Map(allCategories.map((category) => [category.handle, category.id]))

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "categories.id"],
    filters: { handle: ASSIGNMENTS.map((a) => a.productHandle) },
  })
  const productByHandle = new Map(products.map((product) => [product.handle, product]))

  for (const assignment of ASSIGNMENTS) {
    const product = productByHandle.get(assignment.productHandle)
    const categoryId = categoryIdByHandle.get(assignment.categoryHandle)
    if (!product || !categoryId) {
      console.warn(`Skipping ${assignment.productHandle}: product or category not found`)
      continue
    }
    if (product.categories?.some((c) => c?.id === categoryId)) {
      console.log(`Skipping ${assignment.productHandle}: already in ${assignment.categoryHandle}`)
      continue
    }

    await updateProductsWorkflow(container).run({
      input: {
        products: [
          {
            id: product.id,
            category_ids: [...(product.categories ?? []).map((c) => c!.id), categoryId],
          },
        ],
      },
    })
    console.log(`Assigned ${assignment.productHandle} to ${assignment.categoryHandle}`)
  }
}
