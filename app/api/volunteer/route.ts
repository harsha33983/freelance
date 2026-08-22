import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendVolunteerConfirmation } from "@/lib/email";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  city: z.string().min(1),
  country: z.string().min(1),
  area: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const { neon } = require("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL!);
    
    const cuid = "cuid_" + Date.now().toString(36) + Math.random().toString(36).substr(2);
    await sql`
      INSERT INTO "VolunteerApplication" (id, name, email, phone, city, country, area, message, "createdAt")
      VALUES (${cuid}, ${data.name}, ${data.email}, ${data.phone}, ${data.city}, ${data.country}, ${data.area}, ${data.message || ""}, NOW())
    `;

    sendVolunteerConfirmation(data).catch(console.error);

    return NextResponse.json({ success: true, id: cuid }, { status: 201 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/volunteer]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

