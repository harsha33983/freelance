import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(2),
  fileUrl: z.string().url(),
  fileType: z.string().min(1),
});

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const files = await sql`SELECT * FROM "PressKitFile" ORDER BY "uploadedAt" DESC`;
    return NextResponse.json(files);
  } catch (err: any) {
    console.error("[GET /api/admin/press-kit]", err?.message || err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const body = await req.json();
    const data = schema.parse(body);
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const id = crypto.randomUUID();
    
    const result = await sql`
      INSERT INTO "PressKitFile" (id, title, "fileUrl", "fileType", "uploadedAt")
      VALUES (${id}, ${data.title}, ${data.fileUrl}, ${data.fileType}, NOW())
      RETURNING *
    `;
    return NextResponse.json(result[0], { status: 201 });
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/admin/press-kit]", err?.message || err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}
