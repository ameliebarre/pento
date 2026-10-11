import { defineRouteConfig } from "@medusajs/admin-sdk"
import { CatalogCrudPage } from "../../components/catalog-crud-page"

const MovementsPage = () => (
  <CatalogCrudPage
    title="Movements"
    resourcePath="/admin/movements"
    listKey="movements"
    columns={[
      { key: "name", label: "Name" },
      { key: "start_date", label: "Start" },
      { key: "end_date", label: "End" },
      { key: "slug", label: "Slug" },
    ]}
    fields={[
      { name: "slug", label: "Slug", required: true },
      { name: "name", label: "Name", required: true },
      { name: "start_date", label: "Start date", type: "date" },
      { name: "end_date", label: "End date", type: "date" },
      { name: "description", label: "Description", type: "textarea", required: true },
      { name: "cover_image_url", label: "Cover image URL" },
    ]}
  />
)

export const config = defineRouteConfig({ label: "Movements" })

export default MovementsPage
