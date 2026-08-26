import { NextRequest, NextResponse } from "next/server";
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
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
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
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");

    const existing = await sql`SELECT id FROM "NewsArticle" WHERE slug = ${data.slug}`;
    if (existing.length > 0) {
      return NextResponse.json({ message: "An article with this slug already exists." }, { status: 409 });
    }

    const id = crypto.randomUUID();
    const publishedAt = (data.publishedAt && data.publishedAt.trim() !== "") ? new Date(data.publishedAt).toISOString() : new Date().toISOString();
    const coverImage = data.coverImage || null;
    const author = data.author || "Mahotsav Team";

    const result = await sql`
      INSERT INTO "NewsArticle" (id, title, slug, category, excerpt, body, "coverImage", author, "publishedAt", "updatedAt")
      VALUES (${id}, ${data.title}, ${data.slug}, ${data.category}, ${data.excerpt}, ${data.body}, ${coverImage}, ${author}, ${publishedAt}, NOW())
      RETURNING *
    `;
    
    return NextResponse.json(result[0], { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/admin/news]", err?.message || err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}
