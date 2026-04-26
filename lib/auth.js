import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "unsafe-dev-secret";
const COOKIE_NAME = "tregoindia-token";

if (!global.tregoFallbackUsers) {
  global.tregoFallbackUsers = [
    {
      _id: "admin-local",
      name: "TregoIndia Admin",
      email: "admin@tregoindia.com",
      password: bcrypt.hashSync("Admin@12345", 10),
      role: "admin"
    }
  ];
}

export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

export function signJwt(user) {
  return jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyJwt(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function getFallbackUsers() {
  return global.tregoFallbackUsers;
}

export function sanitizeUser(user) {
  if (!user) {
    return null;
  }

  return {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role
  };
}

export async function findUserByEmail(email) {
  const connection = await connectToDatabase();
  if (!connection) {
    return getFallbackUsers().find((user) => user.email === email) || null;
  }
  return User.findOne({ email });
}

export async function createUserRecord({ name, email, password, role = "user" }) {
  const connection = await connectToDatabase();
  if (!connection) {
    const hashedPassword = await hashPassword(password);
    const user = {
      _id: `local-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      role
    };
    global.tregoFallbackUsers.push(user);
    return user;
  }
  return User.create({ name, email, password, role });
}

export async function setAuthCookie(user) {
  const token = signJwt(user);
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  });
}

export async function clearAuthCookie() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  try {
    const decoded = verifyJwt(token);
    const connection = await connectToDatabase();
    if (!connection) {
      return sanitizeUser(getFallbackUsers().find((user) => user._id.toString() === decoded.userId));
    }
    return User.findById(decoded.userId).select("-password");
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (user.role !== "admin") {
    throw new Error("Forbidden");
  }
  return user;
}
