"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, Mail, Phone, ExternalLink } from "lucide-react";

interface SocialPlatform {
  name: string;
  url: string;
  handle: string;
  desktopOffset: { x: number; y: number };
  mobileOffset: { x: number; y: number };
  icon: (props: { className?: string }) => JSX.Element;
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: "WhatsApp",
    url: "https://wa.me/919949945502",
    handle: "+91 99499 45502",
    desktopOffset: { x: 0, y: -140 },
    mobileOffset: { x: 0, y: -98 },
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@bhagavadgitavishwamahotsav",
    handle: "@bhagavadgitavishwamahotsav",
    desktopOffset: { x: 110, y: -88 },
    mobileOffset: { x: 77, y: -62 },
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 12 5 12 5s6.255 0 7.812.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:divineauraworld9@gmail.com",
    handle: "divineauraworld9@gmail.com",
    desktopOffset: { x: 138, y: 30 },
    mobileOffset: { x: 96, y: 21 },
    icon: ({ className = "w-6 h-6" }) => (
      <Mail className={className} />
    ),
  },
  {
    name: "Facebook",
    url: "https://facebook.com/BhagavadGitaVishwaMahotsav",
    handle: "BhagavadGitaVishwaMahotsav",
    desktopOffset: { x: 62, y: 126 },
    mobileOffset: { x: 43, y: 88 },
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://instagram.com/bhagavad_gita_vishwa_mahotsav",
    handle: "@bhagavad_gita_vishwa_mahotsav",
    desktopOffset: { x: -62, y: 126 },
    mobileOffset: { x: -43, y: 88 },
    icon: ({ className = "w-6 h-6" }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    url: "https://x.com/gita_event",
    handle: "@gita_event",
    desktopOffset: { x: -138, y: 30 },
    mobileOffset: { x: -96, y: 21 },
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/divine-aura-world",
    handle: "divine-aura-world",
    desktopOffset: { x: -110, y: -88 },
    mobileOffset: { x: -77, y: -62 },
    icon: ({ className = "w-5 h-5" }) => (
      <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.5a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z" />
      </svg>
    ),
  },
];

