import { neon } from '@neondatabase/serverless';
async function run() {
  const sql = neon('postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true');
  try {
    await sql`ALTER TABLE "NewsArticle" DROP COLUMN "excerpt"`;
    console.log("Dropped excerpt column");
  } catch(e) {
    console.log("Error dropping excerpt", e);
  }
  try {
    await sql`ALTER TABLE "NewsArticle" DROP COLUMN "body"`;
    console.log("Dropped body column");
  } catch(e) {
    console.log("Error dropping body", e);
  }
}
run();
