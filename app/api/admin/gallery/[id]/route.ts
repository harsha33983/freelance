import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    await sql`DELETE FROM "GalleryItem" WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[DELETE /api/admin/gallery/:id]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
