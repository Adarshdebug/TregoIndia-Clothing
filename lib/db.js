import mongoose from "mongoose";
import Product from "@/models/Product";
import User from "@/models/User";
import Coupon from "@/models/Coupon";
import { sampleCoupons, sampleProducts } from "@/lib/sample-data";

const MONGODB_URI = process.env.MONGODB_URI;

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null, seeded: false };
}

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    return null;
  }

  if (global.mongooseCache.conn) {
    return global.mongooseCache.conn;
  }

  if (!global.mongooseCache.promise) {
    global.mongooseCache.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "tregoindia",
        serverSelectionTimeoutMS: 5000
      })
      .catch(() => null);
  }

  global.mongooseCache.conn = await global.mongooseCache.promise;
  global.mongooseCache.promise = null;

  if (!global.mongooseCache.conn) {
    return null;
  }

  if (!global.mongooseCache.seeded) {
    await ensureSeedData();
    global.mongooseCache.seeded = true;
  }

  return global.mongooseCache.conn;
}

async function ensureSeedData() {
  const [productCount, adminUser, couponCount] = await Promise.all([
    Product.countDocuments(),
    User.findOne({ email: "admin@tregoindia.com" }),
    Coupon.countDocuments()
  ]);

  if (!productCount) {
    await Product.insertMany(sampleProducts);
  }

  if (!couponCount) {
    await Coupon.insertMany(sampleCoupons);
  }

  if (!adminUser) {
    await User.create({
      name: "TregoIndia Admin",
      email: "admin@tregoindia.com",
      password: "Admin@12345",
      role: "admin"
    });
  }
}
