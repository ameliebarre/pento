/**
 * Seeds four Kartell plastic-furniture icons — Louis Ghost, Componibili,
 * Masters and Bookworm — each with their real production variants (colour,
 * module count or length) and prices, and links them to their designer(s),
 * the kartell manufacturer, a movement and a material. Also fills in the
 * product-level Attributes (material, dimensions, country of origin) and
 * Organize fields (type, tags, category where one fits) that the admin UI
 * exposes. Images are intentionally left empty — they are added separately.
 *
 * Componibili and Bookworm have no fitting product category in this
 * catalogue (there is no storage/shelving category yet), so they are left
 * uncategorised rather than mis-filed under a seating category.
 *
 *   npx medusa exec ./src/scripts/seed-kartell-products.ts
 */
import { createProductsWorkflow, createProductTypesWorkflow, createProductTagsWorkflow } from "@medusajs/medusa/core-flows"
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

const CATEGORY_SLUGS = { chairs: "chairs" }

// Catalogue materials this script depends on: created if missing, reused as-is otherwise.
const MATERIAL_NAMES_BY_SLUG: Record<string, string> = {
  polycarbonate: "Polycarbonate",
  "abs-plastic": "ABS Plastic",
  polypropylene: "Polypropylene",
  "pvc-flexible": "Flexible PVC",
}

const PRODUCT_TYPE_VALUES = ["Chair", "Storage", "Shelving"]

// "Iconic" already exists (lower case) from earlier seeding; the rest are new.
const PRODUCT_TAG_VALUES = ["iconic", "Plastic Design", "Postmodern Design", "Modular", "Sculptural"]

const LOUIS_GHOST_VARIANTS = [
  { title: "Crystal", sku: "KTL-LGH-001", finish: "Crystal", price: 329 },
  { title: "Glossy Black", sku: "KTL-LGH-002", finish: "Glossy Black", price: 349 },
  { title: "Glossy White", sku: "KTL-LGH-003", finish: "Glossy White", price: 349 },
  { title: "Smoke Grey", sku: "KTL-LGH-004", finish: "Smoke Grey", price: 369 },
]

const COMPONIBILI_VARIANTS = [
  { title: "2 Modules – White", sku: "KTL-CMP-001", finish: "2 Modules – White", price: 229, height: 40, width: 32, length: 32 },
  { title: "2 Modules – Black", sku: "KTL-CMP-002", finish: "2 Modules – Black", price: 229, height: 40, width: 32, length: 32 },
  { title: "3 Modules – White", sku: "KTL-CMP-003", finish: "3 Modules – White", price: 289, height: 58.5, width: 32, length: 32 },
  { title: "3 Modules – Black", sku: "KTL-CMP-004", finish: "3 Modules – Black", price: 289, height: 58.5, width: 32, length: 32 },
  { title: "3 Modules – Red", sku: "KTL-CMP-005", finish: "3 Modules – Red", price: 299, height: 58.5, width: 32, length: 32 },
]

const MASTERS_VARIANTS = [
  { title: "Glossy Black", sku: "KTL-MST-001", finish: "Glossy Black", price: 229 },
  { title: "Glossy White", sku: "KTL-MST-002", finish: "Glossy White", price: 229 },
  { title: "Mustard", sku: "KTL-MST-003", finish: "Mustard", price: 239 },
  { title: "Sage Green", sku: "KTL-MST-004", finish: "Sage Green", price: 239 },
]

const BOOKWORM_VARIANTS = [
  { title: "3.2 m (7 bookends) – White", sku: "KTL-BKW-001", finish: "3.2 m (7 bookends) – White", price: 890, length: 320 },
  { title: "5.2 m (11 bookends) – Black", sku: "KTL-BKW-002", finish: "5.2 m (11 bookends) – Black", price: 1390, length: 520 },
  { title: "8.2 m (17 bookends) – Cobalt Blue", sku: "KTL-BKW-003", finish: "8.2 m (17 bookends) – Cobalt Blue", price: 1990, length: 820 },
]

