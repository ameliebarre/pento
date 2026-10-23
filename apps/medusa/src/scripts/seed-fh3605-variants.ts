/**
 * Replaces FH3605's single "Default" variant with real Finish × Drawer
 * variants, each carrying its own swap photo (via the native
 * variant <-> image relation added in Medusa 2.11), and sets the product's
 * fixed gallery plus its listing thumbnail/lifestyle images.
 *
 *   npx medusa exec ./src/scripts/seed-fh3605-variants.ts
 */
import { createAndLinkProductOptionsToProductWorkflow, createProductVariantsWorkflow } from "@medusajs/medusa/core-flows"
import { ContainerRegistrationKeys, MedusaError, Modules } from "@medusajs/framework/utils"
import type { ExecArgs } from "@medusajs/framework/types"

const GALLERY_IMAGE_URLS = [
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792354465/pento/products/fh3605/fh3605-1.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792354467/pento/products/fh3605/fh3605-2.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792354609/pento/products/fh3605/fh3605-3.webp",
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792354610/pento/products/fh3605/fh3605-4.webp",
]

const LISTING_DEFAULT_IMAGE_URL = GALLERY_IMAGE_URLS[0]
const LISTING_HOVER_IMAGE_URL =
  "https://res.cloudinary.com/dasujyncc/image/upload/v1792354614/pento/products/fh3605/fh3605-walnut-drawer.webp"

const VARIANTS = [
  {
    title: "Walnut / Without drawer",
    sku: "FRH-FH3-001",
    options: { Finish: "Walnut", Drawer: "Without drawer" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792354615/pento/products/fh3605/fh3606-walnut.webp",
  },
  {
    title: "Walnut / With drawer",
    sku: "FRH-FH3-002",
    options: { Finish: "Walnut", Drawer: "With drawer" },
    imageUrl: LISTING_HOVER_IMAGE_URL,
  },
  {
    title: "Black / Without drawer",
    sku: "FRH-FH3-003",
    options: { Finish: "Black", Drawer: "Without drawer" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792354613/pento/products/fh3605/fh3605-black.webp",
  },
  {
    title: "Black / With drawer",
    sku: "FRH-FH3-004",
    options: { Finish: "Black", Drawer: "With drawer" },
    imageUrl: "https://res.cloudinary.com/dasujyncc/image/upload/v1792354612/pento/products/fh3605/fh3605-black-drawer.webp",
  },
]

const PRICE_EUR = 2699

export default async function seedFh3605Variants({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const productModuleService = container.resolve(Modules.PRODUCT)

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "options.id", "options.title", "variants.id", "variants.title", "images.id", "images.url"],
    filters: { handle: "fh3605" },
  })
  const product = products[0]
  if (!product) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "Expected the fh3605 product to exist")
  }

  const alreadyDone = product.options?.some((option) => option?.title === "Finish")
  if (alreadyDone) {
    console.log("fh3605 already has Finish/Drawer options. Nothing to do.")
    return
  }

  // ---- Images: set the full set (gallery + variant swap photos) ----------

  const allImageUrls = [...GALLERY_IMAGE_URLS, ...VARIANTS.map((v) => v.imageUrl)]
  if ((product.images ?? []).length !== allImageUrls.length) {
    await productModuleService.updateProducts(product.id, {
      images: allImageUrls.map((url) => ({ url })),
    })
    console.log(`Set ${allImageUrls.length} images on fh3605`)
  } else {
    console.log("Images already set on fh3605")
  }

  const { data: refreshedProducts } = await query.graph({
    entity: "product",
    fields: ["id", "images.id", "images.url"],
    filters: { handle: "fh3605" },
  })
  const imageIdByUrl = new Map((refreshedProducts[0].images ?? []).map((image) => [image?.url, image?.id]))

  // ---- Options: Finish and Drawer, created and linked to the product in ---
  // ---- the same step (a plain createProductOptions call does not link). --

  await createAndLinkProductOptionsToProductWorkflow(container).run({
    input: {
      product_id: product.id,
      add: [
        { title: "Finish", values: ["Walnut", "Black"], is_exclusive: true },
        { title: "Drawer", values: ["Without drawer", "With drawer"], is_exclusive: true },
      ],
    } as never,
  })
  console.log("Created and linked Finish and Drawer options on fh3605")

  // ---- Variants: the 4 Finish x Drawer combinations -----------------------

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
  console.log(`Created ${createdVariants.length} variant(s) on fh3605`)

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
