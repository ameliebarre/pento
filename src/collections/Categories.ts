import { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: { read: () => true },
  admin: {
    useAsTitle: "title",
  },
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
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
    },
  ],
};
