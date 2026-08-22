import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Youth Gita" };
export default function YouthGitaPage() {
  return (
    <ContentPage
      badge="25 February 2027"
      title="Youth Gita"
      subtitle="The next generation meets the Bhagavad Gita — on their own terms, in their own language, with their own questions."
      body={[
        "Youth Gita is a full-day programme dedicated to participants between the ages of 15 and 35 — designed to make the Gita's wisdom immediately relevant to the challenges, questions, and aspirations of young people.",
        "The programme includes: interactive discourse sessions led by young Gita teachers, a youth leadership panel featuring Gita-inspired practitioners from diverse fields, a creative arts showcase (spoken word, music, visual art) inspired by the Gita, and a youth-led Global Sankalpa session.",
        "Youth Gita also features the inaugural meeting of the Mahotsav Youth Network — a global community of young practitioners that will continue to connect and support each other after the Mahotsav.",
        "All young participants (18–30) who register for the Mahotsav are automatically enrolled in the Youth Gita programme unless they opt out.",
      ]}
      cta={{ label: "Youth Registration", href: "/participate/youth" }}
    />
  );
}
