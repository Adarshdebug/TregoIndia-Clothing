export const dynamic = "force-dynamic";

import { connectToDatabase } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { ok } from "@/lib/api";

export async function GET() {
  await connectToDatabase();
  const user = await getCurrentUser();
  return ok({
    user: user
      ? { _id: user._id.toString(), name: user.name, email: user.email, role: user.role }
      : null
  });
}
