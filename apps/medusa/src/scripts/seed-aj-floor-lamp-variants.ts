/**
 * Replaces AJ Floor Lamp's single "Default" variant with real Color
 * variants, each carrying its own swap photo (via the native variant <->
 * image relation added in Medusa 2.11), and sets the product's fixed
 * gallery plus its listing thumbnail/lifestyle images.
 *
 *   npx medusa exec ./src/scripts/seed-aj-floor-lamp-variants.ts
 */
import { createAndLinkProductOptionsToProductWorkflow, createProductVariantsWorkflow, deleteProductVariantsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, MedusaError, Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

const GALLERY_IMAGE_URLS = [
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792417869/pento/products/aj-floor-lamp/aj-floor-lamp-1.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792415621/pento/products/aj-floor-lamp/aj-floor-lamp-2.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792415623/pento/products/aj-floor-lamp/aj-floor-lamp-3.jpg",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792415626/pento/products/aj-floor-lamp/aj-floor-lamp-4.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792415665/pento/products/aj-floor-lamp/aj-floor-lamp-5.webp",
]

const LISTING_DEFAULT_IMAGE_URL = GALLERY_IMAGE_URLS[0]
const LISTING_HOVER_IMAGE_URL =
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792417841/pento/products/aj-floor-lamp/aj-floor-lamp-black.webp"

const VARIANTS = [
  { title: "Black", sku: "LPO-AJL-001", options: { Color: "Black" }, imageUrl: LISTING_HOVER_IMAGE_URL },
  {
    title: "Brass Black",
    sku: "LPO-AJL-002",
    options: { Color: "Brass Black" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792417843/pento/products/aj-floor-lamp/aj-floor-lamp-brass-black.webp",
  },
  {
    title: "Brass Warm Grey",
    sku: "LPO-AJL-003",
    options: { Color: "Brass Warm Grey" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792417846/pento/products/aj-floor-lamp/aj-floor-lamp-brass-warm-grey.webp",
  },
  {
    title: "Dusty Blue",
    sku: "LPO-AJL-004",
    options: { Color: "Dusty Blue" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792417848/pento/products/aj-floor-lamp/aj-floor-lamp-dusty-blue.webp",
  },
  {
    title: "Dusty Grey",
    sku: "LPO-AJL-005",
    options: { Color: "Dusty Grey" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792417851/pento/products/aj-floor-lamp/aj-floor-lamp-dusty-grey.webp",
  },
  {
    title: "Electric Orange",
    sku: "LPO-AJL-006",
    options: { Color: "Electric Orange" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792417853/pento/products/aj-floor-lamp/aj-floor-lamp-electric-orange.webp",
  },
  {
    title: "Pale Petroleum",
    sku: "LPO-AJL-007",
    options: { Color: "Pale Petroleum" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792417856/pento/products/aj-floor-lamp/aj-floor-lamp-pale-petroleum.webp",
  },
  {
    title: "Stainless Steel Polished",
    sku: "LPO-AJL-008",
    options: { Color: "Stainless Steel Polished" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792417861/pento/products/aj-floor-lamp/aj-floor-lamp-stainless-steel-polished.webp",
  },
  {
    title: "Warm Sand",
    sku: "LPO-AJL-009",
    options: { Color: "Warm Sand" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792417863/pento/products/aj-floor-lamp/aj-floor-lamp-warm-sand.webp",
  },
  {
    title: "White",
    sku: "LPO-AJL-010",
    options: { Color: "White" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792417866/pento/products/aj-floor-lamp/aj-floor-lamp-white.webp",
  },
]

const PRICE_EUR = 1220

export default async function seedAjFloorLampVariants({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productModuleService = container.resolve(Modules.PRODUCT)

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "options.id", "options.title", "variants.id", "variants.title", "images.id", "images.url"],
    filters: { handle: "aj-floor-lamp" },
  })
  const product = products[0]
  if (!product) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the aj-floor-lamp product to exist")
  }

  const alreadyDone = product.options?.some((option) => option?.title === "Color")
  if (alreadyDone) {
    console.log("aj-floor-lamp already has a Color option. Nothing to do.")
    return
  }

  // ---- Images: set the full gallery + variant swap photos -----------------

  const allImageUrls = [...GALLERY_IMAGE_URLS, ...VARIANTS.map((v) => v.imageUrl)]
  await productModuleService.updateProducts(product.id, {
    images: allImageUrls.map((url) => ({ url })),
  })
  console.log(`Set ${allImageUrls.length} images on aj-floor-lamp`)

  const { data: refreshedProducts } = await query.graph({
    entity: "product",
    fields: ["id", "images.id", "images.url"],
    filters: { handle: "aj-floor-lamp" },
  })
  const imageIdByUrl = new Map((refreshedProducts[0].images ?? []).map((image) => [image?.url, image?.id]))

  // ---- Clean up the old "Default" variant/option first, so the product ----
  // ---- has exactly the new option when the new variants are created -------

  const oldVariantIds = (product.variants ?? []).filter((v) => v?.title === "Default").map((v) => v!.id)
  if (oldVariantIds.length > 0) {
    await deleteProductVariantsWorkflow(container).run({ input: { ids: oldVariantIds } })
  }

  const oldOptionIds = (product.options ?? []).filter((o) => o?.title === "Default").map((o) => o!.id)
  if (oldOptionIds.length > 0) {
    await productModuleService.deleteProductOptions(oldOptionIds)
  }
  console.log("Removed the old Default option/variant")

  // ---- Option: Color, created and linked to the product in the same step -
  // ---- (a plain createProductOptions call does not link it to a product). -

  await createAndLinkProductOptionsToProductWorkflow(container).run({
    input: {
      product_id: product.id,
      add: [{ title: "Color", values: VARIANTS.map((v) => v.options.Color), is_exclusive: true }],
    } as never,
  })
  console.log("Created and linked the Color option on aj-floor-lamp")

  // ---- Variants: the 10 colors ---------------------------------------------

  const { result: createdVariants } = await createProductVariantsWorkflow(container).run({
    input: {
      product_variants: VARIANTS.map((variant) => ({
        product_id: product.id,
        title: variant.title,
        sku: variant.sku,
        options: variant.options,
        prices: [{ amount: PRICE_EUR, currency_code: "eur" }],
      })),
    },
  })
  console.log(`Created ${createdVariants.length} variant(s) on aj-floor-lamp`)

  for (const variant of VARIANTS) {
    const created = createdVariants.find((v) => v.sku === variant.sku)
    const imageId = imageIdByUrl.get(variant.imageUrl)
    if (!created || !imageId) {
      console.warn(`Skipping image association for ${variant.sku}: variant or image not found`)
      continue
    }
    await productModuleService.addImageToVariant([{ image_id: imageId, variant_id: created.id }])
  }
  console.log("Associated each variant with its swap photo")

  // ---- Listing images: thumbnail (hover) + lifestyle (default) ------------

  await productModuleService.updateProducts(product.id, {
    thumbnail: LISTING_HOVER_IMAGE_URL,
    metadata: { lifestyle_image_url: LISTING_DEFAULT_IMAGE_URL },
  })
  console.log("Set thumbnail and lifestyle_image_url for the listing card")
}
