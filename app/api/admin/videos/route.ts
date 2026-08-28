import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const videoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  youtubeUrl: z.string()
    .url("Must be a valid URL")
    .regex(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/, "Must be a valid YouTube link"),
});

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const videos = await sql`SELECT * FROM "Video" ORDER BY "publishedAt" DESC`;
    return NextResponse.json(videos);
  } catch (err) {
    console.error("[GET /api/admin/videos]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const body = await req.json();
    const data = videoSchema.parse(body);
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");

    const id = crypto.randomUUID();
    const result = await sql`
      INSERT INTO "Video" (id, title, description, "youtubeUrl", "publishedAt")
      VALUES (${id}, ${data.title}, ${data.description || null}, ${data.youtubeUrl}, NOW())
      RETURNING *
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/admin/videos]", err?.message || err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}
