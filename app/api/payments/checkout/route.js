import Stripe from "stripe";
import { fail, ok } from "@/lib/api";
import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import Order from "@/models/Order";
import Product from "@/models/Product";

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function POST(request) {
  try {
    const connection = await connectToDatabase();
    if (!connection) {
      return fail("Database not configured.", 503);
    }

    const user = await getCurrentUser();
    const payload = await request.json();

    for (const item of payload.items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return fail(`Stock unavailable for ${item.name}.`, 409);
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || new URL(request.url).origin;
    const normalizedMethod = payload.paymentMethod === "razorpay" ? "razorpay" : "stripe";
    const order = await Order.create({
      userId: user?._id || null,
      items: payload.items,
      subtotal: payload.subtotal,
      discount: payload.discount,
      total: payload.total,
      couponCode: payload.couponCode,
      shippingAddress: payload.shippingAddress,
      paymentMethod: normalizedMethod,
      paymentStatus: stripe && normalizedMethod === "stripe" ? "pending" : "paid"
    });

    if (stripe && normalizedMethod === "stripe") {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${baseUrl}/checkout/success?orderId=${order._id.toString()}`,
        cancel_url: `${baseUrl}/checkout`,
        line_items: payload.items.map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: (process.env.NEXT_PUBLIC_CURRENCY || "INR").toLowerCase(),
            product_data: { name: `${item.name} (${item.size})` },
            unit_amount: item.price * 100
          }
        }))
      });

      return ok({ orderId: order._id.toString(), checkoutUrl: session.url }, 201);
    }

    return ok({ orderId: order._id.toString() }, 201);
  } catch (error) {
    return fail(error.message || "Checkout failed.", 500);
  }
}
