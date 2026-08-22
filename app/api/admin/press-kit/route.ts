import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(2),
  fileUrl: z.string().url(),
  fileType: z.string().min(1),
});

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const files = await prisma.pressKitFile.findMany({ orderBy: { uploadedAt: "desc" } });
    return NextResponse.json(files);
  } catch (err) {
    console.error("[GET /api/admin/press-kit]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const body = await req.json();
    const data = schema.parse(body);
    const file = await prisma.pressKitFile.create({ data });
    return NextResponse.json(file, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/admin/press-kit]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

