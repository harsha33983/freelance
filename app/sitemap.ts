import { MetadataRoute } from 'next';
import { navGroups } from '@/lib/navData';
import { neon } from '@neondatabase/serverless';

const BASE_URL = 'https://divineaura.world';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [];

  // 1. Static Routes from navData
  navGroups.forEach(group => {
    routes.push({
      url: `${BASE_URL}${group.href}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: group.href === '/' ? 1 : 0.8,
    });
    
    if (group.children) {
      group.children.forEach(child => {
        routes.push({
          url: `${BASE_URL}${child.href}`,
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    }
  });

  // 2. Dynamic Routes (News Articles)
  try {
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    const articles = await sql`SELECT slug, "publishedAt" FROM "NewsArticle"`;
    
    articles.forEach(article => {
      routes.push({
        url: `${BASE_URL}/media/news/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  } catch (err) {
    console.error("Sitemap: Failed to fetch dynamic routes", err);
  }

  // De-duplicate URLs
  const uniqueUrls = new Set<string>();
  const finalSitemap: MetadataRoute.Sitemap = [];
  
  routes.forEach(route => {
    if (!uniqueUrls.has(route.url)) {
      uniqueUrls.add(route.url);
      finalSitemap.push(route);
    }
  });

  return finalSitemap;
}
