/**
 * Seeds two Alvar Aalto pieces for Artek — Chair 69 and the Armchair 400
 * "Tank" — each with their real production finishes as variants, and links
 * both to the alvar-aalto designer and the artek manufacturer. Images are
 * intentionally left empty — Cloudinary URLs come later.
 *
 *   npx medusa exec ./src/scripts/seed-alvar-aalto-products.ts
 */
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, MedusaError, ProductStatus } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"
import { MATERIAL_MODULE } from "../modules/material"
import type DesignerModuleService from "../modules/designer/service"
import type ManufacturerModuleService from "../modules/manufacturer/service"
import type MaterialModuleService from "../modules/material/service"
import { linkProductCatalogWorkflow } from "../workflows/link-product-catalog"

const CATEGORY_SLUGS = { chairs: "chairs", armchairs: "armchairs" }

// Materials this script depends on: created if missing, reused as-is otherwise.
const MATERIAL_NAMES_BY_SLUG: Record<string, string> = {
  "bouleau-contreplaque": "Bouleau contreplaqué",
  "laine-bouclee": "Laine bouclée",
}

const CHAIR_69_VARIANTS = [
  { title: "Natural Birch Veneer", sku: "ART-C69-001", finish: "Natural Birch Veneer", price: 690 },
  { title: "Black Lacquer", sku: "ART-C69-002", finish: "Black Lacquer", price: 760 },
  { title: "White Lacquer", sku: "ART-C69-003", finish: "White Lacquer", price: 760 },
  { title: "Yellow Lacquer", sku: "ART-C69-004", finish: "Yellow Lacquer", price: 760 },
  { title: "Petrol Lacquer", sku: "ART-C69-005", finish: "Petrol Lacquer", price: 760 },
]

const TANK_VARIANTS = [
  { title: "Natural Birch / White Wool", sku: "ART-TNK-001", finish: "Natural Birch / White Wool", price: 6800 },
  {
    title: "Natural Birch / Black-White Check",
    sku: "ART-TNK-002",
    finish: "Natural Birch / Black-White Check",
    price: 6900,
  },
  {
    title: "Black Lacquered Birch / Black Wool",
    sku: "ART-TNK-003",
    finish: "Black Lacquered Birch / Black Wool",
    price: 7100,
  },
  {
    title: "Walnut-Stained Birch / Dark Green Wool",
    sku: "ART-TNK-004",
    finish: "Walnut-Stained Birch / Dark Green Wool",
    price: 7400,
  },
]

const PRODUCTS = [
  {
    title: "Chair 69",
    handle: "chair-69",
    description:
      "Designed by Alvar Aalto in 1935, Chair 69 distils the L-leg construction he patented a few years earlier into its simplest possible form: a single sheet of bent birch plywood for the seat and backrest, set on four slender, stackable birch legs. Light enough to stack by the dozen yet sturdy enough for daily use in schools, cafés and homes alike, it has remained in continuous production at Artek ever since — one of the clearest and most enduring expressions of Finnish functionalism.",
    categorySlug: CATEGORY_SLUGS.chairs,
    variants: CHAIR_69_VARIANTS,
    materialSlugs: ["bouleau-contreplaque"],
  },
  {
    title: 'Armchair 400 "Tank"',
    handle: "armchair-400-tank",
    description:
      "Designed in 1935–36 and nicknamed the \"Tank\" for its low, armoured silhouette, the Armchair 400 pushes Alvar Aalto's bent-plywood technique into its most sculptural lounge form: a continuous, cantilevered birch frame cradling a webbed or upholstered seat with no visible joints. Developed in the same years as the Paimio Chair that made Aalto's reputation, it remains one of Artek's most labour-intensive pieces, still bent, steamed and finished by hand in Finland.",
    categorySlug: CATEGORY_SLUGS.armchairs,
    variants: TANK_VARIANTS,
    materialSlugs: ["bouleau-contreplaque", "laine-bouclee"],
  },
]

export default async function seedAlvarAaltoProducts({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
  const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)
  const materialModuleService: MaterialModuleService = container.resolve(MATERIAL_MODULE)

  const [designer] = await designerModuleService.listDesigners({ slug: "alvar-aalto" })
  if (!designer) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the alvar-aalto designer to exist")
  }

  const [artek] = await manufacturerModuleService.listManufacturers({ slug: "artek" })
  if (!artek) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the artek manufacturer to exist")
  }

  const materialBySlug = new Map<string, { id: string }>()
  for (const [slug, name] of Object.entries(MATERIAL_NAMES_BY_SLUG)) {
    let [material] = await materialModuleService.listMaterials({ slug })
    if (!material) {
      material = await materialModuleService.createMaterials({ slug, name })
      console.log(`Created material ${slug}`)
    }
    materialBySlug.set(slug, material)
  }

  const { data: shippingProfiles } = await query.graph({ entity: "shipping_profile", fields: ["id"] })
  const { data: salesChannels } = await query.graph({ entity: "sales_channel", fields: ["id"] })
  const shippingProfile = shippingProfiles[0]
  const salesChannel = salesChannels[0]
  if (!shippingProfile || !salesChannel) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "No shipping profile or sales channel found")
  }

  const { data: categories } = await query.graph({
    entity: "product_category",
    fields: ["id", "handle"],
  })
  const categoryIdBySlug = new Map(categories.map((category) => [category.handle, category.id]))

  const { data: existingProducts } = await query.graph({ entity: "product", fields: ["id", "handle"] })
  const existingHandles = new Set(existingProducts.map((product) => product.handle))

  const productsToCreate = PRODUCTS.filter((product) => !existingHandles.has(product.handle))

  if (productsToCreate.length > 0) {
    await createProductsWorkflow(container).run({
      input: {
        products: productsToCreate.map((product) => ({
          title: product.title,
          handle: product.handle,
          description: product.description,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: [categoryIdBySlug.get(product.categorySlug)].filter((id): id is string => Boolean(id)),
          sales_channels: [{ id: salesChannel.id }],
          options: [{ title: "Finish", values: product.variants.map((variant) => variant.finish) }],
          variants: product.variants.map((variant) => ({
            title: variant.title,
            sku: variant.sku,
            options: { Finish: variant.finish },
            prices: [{ amount: variant.price, currency_code: "eur" }],
          })),
        })) as never,
      },
    })
    console.log(`Created ${productsToCreate.length} product(s): ${productsToCreate.map((p) => p.handle).join(", ")}`)
  }

  const { data: freshProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "designers.id"],
    filters: { handle: PRODUCTS.map((product) => product.handle) },
  })
  const freshProductByHandle = new Map(freshProducts.map((product) => [product.handle, product]))

  for (const target of PRODUCTS) {
    const product = freshProductByHandle.get(target.handle)
    if (!product) {
      console.warn(`Skipping catalog links for ${target.handle}: product not found`)
      continue
    }
    if (product.designers?.some((d) => d?.id === designer.id)) {
      console.log(`Skipping ${target.handle}: already linked to ${designer.slug}`)
      continue
    }

    const materialIds = target.materialSlugs
      .map((slug) => materialBySlug.get(slug)?.id)
      .filter((id): id is string => Boolean(id))

    await linkProductCatalogWorkflow(container).run({
      input: {
        product_id: product.id,
        designer_ids: [designer.id],
        manufacturer_id: artek.id,
        material_ids: materialIds,
      },
    })
    console.log(`Linked catalog data for ${target.handle}`)
  }
}
