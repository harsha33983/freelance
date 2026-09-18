import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function POST(req: NextRequest) {
  const { admin, error } = await requireAdmin(req);
  if (error) return error;

  try {
    const { title, description, fileName, fileSize, mimeType, storageKey } = await req.json();

    if (!title || !fileName || !fileSize || !mimeType || !storageKey) {
      return NextResponse.json({ message: "Missing required video metadata" }, { status: 400 });
    }

    const videoUrl = `${process.env.R2_PUBLIC_URL}/${storageKey}`;
    
    const sql = neon(process.env.DATABASE_URL || "");
    const id = crypto.randomUUID();

    const result = await sql`
      INSERT INTO "videos" (
        id, title, description, file_name, file_size, mime_type, 
        storage_key, video_url, status, uploaded_by
      )
      VALUES (
        ${id}, ${title}, ${description || null}, ${fileName}, ${fileSize}, ${mimeType}, 
        ${storageKey}, ${videoUrl}, 'ready', ${admin.adminId}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0], { status: 201 });

  } catch (err: any) {
    console.error("[POST /api/admin/r2-videos/complete]", err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}
