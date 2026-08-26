import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  const { admin, error } = await requireAdmin(req);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format");
    const type = searchParams.get("type");
    const country = searchParams.get("country");

    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    
    // Construct the query
    let registrations;
    if (type && country) {
      registrations = await sql`SELECT * FROM "Registration" WHERE type = ${type} AND country = ${country} ORDER BY "createdAt" DESC`;
    } else if (type) {
      registrations = await sql`SELECT * FROM "Registration" WHERE type = ${type} ORDER BY "createdAt" DESC`;
    } else if (country) {
      registrations = await sql`SELECT * FROM "Registration" WHERE country = ${country} ORDER BY "createdAt" DESC`;
    } else {
      registrations = await sql`SELECT * FROM "Registration" ORDER BY "createdAt" DESC`;
    }

    // CSV export
    if (format === "csv") {
      const headers = ["id", "type", "name", "email", "phone", "country", "city", "createdAt"];
      const rows = (registrations as Record<string, unknown>[]).map((r) =>
        headers.map((h) => JSON.stringify((r as Record<string, unknown>)[h] ?? "")).join(",")
      );
      const csv = [headers.join(","), ...rows].join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=registrations.csv",
        },
      });
    }

    // Summary stats
    const stats = {
      total: registrations.length,
      byType: {} as Record<string, number>,
      byCountry: {} as Record<string, number>,
    };
    for (const r of registrations) {
      stats.byType[r.type] = (stats.byType[r.type] || 0) + 1;
      stats.byCountry[r.country] = (stats.byCountry[r.country] || 0) + 1;
    }

    return NextResponse.json({ registrations, stats });
  } catch (err) {
    console.error("[GET /api/admin/registrations]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

