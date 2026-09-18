import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL || "");
    const videos = await sql`SELECT * FROM "videos" WHERE id = ${params.id}`;
    
    if (videos.length === 0) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }
    
    return NextResponse.json(videos[0]);
  } catch (err: any) {
    console.error(`[GET /api/admin/r2-videos/${params.id}]`, err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const { title, description } = await req.json();
    const sql = neon(process.env.DATABASE_URL || "");
    
    const result = await sql`
      UPDATE "videos"
      SET title = COALESCE(${title}, title),
          description = COALESCE(${description}, description),
          updated_at = NOW()
      WHERE id = ${params.id}
      RETURNING *
    `;

    if (result.length === 0) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }
    
    return NextResponse.json(result[0]);
  } catch (err: any) {
    console.error(`[PATCH /api/admin/r2-videos/${params.id}]`, err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL || "");
    
    // 1. Fetch video to get storage_key
    const videos = await sql`SELECT storage_key FROM "videos" WHERE id = ${params.id}`;
    if (videos.length === 0) {
      return NextResponse.json({ message: "Video not found" }, { status: 404 });
    }
    const storageKey = videos[0].storage_key;

    // 2. Delete from R2
    if (storageKey) {
      const command = new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: storageKey,
      });
      await s3Client.send(command).catch(err => {
        console.error("Failed to delete object from R2:", err);
        // Continue even if R2 delete fails, to avoid orphaned DB records if R2 already deleted it
      });
    }

    // 3. Delete from DB
    await sql`DELETE FROM "videos" WHERE id = ${params.id}`;
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(`[DELETE /api/admin/r2-videos/${params.id}]`, err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}
