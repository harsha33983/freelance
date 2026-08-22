import PageHero from "@/components/ui/PageHero";
import GoldDivider from "@/components/ui/GoldDivider";
import Link from "next/link";

interface ContentPageProps {
  badge: string;
  title: string;
  subtitle: string;
  body: string[];
  cta?: { label: string; href: string };
}

export default function ContentPage({ badge, title, subtitle, body, cta }: ContentPageProps) {
  return (
    <>
      <PageHero badge={badge} title={title} subtitle={subtitle} />
      <section className="bg-white section-pad">
        <div className="container-main max-w-4xl">
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
