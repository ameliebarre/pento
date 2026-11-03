/**
 * Seeds two Achille & Pier Giacomo Castiglioni pieces — the Snoopy table
 * lamp for Flos and the Mezzadro stool for Zanotta — with their real
 * production variants, dimensions and prices. Creates the Lighting-adjacent
 * "Lamp" and "Stool" product types and the missing "Stools" category, and
 * links both products to their two designers, manufacturer, the existing
 * italian-design movement and the relevant catalogue materials. Images are
 * intentionally left empty — they are added separately.
 *
 *   npx medusa exec ./src/scripts/seed-castiglioni-products.ts
 */
import { createProductsWorkflow, createProductTypesWorkflow, createProductTagsWorkflow, createProductCategoriesWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, MedusaError, ProductStatus } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"
import { DESIGNER_MODULE } from "../modules/designer"
import { MOVEMENT_MODULE } from "../modules/movement"
import { MANUFACTURER_MODULE } from "../modules/manufacturer"
import { MATERIAL_MODULE } from "../modules/material"
import type DesignerModuleService from "../modules/designer/service"
import type MovementModuleService from "../modules/movement/service"
import type ManufacturerModuleService from "../modules/manufacturer/service"
import type MaterialModuleService from "../modules/material/service"
import { linkProductCatalogWorkflow } from "../workflows/link-product-catalog"

const DESIGNER_SLUGS = ["achille-castiglioni", "pier-giacomo-castiglioni"]
const MOVEMENT_SLUG = "italian-design"

const CATEGORIES_TO_ENSURE = [{ handle: "stools", name: "Stools", is_active: true }]
const PRODUCT_TYPE_VALUES = ["Lamp", "Stool"]
const NEW_PRODUCT_TAG_VALUES = ["Italian Design"] // "iconic" already exists

// New material; the others this script needs (lacquered metal, solid beech) already exist.
const NEW_MATERIAL_NAMES_BY_SLUG: Record<string, string> = { "chromed-steel": "Chrome-Plated Steel" }
const EXISTING_MATERIAL_SLUGS = ["metal-laque", "solid-beech"]
const MATERIAL_SLUGS_TO_ENSURE = [...Object.keys(NEW_MATERIAL_NAMES_BY_SLUG), ...EXISTING_MATERIAL_SLUGS]

const SNOOPY_VARIANTS = ["Green", "Black", "Orange", "Blue"].map((color, i) => ({
  title: color,
  sku: `FLS-SNP-00${i + 1}`,
  finish: color,
  price: 1250,
}))

const MEZZADRO_VARIANTS = [{ title: "Default", sku: "ZNT-MZD-001", finish: "Default", price: 966 }]

const PRODUCTS = [
  {
    title: "Snoopy Table Lamp",
    handle: "snoopy-table-lamp",
    description:
      "Designed by Achille and Pier Giacomo Castiglioni for Flos in 1967, Snoopy pairs a tilted, enamelled metal reflector with a solid white Carrara marble base that houses the light source. Three cooling holes puncture the reflector's crown, recalling the finger-holes of a bowling ball, while the asymmetric marble base keeps the tilted shape stable and directs light down onto the table below.\n\nThe lamp's rounded, top-heavy silhouette and the cartoon character that inspired its name are typical of the Castiglioni brothers' way of folding humour into rigorously functional design. Snoopy has stayed in continuous production at Flos since its 1967 debut and is held in the permanent collection of MoMA, among other design museums.",
    categorySlug: "lighting",
    typeValue: "Lamp",
    tagValues: ["iconic", "Italian Design"],
    materialSlugs: ["metal-laque"],
    productMaterial: "Metal",
    originCountry: "IT",
    dimensions: { length: 394, height: 369, weight: 7.8 },
    metadata: { cable_color: "black" },
    optionTitle: "Color",
    variants: SNOOPY_VARIANTS,
    manufacturerSlug: "flos",
  },
  {
    title: "Mezzadro",
    handle: "mezzadro",
    description:
      "Designed in 1957 by Achille and Pier Giacomo Castiglioni and produced by Zanotta since 1970, the Mezzadro stool transforms a tractor seat into a distinctive piece of furniture. Its perforated, lacquered metal seat rests on a curved strip of chrome-plated steel, while a natural beech crosspiece balances the structure.\n\nThis interplay of industrial components, colour and wood gives Mezzadro its instantly recognisable silhouette. Both functional and sculptural, it reflects the Castiglioni brothers' love of reimagining everyday objects with ingenuity and humour.",
    categorySlug: "stools",
    typeValue: "Stool",
    tagValues: ["iconic", "Italian Design"],
    materialSlugs: ["metal-laque", "chromed-steel", "solid-beech"],
    productMaterial: "Lacquered Steel, Chrome-Plated Steel & Beech",
    originCountry: "IT",
    dimensions: { width: 49, length: 51, height: 51, weight: 8.9 },
    metadata: null,
    optionTitle: "Finish",
    variants: MEZZADRO_VARIANTS,
    manufacturerSlug: "zanotta",
  },
]

