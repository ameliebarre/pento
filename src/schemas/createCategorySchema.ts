import { z } from "zod";

const CreateCategorySchema = z.object({
  name: z.string().trim().min(5, { message: "The name is required" }),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

export default CreateCategorySchema;
