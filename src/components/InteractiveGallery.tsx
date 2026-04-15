import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

const images = [
  { id: '1', src: '/pageconcretepic10.jpg', alt: 'Custom Driveway' },
  { id: '2', src: '/pageconcretepic11.jpg', alt: 'Stamped Concrete' },
  { id: '3', src: '/pageconcretepic12.jpg', alt: 'Patio Project' },
  { id: '4', src: '/pageconcretepic13.jpg', alt: 'Commercial Flatwork' },
  { id: '5', src: '/pageconcretepic14.jpg', alt: 'Decorative Concrete' },
  { id: '6', src: '/pageconcretepic17.jpg', alt: 'Outdoor Living' },
];

export default function InteractiveGallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section id="gallery" className="py-32 md:py-48 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Section header */}
        <div className="mb-16 md:mb-24">
          <p className="text-primary font-bold tracking-[0.25em] uppercase text-sm mb-5">Portfolio</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none uppercase">
              Our <span className="text-primary">Work</span>
            </h2>
            <div className="flex flex-col gap-4 md:items-end">
              <p className="text-slate-500 text-lg font-medium max-w-sm leading-relaxed">
                Browse our portfolio of residential and commercial projects across the Triad.
              </p>
              <Link to="/gallery" className="text-primary font-bold hover:underline underline-offset-4 text-base tracking-wide">
                View Full Gallery →
              </Link>
            </div>
          </div>
        </div>

        {/* Before / After Slider */}
        <div
          className="relative w-full h-[40vh] md:h-[65vh] rounded-3xl overflow-hidden select-none touch-none mb-6 shadow-2xl shadow-slate-300"
          onMouseMove={(e) => {
            if (!isDragging) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
            setSliderPosition((x / rect.width) * 100);
          }}
          onTouchMove={(e) => {
            if (!isDragging) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
            setSliderPosition((x / rect.width) * 100);
          }}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onTouchEnd={() => setIsDragging(false)}
        >
          <img src="/pageconcretepic1.jpg" alt="After concrete work" className="absolute inset-0 w-full h-full object-cover" />
          <img
            src="/pageconcretepic2.jpg"
            alt="Before concrete work"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          />
          <div
            className="absolute top-0 bottom-0 w-1 bg-white z-10 cursor-ew-resize"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-slate-100">
              <div className="flex gap-1.5 pointer-events-none">
                <div className="w-1 h-6 bg-slate-300 rounded-full" />
                <div className="w-1 h-6 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
          <div className="absolute top-6 left-6 bg-slate-900/70 backdrop-blur-md text-white px-5 py-2 rounded-full font-bold tracking-widest uppercase text-sm border border-white/20">Before</div>
          <div className="absolute top-6 right-6 bg-primary/90 backdrop-blur-md text-white px-5 py-2 rounded-full font-bold tracking-widest uppercase text-sm shadow-lg shadow-primary/30">After</div>
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {images.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`gallery-image-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group aspect-square"
              whileHover={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm text-sm tracking-wide">
                  View Project
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-[100] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-6 sm:p-12"
            >
              <button
                className="absolute top-8 right-8 text-white bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setSelectedId(null)}
              >
                <X size={22} />
              </button>

              {images.filter((img) => img.id === selectedId).map((item) => (
                <motion.img
                  key={item.id}
                  layoutId={`gallery-image-${item.id}`}
                  src={item.src}
                  alt={item.alt}
                  className="w-full max-w-5xl max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
