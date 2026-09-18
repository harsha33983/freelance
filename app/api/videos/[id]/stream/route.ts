import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const sql = neon(process.env.DATABASE_URL || "");
    const videos = await sql`SELECT storage_key, mime_type FROM "videos" WHERE id = ${params.id}`;
    
    if (videos.length === 0) {
      return new NextResponse("Video not found", { status: 404 });
    }
    
    const { storage_key, mime_type } = videos[0];

    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: storage_key,
      ResponseContentType: mime_type,
    });

    // Generate a secure signed URL valid for 6 hours
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 6 * 60 * 60 });
    
    // Redirect the browser to the signed URL, which supports Range requests naturally via R2.
    return NextResponse.redirect(signedUrl);
  } catch (err: any) {
    console.error(`[GET /api/videos/${params.id}/stream]`, err);
    return new NextResponse("Server error", { status: 500 });
  }
}
