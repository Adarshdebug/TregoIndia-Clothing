import { connectToDatabase } from "@/lib/db";
import { fail, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import { getProducts } from "@/lib/store";
import Product from "@/models/Product";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const products = await getProducts({
    category: searchParams.get("category") || undefined,
    search: searchParams.get("search") || undefined,
    featured: searchParams.get("featured") === "true",
    trending: searchParams.get("trending") === "true"
  });

  return ok({ products });
}

export async function POST(request) {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      return fail("Database not configured.", 503);
    }

    await requireAdmin();
    const payload = await request.json();
    const product = await Product.create({
      ...payload,
      featured: payload.featured ?? false,
      trending: payload.trending ?? false,
      tags: payload.tags || [],
      reviews: payload.reviews || []
    });

    return ok(
      {
        product: {
          ...product.toObject(),
          _id: product._id.toString(),
          id: product._id.toString()
        }
      },
      201
    );
  } catch (error) {
    const status = error.message === "Forbidden" ? 403 : error.message === "Unauthorized" ? 401 : 500;
    return fail(error.message || "Unable to create product.", status);
  }
}
