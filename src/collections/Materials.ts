import { CollectionConfig } from "payload";

export const Materials: CollectionConfig = {
  slug: "materials",
  access: { read: () => true },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};
