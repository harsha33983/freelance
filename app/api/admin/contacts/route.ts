import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const messages = await sql`SELECT * FROM "ContactMessage" ORDER BY "createdAt" DESC`;
    return NextResponse.json(messages);
  } catch (err) {
    console.error("[GET /api/admin/contacts]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
