import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

import likeSchema from "./Like";
import ratingSchema from "./Rating";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      minLength: 5,
      maxLength: 160,
      text: true,
    },
    slug: {
      type: String,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minLength: 5,
      maxLength: 1000000,
      text: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
      maxLength: 6,
      validate: {
        validator: function (value: number) {
          return value !== 0;
        },
        message: "Price must be greater than 0",
      },
    },
    previousPrice: Number,
    color: String,
    brand: String,
    stock: Number,
    shipping: {
      type: Boolean,
      default: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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
    sold: {
      type: Number,
      default: 0,
    },
    likes: [likeSchema],
    ratings: [ratingSchema],
  },
  {
    timestamps: true,
  },
);

productSchema.plugin(uniqueValidator, { message: " already exists" });

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
