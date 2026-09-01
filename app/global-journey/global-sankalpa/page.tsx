import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
import { globalJourneyPages } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: "Global Sankalpa",
  description: "The Global Gita Sankalpa — a collective sacred vow taken by all Mahotsav participants on 27 February 2027.",
};

export default function GlobalSankalpaPage() {
  const data = globalJourneyPages["global-sankalpa"];
  return <ContentPage {...data}  />;
}
