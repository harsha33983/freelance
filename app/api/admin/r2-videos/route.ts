import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL || "");
    const videos = await sql`
      SELECT id, title, description, file_name, file_size, mime_type, duration, 
             storage_key, video_url, thumbnail_url, status, uploaded_by, 
             created_at, updated_at 
      FROM "videos" 
      ORDER BY created_at DESC
    `;
    
    return NextResponse.json(videos);
  } catch (err: any) {
    console.error("[GET /api/admin/r2-videos]", err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}
