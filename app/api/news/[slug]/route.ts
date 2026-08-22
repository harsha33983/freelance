import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const article = await prisma.newsArticle.findUnique({
      where: { slug: params.slug },
    });

    if (!article) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (err) {
    console.error("[GET /api/news/:slug]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
