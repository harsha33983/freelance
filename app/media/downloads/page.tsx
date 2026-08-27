import type { Metadata } from "next";
import PressKitList from "@/components/media/PressKitList";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Downloads" };

export default async function DownloadsPage() {
  let files: any[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://divineaura.world";
    const res = await fetch(`${baseUrl}/api/press-kit`, { cache: "no-store" });
    if (res.ok) files = await res.json();
  } catch {}

  return (
    <>
      <PageHero badge="Downloads" title="Downloads" subtitle="Brochures, registration forms, parayana guides, and other downloadable resources." />
      <PressKitList initialFiles={files} />
    </>
  );
}
