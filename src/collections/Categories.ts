import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "slug",
      type: "text",
      unique: true,
    },
    {
      name: "position",
      type: "number",
      unique: true,
    },
  ],
};
