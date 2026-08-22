import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "CSR Partnership" };
export default function CSRPage() {
  return (
    <ContentPage
      badge="CSR Partnership"
      title="CSR Partnership"
      subtitle="Fulfil your CSR mandate through a partnership that delivers measurable social, cultural, and educational impact."
      body={[
        "Partnership with the Bhagavad Gita Vishwa Mahotsav qualifies as a CSR activity under multiple categories of the Companies Act 2013, Schedule VII — including promotion of education, promotion of art and culture, rural development, and environmental sustainability.",
        "We provide complete CSR documentation, including a detailed impact report measuring social, cultural, and educational outcomes of the Mahotsav and your specific partnership.",
        "CSR partners can choose to fund specific legacy initiatives — such as the Gita in Schools programme, the multilingual Gita digital archive, or the Global Gita Maitri Network — ensuring a targeted, measurable social impact.",
        "We work closely with your CSR team to design a partnership that fulfils your company's CSR policy objectives and maximises your social impact reporting outcomes.",
      ]}
      cta={{ label: "Discuss CSR Partnership", href: "/partners/proposal" }}
    />
  );
}
