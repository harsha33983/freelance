import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Central Stage" };
export default function CentralStagePage() {
  return (
    <ContentPage
      badge="Central Stage"
      title="Where Wisdom Meets Wonder"
      subtitle="The Central Stage of the Mahotsav — a world-class platform for the greatest Gita event ever staged."
      body={[
        "The Central Stage is the heart of the Mahotsav venue — a purpose-built, architecturally remarkable platform designed to hold the Grand Parayana, the Gita Sankalpa, the cultural finale, and the ceremonial events of the Mahotsav.",
        "The stage is designed in the form of a lotus — the universal symbol of spiritual unfolding — with petals that open to create multiple performance and recitation configurations. At its centre is an artistic installation of the Gita's first and last verses.",
        "The stage is surrounded by a recitation ground accommodating 50,000 participants in concentric circles — a layout that creates a sense of shared sacred space and collective focus.",
        "State-of-the-art audio, lighting, and live-streaming infrastructure ensure that every word, every verse, and every moment is experienced with full clarity by all participants — whether present in person or watching from anywhere in the world.",
      ]}
    />
  );
}
