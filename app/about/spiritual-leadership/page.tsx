import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Spiritual Leadership" };
export default function SpiritualLeadershipPage() {
  return (
    <ContentPage
      badge="Spiritual Leadership"
      title="Spiritual Leadership"
      subtitle="The saints, acharyas, and spiritual teachers whose blessings and guidance sanctify the Mahotsav."
      body={[
        "The Bhagavad Gita Vishwa Mahotsav draws its deepest inspiration and spiritual authority from the lineage of great Gita teachers — from Adi Shankaracharya to Sri Ramakrishna, from Swami Vivekananda to Swami Prabhupada and beyond.",
        "The Mahotsav's Patron Spiritual Head is a revered contemporary acharya whose life and teachings embody the Gita's principles of knowledge, devotion, and selfless action.",
        "The Peetadhipati Sammelanam — an assembly of the heads of India's major spiritual institutions — forms the spiritual governing council of the Mahotsav, ensuring that its content and conduct are in full alignment with the Gita's teachings.",
        "We are deeply grateful to the many spiritual teachers, acharyas, and practitioners who have offered their time, wisdom, and blessings to this sacred endeavour.",
      ]}
    />
  );
}
