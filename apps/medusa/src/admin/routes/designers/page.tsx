import { defineRouteConfig } from "@medusajs/admin-sdk"
import { CatalogCrudPage } from "../../components/catalog-crud-page"

const DesignersPage = () => (
  <CatalogCrudPage
    title="Designers"
    resourcePath="/admin/designers"
    listKey="designers"
    columns={[
      { key: "first_name", label: "First name" },
      { key: "last_name", label: "Last name" },
      { key: "nationality", label: "Nationality" },
      { key: "slug", label: "Slug" },
    ]}
    fields={[
      { name: "slug", label: "Slug", required: true },
      { name: "first_name", label: "First name", required: true },
      { name: "last_name", label: "Last name", required: true },
      { name: "nationality", label: "Nationality" },
      { name: "birth_date", label: "Birth date", type: "date" },
      { name: "death_date", label: "Death date", type: "date" },
      { name: "biography", label: "Biography", type: "textarea", required: true },
      { name: "quote", label: "Quote", type: "textarea" },
      { name: "image_url", label: "Image URL" },
    ]}
  />
)

export const config = defineRouteConfig({ label: "Designers" })

export default DesignersPage
