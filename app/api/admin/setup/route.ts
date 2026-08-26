import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = "admin@bgvmahotsav2027.org";
    const password = "password123";

    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const existing = await sql`SELECT * FROM "Admin" WHERE email = ${email}`;
    
    if (existing.length > 0) {
      return NextResponse.json({ 
        message: "Admin already exists", 
        email, 
        loginUrl: "/admin/login" 
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const cuid = "cuid_" + Date.now().toString(36) + Math.random().toString(36).substr(2);

    await sql`
      INSERT INTO "Admin" (id, email, "passwordHash", role, "createdAt")
      VALUES (${cuid}, ${email}, ${hash}, 'admin', NOW())
    `;

    return NextResponse.json({ 
      message: "Admin created successfully!", 
      email,
      password,
      loginUrl: "/admin/login" 
    });
  } catch (error: any) {
    console.error("Setup error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
