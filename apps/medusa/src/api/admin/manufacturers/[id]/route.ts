import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateManufacturerWorkflow } from "../../../../workflows/update-manufacturer"
import { deleteManufacturerWorkflow } from "../../../../workflows/delete-manufacturer"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: manufacturer } = await updateManufacturerWorkflow(req.scope).run({
    input: { ...(req.body as Record<string, unknown>), id: req.params.id },
  })
  res.json({ manufacturer })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  await deleteManufacturerWorkflow(req.scope).run({ input: { id: req.params.id } })
  res.json({ id: req.params.id, object: "manufacturer", deleted: true })
}
