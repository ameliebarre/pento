import { model } from "@medusajs/framework/utils"

const Designer = model.define("designer", {
  id: model.id().primaryKey(),
  slug: model.text().unique(),
  first_name: model.text(),
  last_name: model.text(),
  birth_date: model.dateTime().nullable(),
  death_date: model.dateTime().nullable(),
  nationality: model.text().nullable(),
  biography: model.text(),
  quote: model.text().nullable(),
  image_url: model.text().nullable(),
  featured: model.boolean().default(false),
})

export default Designer
