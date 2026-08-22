import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Gita Sankalpa" };
export default function GitaSankalpaPage() {
  return (
    <ContentPage
      badge="27 February 2027"
      title="Gita Sankalpa"
      subtitle="The closing ceremony of the Mega Mahotsav — a collective sacred vow to carry the Gita's wisdom into daily life."
      body={[
        "The Gita Sankalpa is the closing act of the Mega Mahotsav — a solemn, joyful, collective moment in which every participant formally commits to living by the Bhagavad Gita's teachings.",
        "The Sankalpa text has been carefully drafted by the Spiritual Advisory Council to be inclusive, universal, and practical — expressing the Gita's core teachings in language accessible to practitioners of all backgrounds.",
        "The Sankalpa is not a religious oath — it is a personal commitment, made in the company of 50,000 fellow seekers, to bring the Gita's wisdom into one's own daily life. It covers three areas: inner practice (meditation, self-enquiry), outer action (service, integrity, non-harm), and community (supporting others on the path).",
        "Every participant who takes the Sankalpa will receive a digital certificate and be enrolled in the Global Gita Maitri Network — a continuing community of practice.",
      ]}
    />
  );
}
