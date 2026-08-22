import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendRegistrationConfirmation } from "@/lib/email";
import { z } from "zod";
import * as xlsx from "xlsx";
import path from "path";
import fs from "fs";

const schema = z.object({
  type: z.enum(["individual", "family", "group", "institution", "yatra"]),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  country: z.string().min(1),
  city: z.string().min(1),
  // Optional dynamic fields
  familyMembersCount: z.coerce.number().optional(),
  groupName: z.string().optional(),
  groupSize: z.coerce.number().optional(),
  institutionName: z.string().optional(),
  designation: z.string().optional(),
  yatraName: z.string().optional(),
});

function getISTTimestamp() {
  // Generates e.g. "22-08-2026, 10:45:32 AM IST"
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).replace(/\u202f/g, ' ') + " IST"; // handle non-breaking spaces occasionally returned
}

function saveToExcel(data: any, regId: string, timestamp: string) {
  // Save directly to the Downloads folder of the admin PC
  const filePath = path.join(require('os').homedir(), "Downloads", "bgvm2027_registrations.xlsx");
  const sheetName = data.type.charAt(0).toUpperCase() + data.type.slice(1);

  let workbook;
  if (fs.existsSync(filePath)) {
    const fileBuffer = fs.readFileSync(filePath);
    workbook = xlsx.read(fileBuffer, { type: "buffer" });
  } else {
    workbook = xlsx.utils.book_new();
  }

  let worksheet = workbook.Sheets[sheetName];
  let json: any[] = [];

  if (worksheet) {
    json = xlsx.utils.sheet_to_json(worksheet);
  } else {
    // Make a dummy sheet if it doesn't exist so we can add it to the book
    xlsx.utils.book_append_sheet(workbook, xlsx.utils.json_to_sheet([]), sheetName);
  }

  const rowData: any = {
    "Registration ID": regId,
    "Registration Type": sheetName,
    "Name": data.name,
    "Email": data.email,
    "Phone": data.phone,
    "Country": data.country,
    "City": data.city,
  };

  if (data.type === "family") {
    rowData["Family Members Count"] = data.familyMembersCount;
  } else if (data.type === "group") {
    rowData["Group/Org Name"] = data.groupName;
    rowData["Group Size"] = data.groupSize;
  } else if (data.type === "institution") {
    rowData["Institution Name"] = data.institutionName;
    rowData["Designation"] = data.designation;
  } else if (data.type === "yatra") {
    rowData["Yatra Name"] = data.yatraName;
  }

  rowData["Submitted At"] = timestamp;

  json.push(rowData);

  const newWorksheet = xlsx.utils.json_to_sheet(json);
  workbook.Sheets[sheetName] = newWorksheet;

  try {
    const buffer = xlsx.write(workbook, { bookType: "xlsx", type: "buffer" });
    fs.writeFileSync(filePath, buffer);
  } catch (err: any) {
    console.error("Failed to write Excel file:", err);
    throw new Error(`Failed to write Excel file to ${filePath}. Please ensure the file is not open in another program. Original error: ${err.message}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const timestamp = getISTTimestamp();

    let registrationId = `REG-${Date.now().toString().slice(-6)}`;
    try {
      const dbType = data.type === "yatra" ? "youth" : data.type;

      const { neon } = require("@neondatabase/serverless");
      const sql = neon(process.env.DATABASE_URL!);
      
      const cuid = "cuid_" + Date.now().toString(36) + Math.random().toString(36).substr(2);
      
      await sql`
        INSERT INTO "Registration" (id, type, name, email, phone, country, city, "createdAt")
        VALUES (${cuid}, ${dbType}, ${data.name}, ${data.email}, ${data.phone}, ${data.country}, ${data.city}, NOW())
      `;
      registrationId = cuid;
    } catch (dbErr) {
      console.warn("Neon DB failed, continuing with Excel storage only", dbErr);
    }

    // Save to server-side Excel file
    saveToExcel(data, registrationId, timestamp);

    // Fire-and-forget email — don't block response
    sendRegistrationConfirmation(data).catch(console.error);

    return NextResponse.json({ success: true, id: registrationId }, { status: 201 });
    } catch (err: any) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: err.issues }, { status: 422 });
    }
    console.error("[POST /api/register]", err);
    return NextResponse.json({ message: "Server error", error: err?.message || String(err), stack: err?.stack }, { status: 500 });
  }
}
