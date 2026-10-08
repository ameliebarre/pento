import { defineRouteConfig } from "@medusajs/admin-sdk"
import { CatalogCrudPage } from "../../components/catalog-crud-page"

const ManufacturersPage = () => (
  <CatalogCrudPage
    title="Manufacturers"
    resourcePath="/admin/manufacturers"
    listKey="manufacturers"
    columns={[
      { key: "name", label: "Name" },
      { key: "country_name", label: "Country" },
      { key: "website", label: "Website" },
      { key: "slug", label: "Slug" },
    ]}
    fields={[
      { name: "slug", label: "Slug", required: true },
      { name: "name", label: "Name", required: true },
      { name: "country_name", label: "Country" },
      { name: "website", label: "Website" },
      { name: "history", label: "History", type: "textarea" },
      { name: "logo_url", label: "Logo URL" },
    ]}
  />
)

export const config = defineRouteConfig({ label: "Manufacturers" })

export default ManufacturersPage
