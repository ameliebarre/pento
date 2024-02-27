import { z } from "zod";

const CreateProductSchema = z.object({
  title: z.string().trim().min(5, { message: "The title is required" }),
  description: z
    .string()
    .trim()
    .min(10, { message: "The description is required" }),
  price: z.coerce
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .gte(1, { message: "Price must be greather than 1$" }),
  previousPrice: z.coerce.number().optional(),
  color: z.string().trim().optional(),
  brand: z.string().optional(),
  stock: z.coerce.number({
    required_error: "The stock is required",
  }),
  shipping: z.boolean().default(true),
  category: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { required_error: "The category is required" },
  ),
});

export type CreateProductSchemaType = z.infer<typeof CreateProductSchema>;

export default CreateProductSchema;
