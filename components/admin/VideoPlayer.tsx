"use client";

import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  url: string;
  title?: string;
  className?: string;
}

export default function VideoPlayer({ url, title, className = "" }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // In the future, if we switch to HLS (.m3u8), we can initialize hls.js here based on the url.
  
  return (
    <div className={`relative w-full overflow-hidden bg-black rounded-lg aspect-video flex items-center justify-center ${className}`}>
      <video
        ref={videoRef}
        src={url}
        controls
        playsInline
        title={title}
        className="w-full h-full object-contain"
        preload="metadata"
        onError={(event) => {
          console.error("Video playback failed", {
            src: event.currentTarget.currentSrc,
            error: event.currentTarget.error
          });
        }}
      >
        Your browser does not support HTML5 video.
      </video>
    </div>
  );
}
