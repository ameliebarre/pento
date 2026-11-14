import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { DetailWidgetProps, AdminProduct } from "@medusajs/types"
import { Button, Container, Heading, Input, Label, toast } from "@medusajs/ui"
import { sdk } from "../lib/sdk"

type FunctionPropertyRow = {
  property: string
  value: string
}

function toRows(value: unknown): FunctionPropertyRow[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((row): row is Record<string, unknown> => typeof row === "object" && row !== null)
    .map((row) => ({
      property: typeof row.property === "string" ? row.property : "",
      value: typeof row.value === "string" ? row.value : "",
    }))
}

const ProductFunctionPropertiesWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const queryClient = useQueryClient()
  const initial = toRows(data.metadata?.function_properties)
  const [rows, setRows] = useState<FunctionPropertyRow[]>(initial)

  const mutation = useMutation({
    mutationFn: () =>
      sdk.admin.product.update(data.id, {
        metadata: {
          ...data.metadata,
          function_properties: rows.filter((row) => row.property.trim() !== "" || row.value.trim() !== ""),
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", data.id] })
      toast.success("Function & Properties updated")
    },
    onError: () => toast.error("Failed to update"),
  })

  const isDirty = JSON.stringify(rows) !== JSON.stringify(initial)

  const updateRow = (index: number, key: keyof FunctionPropertyRow, newValue: string) => {
    setRows((prev) => prev.map((row, i) => (i === index ? { ...row, [key]: newValue } : row)))
  }

  const removeRow = (index: number) => {
    setRows((prev) => prev.filter((_, i) => i !== index))
  }

  const addRow = () => {
    setRows((prev) => [...prev, { property: "", value: "" }])
  }

  return (
    <Container className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Heading level="h2">Function & Properties</Heading>
        <Button size="small" disabled={!isDirty || mutation.isPending} onClick={() => mutation.mutate()}>
          Save
        </Button>
      </div>

      <div className="flex flex-col gap-y-2">
        {rows.map((row, index) => (
          <div key={index} className="flex items-end gap-x-2">
            <div className="flex flex-1 flex-col gap-y-1">
              <Label size="small" htmlFor={`function-property-${index}`}>
                Property
              </Label>
              <Input
                id={`function-property-${index}`}
                value={row.property}
                onChange={(e) => updateRow(index, "property", e.target.value)}
              />
            </div>
            <div className="flex flex-1 flex-col gap-y-1">
              <Label size="small" htmlFor={`function-value-${index}`}>
                Value
              </Label>
              <Input
                id={`function-value-${index}`}
                value={row.value}
                onChange={(e) => updateRow(index, "value", e.target.value)}
              />
            </div>
            <Button type="button" size="small" variant="transparent" onClick={() => removeRow(index)}>
              Remove
            </Button>
          </div>
        ))}
      </div>

      <Button type="button" size="small" variant="secondary" onClick={addRow} className="w-fit">
        Add row
      </Button>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductFunctionPropertiesWidget
