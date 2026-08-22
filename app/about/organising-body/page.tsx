import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Organising Body" };
export default function OrganisingBodyPage() {
  return (
    <ContentPage
      badge="Organising Body"
      title="About the Organising Body"
      subtitle="The Bhagavad Gita Vishwa Mahotsav Trust — the institutional foundation of the world's largest Gita celebration."
      body={[
        "The Bhagavad Gita Vishwa Mahotsav 2027 is organised by the Bhagavad Gita Vishwa Mahotsav Trust — a not-for-profit organisation established specifically for the purpose of planning, executing, and sustaining the Mahotsav and its legacy initiatives.",
        "The Trust is governed by a Board of Trustees drawn from spiritual, academic, cultural, and civic life — bringing together the diverse expertise required to execute an event of this scale and complexity.",
        "The Trust works in close collaboration with the Spiritual Advisory Council, the Global Organising Committee, and a network of institutional partners across all 18 host countries.",
        "All financial accounts of the Trust are independently audited and publicly available. The Trust is committed to the highest standards of transparency, accountability, and ethical governance.",
      ]}
    />
  );
}
