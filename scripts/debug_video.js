const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env' });

async function run() {
  const sql = neon(process.env.DATABASE_URL);
  try {
    const videos = await sql`SELECT * FROM "videos" WHERE title = 'Gnanavyuham-StudentsADDEDIT'`;
    if (videos.length === 0) {
      console.log("Video not found in database.");
      return;
    }
    const video = videos[0];
    console.log("Database Record:", {
      id: video.id,
      title: video.title,
      file_size: video.file_size,
      mime_type: video.mime_type,
      storage_key: video.storage_key,
      video_url: video.video_url,
      status: video.status
    });

    console.log("\nAttempting to fetch the video URL...");
    const response = await fetch(video.video_url, {
        headers: {
            "Range": "bytes=0-"
        }
    });
    console.log("Response Status:", response.status);
    const bodyText = await response.text();
    console.log("Response Body Prefix (first 200 chars):", bodyText.substring(0, 200));

  } catch(e) {
    console.log("Error:", e);
  }
}
run();
