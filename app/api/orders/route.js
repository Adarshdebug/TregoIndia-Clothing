import { connectToDatabase } from "@/lib/db";
import { fail, ok } from "@/lib/api";
import { getCurrentUser } from "@/lib/auth";
import Order from "@/models/Order";

function serializeOrder(order) {
  return {
    ...order,
    _id: order._id.toString(),
    userId: order.userId?.toString?.() || order.userId || null
  };
}

export async function GET() {
  try {
    const connection = await connectToDatabase();
    const user = await getCurrentUser();

    if (!user) {
      return fail("Unauthorized", 401);
    }

    if (!connection) {
      return ok({ orders: [] });
    }

    if (user.role === "admin") {
      const orders = await Order.find().sort({ createdAt: -1 }).lean();
      return ok({ orders: orders.map(serializeOrder) });
    }

    const orders = await Order.find({ userId: user._id }).sort({ createdAt: -1 }).lean();
    return ok({ orders: orders.map(serializeOrder) });
  } catch (error) {
    return fail(error.message || "Unable to fetch orders.", 500);
  }
}

export async function POST(request) {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      return fail("Database not configured.", 503);
    }

    const user = await getCurrentUser();
    const payload = await request.json();
    const order = await Order.create({ ...payload, userId: user?._id || null });
    return ok({ order: serializeOrder(order.toObject()) }, 201);
  } catch (error) {
    return fail(error.message || "Unable to create order.", 500);
  }
}
