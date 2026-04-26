import { connectToDatabase } from "@/lib/db";
import { fail, ok } from "@/lib/api";
import { createUserRecord, findUserByEmail, sanitizeUser, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, email, password } = await request.json();
    const exists = await findUserByEmail(email);
    if (exists) {
      return fail("Email already registered.", 409);
    }

    const user = await createUserRecord({ name, email, password });
    await setAuthCookie(user);

    return ok({ user: sanitizeUser(user) }, 201);
  } catch (error) {
    return fail(error.message || "Signup failed.", 500);
  }
}
