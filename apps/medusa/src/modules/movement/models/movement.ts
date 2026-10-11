import { model } from "@medusajs/framework/utils"

const Movement = model.define("movement", {
  id: model.id().primaryKey(),
  slug: model.text().unique(),
  name: model.text().unique(),
  description: model.text(),
  start_date: model.dateTime().nullable(),
  end_date: model.dateTime().nullable(),
  cover_image_url: model.text().nullable(),
})

export default Movement
