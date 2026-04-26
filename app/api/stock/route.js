export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/db";
import { ok } from "@/lib/api";
import Product from "@/models/Product";
import { sampleProducts } from "@/lib/sample-data";

export async function GET() {
  const connection = await connectToDatabase();
  if (!connection) {
    return ok({
      items: sampleProducts.map((product) => ({
        slug: product.slug,
        stock: product.stock,
        _id: product.slug
      }))
    });
  }
  const products = await Product.find({}, { slug: 1, stock: 1 }).lean();
  return ok({
    items: products.map((product) => ({
      slug: product.slug,
      stock: product.stock,
      _id: product._id.toString()
    }))
  });
}
