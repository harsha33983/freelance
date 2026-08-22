import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JoinModal from "@/components/ui/JoinModal";

export const metadata: Metadata = {
  title: {
    default: "Bhagavad Gita Vishwa Mahotsav 2027 — 18 Countries • 18 Chapters • 18 Languages",
    template: "%s | Bhagavad Gita Vishwa Mahotsav 2027",
  },
  description:
    "Join the global celebration of the eternal wisdom of the Bhagavad Gita. 50,000+ participants across 18 countries, 18 chapters, 18 languages. Mahotsav on 27 February 2027.",
  keywords: [
    "Bhagavad Gita",
    "Vishwa Mahotsav 2027",
    "Gita Mahotsav",
    "Global Gita event",
    "ISKCON",
    "spiritual event 2027",
    "18 countries 18 chapters",
  ],
  openGraph: {
    title: "Bhagavad Gita Vishwa Mahotsav 2027",
    description:
      "A Global Celebration of the Eternal Wisdom of the Bhagavad Gita — 18 Countries • 18 Chapters • 18 Languages",
    url: "https://bgvmahotsav2027.org",
    siteName: "Bhagavad Gita Vishwa Mahotsav 2027",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bhagavad Gita Vishwa Mahotsav 2027",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bhagavad Gita Vishwa Mahotsav 2027",
    description: "A Global Celebration of the Eternal Wisdom of the Bhagavad Gita",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://bgvmahotsav2027.org"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <JoinModal />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#111111",
              color: "#C9A227",
              border: "1px solid #C9A227",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
            },
          }}
        />
      </body>
    </html>
  );
}
