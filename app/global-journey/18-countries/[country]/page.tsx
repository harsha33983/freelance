import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { countries } from "@/lib/countries";
import { countryHotspots } from "@/lib/countriesMapData";

type Props = {
  params: {
    country: string;
  };
};

export function generateStaticParams() {
  return countries.map((country) => ({
    country: country.slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const country = countries.find((item) => item.slug === params.country);

  return {
    title: country ? `${country.name} | 18 Countries` : "Country",
    description: country?.description,
  };
}

export default function CountryPage({ params }: Props) {
  const country = countries.find(
    (item) => item.slug === params.country
  );

  if (!country) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#FFFDF8]">
      {/* Country hero */}
      <section className="relative overflow-hidden bg-[#2F1B0C] py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_65%)]" />

        <div className="container-main relative text-center">
          <p className="text-[#D4AF37] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
            Bhagavad Gita Vishwa Mahotsav 2027
          </p>

          <h1 className="mt-5 font-serif text-5xl md:text-7xl font-semibold text-[#FFF8E7]">
            {country.name}
          </h1>

          <p className="mt-5 text-[#E8DCC8] text-lg">
            {country.language}
          </p>
        </div>
      </section>

      {/* Main country information */}
      <section className="container-main py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative overflow-hidden rounded-2xl border border-[#E8D6A3] bg-[#F5EAD2] shadow-lg">
            <Image
              src="/18-countries-map.png"
              alt={`${country.name} in the global Bhagavad Gita journey`}
              width={1907}
              height={851}
              className="w-full h-auto"
            />

            {countryHotspots.map((hotspot) => (
              <Link
                key={hotspot.slug}
                href={`/global-journey/18-countries/${hotspot.slug}`}
                aria-label={`Explore ${hotspot.name}`}
                className={`group absolute z-10 rounded-md outline-none ${hotspot.slug === country.slug ? 'ring-2 ring-[#D4AF37] ring-offset-2 ring-offset-[#F5EAD2] bg-[#D4AF37]/20' : ''}`}
                style={{
                  top: hotspot.top,
                  left: hotspot.left,
                  width: hotspot.width,
                  height: hotspot.height,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <span className="absolute inset-0 rounded-md border-2 border-transparent bg-transparent transition-all duration-200 group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37]/20 group-focus-visible:border-[#D4AF37] group-focus-visible:bg-[#D4AF37]/20" />
                
                <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#2F1B0C] px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 z-20">
                  {hotspot.name}
                </span>
              </Link>
            ))}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2F1B0C] via-[#2F1B0C]/80 to-transparent p-6 pt-20 z-10 pointer-events-none">
              <p className="text-white font-serif text-2xl">
                {country.name}
              </p>
              <p className="text-[#F5EAD2] text-sm mt-1">
                {country.language}
              </p>
            </div>
          </div>

          <div>
            <p className="text-[#A66A00] text-sm font-semibold tracking-[0.25em] uppercase">
              Country Journey
            </p>

            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-[#2F1B0C]">
              Bhagavad Gita in {country.name}
            </h2>

            <div className="mt-6 h-px w-20 bg-[#D4AF37]" />

            <p className="mt-6 text-[#6B5A45] text-lg leading-relaxed">
              {country.description}
            </p>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#E8D6A3] bg-white p-5">
                <p className="text-xs uppercase tracking-widest text-[#A66A00]">
                  Language
                </p>
                <p className="mt-2 font-serif text-xl text-[#2F1B0C]">
                  {country.language}
                </p>
              </div>

              <div className="rounded-xl border border-[#E8D6A3] bg-white p-5">
                <p className="text-xs uppercase tracking-widest text-[#A66A00]">
                  Global Chapter
                </p>
                <p className="mt-2 font-serif text-xl text-[#2F1B0C]">
                  Country {country.id} of 18
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <section className="mt-20 md:mt-28">
          <p className="text-[#A66A00] text-sm font-semibold tracking-[0.25em] uppercase">
            Gallery
          </p>

          <h2 className="mt-2 font-serif text-4xl text-[#2F1B0C]">
            Moments from {country.name}
          </h2>

          {country.gallery.length > 0 ? (
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {country.gallery.map((image) => (
                <div
                  key={image}
                  className="overflow-hidden rounded-xl border border-[#E8D6A3]"
                >
                  <Image
                    src={image}
                    alt={`${country.name} gallery`}
                    width={900}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[#D4AF37] bg-[#FFF8E7] p-10 text-center">
              <p className="font-serif text-2xl text-[#2F1B0C]">
                Country gallery coming soon
              </p>
              <p className="mt-2 text-[#6B5A45]">
                Country-specific photographs can be added to this section later.
              </p>
            </div>
          )}
        </section>

        {/* Videos */}
        <section className="mt-20 md:mt-28">
          <p className="text-[#A66A00] text-sm font-semibold tracking-[0.25em] uppercase">
            Videos
          </p>

          <h2 className="mt-2 font-serif text-4xl text-[#2F1B0C]">
            {country.name} — Videos
          </h2>

          {country.videos.length > 0 ? (
            <div className="mt-8 grid lg:grid-cols-2 gap-8">
              {country.videos.map((video) => (
                <div
                  key={video}
                  className="aspect-video overflow-hidden rounded-xl bg-black"
                >
                  <iframe
                    src={video}
                    title={`${country.name} video`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 rounded-2xl border border-dashed border-[#D4AF37] bg-[#FFF8E7] p-10 text-center">
              <p className="font-serif text-2xl text-[#2F1B0C]">
                Videos coming soon
              </p>
              <p className="mt-2 text-[#6B5A45]">
                You can add YouTube or other video embed URLs to this country in
                <code className="mx-1 text-[#A66A00]">lib/countries.ts</code>.
              </p>
            </div>
          )}
        </section>

        {/* Back */}
        <div className="mt-16">
          <Link
            href="/global-journey/18-countries"
            className="inline-flex items-center rounded-full bg-[#D4AF37] px-7 py-3 font-semibold text-white transition hover:bg-[#B8860B]"
          >
            ← Back to 18 Countries
          </Link>
        </div>
      </section>
    </main>
  );
}
