import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
import { globalJourneyPages } from "@/lib/pageContent";

export const metadata: Metadata = {
  title: "Global Parayana",
  description: "The world's largest Bhagavad Gita recitation — 50,000 voices on 27 February 2027.",
};

export default function GlobalParayanaPage() {
  const data = globalJourneyPages["global-parayana"];
  return <ContentPage {...data} cta={{ label: "Register to Participate", href: "/participate/register" }} />;
}
