import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Helper to get Neon SQL client
function getSql() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set");
  }
  return neon(databaseUrl);
}

export async function POST(req: Request) {
  try {
    const { visitorId } = await req.json();

    if (!visitorId || typeof visitorId !== "string") {
      return NextResponse.json({ error: "visitorId is required" }, { status: 400 });
    }

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(visitorId)) {
      return NextResponse.json({ error: "Invalid visitorId format" }, { status: 400 });
    }

    const sql = getSql();

    // UPSERT the visitor, updating last_active_at
    await sql`
      INSERT INTO visitors (id, created_at, last_active_at)
      VALUES (${visitorId}, NOW(), NOW())
      ON CONFLICT (id)
      DO UPDATE SET last_active_at = NOW()
    `;

    // Query Total Users
    const totalResult = await sql`SELECT COUNT(*) as total FROM visitors`;
    const total = parseInt(totalResult[0]?.total || "0", 10);

    // Query Active Users (active within the last 30 seconds)
    const activeResult = await sql`
      SELECT COUNT(*) as active 
      FROM visitors 
      WHERE last_active_at >= NOW() - INTERVAL '30 seconds'
    `;
    const active = parseInt(activeResult[0]?.active || "0", 10);

    return NextResponse.json({ total, active, success: true });
  } catch (error: any) {
    console.error("Failed to update visitor:", error);
    return NextResponse.json({ error: "Failed to update visitor" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const sql = getSql();
    
    // Query Total Users
    const totalResult = await sql`SELECT COUNT(*) as total FROM visitors`;
    const total = parseInt(totalResult[0]?.total || "0", 10);

    // Query Active Users
    const activeResult = await sql`
      SELECT COUNT(*) as active 
      FROM visitors 
      WHERE last_active_at >= NOW() - INTERVAL '30 seconds'
    `;
    const active = parseInt(activeResult[0]?.active || "0", 10);

    return NextResponse.json({ total, active });
  } catch (error: any) {
    console.error("Failed to get visitors:", error);
    // Return baseline if DB fails
    return NextResponse.json({ total: 1, active: 1 });
  }
}
