import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "20");

    const articles = await prisma.newsArticle.findMany({
      where: category ? { category } : undefined,
      orderBy: { publishedAt: "desc" },
      take: Math.min(limit, 100),
      select: {
        id: true,
        title: true,
        slug: true,
        category: true,
        excerpt: true,
        coverImage: true,
        author: true,
        publishedAt: true,
      },
    });

    return NextResponse.json(articles);
  } catch (err) {
    console.error("[GET /api/news]", err);
    return NextResponse.json([], { status: 200 }); // graceful empty fallback
  }
}
