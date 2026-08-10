import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "sku",
      type: "text",
      unique: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "currency",
      type: "text",
      defaultValue: "EUR",
    },
    {
      name: "stock",
      type: "number",
      required: true,
      defaultValue: 0,
    },
    {
      name: "salesCount",
      type: "number",
      required: true,
      defaultValue: 0,
    },
    {
      name: "width",
      type: "number",
    },
    {
      name: "height",
      type: "number",
    },
    {
      name: "depth",
      type: "number",
    },
    {
      name: "weight",
      type: "number",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },
  ],
};
