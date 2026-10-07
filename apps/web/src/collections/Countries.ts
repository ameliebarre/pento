import { CollectionConfig } from "payload";

export const Countries: CollectionConfig = {
  slug: "countries",
  access: { read: () => true },
  admin: {
    useAsTitle: "name",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};
