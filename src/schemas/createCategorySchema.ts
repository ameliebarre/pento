import { z } from "zod";

const CreateCategorySchema = z.object({
  name: z.string().trim(),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

export default CreateCategorySchema;
