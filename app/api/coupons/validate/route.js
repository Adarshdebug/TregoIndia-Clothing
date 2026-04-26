import { fail, ok } from "@/lib/api";
import { getCouponByCode } from "@/lib/store";

export async function POST(request) {
  const { code, subtotal } = await request.json();
  const coupon = await getCouponByCode(code);
  if (!coupon) {
    return fail("Invalid coupon code.", 404);
  }

  const discount =
    coupon.type === "percent" ? Math.round((subtotal * coupon.value) / 100) : coupon.value;

  return ok({ discount });
}
