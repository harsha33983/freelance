import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendContactConfirmation } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  category: z.string().min(1),
  message: z.string().min(10),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const { neon } = require("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    
    const cuid = "cuid_" + Date.now().toString(36) + Math.random().toString(36).substr(2);
    await sql`
      INSERT INTO "ContactMessage" (id, name, email, category, message, "createdAt")
      VALUES (${cuid}, ${data.name}, ${data.email}, ${data.category}, ${data.message}, NOW())
    `;

    sendContactConfirmation(data).catch(console.error);

    return NextResponse.json({ success: true, id: cuid }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/contact]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

