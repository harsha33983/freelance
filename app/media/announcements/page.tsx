import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Announcements" };
export default function AnnouncementsPage() {
  return (
    <ContentPage badge="Announcements" title="Official Announcements"
      subtitle="Important updates, schedule announcements, and official communications from the Mahotsav Trust."
      body={[
        "Registration is now open for the Bhagavad Gita Vishwa Mahotsav 2027. Early registrations receive priority seating and special recognition.",
        "The Curtain Raiser on 20 December 2026 is confirmed. Local events are now being coordinated across all 18 host countries.",
        "Partnership applications are open. Organisations wishing to partner as Title, Platinum, Gold, or Community Partners are invited to submit proposals through the Partners section.",
        "The Volunteer Programme is now accepting applications. Over 500 volunteers are needed across all programme areas.",
      ]}
    />
  );
}
