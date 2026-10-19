/**
 * Replaces Egg Chair's single "Default" variant with real Color variants,
 * each carrying its own swap photo (via the native variant <-> image
 * relation added in Medusa 2.11), and sets the product's fixed gallery plus
 * its listing thumbnail/lifestyle images. Also replaces the broken local
 * (localhost:9000/static/...) images uploaded through the admin's Media
 * "Upload" button with the real Cloudinary URLs.
 *
 *   npx medusa exec ./src/scripts/seed-egg-chair-variants.ts
 */
import { createAndLinkProductOptionsToProductWorkflow, createProductVariantsWorkflow, deleteProductVariantsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, MedusaError, Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

const GALLERY_IMAGE_URLS = [
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792414149/pento/products/egg-chair/egg-chair-1.png",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792414153/pento/products/egg-chair/egg-chair-2.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792414234/pento/products/egg-chair/egg-chair-3.jpg",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792414155/pento/products/egg-chair/egg-chair-4.jpg",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792414160/pento/products/egg-chair/egg-chair-5.jpg",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792414162/pento/products/egg-chair/egg-chair-6.jpg",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792414164/pento/products/egg-chair/egg-chair-7.jpg",
]

const LISTING_DEFAULT_IMAGE_URL = GALLERY_IMAGE_URLS[0]
const LISTING_HOVER_IMAGE_URL =
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792414168/pento/products/egg-chair/egg-chair-brown.webp"

const VARIANTS = [
  {
    title: "Black",
    sku: "FRH-EGG-001",
    options: { Color: "Black" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792414166/pento/products/egg-chair/egg-chair-black.webp",
  },
  {
    title: "Brown",
    sku: "FRH-EGG-002",
    options: { Color: "Brown" },
    imageUrl: LISTING_HOVER_IMAGE_URL,
  },
  {
    title: "Dark Blue",
    sku: "FRH-EGG-003",
    options: { Color: "Dark Blue" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792414170/pento/products/egg-chair/egg-chair-dark-blue.jpg",
  },
  {
    title: "Dark Brown",
    sku: "FRH-EGG-004",
    options: { Color: "Dark Brown" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792414172/pento/products/egg-chair/egg-chair-dark-brown.webp",
  },
  {
    title: "Dark Grey",
    sku: "FRH-EGG-005",
    options: { Color: "Dark Grey" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792414175/pento/products/egg-chair/egg-chair-dark-grey.jpg",
  },
  {
    title: "Light Grey",
    sku: "FRH-EGG-006",
    options: { Color: "Light Grey" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792414177/pento/products/egg-chair/egg-chair-light-grey.jpg",
  },
]

const PRICE_EUR = 7490

export default async function seedEggChairVariants({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productModuleService = container.resolve(Modules.PRODUCT)

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "options.id", "options.title", "variants.id", "variants.title", "images.id", "images.url"],
    filters: { handle: "egg-chair" },
  })
  const product = products[0]
  if (!product) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the egg-chair product to exist")
  }

  const alreadyDone = product.options?.some((option) => option?.title === "Color")
  if (alreadyDone) {
    console.log("egg-chair already has a Color option. Nothing to do.")
    return
  }

  // ---- Images: replace the broken local set with the full Cloudinary set -

  const allImageUrls = [...GALLERY_IMAGE_URLS, ...VARIANTS.map((v) => v.imageUrl)]
  await productModuleService.updateProducts(product.id, {
    images: allImageUrls.map((url) => ({ url })),
  })
  console.log(`Set ${allImageUrls.length} images on egg-chair`)

  const { data: refreshedProducts } = await query.graph({
    entity: "product",
    fields: ["id", "images.id", "images.url"],
    filters: { handle: "egg-chair" },
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
      add: [
        {
          title: "Color",
          values: ["Black", "Brown", "Dark Blue", "Dark Brown", "Dark Grey", "Light Grey"],
          is_exclusive: true,
        },
      ],
    } as never,
  })
  console.log("Created and linked the Color option on egg-chair")

  // ---- Variants: the 6 colors -----------------------------------------

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
  console.log(`Created ${createdVariants.length} variant(s) on egg-chair`)

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
