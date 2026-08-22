const fs = require('fs');
const content = `import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/media/GalleryGrid";
import { neon } from "@neondatabase/serverless";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photography and images from the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export const revalidate = 0; // Disable static caching so it always fetches fresh data

export default async function GalleryPage() {
  let items: any[] = [];
  try {
    const sql = neon(process.env.DATABASE_URL!);
    items = await sql\`SELECT * FROM "GalleryItem" ORDER BY "uploadedAt" DESC LIMIT 100\`;
  } catch (err) {
    console.error("Failed to load gallery items:", err);
  }

  return (
    <>
      <PageHero badge="Gallery" title="Photo Gallery" subtitle="Images from events, venues, and communities across the Mahotsav journey." />
      <GalleryGrid initialItems={items} />
    </>
  );
}
`;
fs.writeFileSync('C:\\Users\\Harsha\\Music\\bgvm2027\\app\\media\\gallery\\page.tsx', content);