export default function ConnectSocialHub() {
  const [activePlatform, setActivePlatform] = useState<string | null>(null);

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* ======================================================== */}
      {/* MAIN CENTERED CARD (Inspired by Reference Screenshot)    */}
      {/* ======================================================== */}
      <div className="bg-white rounded-3xl border-2 border-gold/30 shadow-gold-lg overflow-hidden relative p-6 sm:p-10 text-center">
        {/* Top Gold Gradient Trim */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-gold/40 via-gold to-gold-dark" />

        {/* Subtle Decorative Background Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gold/5 rounded-full blur-2xl pointer-events-none" />

        {/* 1. Official Event Logo at Top */}
        <div className="relative pt-2 pb-1">
          <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full bg-cream border-2 border-gold/40 p-2 shadow-sm flex items-center justify-center">
            <Image
              src="/bh4.png"
              alt="Bhagavad Gita Vishwa Mahotsav 2027 Official Logo"
              width={80}
              height={80}
              className="w-full h-full object-contain"
              priority
            />
          </div>
        </div>

        {/* 2. Event Name & Typography */}
        <div className="mt-3 space-y-0.5">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-ink tracking-tight uppercase">
            BhagavadGita
          </h2>
          <p className="font-serif text-sm sm:text-base font-semibold text-gold-dark tracking-wider uppercase">
            Vishwa Mahotsav 2027
          </p>
        </div>

        {/* Gold Divider Rule */}
        <div className="gold-rule mx-auto my-3" />

        {/* 3. Supporting Text */}
        <p className="text-ink-body font-sans text-xs sm:text-sm leading-relaxed max-w-md mx-auto px-2">
          Connect with us across our official social media platforms and follow our journey of sharing the timeless wisdom of the Bhagavad Gita with the world.
        </p>

        {/* Active Platform Banner (Real-time feedback on hover/focus) */}
        <div className="h-6 mt-3 flex items-center justify-center">
          <span className="text-[11px] font-sans font-semibold tracking-wider text-gold-dark uppercase transition-opacity duration-200">
            {activePlatform ? `Follow us on ${activePlatform}` : "Select any platform below"}
          </span>
        </div>

        {/* 4. Radial / Circular Social Icons Orbit */}
        <div className="relative w-[280px] h-[280px] sm:w-[370px] sm:h-[370px] mx-auto my-2 flex items-center justify-center select-none">
          {/* Subtle Orbit Ring Background */}
          <div className="absolute inset-5 sm:inset-6 rounded-full border border-dashed border-gold/25 pointer-events-none" />

          {/* Central 'Connect With Us' Hub */}
          <div className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#FFFDF9] via-cream to-[#F5ECD7] border-2 border-gold/60 shadow-md flex flex-col items-center justify-center text-center p-2">
            <span className="font-serif text-base sm:text-xl font-bold text-ink leading-none">
              Connect
            </span>
            <span className="font-sans text-[10px] sm:text-xs font-bold text-gold-dark uppercase tracking-widest mt-1">
              With Us
            </span>
            <span className="text-gold text-xs mt-0.5">ॐ</span>
          </div>

          {/* 7 Orbital Social Platform Nodes */}
          {socialPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <a
                key={platform.name}
                href={platform.url}
                target={platform.url.startsWith("mailto:") ? "_self" : "_blank"}
                rel={platform.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                onMouseEnter={() => setActivePlatform(platform.name)}
                onMouseLeave={() => setActivePlatform(null)}
                onFocus={() => setActivePlatform(platform.name)}
                onBlur={() => setActivePlatform(null)}
                aria-label={`Official ${platform.name}: ${platform.handle}`}
                title={`${platform.name} (${platform.handle})`}
                className="absolute z-20 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white border-2 border-gold/40 text-ink shadow-sm hover:border-gold hover:bg-gold hover:text-white hover:shadow-gold hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-gold/60 focus:ring-offset-2"
                style={{
                  transform: `translate(var(--offset-x), var(--offset-y))`,
                  // @ts-expect-error custom css variables for responsive offsets
                  "--offset-x": `${platform.desktopOffset.x}px`,
                  "--offset-y": `${platform.desktopOffset.y}px`,
                }}
              >
                {/* On small mobile screens (< 640px), override offset via inline media query style */}
                <style jsx>{`
                  @media (max-width: 639px) {
                    a[title*="${platform.name}"] {
                      --offset-x: ${platform.mobileOffset.x}px !important;
                      --offset-y: ${platform.mobileOffset.y}px !important;
                    }
                  }
                `}</style>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:scale-110" />
              </a>
            );
          })}
        </div>

        {/* 5. Prominent Official Website Button */}
        <div className="mt-6 pt-4 border-t border-gold/15">
          <a
            href="https://bhagavadgitavishwamahotsav.org"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex flex-col items-center justify-center px-8 py-3.5 bg-gold-gradient text-white font-sans font-semibold text-sm tracking-wider uppercase rounded-full shadow-gold hover:shadow-gold-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-gold/60 focus:ring-offset-2"
          >
            <span className="inline-flex items-center gap-2">
              <Globe size={18} className="text-gold-pale transition-transform duration-300 group-hover:rotate-12" />
              <span>Visit Official Website</span>
              <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            </span>
            <span className="text-[11px] text-gold-pale font-normal lowercase tracking-normal mt-0.5">
              www.bhagavadgitavishwamahotsav.org
            </span>
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* CONTACT INFORMATION BELOW MAIN CARD                      */}
      {/* ======================================================== */}
      <div className="mt-8 bg-cream/70 rounded-2xl border border-gold/25 p-6 sm:p-7 shadow-sm text-center space-y-4">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-ink">
            Direct Contact &amp; Inquiries
          </h3>
          <p className="text-ink-body font-sans text-xs sm:text-sm mt-0.5">
            Reach out directly to our central coordination secretariat
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {/* Email Contact */}
          <a
            href="mailto:divineauraworld9@gmail.com"
            className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-gold/25 hover:border-gold hover:shadow-sm transition-all duration-200 group text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gold/10 text-gold-dark flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
              <Mail size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-muted">
                Email Inquiries
              </p>
              <p className="text-xs sm:text-sm font-semibold text-ink group-hover:text-gold-dark transition-colors truncate">
                divineauraworld9@gmail.com
              </p>
            </div>
          </a>

          {/* WhatsApp Contact */}
          <a
            href="https://wa.me/919949945502"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-gold/25 hover:border-gold hover:shadow-sm transition-all duration-200 group text-left"
          >
            <div className="w-10 h-10 rounded-full bg-gold/10 text-gold-dark flex items-center justify-center flex-shrink-0 group-hover:bg-gold group-hover:text-white transition-colors">
              <Phone size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-ink-muted">
                WhatsApp Support
              </p>
              <p className="text-xs sm:text-sm font-semibold text-ink group-hover:text-gold-dark transition-colors truncate">
                +91 99499 45502
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
