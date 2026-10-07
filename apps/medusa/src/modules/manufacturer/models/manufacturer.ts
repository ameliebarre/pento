import { model } from "@medusajs/framework/utils"

const Manufacturer = model.define("manufacturer", {
  id: model.id().primaryKey(),
  slug: model.text().unique(),
  name: model.text(),
  history: model.text().nullable(),
  website: model.text().nullable(),
  logo_url: model.text().nullable(),
  country_name: model.text().nullable(),
})

export default Manufacturer
