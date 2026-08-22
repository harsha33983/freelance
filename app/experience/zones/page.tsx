import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Cultural & Spiritual Zones" };
export default function ZonesPage() {
  return (
    <ContentPage
      badge="Cultural & Spiritual Zones"
      title="A World to Explore"
      subtitle="Beyond the main stage and programme — a rich landscape of cultural, spiritual, and contemplative spaces."
      body={[
        "The Mahotsav venue is divided into distinct zones, each offering a different facet of the Gita's multi-dimensional wisdom.",
        "The Cultural Pavilion houses the Art of the Gita Exhibition, live folk arts performances, traditional crafts, and a global food court celebrating the cuisines of all 18 participating nations.",
        "The Spiritual Marketplace features over 200 exhibitors — publishers, NGOs, spiritual institutions, and Gita-inspired social enterprises — from across India and the world.",
        "The Contemplative Garden is a large, beautifully landscaped space with walking meditation paths, sitting areas, water features, and installations inspired by the Gita's teachings on nature and the divine.",
        "The Wellness Village offers daily yoga classes, Ayurvedic consultations, and guided meditation sessions from sunrise to sunset throughout the Mahotsav.",
      ]}
    />
  );
}
