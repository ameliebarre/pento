/**
 * Seeds the Arne Jacobsen pieces shown in the designer profile's "Design
 * worth living with" section: FH3605, AJ Lamp and Drop Chair are created;
 * the existing "egg-chair" product (already real catalog data) is only
 * enriched with its designer/movement/manufacturer/material links. Images
 * are intentionally left empty — Cloudinary URLs come later.
 *
 *   npx medusa exec ./src/scripts/seed-arne-jacobsen-products.ts
 */
import { createProductsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, MedusaError, ProductStatus } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import { MOVEMENT_MODULE } from "../modules/movement"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"
import type DesignerModuleService from "../modules/designer/service"
import type MovementModuleService from "../modules/movement/service"
import type ManufacturerModuleService from "../modules/manufacturer/service"
import { linkProductCatalogWorkflow } from "../workflows/link-product-catalog"

const CATEGORY_SLUGS = { tables: "tables", lighting: "lighting", chairs: "chairs", armchairs: "armchairs" }

const NEW_PRODUCTS = [
  {
    title: "FH3605",
    handle: "fh3605",
    description:
      "Designed by Arne Jacobsen in 1946 for Fritz Hansen, the FH3605 desk pairs a veneered oak top with slender tapering steel legs, embodying the elegant restraint of early Danish Modern furniture. Its understated silhouette and meticulous proportions make it as at home in a study as in a professional office.",
    categorySlug: CATEGORY_SLUGS.tables,
    sku: "FRH-FH3-001",
    price: 2699,
    materialSlugs: ["chene-massif", "metal-laque"],
  },
  {
    title: "AJ Lamp",
    handle: "aj-lamp",
    description:
      "Created in 1957 for the SAS Royal Hotel in Copenhagen, the AJ Lamp pairs a slender tapering stem with an angled conical shade, designed by Arne Jacobsen for Louis Poulsen. Its sculptural, almost architectural silhouette made it an instant icon of Scandinavian lighting design, as striking on a desk as it is as a floor lamp.",
    categorySlug: CATEGORY_SLUGS.lighting,
    sku: "LPO-AJL-001",
    price: 1220,
    materialSlugs: ["metal-laque"],
  },
  {
    title: "Drop Chair",
    handle: "drop-chair",
    description:
      "Originally designed in 1958 for the guest rooms of Copenhagen's SAS Royal Hotel, the Drop Chair distils Arne Jacobsen's sculptural language into a compact, single-shell seat. Its soft, enveloping curves and slender swivel base make it a space-conscious companion to the Egg and Swan chairs.",
    categorySlug: CATEGORY_SLUGS.chairs,
    sku: "FRH-DRP-001",
    price: 349,
    materialSlugs: ["laine-bouclee"],
  },
]

const MANUFACTURER_SLUGS = { fritzHansen: "fritz-hansen", louisPoulsen: "louis-poulsen" }

export default async function seedArneJacobsenProducts({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
  const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
  const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)

  const [designer] = await designerModuleService.listDesigners({ slug: "arne-jacobsen" })
  if (!designer) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the arne-jacobsen designer to exist")
  }

  const [movement] = await movementModuleService.listMovements({ slug: "danish-modern" })
  if (!movement) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the danish-modern movement to exist")
  }

  const [fritzHansen] = await manufacturerModuleService.listManufacturers({ slug: MANUFACTURER_SLUGS.fritzHansen })
  if (!fritzHansen) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the fritz-hansen manufacturer to exist")
  }

  let [louisPoulsen] = await manufacturerModuleService.listManufacturers({ slug: MANUFACTURER_SLUGS.louisPoulsen })
  if (!louisPoulsen) {
    louisPoulsen = await manufacturerModuleService.createManufacturers({
      slug: MANUFACTURER_SLUGS.louisPoulsen,
      name: "Louis Poulsen",
      country_name: "Denmark",
    })
    console.log("Created manufacturer louis-poulsen")
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

  const manufacturerBySlug: Record<string, { id: string }> = {
    [MANUFACTURER_SLUGS.fritzHansen]: fritzHansen,
    [MANUFACTURER_SLUGS.louisPoulsen]: louisPoulsen,
  }

  const productsToCreate = NEW_PRODUCTS.filter((product) => !existingHandles.has(product.handle))

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
          options: [{ title: "Default", values: ["Default"] }],
          variants: [
            {
              title: "Default",
              sku: product.sku,
              options: { Default: "Default" },
              prices: [{ amount: product.price, currency_code: "eur" }],
            },
          ],
        })) as never,
      },
    })
    console.log(`Created ${productsToCreate.length} product(s): ${productsToCreate.map((p) => p.handle).join(", ")}`)
  }

  const { data: allMaterials } = await query.graph({ entity: "material", fields: ["id", "slug"] })
  const materialIdBySlug = new Map(allMaterials.map((material) => [material.slug, material.id]))

  const { data: freshProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "designers.id"],
    filters: { handle: [...NEW_PRODUCTS.map((p) => p.handle), "egg-chair"] },
  })
  const freshProductByHandle = new Map(freshProducts.map((product) => [product.handle, product]))

  const linkTargets = [
    ...NEW_PRODUCTS.map((product) => ({
      handle: product.handle,
      manufacturerSlug:
        product.categorySlug === CATEGORY_SLUGS.lighting
          ? MANUFACTURER_SLUGS.louisPoulsen
          : MANUFACTURER_SLUGS.fritzHansen,
      materialSlugs: product.materialSlugs,
      // Only egg-chair already has its own movement (Organic Design); the
      // others are brand new, so they take Danish Modern.
      movementId: movement.id,
    })),
    {
      handle: "egg-chair",
      manufacturerSlug: MANUFACTURER_SLUGS.fritzHansen,
      materialSlugs: ["cuir-pleine-fleur"],
      movementId: undefined,
    },
  ]

  for (const target of linkTargets) {
    const product = freshProductByHandle.get(target.handle)
    if (!product) {
      console.warn(`Skipping catalog links for ${target.handle}: product not found`)
      continue
    }
    if (product.designers?.some((d) => d?.id === designer.id)) {
      console.log(`Skipping ${target.handle}: already linked to ${designer.slug}`)
      continue
    }

    const manufacturer = manufacturerBySlug[target.manufacturerSlug]
    const materialIds = target.materialSlugs
      .map((slug) => materialIdBySlug.get(slug))
      .filter((id): id is string => Boolean(id))

    await linkProductCatalogWorkflow(container).run({
      input: {
        product_id: product.id,
        designer_ids: [designer.id],
        movement_id: target.movementId,
        material_ids: materialIds,
        manufacturer_id: manufacturer?.id,
      },
    })
    console.log(`Linked catalog data for ${target.handle}`)
  }

  // `metadata.lifestyle_image_url` (the listing's default/hover shot) is set
  // per-product once a real Cloudinary URL exists — not seeded here. A `null`
  // placeholder would satisfy the type, but Medusa's admin metadata editor
  // treats `null` as non-primitive (`typeof null === "object"`) and disables
  // the row, so the key is only ever written together with a real string.
}
