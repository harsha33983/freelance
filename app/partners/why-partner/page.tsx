import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Why Partner?" };
export default function WhyPartnerPage() {
  return (
    <ContentPage
      badge="Why Partner?"
      title="Why Partner With the Mahotsav?"
      subtitle="Five compelling reasons to align your organisation with the world's largest Bhagavad Gita celebration."
      body={[
        "1. Unparalleled Reach: The Mahotsav will reach 50,000+ physical participants, 5 million+ virtual viewers, and communities across 18 countries. No other spiritual or cultural event offers this scale of positive, high-engagement audience.",
        "2. Brand Values Alignment: Association with the Bhagavad Gita conveys authenticity, wisdom, cultural depth, and social responsibility — values increasingly sought by discerning consumers and stakeholders.",
        "3. CSR Impact: Partnership with the Mahotsav fulfils multiple dimensions of CSR — cultural preservation, education, community wellbeing, and youth empowerment — with full documentation and impact reporting.",
        "4. Legacy Association: The Mahotsav's nine legacy initiatives will carry the Mahotsav's — and its partners' — impact forward for years and decades. Your brand becomes part of a lasting cultural legacy.",
        "5. Exclusive Network: Partnership gives you access to an exclusive network of spiritual leaders, scholars, cultural figures, government representatives, and global community leaders gathered at the Mahotsav.",
      ]}
      cta={{ label: "Submit a Partnership Proposal", href: "/partners/proposal" }}
    />
  );
}
