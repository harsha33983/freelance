import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";
import Link from "next/link";
import Image from "next/image";

interface ContentPageProps {
  badge: string;
  title: string;
  subtitle: string;
  body: string[];
  cta?: { label: string; href: string };
  image?: string;
}

export default function ContentPage({ badge, title, subtitle, body, cta, image }: ContentPageProps) {
  return (
    <>
      <PageHero badge={badge} title={title} subtitle={subtitle} />
      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl">
          
          {image && (
            <div className="mb-12 rounded-lg overflow-hidden shadow-xl border border-gold/20">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-auto object-cover"
              />
            </div>
          )}

          <div className="space-y-6 text-ink-body font-sans text-base leading-relaxed">
            {body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          {cta && (
            <>
              <GoldDivider className="my-10" />
              <div className="text-center">
                <Link href={cta.href} className="btn-gold">
                  {cta.label}
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
