/**
 * Drop Chair's Color option and variants were already created by hand in the
 * admin (White/Brown/Beige/Pink, SKUs FRH-DRO-00x) — this script only fixes
 * the images: replaces the broken local (localhost:9000/static/...) set
 * uploaded through the admin's Media "Upload" button with the real
 * Cloudinary URLs, associates each variant with its swap photo (via the
 * native variant <-> image relation added in Medusa 2.11), and sets the
 * listing thumbnail/lifestyle images.
 *
 *   npx medusa exec ./src/scripts/seed-drop-chair-variants.ts
 */
import { MedusaError, Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

const GALLERY_IMAGE_URLS = [
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792411806/pento/products/drop-chair/drop-chair-1.jpg",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792412511/pento/products/drop-chair/drop-chair-2.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792412512/pento/products/drop-chair/drop-chair-3.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792412514/pento/products/drop-chair/drop-chair-4.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792412515/pento/products/drop-chair/drop-chair-5.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792412517/pento/products/drop-chair/drop-chair-6.webp",
]

const LISTING_DEFAULT_IMAGE_URL = GALLERY_IMAGE_URLS[0]
const LISTING_HOVER_IMAGE_URL =
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792412519/pento/products/drop-chair/drop-chair-beige.webp"

const VARIANT_IMAGE_BY_TITLE: Record<string, string> = {
  Beige: LISTING_HOVER_IMAGE_URL,
  Brown: "https://res.cloudinary.com/dasujyncc/image/upload/v1792412521/pento/products/drop-chair/drop-chair-brown.webp",
  Pink: "https://res.cloudinary.com/dasujyncc/image/upload/v1792412523/pento/products/drop-chair/drop-chair-pink.webp",
  White: "https://res.cloudinary.com/dasujyncc/image/upload/v1792412524/pento/products/drop-chair/drop-chair-white.webp",
}

export default async function seedDropChairVariants({ container }: ExecArgs) {
  const productModuleService = container.resolve(Modules.PRODUCT)

  const [product] = await productModuleService.listProducts(
    { handle: "drop-chair" },
    { relations: ["variants"] },
  )
  if (!product) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the drop-chair product to exist")
  }

  // ---- Images: replace the broken local set with the full Cloudinary set -

  const variantImageUrls = Object.values(VARIANT_IMAGE_BY_TITLE)
  const allImageUrls = [...GALLERY_IMAGE_URLS, ...variantImageUrls]
  await productModuleService.updateProducts(product.id, {
    images: allImageUrls.map((url) => ({ url })),
  })
  console.log(`Set ${allImageUrls.length} images on drop-chair`)

  const [refreshed] = await productModuleService.listProducts(
    { id: product.id },
    { relations: ["images"] },
  )
  const imageIdByUrl = new Map(refreshed.images.map((image) => [image.url, image.id]))

  // ---- Associate each existing color variant with its swap photo ---------

  for (const variant of product.variants ?? []) {
    const imageUrl = VARIANT_IMAGE_BY_TITLE[variant.title ?? ""]
    const imageId = imageUrl ? imageIdByUrl.get(imageUrl) : undefined
    if (!imageId) {
      console.warn(`Skipping image association for variant "${variant.title}": no matching image`)
      continue
    }
    await productModuleService.addImageToVariant([{ image_id: imageId, variant_id: variant.id }])
    console.log(`Associated "${variant.title}" with its swap photo`)
  }

  // ---- Listing images: thumbnail (hover) + lifestyle (default) ------------

  await productModuleService.updateProducts(product.id, {
    thumbnail: LISTING_HOVER_IMAGE_URL,
    metadata: { lifestyle_image_url: LISTING_DEFAULT_IMAGE_URL },
  })
  console.log("Set thumbnail and lifestyle_image_url for the listing card")
}
