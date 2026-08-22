const fs = require('fs');
const file = 'C:\\Users\\Harsha\\Music\\bgvm2027\\components\\media\\GalleryGrid.tsx';
let content = fs.readFileSync(file, 'utf8');

// Insert grid image
content = content.replace(
  `onClick={() => setLightbox(item)}
            >
              
              <div className="mt-2 mb-3">`,
  `onClick={() => setLightbox(item)}
            >
              <div className="relative rounded-sm overflow-hidden bg-cream border border-gray-100/50">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.caption} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                ) : (
                  <div className="w-full aspect-[4/3] flex items-center justify-center text-gold/30">
                    <ZoomIn size={24} />
                  </div>
                )}
                <div className="absolute inset-0 bg-ink/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" size={32} />
                </div>
              </div>
              <div className="mt-2 mb-3">`
);

// Insert lightbox image
content = content.replace(
  `                  <div className="bg-white rounded-sm overflow-hidden">
                    
                    <div className="p-4 flex items-start justify-between">`,
  `                  <div className="bg-white rounded-sm overflow-hidden">
                    {lightbox.imageUrl && (
                      <div className="bg-cream border-b border-gray-100 flex items-center justify-center">
                        <img src={lightbox.imageUrl} alt={lightbox.caption} className="w-full max-h-[75vh] object-contain" />
                      </div>
                    )}
                    <div className="p-4 flex items-start justify-between">`
);

fs.writeFileSync(file, content);
