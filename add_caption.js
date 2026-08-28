import { neon } from '@neondatabase/serverless';
async function run() {
  const sql = neon('postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true');
  try {
    await sql`ALTER TABLE "NewsArticle" ADD COLUMN "caption" TEXT`;
    console.log("Added caption column");
  } catch(e) {
    console.log("Error or already exists", e);
  }
}
run();
