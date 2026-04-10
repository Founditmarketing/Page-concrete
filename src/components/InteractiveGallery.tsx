import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

const images = [
  { id: '1', src: '/pageconcretepic10.jpg', alt: 'Custom Driveway', className: 'col-span-1' },
  { id: '2', src: '/pageconcretepic11.jpg', alt: 'Stamped Concrete', className: 'col-span-1' },
  { id: '3', src: '/pageconcretepic12.jpg', alt: 'Patio', className: 'col-span-1' },
  { id: '4', src: '/pageconcretepic13.jpg', alt: 'Commercial', className: 'col-span-1' },
];

export default function InteractiveGallery() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-slate-100">
      {/* Massive Watermark Title (100% Absolute True Full Width) */}
      <div className="w-full mb-8 relative z-10 text-center px-4 md:px-0">
        <h2 className="text-4xl sm:text-[8vw] md:text-[7vw] font-black text-slate-900 tracking-tighter leading-none uppercase mb-4 drop-shadow-sm whitespace-nowrap truncate md:overflow-visible">
          Our <span className="text-primary">Work</span>
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl font-medium mx-auto px-4">Browse our portfolio of completed residential and commercial projects.</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Before / After Full Width Slider */}
        <div 
          className="relative w-full h-[35vh] md:h-[70vh] rounded-3xl overflow-hidden select-none touch-none mb-6 shadow-2xl shadow-slate-300"
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
          {/* After Image (Background) */}
          <img src="/pageconcretepic1.jpg" alt="After concrete work" className="absolute inset-0 w-full h-full object-cover" />
          
          {/* Before Image (Clipped overlay) */}
          <img 
            src="/pageconcretepic2.jpg" 
            alt="Before concrete work"
            className="absolute inset-0 w-full h-full object-cover" 
            style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
          />

          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white z-10 cursor-ew-resize"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-slate-200">
              <div className="flex gap-1.5 pointer-events-none">
                <div className="w-1 h-5 bg-slate-300 rounded-full" />
                <div className="w-1 h-5 bg-slate-300 rounded-full" />
              </div>
            </div>
          </div>
          
          <div className="absolute top-6 left-6 bg-slate-900/60 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold tracking-widest uppercase border border-white/20">Before</div>
          <div className="absolute top-6 right-6 bg-primary/80 backdrop-blur-md text-white px-6 py-2 rounded-full font-bold tracking-widest uppercase shadow-lg shadow-primary/30">After</div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((item) => (
            <motion.div
              key={item.id}
              layoutId={`gallery-image-${item.id}`}
              onClick={() => setSelectedId(item.id)}
              className={`relative rounded-2xl overflow-hidden cursor-pointer group aspect-square lg:aspect-auto lg:h-[250px] ${item.className}`}
              whileHover={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                  View Project
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
            >
              <button 
                className="absolute top-6 right-6 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
                onClick={() => setSelectedId(null)}
              >
                <X size={24} />
              </button>
              
              {images.filter(img => img.id === selectedId).map(item => (
                <motion.img
                  key={item.id}
                  layoutId={`gallery-image-${item.id}`}
                  src={item.src}
                  alt={item.alt}
                  className="w-full max-w-5xl max-h-[85vh] object-contain rounded-xl shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
