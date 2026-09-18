"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Play, AlertTriangle } from "lucide-react";
import VideoUpload from "@/components/admin/VideoUpload";
import VideoPlayer from "@/components/admin/VideoPlayer";
import toast from "react-hot-toast";

interface Video {
  id: string;
  title: string;
  description: string;
  file_name: string;
  file_size: number;
  mime_type: string;
  video_url: string;
  status: string;
  created_at: string;
}

export default function R2VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchVideos = async () => {
    try {
      setIsLoading(true);
      // Wait, is there a token we need to pass? 
      // The Next.js API routes use getTokenFromRequest which checks cookies.
      // So fetch should just work since cookies are sent by default.
      const res = await fetch("/api/admin/r2-videos");
      if (!res.ok) throw new Error("Failed to fetch videos");
      const data = await res.json();
      setVideos(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load videos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to permanently delete this video? This will remove the file from storage.")) {
      return;
    }
    
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/r2-videos/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) throw new Error("Failed to delete video");
      
      toast.success("Video deleted successfully");
      setVideos(videos.filter(v => v.id !== id));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete video");
    } finally {
      setDeletingId(null);
    }
  };

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Video Storage (Cloudflare R2)</h1>
          <p className="text-gray-500 mt-1">Manage large video files hosted on Cloudflare R2.</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          {showUpload ? "Cancel Upload" : "Upload Video"}
        </button>
      </div>

      {showUpload && (
        <div className="mb-8">
          <VideoUpload onSuccess={() => {
            setShowUpload(false);
            fetchVideos();
          }} />
        </div>
      )}

      {/* Video Player Modal */}
      {playingVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="bg-white rounded-xl overflow-hidden w-full max-w-4xl max-h-screen flex flex-col">
            <div className="p-4 flex items-center justify-between border-b">
              <h3 className="font-semibold text-lg truncate pr-4">{playingVideo.title}</h3>
              <button 
                onClick={() => setPlayingVideo(null)}
                className="text-gray-500 hover:text-gray-900 p-1"
              >
                Close
              </button>
            </div>
            <div className="p-4 bg-black flex-1">
              <VideoPlayer url={`/api/videos/${playingVideo.id}/stream`} title={playingVideo.title} />
            </div>
          </div>
        </div>
      )}

      {/* Video List */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Loading videos...</div>
        ) : videos.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center">
            <AlertTriangle className="w-12 h-12 text-gray-300 mb-3" />
            <p>No videos found. Upload your first video above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 text-xs uppercase font-medium border-b">
                <tr>
                  <th className="px-6 py-4">Title</th>
                  <th className="px-6 py-4">File Name</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {videos.map(video => (
                  <tr key={video.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {video.title}
                      {video.description && (
                        <p className="text-xs text-gray-500 font-normal mt-0.5 truncate max-w-xs">{video.description}</p>
                      )}
                    </td>
                    <td className="px-6 py-4 truncate max-w-[200px]" title={video.file_name}>
                      {video.file_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatSize(video.file_size)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(video.created_at)}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3 whitespace-nowrap">
                      <button
                        onClick={() => setPlayingVideo(video)}
                        className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                      >
                        <Play className="w-4 h-4 mr-1" /> View
                      </button>
                      <button
                        onClick={() => handleDelete(video.id)}
                        disabled={deletingId === video.id}
                        className="text-red-600 hover:text-red-800 font-medium inline-flex items-center disabled:opacity-50"
                      >
                        {deletingId === video.id ? (
                          "Deleting..."
                        ) : (
                          <><Trash2 className="w-4 h-4 mr-1" /> Delete</>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
