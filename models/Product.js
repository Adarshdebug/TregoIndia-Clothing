import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: String,
    rating: Number,
    comment: String
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    gender: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
    sizes: [{ type: String }],
    tags: [{ type: String }],
    images: [{ type: String }],
    reviews: [reviewSchema]
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
