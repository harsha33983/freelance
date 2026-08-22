import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
import { globalJourneyPages } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: "18 Languages",
  description: "The Bhagavad Gita in 18 world languages — the multilingual dimension of the Vishwa Mahotsav 2027.",
};

export default function LanguagesPage() {
  const data = globalJourneyPages["18-languages"];
  return <ContentPage {...data} />;
}
