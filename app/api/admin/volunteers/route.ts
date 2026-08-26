import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format");

    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const volunteers = await sql`SELECT * FROM "VolunteerApplication" ORDER BY "createdAt" DESC`;

    if (format === "csv") {
      const headers = ["id", "name", "email", "phone", "area", "city", "country", "createdAt"];
      const rows = (volunteers as Record<string, unknown>[]).map((v) =>
        headers.map((h) => JSON.stringify((v as Record<string, unknown>)[h] ?? "")).join(",")
      );
      const csv = [headers.join(","), ...rows].join("\n");
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=volunteers.csv",
        },
      });
    }

    return NextResponse.json(volunteers);
  } catch (err) {
    console.error("[GET /api/admin/volunteers]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

