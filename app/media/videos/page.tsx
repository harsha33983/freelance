import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Play } from "lucide-react";

export const metadata: Metadata = { title: "Videos" };

const placeholderVideos = [
  { title: "Mahotsav Announcement Film", category: "Official", embedId: "" },
  { title: "18 Countries — The Global Journey", category: "Documentary", embedId: "" },
  { title: "What is the Bhagavad Gita Vishwa Mahotsav?", category: "Explainer", embedId: "" },
  { title: "Gita in 18 Languages — Preview", category: "Preview", embedId: "" },
  { title: "Meet the Organisers", category: "Behind the Scenes", embedId: "" },
  { title: "Volunteer Stories", category: "Community", embedId: "" },
];

export default function VideosPage() {
  return (
    <>
      <PageHero badge="Videos" title="Videos" subtitle="Event recordings, promotional films, and community stories from the Mahotsav." />
      <section className="bg-white section-pad">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {placeholderVideos.map((v, i) => (
              <div key={i} className="card-base overflow-hidden group">
                <div className="h-48 bg-ink flex items-center justify-center relative">
                  {v.embedId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${v.embedId}`}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={v.title}
                    />
                  ) : (
                    <>
                      
                     
                      <span className="absolute bottom-3 left-3 bg-gold/80 text-ink text-[10px] font-semibold font-sans px-2 py-0.5 rounded-sm">Coming Soon</span>
                    </>
                  )}
                </div>
                <div className="p-4">
                  <span className="text-gold text-[10px] font-semibold font-sans tracking-wider uppercase">{v.category}</span>
                  <h3 className="font-serif text-base font-semibold text-ink mt-1">{v.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
