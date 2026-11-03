import { useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import type { DetailWidgetProps, AdminProduct } from "@medusajs/types"
import { Badge, Container, Heading, Label, Select, Text, toast } from "@medusajs/ui"
import { sdk } from "../lib/sdk"

const NONE_VALUE = "__none__"
const PRODUCT_FIELDS =
  "id,+designers.id,+designers.first_name,+designers.last_name,+manufacturer.id,+manufacturer.name"

type LinkedDesigner = { id: string; first_name: string; last_name: string }
type LinkedManufacturer = { id: string; name: string } | null
type ProductWithLinks = { id: string; designers: LinkedDesigner[]; manufacturer: LinkedManufacturer }

type DesignerOption = { id: string; first_name: string; last_name: string }
type ManufacturerOption = { id: string; name: string }

type CatalogLinksBody = { designer_ids?: string[]; manufacturer_id?: string }

const ProductCatalogLinksWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const queryClient = useQueryClient()
  const [addingDesignerId, setAddingDesignerId] = useState("")

  const { data: productData } = useQuery({
    queryKey: ["product-catalog-links", data.id],
    queryFn: () =>
      sdk.client.fetch<{ product: ProductWithLinks }>(`/admin/products/${data.id}`, {
        query: { fields: PRODUCT_FIELDS },
      }),
  })

  const { data: designersData } = useQuery({
    queryKey: ["designers-options"],
    queryFn: () =>
      sdk.client.fetch<{ designers: DesignerOption[] }>("/admin/designers", {
        query: { limit: 1000 },
      }),
  })

  const { data: manufacturersData } = useQuery({
    queryKey: ["manufacturers-options"],
    queryFn: () => sdk.client.fetch<{ manufacturers: ManufacturerOption[] }>("/admin/manufacturers"),
  })

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["product-catalog-links", data.id] })

  const linkMutation = useMutation({
    mutationFn: (body: CatalogLinksBody) =>
      sdk.client.fetch(`/admin/products/${data.id}/catalog-links`, { method: "POST", body }),
    onSuccess: invalidate,
    onError: () => toast.error("Failed to link product"),
  })

  const unlinkMutation = useMutation({
    mutationFn: (body: CatalogLinksBody) =>
      sdk.client.fetch(`/admin/products/${data.id}/catalog-links`, { method: "DELETE", body }),
    onSuccess: invalidate,
    onError: () => toast.error("Failed to unlink product"),
  })

  const linkedDesigners = productData?.product.designers ?? []
  const linkedManufacturer = productData?.product.manufacturer ?? null
  const linkedDesignerIds = new Set(linkedDesigners.map((designer) => designer.id))
  const designerOptions = (designersData?.designers ?? []).filter(
    (designer) => !linkedDesignerIds.has(designer.id),
  )
  const manufacturerOptions = manufacturersData?.manufacturers ?? []

  const handleAddDesigner = (designerId: string) => {
    setAddingDesignerId("")
    linkMutation.mutate({ designer_ids: [designerId] })
  }

  const handleRemoveDesigner = (designerId: string) => {
    unlinkMutation.mutate({ designer_ids: [designerId] })
  }

  const handleManufacturerChange = async (value: string) => {
    if (linkedManufacturer) {
      await unlinkMutation.mutateAsync({ manufacturer_id: linkedManufacturer.id })
    }
    if (value !== NONE_VALUE) {
      linkMutation.mutate({ manufacturer_id: value })
    }
  }

  const isSaving = linkMutation.isPending || unlinkMutation.isPending

  return (
    <Container className="flex flex-col gap-y-6">
      <Heading level="h2">Designers & Manufacturer</Heading>

      <div className="flex flex-col gap-y-2">
        <Label>Designers</Label>
        <div className="flex flex-wrap gap-2">
          {linkedDesigners.length === 0 && (
            <Text size="small" className="text-ui-fg-subtle">
              No designer linked yet.
            </Text>
          )}
          {linkedDesigners.map((designer) => (
            <Badge key={designer.id} className="flex items-center gap-x-1.5">
              {designer.first_name} {designer.last_name}
              <button
                type="button"
                aria-label={`Remove ${designer.first_name} ${designer.last_name}`}
                disabled={isSaving}
                onClick={() => handleRemoveDesigner(designer.id)}
                className="text-ui-fg-subtle hover:text-ui-fg-base"
              >
                ×
              </button>
            </Badge>
          ))}
        </div>
        <Select value={addingDesignerId} onValueChange={handleAddDesigner} disabled={isSaving}>
          <Select.Trigger>
            <Select.Value placeholder="Add a designer…" />
          </Select.Trigger>
          <Select.Content>
            {designerOptions.map((designer) => (
              <Select.Item key={designer.id} value={designer.id}>
                {designer.first_name} {designer.last_name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>

      <div className="flex flex-col gap-y-2">
        <Label>Manufacturer</Label>
        <Select
          value={linkedManufacturer?.id ?? NONE_VALUE}
          onValueChange={handleManufacturerChange}
          disabled={isSaving}
        >
          <Select.Trigger>
            <Select.Value placeholder="Select a manufacturer…" />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value={NONE_VALUE}>— None —</Select.Item>
            {manufacturerOptions.map((manufacturer) => (
              <Select.Item key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select>
      </div>
    </Container>
  )
}

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
})

export default ProductCatalogLinksWidget
