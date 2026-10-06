import { CollectionConfig } from "payload";

export const Manufacturers: CollectionConfig = {
  slug: "manufacturers",
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
    },
    {
      name: "history",
      type: "textarea",
    },
    {
      name: "website",
      type: "text",
    },
    {
      name: "logoUrl",
      type: "text",
      admin: {
        description: "URL Cloudinary du logo.",
      },
    },
    {
      name: "country",
      type: "relationship",
      relationTo: "countries",
    },
  ],
};
