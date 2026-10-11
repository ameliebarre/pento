import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateMovementWorkflow } from "../../../../workflows/update-movement"
import { deleteMovementWorkflow } from "../../../../workflows/delete-movement"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: movement } = await updateMovementWorkflow(req.scope).run({
    input: { ...(req.body as Record<string, unknown>), id: req.params.id },
  })
  res.json({ movement })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  await deleteMovementWorkflow(req.scope).run({ input: { id: req.params.id } })
  res.json({ id: req.params.id, object: "movement", deleted: true })
}
