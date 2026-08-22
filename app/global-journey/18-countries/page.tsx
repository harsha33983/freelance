import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import CountriesMap from "@/components/global-journey/CountriesMap";

export const metadata: Metadata = {
  title: "18 Countries",
  description:
    "Eighteen nations joining one global Bhagavad Gita journey as part of Vishwa Mahotsav 2027.",
};

export default function CountriesPage() {
  return (
    <>
      <PageHero
        badge="Global Journey"
        title="18 Countries. One Global Journey."
        subtitle="Explore the 18 countries represented in the Bhagavad Gita Vishwa Mahotsav 2027. Select a country on the map to discover its journey, language, stories, gallery and videos."
      />

      <CountriesMap />
    </>
  );
}
