import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { neon } from "@neondatabase/serverless";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
interface Props { params: { slug: string }; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
  
  try {
    const rows = await sql`SELECT title, category, "coverImage" FROM "NewsArticle" WHERE slug = ${params.slug} LIMIT 1`;
    if (rows.length > 0) {
      const article = rows[0];
      return {
        title: `${article.title} | Bhagavad Gita Vishwa Mahotsav 2027`,
        description: `Read the latest ${article.category} from the Bhagavad Gita Vishwa Mahotsav.`,
        alternates: {
          canonical: `https://divineaura.world/media/news/${params.slug}`,
        },
        openGraph: {
          title: article.title,
          description: `Read the latest ${article.category} from the Bhagavad Gita Vishwa Mahotsav.`,
          url: `https://divineaura.world/media/news/${params.slug}`,
          type: "article",
          images: article.coverImage ? [article.coverImage] : ["/og-image.jpg"],
        },
      };
    }
  } catch (err) {
    console.error("Metadata fetch error:", err);
  }

  return {
    title: `News | ${params.slug.replace(/-/g, " ")}`,
    alternates: {
      canonical: `https://divineaura.world/media/news/${params.slug}`,
    }
  };
}

export default async function NewsDetailPage({ params }: Props) {
  let article: any = null;
  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const rows = await sql`SELECT * FROM "NewsArticle" WHERE slug = ${params.slug} LIMIT 1`;
    if (rows.length > 0) article = rows[0];
  } catch (err) {
    console.error("Failed to fetch news article:", err);
  }

  if (!article) {
    article = {
      title: params.slug.split("-").map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
      publishedAt: new Date().toISOString(),
      author: "Mahotsav Team",
      category: "News",
    };
  }

  return (
    <>
      <PageHero badge={article.category} title={article.title} />
      <section className="bg-white section-pad">
        <div className="container-main max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/media/news" className="flex items-center gap-2 text-gold text-sm font-sans font-semibold hover:underline">
              <ArrowLeft size={14} /> Back to News
            </Link>
            <span className="text-ink-muted text-sm font-sans flex items-center gap-1">
              <CalendarDays size={13} />
              {new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            {article.author && <span className="text-ink-muted text-sm font-sans">by {article.author}</span>}
          </div>
          
          {article.coverImage && (
            <div className="mb-8">
              <img src={article.coverImage} alt={article.title} className="w-full rounded-sm object-cover max-h-[400px]" fetchPriority="high" />
              {article.caption && (
                <p className="text-center text-sm text-ink-muted mt-2 font-sans italic">{article.caption}</p>
              )}
            </div>
          )}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article.title,
            "image": article.coverImage ? [article.coverImage] : ["https://divineaura.world/og-image.jpg"],
            "datePublished": article.publishedAt,
            "author": {
              "@type": "Person",
              "name": article.author || "Mahotsav Team"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Bhagavad Gita Vishwa Mahotsav",
              "logo": {
                "@type": "ImageObject",
                "url": "https://divineaura.world/icon.jpg"
              }
            }
          })
        }}
      />
    </>
  );
}
