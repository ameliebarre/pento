import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { updateMaterialWorkflow } from "../../../../workflows/update-material"
import { deleteMaterialWorkflow } from "../../../../workflows/delete-material"

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const { result: material } = await updateMaterialWorkflow(req.scope).run({
    input: { ...(req.body as Record<string, unknown>), id: req.params.id },
  })
  res.json({ material })
}

export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  await deleteMaterialWorkflow(req.scope).run({ input: { id: req.params.id } })
  res.json({ id: req.params.id, object: "material", deleted: true })
}
