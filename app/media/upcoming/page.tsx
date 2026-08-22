import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Upcoming Events | Media",
  description: "Explore the schedule of upcoming events, curtain raisers, and programs for the Bhagavad Gita Vishwa Mahotsav 2027.",
};

const events = [
  {
    id: 1,
    title: "Curtain Raiser Event",
    date: "20 December 2026",
    location: "Global Chapters",
    description: "The official launch and curtain raiser for the Bhagavad Gita Vishwa Mahotsav 2027, marking the beginning of the final countdown.",
    type: "Launch",
  },
  {
    id: 2,
    title: "Bhagavad Gita Vishwa Mahotsav",
    date: "27 February 2027",
    location: "Main Venues & Online",
    description: "The grand culmination event with 50,000+ participants across 18 countries chanting and celebrating the wisdom of the Gita.",
    type: "Mahotsav",
  }
];

export default function UpcomingEventsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8]">
      <PageHero
        badge="Events"
        title="Upcoming Events"
        subtitle="Mark your calendars for the upcoming global milestones of the Bhagavad Gita Vishwa Mahotsav."
      />
      
      <section className="container-main py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl p-8 md:p-10 border border-[#E8D6A3] shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#D4AF37] text-white px-4 py-1 rounded-bl-xl text-xs font-bold tracking-widest uppercase">
                {event.type}
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl text-[#2F1B0C] mb-4">
                {event.title}
              </h2>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 text-[#A66A00] font-medium">
                  <Calendar size={18} />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B5A45]">
                  <MapPin size={18} />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <p className="text-[#6B5A45] leading-relaxed mb-8">
                {event.description}
              </p>
              
              <Link
                href="/participate/register"
                className="inline-flex items-center gap-2 text-[#D4AF37] font-semibold hover:text-[#2F1B0C] transition-colors"
              >
                Register Interest <ArrowRight size={16} />
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
