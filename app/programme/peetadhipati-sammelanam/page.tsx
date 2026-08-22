import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Peetadhipati Sammelanam" };
export default function PeetadhipatiPage() {
  return (
    <ContentPage
      badge="24 February 2027"
      title="Peetadhipati Sammelanam"
      subtitle="An unprecedented assembly of India's foremost spiritual heads — Shankaracharyas, Mathadhipatis, and Peethapatis — converging to bless and inaugurate the Mahotsav."
      body={[
        "The Peetadhipati Sammelanam is one of the most historically significant events of the Mahotsav — a gathering of the heads of India's major spiritual institutions and monastic orders.",
        "For the first time in modern history, representatives from across the full spectrum of India's spiritual traditions — Advaita, Vaishnava, Shaiva, and others — will come together under the unifying banner of the Bhagavad Gita.",
        "The Sammelanam will include a formal address by each participating spiritual head, a joint declaration on the universal relevance of the Gita in the 21st century, and a ceremonial inauguration of the Mahotsav.",
        "This gathering is itself a demonstration of one of the Gita's central teachings: that the same eternal truth (sanatana dharma) underlies all genuine spiritual paths. The diversity of traditions honoured at the Sammelanam is an expression of that unity.",
      ]}
    />
  );
}
