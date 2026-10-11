import { defineRouteConfig } from "@medusajs/admin-sdk"
import { CatalogCrudPage } from "../../components/catalog-crud-page"

const MaterialsPage = () => (
  <CatalogCrudPage
    title="Materials"
    resourcePath="/admin/materials"
    listKey="materials"
    columns={[
      { key: "name", label: "Name" },
      { key: "slug", label: "Slug" },
    ]}
    fields={[
      { name: "slug", label: "Slug", required: true },
      { name: "name", label: "Name", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image_url", label: "Image URL" },
    ]}
  />
)

export const config = defineRouteConfig({ label: "Materials" })

export default MaterialsPage
