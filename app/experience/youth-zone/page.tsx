import type { Metadata } from "next";
import ContentPage from "@/components/ui/ContentPage";
export const metadata: Metadata = { title: "Youth Zone" };
export default function YouthZonePage() {
  return (
    <ContentPage
      badge="Youth Zone"
      title="For the Next Generation"
      subtitle="A vibrant, energetic space designed specifically for young seekers — where the Gita meets modern life."
      body={[
        "The Youth Zone is a dedicated area of the Mahotsav venue designed for participants between the ages of 15 and 35. It is conceived not as a junior version of the main event but as a fully-fledged experience in its own right — with its own stage, speakers, and programming.",
        "The Zone features: youth-led Gita discourse sessions, a creative arts installation space, a social entrepreneurship fair showcasing Karma Yoga-inspired projects, a sports and wellness area (reflecting the Gita's teachings on the body), and a global youth network lounge.",
        "The Youth Zone is the home base for all Youth Gita programme participants and the inaugural meeting point for the Mahotsav Youth Network.",
        "Young participants are encouraged to share their Gita-inspired projects, creative works, and community initiatives in the Zone's exhibition space — applications open 3 months before the Mahotsav.",
      ]}
      cta={{ label: "Youth Registration", href: "/participate/youth" }}
    />
  );
}
