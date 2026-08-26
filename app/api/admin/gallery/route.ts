import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import { z } from "zod";

const schema = z.object({
  imageUrl: z.string().min(1),
  category: z.string().min(1),
  caption: z.string().min(2),
});

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const body = await req.json();
    const data = schema.parse(body);
    
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const id = crypto.randomUUID();
    
    const items = await sql`
      INSERT INTO "GalleryItem" (id, "imageUrl", category, caption, "uploadedAt") 
      VALUES (${id}, ${data.imageUrl}, ${data.category}, ${data.caption}, NOW()) 
      RETURNING *
    `;
    
    return NextResponse.json(items[0], { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/admin/gallery]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
