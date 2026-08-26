const { neon } = require('@neondatabase/serverless');

async function run() {
  const sql = neon("postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
  try {
    const articles = await sql`SELECT * FROM "NewsArticle"`;
    console.log("Articles:", articles);
  } catch (err) {
    console.error(err);
  }
}
run();