const PRODUCTS = [
  {
    title: "Louis Ghost",
    handle: "louis-ghost",
    description:
      "Designed by Philippe Starck for Kartell in 2002, Louis Ghost reinterprets the silhouette of a Louis XVI armchair — oval back, carved frame and all — as a single, seamless piece of injection-moulded polycarbonate. Translating a carved-wood reference into liquid plastic turns a historical form into something weightless and modern, with every ornamental detail of the original frame preserved in a material that lets light pass straight through it.\n\nProduced in one continuous mould without joints or fasteners, it is strong enough for daily use and outdoor settings, stackable up to six high, and scratch- and weather-resistant. The combination of a classical silhouette with transparent plastic made it an instant best-seller, now found in homes, restaurants and museum collections worldwide as one of the defining chairs of postmodern design.",
    categorySlug: CATEGORY_SLUGS.chairs,
    typeValue: "Chair",
    tagValues: ["iconic", "Postmodern Design", "Plastic Design"],
    movementSlug: "postmodernism",
    materialSlug: "polycarbonate",
    productMaterial: "Polycarbonate",
    originCountry: "IT",
    dimensions: { height: 94, width: 54, length: 55, weight: 4.8 },
    optionTitle: "Finish",
    variants: LOUIS_GHOST_VARIANTS,
    designerSlugs: ["philippe-starck"],
  },
  {
    title: "Componibili",
    handle: "componibili",
    description:
      "Designed by Anna Castelli Ferrieri and launched by Kartell at the 1967 Salone del Mobile, Componibili was one of the first fully modular storage systems made entirely of plastic. Two or three cylindrical ABS modules, each fitted with a swivelling door, stack freely into a tower that can be reconfigured, split apart or extended as storage needs change — a clean break from the fixed cabinetry it was designed to replace.\n\nMore than fifty years on, Componibili remains in production largely unchanged, its rounded, injection-moulded forms as emblematic of Italian plastic design as any object of its era. Pieces are held in the permanent collections of MoMA and the Centre Pompidou, and it is still sold in the glossy, saturated colours Castelli Ferrieri chose to make plastic feel genuinely modern rather than a mere substitute for wood.",
    categorySlug: null,
    typeValue: "Storage",
    tagValues: ["Modular", "Plastic Design"],
    movementSlug: "pop-design",
    materialSlug: "abs-plastic",
    productMaterial: "ABS Plastic",
    originCountry: "IT",
    dimensions: null,
    optionTitle: "Version",
    variants: COMPONIBILI_VARIANTS,
    designerSlugs: ["anna-castelli-ferrieri"],
  },
  {
    title: "Masters",
    handle: "masters",
    description:
      "Designed by Philippe Starck with Eugeni Quitllet for Kartell in 2010, Masters distils three icons of twentieth-century seating — the splayed wire legs of the Eiffel chair, the pedestal base of Eero Saarinen's Tulip chair, and the pressed-steel shell of Arne Jacobsen's Series 7 — into a single dyed-polypropylene shell on a four-leg aluminium base. Rather than quoting one source, it layers all three into one silhouette, turning design history itself into the subject of the chair.\n\nLight enough to stack four high and resistant enough for outdoor use, Masters turns a conceptual, almost ironic gesture into an everyday object, produced in a wide range of saturated colours. It won the Good Design Award in 2010 and the Gold Dot Award in 2013, and remains one of Kartell's most widely recognised collaborations.",
    categorySlug: CATEGORY_SLUGS.chairs,
    typeValue: "Chair",
    tagValues: ["Postmodern Design", "Plastic Design"],
    movementSlug: "postmodernism",
    materialSlug: "polypropylene",
    productMaterial: "Polypropylene & Die-Cast Aluminium",
    originCountry: "IT",
    dimensions: { height: 83, width: 53.5, length: 55, weight: 4.3 },
    optionTitle: "Finish",
    variants: MASTERS_VARIANTS,
    designerSlugs: ["philippe-starck", "eugeni-quitllet"],
  },
  {
    title: "Bookworm",
    handle: "bookworm",
    description:
      "Originally conceived by Ron Arad in 1993 as a one-off steel shelf for his own London studio, Bookworm was re-engineered by Kartell the following year into a continuous ribbon of flexible, injection-moulded PVC that bends and curves against a wall into almost any shape the room allows. Fixed with a series of bookend supports, each able to carry roughly 10 kg, it dispenses with the shelf's basic unit — the flat horizontal plane — and treats storage instead as a single, sinuous line.\n\nOffered in three lengths and a rotating palette of glossy and matte finishes, Bookworm has stayed in Kartell's catalogue for three decades as one of the few shelving systems to be acquired by design museums, including MoMA and London's V&A, as a sculptural object in its own right rather than simply a storage solution.",
    categorySlug: null,
    typeValue: "Shelving",
    tagValues: ["Modular", "Sculptural"],
    movementSlug: "contemporary-design",
    materialSlug: "pvc-flexible",
    productMaterial: "Flexible PVC",
    originCountry: "IT",
    dimensions: null,
    optionTitle: "Length",
    variants: BOOKWORM_VARIANTS,
    designerSlugs: ["ron-arad"],
  },
]

