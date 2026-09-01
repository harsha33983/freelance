import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { neon } from "@neondatabase/serverless";
import * as xlsx from "xlsx";

export async function GET(req: NextRequest) {
  const { admin, error } = await requireAdmin(req);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const download = searchParams.get("download") === "true";

    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");

    // Query all form data using raw SQL
    const [
      registrations,
      volunteers,
      parayana,
      partnerships,
      contacts
    ] = await Promise.all([
      sql`SELECT * FROM "Registration" ORDER BY "createdAt" DESC`,
      sql`SELECT * FROM "VolunteerApplication" ORDER BY "createdAt" DESC`,
      sql`SELECT * FROM "ParayanaHostRequest" ORDER BY "createdAt" DESC`,
      sql`SELECT * FROM "PartnershipProposal" ORDER BY "createdAt" DESC`,
      sql`SELECT * FROM "ContactMessage" ORDER BY "createdAt" DESC`,
    ]);

    const formattedRegistrations = registrations.map((r: any) => ({
      ...r,
      assistance: Array.isArray(r.assistance) ? r.assistance.join(" | ") : r.assistance,
      registerForEvent: Array.isArray(r.registerForEvent) ? r.registerForEvent.join(" | ") : r.registerForEvent
    }));

    const data: Record<string, any[]> = {
      "Registrations": formattedRegistrations,
      "Volunteers": volunteers,
      "Parayana Hosts": parayana,
      "Partnerships": partnerships,
      "Contacts": contacts,
    };

    let totalRecords = registrations.length + volunteers.length + parayana.length + partnerships.length + contacts.length;

    if (download) {
      // Build workbook
      const wb = xlsx.utils.book_new();
      
      for (const [sheetName, sheetData] of Object.entries(data)) {
        const ws = xlsx.utils.json_to_sheet(sheetData);
        xlsx.utils.book_append_sheet(wb, ws, sheetName);
      }
      
      const fileBuffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });

      return new NextResponse(fileBuffer, {
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "Content-Disposition": "attachment; filename=bgvm2027_all_forms.xlsx",
        },
      });
    } else {
      // Return JSON payload for Preview Mode
      return NextResponse.json({ 
        sheets: data, 
        stats: { total: totalRecords } 
      });
    }
  } catch (err) {
    console.error("[GET /api/admin/registrations/excel]", err);
    return NextResponse.json({ message: "Server error generating Excel" }, { status: 500 });
  }
}
