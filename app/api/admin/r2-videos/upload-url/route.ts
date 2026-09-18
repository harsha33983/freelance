import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function POST(req: NextRequest) {
  const { admin, error } = await requireAdmin(req);
  if (error) return error;

  try {
    const { fileName, fileType, fileSize } = await req.json();

    if (!fileName || !fileType || !fileSize) {
      return NextResponse.json({ message: "Missing file information" }, { status: 400 });
    }

    const maxSizeMb = parseInt(process.env.MAX_VIDEO_SIZE_MB || "2048", 10);
    const maxSizeBytes = maxSizeMb * 1024 * 1024;
    
    if (fileSize > maxSizeBytes) {
      return NextResponse.json({ message: `File size exceeds the limit of ${maxSizeMb}MB` }, { status: 413 });
    }

    // Basic validation of content type
    if (!fileType.startsWith("video/")) {
      return NextResponse.json({ message: "Invalid file type. Only videos are allowed." }, { status: 415 });
    }

    // Generate unique storage key
    const uuid = crypto.randomUUID();
    const safeFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const storageKey = `videos/${admin.adminId}/${uuid}/${safeFileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: storageKey,
      ContentType: fileType,
      ContentLength: fileSize,
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // 1 hour

    return NextResponse.json({
      uploadUrl: signedUrl,
      storageKey: storageKey,
    });

  } catch (err: any) {
    console.error("[POST /api/admin/r2-videos/upload-url]", err);
    return NextResponse.json({ message: "Server error", error: err?.message }, { status: 500 });
  }
}
