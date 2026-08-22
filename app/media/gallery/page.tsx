import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/media/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photography and images from the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default async function GalleryPage() {
  let items: any[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/gallery`, { cache: "no-store" });
    if (res.ok) items = await res.json();
  } catch {}

  return (
    <>
      <PageHero badge="Gallery" title="Photo Gallery" subtitle="Images from events, venues, and communities across the Mahotsav journey." />
      <GalleryGrid initialItems={items} />
    </>
  );
}
