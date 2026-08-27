import type { Metadata } from "next";
import PressKitList from "@/components/media/PressKitList";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Downloads" };

export default async function DownloadsPage() {
  let files: any[] = [];
  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    files = await sql`SELECT * FROM "PressKitFile" ORDER BY "uploadedAt" DESC`;
  } catch (err) {
    console.error("Failed to fetch downloads:", err);
  }

  return (
    <>
      <PageHero badge="Downloads" title="Downloads" subtitle="Brochures, registration forms, parayana guides, and other downloadable resources." />
      <PressKitList initialFiles={files} />
    </>
  );
}
