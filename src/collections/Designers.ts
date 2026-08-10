import { CollectionConfig } from "payload";

export const Designers: CollectionConfig = {
  slug: "designers",
  access: { read: () => true },
  admin: {
    useAsTitle: "lastName",
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "birthDate",
      type: "date",
    },
    {
      name: "deathDate",
      type: "date",
    },
    {
      name: "nationality",
      type: "text",
    },
    {
      name: "biography",
      type: "textarea",
      required: true,
    },
    {
      name: "quote",
      type: "textarea",
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
    },
  ],
};
