/**
 * Prisma seed — populates the DB with sample data for development.
 * Run: npx prisma db seed
 */

import bcrypt from "bcryptjs";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database…");

  // Admin
  const passwordHash = await bcrypt.hash("admin2027", 12);
  await prisma.admin.upsert({
    where: { email: "admin@bgvmahotsav2027.org" },
    update: {},
    create: { email: "admin@bgvmahotsav2027.org", passwordHash, role: "admin" },
  });
  console.log("  ✓ Admin: admin@bgvmahotsav2027.org / admin2027");

  // Sample news articles
  const articles = [
    {
      title: "Bhagavad Gita Vishwa Mahotsav 2027 Officially Announced",
      slug: "mahotsav-officially-announced",
      category: "Announcement",
      excerpt: "The Bhagavad Gita Vishwa Mahotsav Trust formally announces the Mahotsav on 27 February 2027.",
      body: "<p>The Bhagavad Gita Vishwa Mahotsav Trust is proud to announce the <strong>Bhagavad Gita Vishwa Mahotsav 2027</strong> — the world's largest Bhagavad Gita celebration, spanning 18 countries, 18 chapters, and 18 languages.</p><p>The event will culminate in a Mahotsav on 27 February 2027, with over 50,000 participants expected to attend in person.</p>",
      author: "Mahotsav Team",
      publishedAt: new Date("2026-09-01"),
    },
    {
      title: "Registration Opens for the Curtain Raiser",
      slug: "curtain-raiser-registration-open",
      category: "News",
      excerpt: "Registrations are now open for the Curtain Raiser event on 20 December 2026.",
      body: "<p>The Bhagavad Gita Vishwa Mahotsav Trust is pleased to announce that registrations are now open for the Curtain Raiser event on <strong>20 December 2026</strong> — Gita Jayanti.</p><p>Communities across all 18 host countries will celebrate simultaneously, reciting the first chapter of the Gita and lighting the flame of the Vishwa Mahotsav.</p>",
      author: "Mahotsav Team",
      publishedAt: new Date("2026-10-01"),
    },
    {
      title: "18 Host Countries Confirmed for the Global Journey",
      slug: "18-host-countries-confirmed",
      category: "News",
      excerpt: "All 18 host countries for the chapter events have been confirmed, spanning every inhabited continent.",
      body: "<p>The Bhagavad Gita Vishwa Mahotsav is proud to confirm all 18 host countries for the Global Journey chapter events.</p><p>The countries are: India (Chapters 1 & 18), United Kingdom (Chapter 2), United States (Chapter 3), Australia (Chapter 4), Canada (Chapter 5), Germany (Chapter 6), Japan (Chapter 7), Brazil (Chapter 8), South Africa (Chapter 9), France (Chapter 10), Russia (Chapter 11), Singapore (Chapter 12), Israel (Chapter 13), New Zealand (Chapter 14), UAE (Chapter 15), Kenya (Chapter 16), Argentina (Chapter 17).</p>",
      author: "Mahotsav Team",
      publishedAt: new Date("2026-10-15"),
    },
  ];

  for (const article of articles) {
    await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    });
  }
  console.log(`  ✓ ${articles.length} news articles`);

  // Sample press kit files
  const pressFiles = [
    { title: "Event Overview Brochure (PDF)", fileUrl: "https://example.com/bgvm-brochure.pdf", fileType: "pdf" },
    { title: "Official Logo Pack (ZIP)", fileUrl: "https://example.com/bgvm-logos.zip", fileType: "zip" },
    { title: "Mahotsav Fact Sheet", fileUrl: "https://example.com/bgvm-factsheet.pdf", fileType: "pdf" },
  ];

  for (const file of pressFiles) {
    await prisma.pressKitFile.create({ data: file }).catch(() => {}); // skip if exists
  }
  console.log(`  ✓ ${pressFiles.length} press kit files`);

  console.log("\n🎉 Seed complete!\n");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
