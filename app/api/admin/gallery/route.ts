import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  imageUrl: z.string().url(),
  category: z.string().min(1),
  caption: z.string().min(2),
});

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const body = await req.json();
    const data = schema.parse(body);
    const item = await prisma.galleryItem.create({ data });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/admin/gallery]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

