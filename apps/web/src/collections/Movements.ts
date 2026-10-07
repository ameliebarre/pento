import { CollectionConfig } from "payload";

export const Movements: CollectionConfig = {
  slug: "movements",
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
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "startDate",
      type: "date",
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "coverImageUrl",
      type: "text",
      admin: {
        description: "URL Cloudinary de l'image de couverture.",
      },
    },
  ],
};
