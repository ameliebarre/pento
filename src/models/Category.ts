import mongoose, { Model } from "mongoose";

interface CategoryInterface extends Document {
  name: string;
}

interface CategoryModelInterface extends Model<CategoryInterface> {
  findOneByName(name: string): Promise<CategoryInterface | null>;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 1,
      maxLength: 20,
      validate: {
        validator: async function (value: string) {
          const existingCategory = await CategoryModel.findOneByName(value);
          return !existingCategory;
        },
        message: "The category already exists in the database",
      },
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true },
);

categorySchema.statics.findOneByName = function (
  name: string,
): Promise<CategoryInterface | null> {
  return this.findOne({ name }).exec();
};

const CategoryModel =
  (mongoose.models.Category as CategoryModelInterface) ||
  mongoose.model<CategoryInterface, CategoryModelInterface>(
    "Category",
    categorySchema,
  );

export default CategoryModel;
