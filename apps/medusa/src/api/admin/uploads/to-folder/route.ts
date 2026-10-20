import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { MedusaError } from "@medusajs/framework/utils"
import { uploadFilesWorkflow } from "@medusajs/medusa/core-flows"

/**
 * Same as the stock `/admin/uploads`, except it accepts an optional `folder`
 * field and nests the upload under it — the stock admin Media uploader has
 * no folder picker, and the upload workflow only sees `{filename, mimeType,
 * content, access}`, so the folder is encoded as a path prefix on `filename`
 * (a plain string here, not a filesystem path, so "/" is safe).
 */
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const files = req.files as Express.Multer.File[] | undefined
  if (!files?.length) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "No files were uploaded")
  }

  const rawFolder = typeof (req.body as Record<string, unknown>)?.folder === "string"
    ? ((req.body as Record<string, string>).folder as string)
    : ""
  const folder = rawFolder
    .trim()
    .replace(/\\/g, "/")
    .replace(/\.\./g, "")
    .replace(/^\/+|\/+$/g, "")

  const { result } = await uploadFilesWorkflow(req.scope).run({
    input: {
      files: files.map((file) => ({
        filename: folder ? `${folder}/${file.originalname}` : file.originalname,
        mimeType: file.mimetype,
        content: file.buffer.toString("base64"),
        access: "public",
      })),
    },
  })

  res.status(200).json({ files: result })
}
