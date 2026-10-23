import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError, Modules } from "@medusajs/framework/utils"

type RequestBody = {
  handle?: string
  imageUrls?: string[]
  replace?: boolean
  thumbnail?: string
  lifestyleImageUrl?: string
}

function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value.trim())
}

/**
 * Attaches already-hosted Cloudinary URLs to a product — no file upload, no
 * re-fetching the asset. Medusa just stores the URL string; the browser (or
 * Next.js' image optimizer on the storefront) fetches it directly from
 * Cloudinary at render time.
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as RequestBody
  const handle = body.handle?.trim()
  if (!handle) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "handle is required")
  }

  const imageUrls = (body.imageUrls ?? []).map((url) => url.trim()).filter(Boolean)
  const thumbnail = body.thumbnail?.trim()
  const lifestyleImageUrl = body.lifestyleImageUrl?.trim()

  for (const url of [...imageUrls, thumbnail, lifestyleImageUrl].filter(Boolean) as string[]) {
    if (!isHttpUrl(url)) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, `Not a valid URL: ${url}`)
    }
  }

  const productModuleService = req.scope.resolve(Modules.PRODUCT)

  const [product] = await productModuleService.listProducts(
    { handle },
    { relations: ["images"] },
  )
  if (!product) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, `No product found with handle "${handle}"`)
  }

  const update: Record<string, unknown> = {}

  if (imageUrls.length > 0) {
    const existingUrls = body.replace ? [] : (product.images ?? []).map((image) => image.url)
    const mergedUrls = [...existingUrls, ...imageUrls].filter(
      (url, index, all) => all.indexOf(url) === index,
    )
    update.images = mergedUrls.map((url) => ({ url }))
  }

  if (thumbnail) {
    update.thumbnail = thumbnail
  }

  if (lifestyleImageUrl) {
    update.metadata = { ...(product.metadata ?? {}), lifestyle_image_url: lifestyleImageUrl }
  }

  if (Object.keys(update).length === 0) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      "Nothing to update — provide imageUrls, thumbnail, and/or lifestyleImageUrl",
    )
  }

  const updated = await productModuleService.updateProducts(product.id, update)

  res.status(200).json({
    product: {
      id: updated.id,
      handle: updated.handle,
      title: updated.title,
      imageCount: (updated.images ?? []).length,
      thumbnail: updated.thumbnail,
    },
  })
}
