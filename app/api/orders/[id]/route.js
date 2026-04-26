import { connectToDatabase } from "@/lib/db";
import { fail, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import Order from "@/models/Order";

export async function PATCH(request, { params }) {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      return fail("Database not configured.", 503);
    }

    await requireAdmin();
    const { id } = await params;
    const { status } = await request.json();
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true }).lean();
    return ok({ order: { ...order, _id: order._id.toString() } });
  } catch (error) {
    const status = error.message === "Forbidden" ? 403 : error.message === "Unauthorized" ? 401 : 500;
    return fail(error.message || "Unable to update order.", status);
  }
}
