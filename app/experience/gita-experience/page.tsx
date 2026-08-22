import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Gita Experience Zone" };
export default function GitaExperiencePage() {
  return (
    <ContentPage
      badge="Gita Experience Zone"
      title="The Gita Comes Alive"
      subtitle="An immersive, multi-sensory journey through all 18 chapters of the Bhagavad Gita — the most comprehensive interactive Gita experience ever created."
      body={[
        "The Gita Experience Zone is a purpose-built exhibition spanning 18 galleries — one for each chapter. Each gallery immerses visitors in the world of that chapter through narrative, art, music, interactive displays, and contemplative spaces.",
        "Highlights include: a full-scale immersive theatre depicting the Kurukshetra scene from Chapter 1, an interactive dialogue station in Chapter 2 where visitors can explore any verse, a meditation chamber for Chapter 6, and a cosmic theatre for Chapter 11 (the Vishwarupa).",
        "The Zone also features a multilingual library of Gita translations and commentaries, a digital archive of all 18 chapter events from the global journey, and a recording studio where visitors can record their own Gita recitation.",
        "The Gita Experience Zone is open throughout the Mahotsav and will be preserved as a permanent installation.",
      ]}
    />
  );
}
