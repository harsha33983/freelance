import { neon } from '@neondatabase/serverless';
const sql = neon('postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true');
sql`DELETE FROM "Video" WHERE "youtubeUrl" = 'https://share.google/x7BuRocm4HeIj2gsS'`.then(() => console.log('Deleted')).catch(console.error);
