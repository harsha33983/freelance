import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendNewsletterWelcome } from "@/lib/email";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    const { neon } = require("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL!);
    
    const cuid = "cuid_" + Date.now().toString(36) + Math.random().toString(36).substr(2);
    await sql`
      INSERT INTO "NewsletterSubscriber" (id, email, "createdAt")
      VALUES (${cuid}, ${email}, NOW())
      ON CONFLICT (email) DO NOTHING
    `;

    sendNewsletterWelcome(email).catch(console.error);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Valid email required" }, { status: 422 });
    }
    console.error("[POST /api/newsletter/subscribe]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
