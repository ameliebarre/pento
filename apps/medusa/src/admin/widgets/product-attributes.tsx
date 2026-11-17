import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { DetailWidgetProps, AdminProduct } from "@medusajs/types"
import { Button, Container, Heading, Input, Label, toast } from "@medusajs/ui"
import { sdk } from "../lib/sdk"
import { RichTextEditor } from "../components/rich-text-editor"

function toText(value: unknown) {
  return typeof value === "string" ? value : ""
}

function toYearValue(value: unknown) {
  return value === null || value === undefined || value === "" ? "" : String(value)
}

function toYearOrNull(value: string) {
  const trimmed = value.trim()
  if (trimmed === "") return null
  const parsed = Number(trimmed)
  return Number.isNaN(parsed) ? null : parsed
}

const ProductAttributesWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const queryClient = useQueryClient()

  const initialMaterial = data.material ?? ""
  const initialGroup = toText(data.metadata?.upholstery_group)
  const initialName = toText(data.metadata?.upholstery_name)
  const initialYear = toYearValue(data.metadata?.year)

  const [material, setMaterial] = useState(initialMaterial)
  const [upholsteryGroup, setUpholsteryGroup] = useState(initialGroup)
  const [upholsteryName, setUpholsteryName] = useState(initialName)
  const [year, setYear] = useState(initialYear)

  const mutation = useMutation({
    mutationFn: () =>
      sdk.admin.product.update(data.id, {
        material,
        metadata: {
          ...data.metadata,
          upholstery_group: upholsteryGroup,
          upholstery_name: upholsteryName,
          year: toYearOrNull(year),
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", data.id] })
      toast.success("Attributes updated")
    },
    onError: () => toast.error("Failed to update attributes"),
  })

  const isDirty =
    material !== initialMaterial ||
    upholsteryGroup !== initialGroup ||
    upholsteryName !== initialName ||
    year !== initialYear

  return (
    <Container className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <Heading level="h2">Attributes</Heading>
        <Button size="small" disabled={!isDirty || mutation.isPending} onClick={() => mutation.mutate()}>
          Save
        </Button>
      </div>

      <div className="flex flex-col gap-y-1">
        <Label size="small">Materials</Label>
        <RichTextEditor value={material} onChange={setMaterial} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-y-1">
          <Label size="small" htmlFor="upholstery-group">
            Upholstery group
          </Label>
          <Input
            id="upholstery-group"
            value={upholsteryGroup}
            onChange={(e) => setUpholsteryGroup(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label size="small" htmlFor="upholstery-name">
            Upholstery name
          </Label>
          <Input
            id="upholstery-name"
            value={upholsteryName}
            onChange={(e) => setUpholsteryName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Label size="small" htmlFor="year">
            Year
          </Label>
          <Input id="year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
        </div>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductAttributesWidget
