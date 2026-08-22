"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { navGroups, NavGroup } from "@/lib/navData";
import { useJoinModal } from "@/lib/useJoinModal";


export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const openJoin = useJoinModal((s) => s.open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleMobileAccordion = (label: string) => {
    setMobileExpanded((prev) =>
      prev === label ? null : label
    );
  };

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 w-full transition-shadow duration-300 bg-white ${
        scrolled
          ? "shadow-md"
          : "border-b border-gray-100"
      }`}
    >

      {/* ============================= */}
      {/* HEADER CONTAINER */}
      {/* ============================= */}

      <div className="w-full max-w-full mx-auto px-4 lg:px-8 xl:px-12">

        <div className="flex items-center justify-between min-h-14 md:min-h-16 py-1">


         <Link
  href="/"
  className="flex items-center gap-2 lg:gap-4 flex-shrink-0"
>
  {/* Logo Image */}
  <img
    src="/bh4.png"
    alt="Bhagavad Gita Vishwa Mahotsav 2027"
    className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 object-contain flex-shrink-0 transition-all drop-shadow-sm"
  />

  {/* Logo Text */}
  <div className="flex flex-col justify-center gap-0">
    <span className="font-[Cinzel] text-base md:text-lg xl:text-[22px] font-bold text-[#24160C] tracking-tight uppercase whitespace-nowrap">
      BhagavadGita
    </span>
    <span className="font-[Cormorant_Garamond] text-xs md:text-sm xl:text-[15px] font-semibold text-[#A66A00] tracking-tight whitespace-nowrap">
      VISHWA MAHOTSAV-2027
    </span>
  </div>
</Link>


          {/* ============================= */}
          {/* DESKTOP NAV */}
          {/* ============================= */}

          <nav className="hidden xl:flex items-center gap-0.5 xl:gap-1 ml-2 xl:ml-4 flex-shrink">

            {navGroups.map((group) => (

              <DesktopNavItem
                key={group.label}
                group={group}
                active={activeDropdown === group.label}
                onEnter={() =>
                  setActiveDropdown(group.label)
                }
                onLeave={() =>
                  setActiveDropdown(null)
                }
              />

            ))}

          </nav>


          {/* ============================= */}
          {/* CTA + MOBILE TOGGLE */}
          {/* ============================= */}

          <div className="flex items-center gap-2 xl:gap-3 flex-shrink-0">



            {/* Desktop Join Button */}

            <button
              onClick={openJoin}
              className="hidden md:inline-flex items-center gap-1.5 px-3 lg:px-4 py-2 min-w-max bg-gold-gradient text-white font-sans font-semibold text-[11px] xl:text-xs tracking-wider uppercase rounded-full transition-all duration-300 hover:shadow-gold hover:scale-105"
            >
              🔱 Join the Movement
            </button>


            {/* Mobile Menu Button */}

            <button
              className="xl:hidden p-2  text-ink"
              onClick={() =>
                setMobileOpen((o) => !o)
              }
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>

          </div>

        </div>

      </div>


      {/* ============================= */}
      {/* MOBILE NAV */}
      {/* ============================= */}

      {mobileOpen && (

        <div className="xl:hidden bg-white border-t border-gray-100 max-h-[80vh] overflow-y-auto">

          <div className="container-main py-4 space-y-1">

            {navGroups.map((group) => (

              <div key={group.label}>

                <button
                  className="flex items-center justify-between w-full py-2.5 px-2 text-ink font-sans font-medium text-sm hover:text-gold transition-colors"
                  onClick={() =>
                    toggleMobileAccordion(group.label)
                  }
                >

                  <span>
                    {group.label}
                  </span>

                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      mobileExpanded === group.label
                        ? "rotate-180"
                        : ""
                    }`}
                  />

                </button>


                {mobileExpanded === group.label &&
                  group.children && (

                    <div className="pl-4 pb-2 space-y-1 border-l-2 border-gold ml-2">

                      {group.children.map((item) => (

                        <Link
                          key={item.href}
                          href={item.href}
                          className="block py-1.5 px-2 text-ink-muted text-sm hover:text-gold transition-colors"
                          onClick={() =>
                            setMobileOpen(false)
                          }
                        >
                          {item.label}
                        </Link>

                      ))}

                    </div>

                  )}

              </div>

            ))}


            {/* Mobile Join Button and Live Count */}

            <div className="pt-4 pb-2 space-y-4">



              <button
                onClick={() => {
                  openJoin();
                  setMobileOpen(false);
                }}
                className="w-full bg-gold-gradient text-white font-sans font-semibold text-xs tracking-widest uppercase rounded-full py-3 transition-all duration-300 hover:shadow-gold"
              >
                🔱 Join the Movement
              </button>

            </div>

          </div>

        </div>

      )}

    </header>
  );
}


/* ========================================= */
/* DESKTOP NAVIGATION ITEM */
/* ========================================= */

function DesktopNavItem({
  group,
  active,
  onEnter,
  onLeave,
}: {
  group: NavGroup;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {

  const colSize = group.children
    ? Math.ceil(group.children.length / 5)
    : 1;

  const cols =
  colSize > 1
    ? "grid-cols-2"
    : "grid-cols-1";

const dropdownImages: Record<string, string> = {
  "Mahotsav": "/p1.jpg",
  "The Journey": "/p2.jpg",
  "Experience": "/p3.jpg",
  "Programme": "/p4.jpg",
  "Participate": "/p5.jpg",
  "Partners": "/p6.jpg",
  "Media": "/p8.jpg",
  "About": "/bh1.png",
};
  return (

    <div
      className="relative"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >

      {/* Main navigation link */}

      <Link
        href={group.href}
        className={`flex items-center gap-0.5 px-1.5 xl:px-2 py-1 rounded-sm text-[12px] xl:text-[13px] font-sans font-medium whitespace-nowrap transition-colors duration-200 ${
          active
            ? "text-gold"
            : "text-ink hover:text-gold"
        }`}
      >

        {group.label}

        {group.children && (

          <ChevronDown
            size={14}
            className={`transition-transform duration-200 ${
              active
                ? "rotate-180 text-gold"
                : ""
            }`}
          />

        )}

      </Link>


      {/* ================================= */}
      {/* MEGA DROPDOWN */}
      {/* ================================= */}

{active && group.children && (
  <div
  className="
    fixed
    top-[110px]
    left-1/2
    -translate-x-1/2
    w-[850px]
    bg-[#F8F1DE]
    border border-[#D9C27A]
    shadow-2xl
    z-[9999]
  "
  onMouseEnter={onEnter}
  onMouseLeave={onLeave}
>
    <div className="grid grid-cols-3">

      {/* LEFT COLUMN */}
      <div className="grid grid-cols-2 gap-y-10 gap-x-10 p-10 col-span-2">

        {group.children.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="
              text-[20px]
              font-[Cormorant_Garamond]
              text-[#5A3713]
              hover:text-[#A66A00]
              transition
            "
          >
            {item.label}
          </Link>
        ))}

      </div>

      {/* RIGHT IMAGE PANEL */}
      <div className="border-l border-[#D9C27A] p-6 w-[270px]">

        <h3 className="text-4xl font-[Cormorant_Garamond] text-[#5A3713] mb-6">
          {group.label}
        </h3>

        <img
          src={dropdownImages[group.label]}
          alt={group.label}
          className="
            w-full
            h-[220px]
            object-cover
            rounded-xl
          "
        />

        <Link
          href={group.href}
          className="
            inline-block
            mt-6
            text-xl
            font-semibold
            text-[#A66A00]
            hover:underline
          "
        >
          Know More →
        </Link>

      </div>

    </div>

    <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />
  </div>
)}

    </div>

  );
}