import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const items = await prisma.galleryItem.findMany({
      where: category ? { category } : undefined,
      orderBy: { uploadedAt: "desc" },
      take: 100,
    });

    return NextResponse.json(items);
  } catch (err) {
    console.error("[GET /api/gallery]", err);
    return NextResponse.json([], { status: 200 });
  }
}
