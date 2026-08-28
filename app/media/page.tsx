import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { ArrowRight, Newspaper, Megaphone, FileText, BookOpen, Image, Video, Radio, Package, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Media",
  description: "News, gallery, videos, press kit, and downloads from the Bhagavad Gita Vishwa Mahotsav 2027.",
};

const mediaLinks = [
  { icon: Newspaper, title: "News", desc: "Latest news and updates from the Mahotsav.", href: "/media/news" },
  { icon: Image, title: "Gallery", desc: "Photography from events, venues, and programmes.", href: "/media/gallery" },
  { icon: Video, title: "Videos", desc: "Event recordings, promotional films, and interviews.", href: "/media/videos" },
  { icon: Package, title: "Media Coverage", desc: "Official media pack with logos, bios, and assets.", href: "/media/press-kit" },
  { icon: Download, title: "Upcoming Events", desc: "View the schedule for upcoming events and programs.", href: "/media/upcoming" },
];

export default function MediaPage() {
  return (
    <>
      <PageHero badge="Media" title="Media" subtitle="News and media resources from the Bhagavad Gita Vishwa Mahotsav 2027." />
      <section className="bg-white section-pad">
        <div className="container-main grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mediaLinks.map((m) => {
            const Icon = m.icon;
            return (
              <Link key={m.href} href={m.href} className="card-gold-top p-7 group flex flex-col gap-3">
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-ink">{m.title}</h3>
                <p className="text-ink-muted text-sm font-sans leading-relaxed flex-1">{m.desc}</p>
                <span className="text-gold text-xs font-semibold font-sans tracking-wider uppercase flex items-center gap-1 group-hover:gap-2 transition-all">
                  View <ArrowRight size={12} />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
