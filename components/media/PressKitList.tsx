"use client";

import { Download, FileImage, FileText, Film, Package } from "lucide-react";

interface PressKitFile {
  id: string;
  title: string;
  fileUrl: string;
  fileType: string;
  uploadedAt?: string;
}

const iconMap: Record<string, React.ElementType> = {
  pdf: FileText,
  image: FileImage,
  video: Film,
  zip: Package,
};

// Placeholder files for when DB is empty
const placeholders: PressKitFile[] = [
  { id: "1", title: "Official Mahotsav Logo Pack (PNG, SVG)", fileUrl: "#", fileType: "zip" },
  { id: "2", title: "Event Overview Brochure (PDF)", fileUrl: "#", fileType: "pdf" },
  { id: "3", title: "Press Release — Mahotsav Announcement", fileUrl: "#", fileType: "pdf" },
  { id: "4", title: "High-Resolution Event Imagery", fileUrl: "#", fileType: "image" },
  { id: "5", title: "Spiritual Leadership Bios (PDF)", fileUrl: "#", fileType: "pdf" },
  { id: "6", title: "Mahotsav Fact Sheet", fileUrl: "#", fileType: "pdf" },
];

export default function PressKitList({ initialFiles }: { initialFiles: PressKitFile[] }) {
  const files = initialFiles.length > 0 ? initialFiles : placeholders;

  return (
    <section className="bg-white section-pad">
      <div className="container-main max-w-3xl">
        <p className="text-ink-muted font-sans text-sm mb-10">
          For media enquiries, contact{" "}
          <a href="mailto:media@bgvmahotsav2027.org" className="text-gold hover:underline">
            media@bgvmahotsav2027.org
          </a>
        </p>

        <div className="space-y-3">
          {files.map((file) => {
            const Icon = iconMap[file.fileType] || FileText;
            return (
              <div
                key={file.id}
                className="flex items-center gap-4 p-5 rounded-sm border border-gray-100 hover:border-gold transition-colors group"
              >
                <div className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Icon size={18} className="text-gold" />
                </div>
                <div className="flex-1">
                  <p className="font-sans font-medium text-ink text-sm">{file.title}</p>
                  {file.uploadedAt && (
                    <p className="text-ink-muted text-xs font-sans mt-0.5">
                      {new Date(file.uploadedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                  )}
                </div>
                <a
                  href={file.fileUrl}
                  download
                  className="flex items-center gap-2 text-gold text-xs font-semibold font-sans tracking-wider uppercase hover:underline"
                  aria-label={`Download ${file.title}`}
                >
                  <Download size={14} /> Download
                </a>
              </div>
            );
          })}
        </div>

        {files.length === 0 && (
          <p className="text-center text-ink-muted font-sans py-12">
            Press kit files will be published here as the event approaches. Contact us for early access.
          </p>
        )}
      </div>
    </section>
  );
}
