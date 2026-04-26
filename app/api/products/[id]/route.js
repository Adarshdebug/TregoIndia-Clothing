import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { fail, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { getProductByIdOrSlug } from "@/lib/store";
import Product from "@/models/Product";

export async function GET(_, { params }) {
  const { id } = await params;
  const product = await getProductByIdOrSlug(id);

  if (!product) {
    return fail("Product not found.", 404);
  }

  return ok({ product });
}

export async function PUT(request, { params }) {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      return fail("Database not configured.", 503);
    }

    await requireAdmin();
    const { id } = await params;
    const payload = await request.json();
    const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
    const product = await Product.findOneAndUpdate(query, payload, { new: true }).lean();

    return ok({ product: { ...product, _id: product._id.toString(), id: product._id.toString() } });
  } catch (error) {
    const status = error.message === "Forbidden" ? 403 : error.message === "Unauthorized" ? 401 : 500;
    return fail(error.message || "Unable to update product.", status);
  }
}

export async function DELETE(_, { params }) {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      return fail("Database not configured.", 503);
    }

    await requireAdmin();
    const { id } = await params;
    const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
    await Product.findOneAndDelete(query);
    return ok({ success: true });
  } catch (error) {
    const status = error.message === "Forbidden" ? 403 : error.message === "Unauthorized" ? 401 : 500;
    return fail(error.message || "Unable to delete product.", status);
  }
}
