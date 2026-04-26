import mongoose from "mongoose";
import Coupon from "@/models/Coupon";
import Order from "@/models/Order";
import Product from "@/models/Product";
import { connectToDatabase } from "@/lib/db";
import { sampleCoupons, sampleProducts } from "@/lib/sample-data";

function matchProduct(product, filters = {}) {
  const categoryMatch = !filters.category || product.category === filters.category;
  const featuredMatch = !filters.featured || product.featured;
  const trendingMatch = !filters.trending || product.trending;
  const searchMatch =
    !filters.search ||
    [product.name, product.category, product.gender, ...(product.tags || [])]
      .join(" ")
      .toLowerCase()
      .includes(filters.search.toLowerCase());

  return categoryMatch && featuredMatch && trendingMatch && searchMatch;
}

function serializeFallback(product) {
  return {
    ...product,
    _id: product.slug,
    id: product.slug
  };
}

function serializeDocument(product) {
  return {
    ...product,
    _id: product._id.toString(),
    id: product._id.toString()
  };
}

export async function getProducts(filters = {}) {
  const connection = await connectToDatabase();

  if (!connection) {
    return sampleProducts.filter((product) => matchProduct(product, filters)).map(serializeFallback);
  }

  const query = {};
  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.featured) {
    query.featured = true;
  }
  if (filters.trending) {
    query.trending = true;
  }
  if (filters.search) {
    query.$or = [
      { name: { $regex: filters.search, $options: "i" } },
      { category: { $regex: filters.search, $options: "i" } },
      { gender: { $regex: filters.search, $options: "i" } },
      { tags: { $elemMatch: { $regex: filters.search, $options: "i" } } }
    ];
  }

  const products = await Product.find(query).sort({ createdAt: -1 }).lean();
  return products.map(serializeDocument);
}

export async function getProductByIdOrSlug(id) {
  const connection = await connectToDatabase();

  if (!connection) {
    const found = sampleProducts.find((product) => product.slug === id);
    return found ? serializeFallback(found) : null;
  }

  const query = mongoose.Types.ObjectId.isValid(id) ? { _id: id } : { slug: id };
  const product = await Product.findOne(query).lean();
  return product ? serializeDocument(product) : null;
}

export async function getOrdersForUser(userId) {
  const connection = await connectToDatabase();
  if (!connection || !userId) {
    return [];
  }

  const orders = await Order.find({ userId }).sort({ createdAt: -1 }).lean();
  return orders.map((order) => ({ ...order, _id: order._id.toString() }));
}

export async function getCouponByCode(code) {
  const connection = await connectToDatabase();
  if (!connection) {
    return sampleCoupons.find((coupon) => coupon.code === code.toUpperCase() && coupon.active) || null;
  }
  const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true }).lean();
  return coupon ? { ...coupon, _id: coupon._id.toString() } : null;
}
