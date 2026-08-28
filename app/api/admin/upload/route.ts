import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin(req);
  if (error) return error;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    
    if (!file) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    // 5MB file size limit to protect database
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: "File exceeds 5MB limit" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert file to Base64 Data URL for zero-config serverless deployment
    const mimeType = file.type || "application/octet-stream";
    const base64 = buffer.toString("base64");
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({ url: dataUrl }, { status: 201 });
  } catch (err: any) {
    console.error("[POST /api/admin/upload]", err);
    return NextResponse.json({ message: "Upload failed", error: err?.message }, { status: 500 });
  }
}
