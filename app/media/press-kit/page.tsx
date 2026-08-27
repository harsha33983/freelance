import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PressKitList from "@/components/media/PressKitList";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = {
  title: "Press Kit",
  description: "Official press kit and media resources for the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default async function PressKitPage() {
  let files: any[] = [];
  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    files = await sql`SELECT * FROM "PressKitFile" ORDER BY "uploadedAt" DESC`;
  } catch (err) {
    console.error("Failed to fetch press kit files:", err);
  }

  return (
    <>
      <PageHero badge="Press Kit" title="Press Kit & Media Resources" subtitle="Official media assets, press releases, and downloadable resources for media professionals." />
      <PressKitList initialFiles={files} />
    </>
  );
}
