"use client";

import { useState } from "react";
import { Eye, FileImage, FileText, Film, Package, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function PressKitList({ initialFiles }: { initialFiles: PressKitFile[] }) {
  const files = initialFiles;
  const [lightbox, setLightbox] = useState<PressKitFile | null>(null);

  const imageFiles = files.filter(f => f.fileType === "image");
  const otherFiles = files.filter(f => f.fileType !== "image");

  return (
    <section className="bg-white section-pad">
      <div className="container-main max-w-5xl">
        <p className="text-ink-muted font-sans text-sm mb-10 text-center">
          For media enquiries, contact{" "}
          <a href="mailto:media@bgvmahotsav2027.org" className="text-gold hover:underline">
            media@bgvmahotsav2027.org
          </a>
        </p>

        {imageFiles.length > 0 && (
          <div className="mb-16">
            <h3 className="font-serif text-xl font-semibold text-ink mb-6">Press Images</h3>
            <div className="columns-2 sm:columns-3 gap-4 space-y-4">
              {imageFiles.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: i * 0.04 }}
                  className="break-inside-avoid group cursor-pointer relative"
                  onClick={() => setLightbox(item)}
                >
                  <div className="relative rounded-sm overflow-hidden bg-cream border border-gray-100/50">
                    <img src={item.fileUrl} alt={item.title} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" size={32} />
                    </div>
                  </div>
                  <div className="mt-2 mb-3">
                    <span className="text-gold text-[10px] font-semibold font-sans tracking-wider uppercase">Press Image</span>
                    <p className="text-ink-muted text-xs font-sans mt-0.5 line-clamp-2">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {otherFiles.length > 0 && (
          <div>
            <h3 className="font-serif text-xl font-semibold text-ink mb-6 text-center">Documents & Files</h3>
            <div className="space-y-3 max-w-3xl mx-auto">
              {otherFiles.map((file) => {
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
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-gold text-xs font-semibold font-sans tracking-wider uppercase hover:underline"
                      aria-label={`View ${file.title}`}
                    >
                      <Eye size={14} /> View
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {files.length === 0 && (
          <p className="text-center text-ink-muted font-sans py-12">
            Press kit files will be published here as the event approaches. Contact us for early access.
          </p>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <>
              <motion.div
                key="lb-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 z-50 backdrop-blur-sm"
                onClick={() => setLightbox(null)}
              />
              <motion.div
                key="lb-content"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-4 z-50 flex items-center justify-center pointer-events-none"
              >
                <div className="relative max-w-4xl w-full pointer-events-auto">
                  <button
                    onClick={() => setLightbox(null)}
                    className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <div className="bg-white rounded-sm overflow-hidden">
                    <div className="bg-cream border-b border-gray-100 flex items-center justify-center">
                      <img src={lightbox.fileUrl} alt={lightbox.title} className="w-full max-h-[75vh] object-contain" />
                    </div>
                    <div className="p-4 flex items-start justify-between">
                      <div>
                        <span className="text-gold text-xs font-semibold font-sans tracking-wider uppercase">Press Image</span>
                        <p className="text-ink-muted text-sm font-sans mt-1">{lightbox.title}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
