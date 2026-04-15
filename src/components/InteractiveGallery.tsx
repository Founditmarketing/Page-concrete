import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

// Show more of Derek's actual work — lead with best photos
const featured = { src: '/pageconcretepic15.jpg', alt: 'Premium Stamped Concrete' };
const grid = [
  { id: '1', src: '/pageconcretepic16.jpg', alt: 'Custom Driveway' },
  { id: '2', src: '/pageconcretepic18.jpg', alt: 'Decorative Patio' },
  { id: '3', src: '/pageconcretepic12.jpg', alt: 'Outdoor Living' },
  { id: '4', src: '/pageconcretepic10.jpg', alt: 'Stamped Walkway' },
  { id: '5', src: '/pageconcretepic13.jpg', alt: 'Commercial Flatwork' },
  { id: '6', src: '/pageconcretepic14.jpg', alt: 'Patio & Steps' },
  { id: '7', src: '/pageconcretepic17.jpg', alt: 'Driveway Apron' },
  { id: '8', src: '/pageconcretepic11.jpg', alt: 'Retaining Wall' },
];

export default function InteractiveGallery() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="gallery" className="bg-white py-24 md:py-40">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div>
            <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-4">Portfolio</p>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              Our <span className="text-primary">Work</span>
            </h2>
          </div>
          <Link
            to="/gallery"
            className="text-slate-900 font-bold text-sm tracking-widest uppercase border-b-2 border-primary pb-1 self-start md:self-end hover:text-primary transition-colors"
          >
            View All Projects →
          </Link>
        </div>

        {/* Featured full-width photo */}
        <div
          className="w-full aspect-[16/7] rounded-3xl overflow-hidden mb-4 cursor-pointer group shadow-xl shadow-slate-100"
          onClick={() => setLightboxSrc(featured.src)}
        >
          <img
            src={featured.src}
            alt={featured.alt}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {grid.map((item) => (
            <motion.div
              key={item.id}
              className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
              whileHover={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={() => setLightboxSrc(item.src)}
            >
              <img src={item.src} alt={item.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/25 transition-colors duration-300 flex items-end p-4">
                <span className="text-white text-xs font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  {item.alt}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxSrc(null)}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-8 right-8 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X size={22} />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={lightboxSrc}
              alt="Project photo"
              className="max-w-5xl w-full max-h-[88vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
