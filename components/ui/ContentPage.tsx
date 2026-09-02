import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";
import Image from "next/image";
import Link from "next/link";

interface ContentPageProps {
  badge: string;
  title: string;
  subtitle: string;
  body: string[];
  cta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
}

export default function ContentPage({ badge, title, subtitle, body, cta, image, imageAlt }: ContentPageProps) {
  return (
    <>
      <PageHero badge={badge} title={title} subtitle={subtitle} />
      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl">
          {image && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-[#E8D6A3]">
              <Image src={image} alt={imageAlt || title} width={1280} height={720} className="w-full h-auto" />
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
