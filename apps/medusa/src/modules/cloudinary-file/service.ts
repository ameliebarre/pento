import path from "node:path"
import { AbstractFileProviderService, MedusaError } from "@medusajs/framework/utils"
import { v2 as cloudinary } from "cloudinary"
import type { FileTypes } from "@medusajs/framework/types"

type Options = {
  cloud_name: string
  api_key: string
  api_secret: string
  folder?: string
}

/**
 * Cloudinary's `destroy` call needs the same `resource_type` the asset was
 * uploaded with, so it's encoded into the key returned from `upload`
 * (`<resource_type>:<public_id>`) rather than guessed again at delete time.
 */
function toResourceType(mimeType: string): "image" | "video" | "raw" {
  if (mimeType.startsWith("image/")) return "image"
  if (mimeType.startsWith("video/")) return "video"
  return "raw"
}

function parseFileKey(fileKey: string) {
  const [resourceType, ...rest] = fileKey.split(":")
  return { resourceType: resourceType as "image" | "video" | "raw", publicId: rest.join(":") }
}

class CloudinaryFileService extends AbstractFileProviderService {
  static identifier = "cloudinary"

  protected options_: Options

  static validateOptions(options: Record<string, unknown>) {
    for (const key of ["cloud_name", "api_key", "api_secret"]) {
      if (!options[key]) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `${key} is required in the cloudinary file provider's options`,
        )
      }
    }
  }

  constructor(_: unknown, options: Options) {
    super()
    this.options_ = options
    cloudinary.config({
      cloud_name: options.cloud_name,
      api_key: options.api_key,
      api_secret: options.api_secret,
      secure: true,
    })
  }

  async upload(file: FileTypes.ProviderUploadFileDTO): Promise<FileTypes.ProviderFileResultDTO> {
    if (!file) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "No file provided")
    }
    if (!file.filename) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "No filename provided")
    }

    const resourceType = toResourceType(file.mimeType)
    const dataUri = `data:${file.mimeType};base64,${file.content}`

    // `file.filename` may carry a directory prefix (e.g. "products/drop-chair/foo.png")
    // when the caller lets the admin choose a subfolder — see `/admin/uploads/to-folder`.
    // It's always a plain string here, never a real filesystem path.
    const subfolder = path.posix.dirname(file.filename)
    const folder = subfolder !== "." ? [this.options_.folder, subfolder].filter(Boolean).join("/") : this.options_.folder

    // `use_filename`/`unique_filename` only work when Cloudinary can read the
    // original name off the upload source itself (a real file path or URL) —
    // there's no such metadata on a base64 data URI, so without an explicit
    // `public_id` it silently falls back to a random one. Re-uploading the
    // same name replaces the asset in place (`overwrite` + `invalidate`)
    // rather than erroring or minting a second random-named copy.
    const { name: publicId } = path.posix.parse(path.posix.basename(file.filename))

    const result = await cloudinary.uploader.upload(dataUri, {
      folder,
      public_id: publicId,
      resource_type: resourceType,
      overwrite: true,
      invalidate: true,
    })

    return {
      url: result.secure_url,
      key: `${resourceType}:${result.public_id}`,
    }
  }

  async delete(
    files: FileTypes.ProviderDeleteFileDTO | FileTypes.ProviderDeleteFileDTO[],
  ): Promise<void> {
    const fileArray = Array.isArray(files) ? files : [files]

    await Promise.all(
      fileArray.map(({ fileKey }) => {
        const { resourceType, publicId } = parseFileKey(fileKey)
        return cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
      }),
    )
  }
}

export default CloudinaryFileService
