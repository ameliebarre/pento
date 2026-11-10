import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { DetailWidgetProps, AdminProduct } from "@medusajs/types"
import { Button, Container, Heading, Input, Label, toast } from "@medusajs/ui"
import { sdk } from "../lib/sdk"

type DimensionsForm = {
  width: string
  height: string
  length: string
  depth: string
  weight: string
}

function toFormValue(value: unknown) {
  return value === null || value === undefined || value === "" ? "" : String(value)
}

function toNumberOrNull(value: string) {
  const trimmed = value.trim()
  if (trimmed === "") return null
  const parsed = Number(trimmed)
  return Number.isNaN(parsed) ? null : parsed
}

function buildForm(data: AdminProduct): DimensionsForm {
  return {
    width: toFormValue(data.width),
    height: toFormValue(data.height),
    length: toFormValue(data.length),
    depth: toFormValue(data.metadata?.depth),
    weight: toFormValue(data.weight),
  }
}

const FIELDS: { key: keyof DimensionsForm; label: string }[] = [
  { key: "width", label: "Width (cm)" },
  { key: "height", label: "Height (cm)" },
  { key: "length", label: "Length (cm)" },
  { key: "depth", label: "Depth (cm)" },
  { key: "weight", label: "Weight (kg)" },
]

const ProductDimensionsWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const queryClient = useQueryClient()
  const initial = buildForm(data)
  const [form, setForm] = useState<DimensionsForm>(initial)

  const mutation = useMutation({
    mutationFn: () =>
      sdk.admin.product.update(data.id, {
        width: toNumberOrNull(form.width),
        height: toNumberOrNull(form.height),
        length: toNumberOrNull(form.length),
        weight: toNumberOrNull(form.weight),
        metadata: { ...data.metadata, depth: toNumberOrNull(form.depth) },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", data.id] })
      toast.success("Dimensions updated")
    },
    onError: () => toast.error("Failed to update dimensions"),
  })

  const isDirty = JSON.stringify(form) !== JSON.stringify(initial)

  return (
    <Container className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Heading level="h2">Dimensions</Heading>
        <Button size="small" disabled={!isDirty || mutation.isPending} onClick={() => mutation.mutate()}>
          Save
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {FIELDS.map(({ key, label }) => (
          <div key={key} className="flex flex-col gap-y-1">
            <Label size="small" htmlFor={`dimension-${key}`}>
              {label}
            </Label>
            <Input
              id={`dimension-${key}`}
              type="number"
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
            />
          </div>
        ))}
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.after",
})

export default ProductDimensionsWidget
