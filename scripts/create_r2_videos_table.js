const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env' });

async function run() {
  const sql = neon(process.env.DATABASE_URL);
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS "videos" (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT,
        file_name TEXT NOT NULL,
        file_size BIGINT NOT NULL,
        mime_type TEXT NOT NULL,
        duration REAL,
        storage_key TEXT NOT NULL UNIQUE,
        video_url TEXT,
        thumbnail_url TEXT,
        status TEXT NOT NULL DEFAULT 'pending',
        uploaded_by TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    // Add some indexes for performance
    await sql`CREATE INDEX IF NOT EXISTS idx_videos_status ON "videos" (status);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_videos_uploaded_by ON "videos" (uploaded_by);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_videos_created_at ON "videos" (created_at DESC);`;
    
    console.log("videos table and indexes created successfully!");
  } catch(e) {
    console.log("Error creating videos table:", e);
  }
}
run();
