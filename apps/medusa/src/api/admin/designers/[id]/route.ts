import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateDesignerWorkflow } from "../../../../workflows/update-designer"
import { deleteDesignerWorkflow } from "../../../../workflows/delete-designer"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: designer } = await updateDesignerWorkflow(req.scope).run({
    input: { ...(req.body as Record<string, unknown>), id: req.params.id },
  })
  res.json({ designer })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  await deleteDesignerWorkflow(req.scope).run({ input: { id: req.params.id } })
  res.json({ id: req.params.id, object: "designer", deleted: true })
}
