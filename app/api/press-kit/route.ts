import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const files = await prisma.pressKitFile.findMany({
      orderBy: { uploadedAt: "desc" },
    });
    return NextResponse.json(files);
  } catch (err) {
    console.error("[GET /api/press-kit]", err);
    return NextResponse.json([], { status: 200 });
  }
}
