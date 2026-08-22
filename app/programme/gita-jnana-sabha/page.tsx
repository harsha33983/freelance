import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Gita Jnana Sabha" };
export default function GitaJnanaSabhaPage() {
  return (
    <ContentPage
      badge="24–26 February 2027"
      title="Gita Jnana Sabha"
      subtitle="Three days of scholarly discourse, interfaith dialogue, and wisdom transmission — the intellectual heart of the Mahotsav."
      body={[
        "The Gita Jnana Sabha is a three-day programme of scholarly and spiritual discourses running concurrently with the main Mahotsav events. It features the world's foremost Gita scholars, spiritual teachers, and thought leaders.",
        "The Sabha is structured around the 18 chapters of the Gita — with each day featuring discourses on six chapters. Each discourse explores the chapter's core teachings, their philosophical context, and their application to contemporary life.",
        "The Sabha also includes panel discussions on themes such as: the Gita and modern psychology, the Gita and leadership, the Gita and ecology, and the Gita as a foundation for interfaith dialogue.",
        "All Sabha sessions will be recorded, translated, and made freely available as part of the Mahotsav's permanent digital archive.",
      ]}
    />
  );
}
