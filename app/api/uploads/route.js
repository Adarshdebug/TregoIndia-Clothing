import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fail, ok } from "@/lib/api";
import { requireAdmin } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(request) {
  try {
    await requireAdmin();
    const body = await request.formData();
    const file = body.get("file");

    if (!file) {
      return fail("File required.", 400);
    }

    const bytes = Buffer.from(await file.arrayBuffer());

    if (process.env.CLOUDINARY_URL) {
      const base64 = `data:${file.type};base64,${bytes.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64, {
        folder: "tregoindia"
      });
      return ok({ url: result.secure_url }, 201);
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const extension = file.name.split(".").pop() || "png";
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-").toLowerCase()}`;
    await writeFile(path.join(uploadDir, filename), bytes);

    return ok({ url: `/uploads/${filename}`, extension }, 201);
  } catch (error) {
    const status = error.message === "Forbidden" ? 403 : error.message === "Unauthorized" ? 401 : 500;
    return fail(error.message || "Upload failed.", status);
  }
}
