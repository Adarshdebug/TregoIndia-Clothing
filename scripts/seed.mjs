import mongoose from "mongoose";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Coupon from "../models/Coupon.js";
import { sampleCoupons, sampleProducts } from "../lib/sample-data.js";

await mongoose.connect(process.env.MONGODB_URI, { dbName: "tregoindia" });

await Product.deleteMany({});
await Coupon.deleteMany({});
await User.deleteMany({});

await Product.insertMany(sampleProducts);
await Coupon.insertMany(sampleCoupons);
await User.create({
  name: "TregoIndia Admin",
  email: "admin@tregoindia.com",
  password: "Admin@12345",
  role: "admin"
});

console.log("Seed complete");
await mongoose.disconnect();
