import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 1,
      maxLength: 20,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    images: [
      {
        secure_url: {
          type: String,
          default: "",
        },
        public_id: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true },
);

categorySchema.plugin(uniqueValidator, { message: " already exists" });

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
