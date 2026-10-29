import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { DetailWidgetProps, AdminProduct } from "@medusajs/types"
import { Checkbox, Container, Heading, Label, Text, toast } from "@medusajs/ui"
import { sdk } from "../lib/sdk"

const ProductFeaturedWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const queryClient = useQueryClient()
  const [isFeatured, setIsFeatured] = useState(data.metadata?.isFeatured === true)

  const mutation = useMutation({
    mutationFn: (checked: boolean) =>
      sdk.admin.product.update(data.id, {
        metadata: { ...data.metadata, isFeatured: checked },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", data.id] })
      toast.success("Product updated")
    },
    onError: () => {
      setIsFeatured(data.metadata?.isFeatured === true)
      toast.error("Failed to update product")
    },
  })

  const handleChange = (checked: boolean) => {
    setIsFeatured(checked)
    mutation.mutate(checked)
  }

  return (
    <Container className="flex flex-col gap-y-4">
      <Heading level="h2">Curated selection</Heading>
      <div className="flex items-center gap-x-2">
        <Checkbox
          id="is-featured"
          checked={isFeatured}
          disabled={mutation.isPending}
          onCheckedChange={(checked) => handleChange(checked === true)}
        />
        <Label htmlFor="is-featured">Featured on the homepage</Label>
      </div>
      <Text size="small" className="text-ui-fg-subtle">
        Featured products appear in the &quot;Curated selection&quot; section of the storefront
        homepage.
      </Text>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
})

export default ProductFeaturedWidget
