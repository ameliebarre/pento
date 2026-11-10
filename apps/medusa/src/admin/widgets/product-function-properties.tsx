import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { DetailWidgetProps, AdminProduct } from "@medusajs/types"
import { Button, Container, Heading, toast } from "@medusajs/ui"
import { sdk } from "../lib/sdk"
import { RichTextEditor } from "../components/rich-text-editor"

const ProductFunctionPropertiesWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const queryClient = useQueryClient()
  const initial = typeof data.metadata?.function_properties === "string" ? data.metadata.function_properties : ""
  const [value, setValue] = useState(initial)

  const mutation = useMutation({
    mutationFn: () =>
      sdk.admin.product.update(data.id, {
        metadata: { ...data.metadata, function_properties: value },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", data.id] })
      toast.success("Function & Properties updated")
    },
    onError: () => toast.error("Failed to update"),
  })

  return (
    <Container className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <Heading level="h2">Function & Properties</Heading>
        <Button size="small" disabled={value === initial || mutation.isPending} onClick={() => mutation.mutate()}>
          Save
        </Button>
      </div>
      <RichTextEditor value={value} onChange={setValue} />
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.after",
})

export default ProductFunctionPropertiesWidget