export default async function seedCastiglioniProducts({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
  const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
  const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)
  const materialModuleService: MaterialModuleService = container.resolve(MATERIAL_MODULE)

  const designers = await designerModuleService.listDesigners({ slug: DESIGNER_SLUGS })
  if (designers.length !== DESIGNER_SLUGS.length) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected both castiglioni designers to exist")
  }
  const designerIds = designers.map((d) => d.id)

  const [movement] = await movementModuleService.listMovements({ slug: MOVEMENT_SLUG })
  if (!movement) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, `Expected the ${MOVEMENT_SLUG} movement to exist`)
  }

  const manufacturerSlugs = [...new Set(PRODUCTS.map((p) => p.manufacturerSlug))]
  const manufacturers = await manufacturerModuleService.listManufacturers({ slug: manufacturerSlugs })
  const manufacturerBySlug = new Map(manufacturers.map((m) => [m.slug, m]))
  for (const slug of manufacturerSlugs) {
    if (!manufacturerBySlug.has(slug)) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Expected the ${slug} manufacturer to exist`)
    }
  }

  const materialBySlug = new Map<string, { id: string }>()
  for (const slug of MATERIAL_SLUGS_TO_ENSURE) {
    let [material] = await materialModuleService.listMaterials({ slug })
    if (!material) {
      const name = NEW_MATERIAL_NAMES_BY_SLUG[slug]
      if (!name) {
        throw new MedusaError(MedusaError.Types.NOT_FOUND, `Expected the ${slug} material to already exist`)
      }
      material = await materialModuleService.createMaterials({ slug, name })
      console.log(`Created material ${slug}`)
    }
    materialBySlug.set(slug, material)
  }

  const { data: existingCategories } = await query.graph({ entity: "product_category", fields: ["id", "handle"] })
  const existingCategoryHandles = new Set(existingCategories.map((c) => c.handle))
  const categoriesToCreate = CATEGORIES_TO_ENSURE.filter((c) => !existingCategoryHandles.has(c.handle))
  if (categoriesToCreate.length > 0) {
    await createProductCategoriesWorkflow(container).run({ input: { product_categories: categoriesToCreate } })
    console.log(`Created categor(y/ies): ${categoriesToCreate.map((c) => c.handle).join(", ")}`)
  }
  const { data: allCategories } = await query.graph({ entity: "product_category", fields: ["id", "handle"] })
  const categoryIdByHandle = new Map(allCategories.map((c) => [c.handle, c.id]))

  const { data: existingTypes } = await query.graph({ entity: "product_type", fields: ["id", "value"] })
  const existingTypeValues = new Set(existingTypes.map((t) => t.value))
  const typesToCreate = PRODUCT_TYPE_VALUES.filter((v) => !existingTypeValues.has(v))
  if (typesToCreate.length > 0) {
    await createProductTypesWorkflow(container).run({ input: { product_types: typesToCreate.map((value) => ({ value })) } })
    console.log(`Created product type(s): ${typesToCreate.join(", ")}`)
  }
  const { data: allTypes } = await query.graph({ entity: "product_type", fields: ["id", "value"] })
  const typeIdByValue = new Map(allTypes.map((t) => [t.value, t.id]))

  const { data: existingTags } = await query.graph({ entity: "product_tag", fields: ["id", "value"] })
  const existingTagValues = new Set(existingTags.map((t) => t.value))
  const tagsToCreate = NEW_PRODUCT_TAG_VALUES.filter((v) => !existingTagValues.has(v))
  if (tagsToCreate.length > 0) {
    await createProductTagsWorkflow(container).run({ input: { product_tags: tagsToCreate.map((value) => ({ value })) } })
    console.log(`Created product tag(s): ${tagsToCreate.join(", ")}`)
  }
  const { data: allTags } = await query.graph({ entity: "product_tag", fields: ["id", "value"] })
  const tagIdByValue = new Map(allTags.map((t) => [t.value, t.id]))

  const { data: shippingProfiles } = await query.graph({ entity: "shipping_profile", fields: ["id"] })
  const { data: salesChannels } = await query.graph({ entity: "sales_channel", fields: ["id"] })
  const shippingProfile = shippingProfiles[0]
  const salesChannel = salesChannels[0]
  if (!shippingProfile || !salesChannel) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "No shipping profile or sales channel found")
  }

  const { data: existingProducts } = await query.graph({ entity: "product", fields: ["id", "handle"] })
  const existingHandles = new Set(existingProducts.map((p) => p.handle))
  const productsToCreate = PRODUCTS.filter((p) => !existingHandles.has(p.handle))

  if (productsToCreate.length > 0) {
    await createProductsWorkflow(container).run({
      input: {
        products: productsToCreate.map((product) => ({
          title: product.title,
          handle: product.handle,
          description: product.description,
          status: ProductStatus.PUBLISHED,
          shipping_profile_id: shippingProfile.id,
          category_ids: [categoryIdByHandle.get(product.categorySlug)].filter((id): id is string => Boolean(id)),
          type_id: typeIdByValue.get(product.typeValue) ?? null,
          tags: product.tagValues
            .map((value) => tagIdByValue.get(value))
            .filter((id): id is string => Boolean(id))
            .map((id) => ({ id })),
          sales_channels: [{ id: salesChannel.id }],
          material: product.productMaterial,
          origin_country: product.originCountry,
          weight: product.dimensions.weight ?? null,
          height: product.dimensions.height ?? null,
          width: "width" in product.dimensions ? product.dimensions.width : null,
          length: "length" in product.dimensions ? product.dimensions.length : null,
          metadata: product.metadata ?? undefined,
          options: [{ title: product.optionTitle, values: product.variants.map((v) => v.finish) }],
          variants: product.variants.map((variant) => ({
            title: variant.title,
            sku: variant.sku,
            options: { [product.optionTitle]: variant.finish },
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
    filters: { handle: PRODUCTS.map((p) => p.handle) },
  })
  const freshProductByHandle = new Map(freshProducts.map((p) => [p.handle, p]))

  for (const target of PRODUCTS) {
    const product = freshProductByHandle.get(target.handle)
    if (!product) {
      console.warn(`Skipping catalog links for ${target.handle}: product not found`)
      continue
    }
    if (designerIds.every((id) => product.designers?.some((d) => d?.id === id))) {
      console.log(`Skipping ${target.handle}: already linked to its designers`)
      continue
    }

    const materialIds = target.materialSlugs
      .map((slug) => materialBySlug.get(slug)?.id)
      .filter((id): id is string => Boolean(id))
    const manufacturer = manufacturerBySlug.get(target.manufacturerSlug)

    await linkProductCatalogWorkflow(container).run({
      input: {
        product_id: product.id,
        designer_ids: designerIds,
        movement_id: movement.id,
        material_ids: materialIds,
        manufacturer_id: manufacturer?.id,
      },
    })
    console.log(`Linked catalog data for ${target.handle}`)
  }
}
