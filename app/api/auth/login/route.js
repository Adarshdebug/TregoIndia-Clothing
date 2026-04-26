import { connectToDatabase } from "@/lib/db";
import { comparePassword, findUserByEmail, sanitizeUser, setAuthCookie } from "@/lib/auth";
import { fail, ok } from "@/lib/api";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { email, password } = await request.json();
    const user = await findUserByEmail(email);

    if (!user || !(await comparePassword(password, user.password))) {
      return fail("Invalid credentials.", 401);
    }

    await setAuthCookie(user);
    return ok({ user: sanitizeUser(user) });
  } catch (error) {
    return fail(error.message || "Login failed.", 500);
  }
}
