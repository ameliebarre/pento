import { model } from "@medusajs/framework/utils"

const Material = model.define("material", {
  id: model.id().primaryKey(),
  slug: model.text().unique(),
  name: model.text().unique(),
  description: model.text().nullable(),
  image_url: model.text().nullable(),
})

export default Material
