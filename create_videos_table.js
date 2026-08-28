import { neon } from '@neondatabase/serverless';
async function run() {
  const sql = neon('postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true');
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "Video" (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        "youtubeUrl" TEXT NOT NULL,
        "publishedAt" TIMESTAMP,
        "createdAt" TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log("Video table created!");
  } catch(e) {
    console.log("Error", e);
  }
}
run();
