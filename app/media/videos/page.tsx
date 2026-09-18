import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import { Play, Video } from "lucide-react";
import ClientVideo from "@/components/ui/ClientVideo";

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const metadata: Metadata = { title: "Videos" };

function getYoutubeId(url: string) {
  if (!url) return null;
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

export default async function VideosPage() {
  let allVideos: any[] = [];
  try {
    const { neon } = await import("@neondatabase/serverless");
    const sql = neon(process.env.DATABASE_URL || "postgresql://neondb_owner:npg_3qNiDTwWsx4f@ep-muddy-flower-ax0xloce-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require&pgbouncer=true");
    
    // Fetch YouTube videos
    const ytVideos = await sql`SELECT id, title, description, "youtubeUrl" as url, "publishedAt" as date, 'youtube' as type FROM "Video" ORDER BY "publishedAt" DESC LIMIT 100`;
    
    // Fetch R2 hosted videos
    const r2Videos = await sql`SELECT id, title, description, video_url as url, created_at as date, 'r2' as type FROM "videos" WHERE status = 'ready' ORDER BY created_at DESC LIMIT 100`;
    
    // Combine and sort by date descending
    allVideos = [...ytVideos, ...r2Videos].sort((a, b) => {
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    });
  } catch (err) {
    console.error("Failed to fetch videos:", err);
  }

  return (
    <>
      <PageHero badge="Videos" title="Videos" subtitle="Event recordings, promotional films, and community stories from the Mahotsav." />
      <section className="bg-white section-pad">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allVideos.map((v) => {
              
              if (v.type === 'youtube') {
                const videoId = getYoutubeId(v.url);
                return (
                  <div key={`yt-${v.id}`} className="card-base p-0 overflow-hidden flex flex-col group">
                    <div className="aspect-video bg-ink w-full relative">
                      {videoId ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title={v.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full absolute inset-0"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gold/50">
                          <Video size={32} />
                          <span className="text-xs font-sans mt-2">Invalid Video Link</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-serif text-lg font-semibold text-ink mb-1">{v.title}</h3>
                      <p className="text-ink-muted text-sm font-sans line-clamp-2 mb-2">{v.description}</p>
                      <div className="mt-auto pt-2 text-xs text-gray-400">
                        {v.date ? new Date(v.date).toLocaleDateString() : ''}
                      </div>
                    </div>
                  </div>
                );
              }

              // R2 Video rendering
              if (v.type === 'r2') {
                return (
                  <div key={`r2-${v.id}`} className="card-base p-0 overflow-hidden flex flex-col group">
                    <div className="aspect-video bg-black w-full relative">
                      {v.id ? (
                        <ClientVideo
                          src={`/api/videos/${v.id}/stream`}
                          className="w-full h-full object-contain absolute inset-0"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gold/50">
                          <Video size={32} />
                          <span className="text-xs font-sans mt-2">Video Unavailable</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-serif text-lg font-semibold text-ink mb-1">{v.title}</h3>
                      <p className="text-ink-muted text-sm font-sans line-clamp-2 mb-2">{v.description}</p>
                      <div className="mt-auto pt-2 text-xs text-gray-400">
                        {v.date ? new Date(v.date).toLocaleDateString() : ''}
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            })}
            
            {allVideos.length === 0 && (
              <div className="col-span-3 text-center py-16 text-ink-muted font-sans">
                No videos published yet. Check back soon.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
