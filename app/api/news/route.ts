import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const limit = parseInt(searchParams.get("limit") || "20");

    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    let articles;
    if (category) {
      articles = await sql`SELECT id, title, slug, category, "coverImage", caption, "articleUrl", author, "publishedAt" FROM "NewsArticle" WHERE category = ${category} ORDER BY "publishedAt" DESC LIMIT 100`;
    } else {
      articles = await sql`SELECT id, title, slug, category, "coverImage", caption, "articleUrl", author, "publishedAt" FROM "NewsArticle" ORDER BY "publishedAt" DESC LIMIT 100`;
    }
    
    return NextResponse.json(articles);
  } catch (err: any) {
    console.error("[GET /api/news]", err);
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
