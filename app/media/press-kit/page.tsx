import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PressKitList from "@/components/media/PressKitList";

export const dynamic = 'force-dynamic';


export const metadata: Metadata = {
  title: "Press Kit",
  description: "Official press kit and media resources for the Bhagavad Gita Vishwa Mahotsav 2027.",
};

export default async function PressKitPage() {
  let files: any[] = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/press-kit`, { cache: "no-store" });
    if (res.ok) files = await res.json();
  } catch {}

  return (
    <>
      <PageHero badge="Press Kit" title="Press Kit & Media Resources" subtitle="Official media assets, press releases, and downloadable resources for media professionals." />
      <PressKitList initialFiles={files} />
    </>
  );
}
