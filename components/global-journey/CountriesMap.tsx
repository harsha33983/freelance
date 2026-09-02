"use client";

import Link from "next/link";
import Image from "next/image";

import { countryHotspots } from "@/lib/countriesMapData";

export default function CountriesMap() {
  return (
    <section className="relative bg-[#FFFDF8] py-16 md:py-24">
      <div className="container-main text-center mb-10">
        <p className="text-[#A66A00] text-sm tracking-[0.3em] uppercase font-semibold mb-3">
          Global Journey
        </p>

        <h2 className="font-serif text-3xl md:text-5xl text-[#2F1B0C]">
          18 Countries • 18 Languages
        </h2>

        <p className="mt-4 text-[#6B5A45] max-w-2xl mx-auto">
          One Gita. One Voice. One Global Consciousness.
        </p>
      </div>

      <div className="container-main">
        <div className="relative w-full overflow-hidden rounded-xl shadow-sm">
          <Image
            src="/18-nations.jpg"
            alt="Bhagavad Gita Vishwa Mahotsav — 18 Nations"
            width={1280}
            height={912}
            className="block w-full h-auto"
            priority
          />

          {countryHotspots.map((country) => (
            <Link
              key={country.slug}
              href={`/global-journey/18-countries/${country.slug}`}
              aria-label={`Explore ${country.name}`}
              className="group absolute z-10 rounded-md outline-none"
              style={{
                top: country.top,
                left: country.left,
                width: country.width,
                height: country.height,
                transform: "translate(-50%, -50%)",
              }}
            >
              <span className="absolute inset-0 rounded-md border-2 border-transparent bg-transparent transition-all duration-200 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-focus-visible:border-[#D4AF37] group-focus-visible:bg-[#D4AF37]/10" />

              <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#2F1B0C] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                Explore {country.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
