import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    
    let items;
    if (category) {
      items = await sql`SELECT * FROM "GalleryItem" WHERE category = ${category} ORDER BY "uploadedAt" DESC LIMIT 100`;
    } else {
      items = await sql`SELECT * FROM "GalleryItem" ORDER BY "uploadedAt" DESC LIMIT 100`;
    }

    return NextResponse.json(items);
  } catch (err) {
    console.error("[GET /api/gallery]", err);
    return NextResponse.json([], { status: 200 });
  }
}
