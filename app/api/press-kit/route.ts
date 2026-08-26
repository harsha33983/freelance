import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const files = await sql`SELECT * FROM "PressKitFile" ORDER BY "uploadedAt" DESC`;
    return NextResponse.json(files);
  } catch (err) {
    console.error("[GET /api/press-kit]", err);
    return NextResponse.json([], { status: 200 });
  }
}
