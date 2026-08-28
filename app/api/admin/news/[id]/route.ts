import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const updateSchema = z.object({
  title: z.string().min(3).optional(),
  category: z.string().optional(),

  coverImage: z.string().optional(),
  author: z.string().optional(),
  publishedAt: z.string().optional(),
  caption: z.string().optional(),
  articleUrl: z.string().optional(),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const result = await sql`SELECT * FROM "NewsArticle" WHERE id = ${params.id}`;
    if (result.length === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(result[0]);
  } catch (err: any) {
    console.error("[GET /api/admin/news/:id]", err?.message || err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const body = await req.json();
    const data = updateSchema.parse(body);
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    
    const existingResult = await sql`SELECT * FROM "NewsArticle" WHERE id = ${params.id}`;
    if (existingResult.length === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
    const existing = existingResult[0];

    const title = data.title !== undefined ? data.title : existing.title;
    const category = data.category !== undefined ? data.category : existing.category;

    const coverImage = data.coverImage !== undefined ? data.coverImage : existing.coverImage;
    const author = data.author !== undefined ? data.author : existing.author;
    const caption = data.caption !== undefined ? data.caption : existing.caption;
    const articleUrl = data.articleUrl !== undefined ? data.articleUrl : existing.articleUrl;
    
    let publishedAt = existing.publishedAt;
    if (data.publishedAt !== undefined) {
      publishedAt = (data.publishedAt && data.publishedAt.trim() !== "") ? new Date(data.publishedAt).toISOString() : new Date().toISOString();
    }

    const result = await sql`
      UPDATE "NewsArticle"
      SET title = ${title}, category = ${category}, "coverImage" = ${coverImage}, author = ${author}, "publishedAt" = ${publishedAt}, "updatedAt" = NOW(), caption = ${caption}, "articleUrl" = ${articleUrl}
      WHERE id = ${params.id}
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (err: any) {
    console.error("[PUT /api/admin/news/:id]", err?.message || err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    await sql`DELETE FROM "NewsArticle" WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("[DELETE /api/admin/news/:id]", err?.message || err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}
