import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Image from "next/image";

export const metadata: Metadata = { title: "Four Sacred Entrances" };

export default function FourPathwaysPage() {
  return (
    <>
      <PageHero 
        badge="Four Pathways" 
        title="THE FOUR SACRED ENTRANCES" 
        subtitle="Four Vedas • One Eternal Wisdom • One Gita" 
      />
      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl space-y-8 font-sans text-ink-body text-base leading-relaxed">
          
          <p className="text-lg">
            The Mahotsav venue is designed so that every participant chooses their primary pathway into the experience. The four entrances can represent the four foundational streams of Vedic knowledge, with all four journeys converging toward the Bhagavadgita at the heart of the Mahotsav.
          </p>

          <div className="my-10 rounded-lg overflow-hidden shadow-md">
            <Image 
              src="/vedas.jpg" 
              alt="The Four Vedas - Sacred Entrances" 
              width={1200} 
              height={800} 
              className="w-full h-auto object-cover"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-[#FAF8F2] p-8 rounded-sm border border-gold/20">
              <h3 className="text-xl font-serif font-semibold text-gold mb-3">01 — RIGVEDA DWARA</h3>
              <p className="font-semibold text-ink text-lg mb-1">The Gateway of Knowledge & Invocation</p>
              <p className="italic text-ink-muted mb-4">“Where the journey of sacred knowledge begins.”</p>
              <p><span className="font-semibold text-ink">Theme:</span> Wisdom • Knowledge • Invocation</p>
            </div>

            <div className="bg-[#FAF8F2] p-8 rounded-sm border border-gold/20">
              <h3 className="text-xl font-serif font-semibold text-gold mb-3">02 — YAJURVEDA DWARA</h3>
              <p className="font-semibold text-ink text-lg mb-1">The Gateway of Action & Dharma</p>
              <p className="italic text-ink-muted mb-4">“Where knowledge becomes purposeful action.”</p>
              <p><span className="font-semibold text-ink">Theme:</span> Duty • Action • Discipline</p>
            </div>

            <div className="bg-[#FAF8F2] p-8 rounded-sm border border-gold/20">
              <h3 className="text-xl font-serif font-semibold text-gold mb-3">03 — SAMAVEDA DWARA</h3>
              <p className="font-semibold text-ink text-lg mb-1">The Gateway of Harmony & Devotion</p>
              <p className="italic text-ink-muted mb-4">“Where wisdom finds its voice in music and devotion.”</p>
              <p><span className="font-semibold text-ink">Theme:</span> Music • Harmony • Devotion</p>
            </div>

            <div className="bg-[#FAF8F2] p-8 rounded-sm border border-gold/20">
              <h3 className="text-xl font-serif font-semibold text-gold mb-3">04 — ATHARVAVEDA DWARA</h3>
              <p className="font-semibold text-ink text-lg mb-1">The Gateway of Life & Well-being</p>
              <p className="italic text-ink-muted mb-4">“Where wisdom embraces life, harmony and well-being.”</p>
              <p><span className="font-semibold text-ink">Theme:</span> Life • Well-being</p>
            </div>
          </div>
          
        </div>
      </section>
    </>
  );
}
