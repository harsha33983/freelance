import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";

export async function GET(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get("format");

    const sql = neon(process.env.DATABASE_URL!);
    const proposals = await sql`SELECT * FROM "PartnershipProposal" ORDER BY "createdAt" DESC`;

    if (format === "csv") {
      const headers = ["id", "orgName", "contactPerson", "email", "phone", "interestArea", "createdAt"];
      const rows = (proposals as Record<string, unknown>[]).map((p) =>
        headers.map((h) => JSON.stringify((p as Record<string, unknown>)[h] ?? "")).join(",")
      );
      const csv = [headers.join(","), ...rows].join("\n");
      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": "attachment; filename=partnerships.csv",
        },
      });
    }

    return NextResponse.json(proposals);
  } catch (err) {
    console.error("[GET /api/admin/partnerships]", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

