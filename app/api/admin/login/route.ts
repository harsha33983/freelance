import { NextRequest, NextResponse } from "next/server";
import { signToken, setAuthCookie } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = schema.parse(body);

    const sql = neon(process.env.DATABASE_URL!);
    const admins = await sql`SELECT * FROM "Admin" WHERE email = ${email}`;
    const admin = admins[0];
    if (!admin) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = await signToken({
      adminId: admin.id,
      email: admin.email,
      role: admin.role,
    });

    const res = NextResponse.json({ success: true, token });
    setAuthCookie(res, token);
    return res;
    } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Email and password required" }, { status: 422 });
    }
    console.error("[POST /api/admin/login]", err);
    return NextResponse.json({ message: "Server error", error: err?.message || String(err), stack: err?.stack }, { status: 500 });
  }
}
