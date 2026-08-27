"use client";

export default function AnnouncementBar() {
  const messages = [
    "20 DECEMBER 2026 — CURTAIN RAISER",
    "27 FEBRUARY 2027 — BHAGAVAD GITA MAHOTSAV",
    "50,000+ PARTICIPANTS ACROSS 18 COUNTRIES",
    "18 CHAPTERS • 18 LANGUAGES • ONE GITA",
    "SREE MEDIA ",
    "SKYLINE MEDIA ",
    "PROPEL FORGE",
    "FIRSTLOOKS EVENTS ",
  ];

  const repeated = Array(8).fill(messages).flat();

  return (
    <div className="bg-[#D4AF37] text-white py-4 overflow-hidden relative z-50">
      <div className="flex whitespace-nowrap animate-marquee w-max">
        {repeated.map((msg, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-xs font-sans font-semibold tracking-widest2 px-8">
              {msg}
            </span>
            <span className="text-white opacity-80 text-lg">
          ॰
        </span>
          </span>
        ))}
      </div>
    </div>
  );
}
