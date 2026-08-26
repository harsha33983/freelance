import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const articles = await sql`SELECT * FROM "NewsArticle" WHERE slug = ${params.slug} LIMIT 1`;

    if (articles.length === 0) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(articles[0]);
  } catch (err) {
    console.error("[GET /api/news/:slug]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