export default async function seedKartellProducts({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const designerModuleService: DesignerModuleService = container.resolve(DESIGNER_MODULE)
  const movementModuleService: MovementModuleService = container.resolve(MOVEMENT_MODULE)
  const manufacturerModuleService: ManufacturerModuleService = container.resolve(MANUFACTURER_MODULE)
  const materialModuleService: MaterialModuleService = container.resolve(MATERIAL_MODULE)

  const designerSlugs = [...new Set(PRODUCTS.flatMap((product) => product.designerSlugs))]
  const designers = await designerModuleService.listDesigners({ slug: designerSlugs })
  const designerBySlug = new Map(designers.map((designer) => [designer.slug, designer]))
  for (const slug of designerSlugs) {
    if (!designerBySlug.has(slug)) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Expected the ${slug} designer to exist`)
    }
  }

  const [kartell] = await manufacturerModuleService.listManufacturers({ slug: "kartell" })
  if (!kartell) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the kartell manufacturer to exist")
  }

  const movementSlugs = [...new Set(PRODUCTS.map((product) => product.movementSlug))]
  const movements = await movementModuleService.listMovements({ slug: movementSlugs })
  const movementBySlug = new Map(movements.map((movement) => [movement.slug, movement]))
  for (const slug of movementSlugs) {
    if (!movementBySlug.has(slug)) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Expected the ${slug} movement to exist`)
    }
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

  const { data: existingTypes } = await query.graph({ entity: "product_type", fields: ["id", "value"] })
  const existingTypeValues = new Set(existingTypes.map((type) => type.value))
  const typesToCreate = PRODUCT_TYPE_VALUES.filter((value) => !existingTypeValues.has(value))
  if (typesToCreate.length > 0) {
    await createProductTypesWorkflow(container).run({
      input: { product_types: typesToCreate.map((value) => ({ value })) },
    })
    console.log(`Created product type(s): ${typesToCreate.join(", ")}`)
  }
  const { data: allTypes } = await query.graph({ entity: "product_type", fields: ["id", "value"] })
  const typeIdByValue = new Map(allTypes.map((type) => [type.value, type.id]))

  const { data: existingTags } = await query.graph({ entity: "product_tag", fields: ["id", "value"] })
  const existingTagValues = new Set(existingTags.map((tag) => tag.value))
  const tagsToCreate = PRODUCT_TAG_VALUES.filter((value) => !existingTagValues.has(value))
  if (tagsToCreate.length > 0) {
    await createProductTagsWorkflow(container).run({
      input: { product_tags: tagsToCreate.map((value) => ({ value })) },
    })
    console.log(`Created product tag(s): ${tagsToCreate.join(", ")}`)
  }
  const { data: allTags } = await query.graph({ entity: "product_tag", fields: ["id", "value"] })
  const tagIdByValue = new Map(allTags.map((tag) => [tag.value, tag.id]))

  const { data: shippingProfiles } = await query.graph({ entity: "shipping_profile", fields: ["id"] })
  const { data: salesChannels } = await query.graph({ entity: "sales_channel", fields: ["id"] })
  const shippingProfile = shippingProfiles[0]
  const salesChannel = salesChannels[0]
  if (!shippingProfile || !salesChannel) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "No shipping profile or sales channel found")
  }

  const { data: categories } = await query.graph({ entity: "product_category", fields: ["id", "handle"] })
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
          category_ids: product.categorySlug
            ? [categoryIdBySlug.get(product.categorySlug)].filter((id): id is string => Boolean(id))
            : [],
          type_id: typeIdByValue.get(product.typeValue) ?? null,
          tags: product.tagValues
            .map((value) => tagIdByValue.get(value))
            .filter((id): id is string => Boolean(id))
            .map((id) => ({ id })),
          sales_channels: [{ id: salesChannel.id }],
          material: product.productMaterial,
          origin_country: product.originCountry,
          weight: product.dimensions?.weight ?? null,
          height: product.dimensions?.height ?? null,
          width: product.dimensions?.width ?? null,
          length: product.dimensions?.length ?? null,
          options: [{ title: product.optionTitle, values: product.variants.map((variant) => variant.finish) }],
          variants: product.variants.map((variant) => ({
            title: variant.title,
            sku: variant.sku,
            options: { [product.optionTitle]: variant.finish },
            prices: [{ amount: variant.price, currency_code: "eur" }],
            height: "height" in variant ? variant.height : null,
            width: "width" in variant ? variant.width : null,
            length: "length" in variant ? variant.length : null,
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

    const targetDesignerIds = target.designerSlugs
      .map((slug) => designerBySlug.get(slug)?.id)
      .filter((id): id is string => Boolean(id))

    if (targetDesignerIds.every((id) => product.designers?.some((d) => d?.id === id))) {
      console.log(`Skipping ${target.handle}: already linked to its designer(s)`)
      continue
    }

    const material = materialBySlug.get(target.materialSlug)
    const movement = movementBySlug.get(target.movementSlug)

    await linkProductCatalogWorkflow(container).run({
      input: {
        product_id: product.id,
        designer_ids: targetDesignerIds,
        movement_id: movement?.id,
        material_ids: material ? [material.id] : [],
        manufacturer_id: kartell.id,
      },
    })
    console.log(`Linked catalog data for ${target.handle}`)
  }
}
