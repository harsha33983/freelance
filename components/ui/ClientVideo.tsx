"use client";

interface ClientVideoProps {
  src: string;
  className?: string;
}

export default function ClientVideo({ src, className }: ClientVideoProps) {
  return (
    <video
      src={src}
      controls
      playsInline
      preload="metadata"
      className={className}
      onError={(event) => {
        console.error("Video playback failed", {
          src: event.currentTarget.currentSrc,
          error: event.currentTarget.error
        });
      }}
    />
  );
}
