import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const articleSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens only"),
  category: z.string().min(1),
  excerpt: z.string().min(10),
  body: z.string().min(20),
  coverImage: z.string().url().optional().or(z.literal("")),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL!);
    const articles = await sql`SELECT id, title, slug, category, excerpt, author, "publishedAt", "coverImage" FROM "NewsArticle" ORDER BY "publishedAt" DESC`;
    return NextResponse.json(articles);
  } catch (err) {
    console.error("[GET /api/admin/news]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const body = await req.json();
    const data = articleSchema.parse(body);

    const article = await prisma.newsArticle.create({
      data: {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
        coverImage: data.coverImage || null,
        author: data.author || "Mahotsav Team",
      },
    });
    return NextResponse.json(article, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/admin/news]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

