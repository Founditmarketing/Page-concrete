import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

const heroImages = [
  '/pageconcretepic18.jpg',
  '/pageconcretepic15.jpg',
  '/pageconcretepic16.jpg'
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const headline = "We Don't Just Pour Concrete. We Build Legacies.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
        delayChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section id="home" className="relative h-auto lg:h-screen lg:min-h-[800px] flex items-center pt-[240px] lg:pt-56 pb-20 lg:pb-32">
      {/* Background Image Slider & Overlay */}
      <div className="absolute inset-0 z-0 bg-slate-100 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide}
            src={heroImages[currentSlide]}
            alt="Hero background slide"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </AnimatePresence>

        {/* Light left-side text-readability fade */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[60%] bg-gradient-to-r from-white/80 via-white/50 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
      </div>

      {/* Content - Centered in Left Gradient */}
      <div className="relative z-10 w-full lg:w-[55%] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-12 text-center lg:text-left">
        <div className="max-w-xl xl:max-w-2xl w-full flex flex-col items-center lg:items-start">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1] drop-shadow-sm"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {headline.split(' ').map((word, wordIndex, array) => (
              <span key={wordIndex} className="inline-block whitespace-nowrap">
                {word.split('').map((char, charIndex) => (
                  <motion.span key={charIndex} variants={letterVariants} className="inline-block">
                    {char}
                  </motion.span>
                ))}
                {wordIndex !== array.length - 1 && (
                  <span className="inline-block w-[0.25em]">&nbsp;</span>
                )}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-700 font-medium mb-10 leading-relaxed"
          >
            30 Years of Uncompromising Quality in High Point, NC. Engineered to outlast the rest.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mt-2 relative z-50"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/40 hover:bg-[#0D47A1] transition-all hover:-translate-y-1 cursor-pointer w-full">
                Start Your Project
              </button>
            </Link>
            <Link to="/gallery" className="w-full sm:w-auto">
              <button className="bg-white/80 backdrop-blur-md border border-slate-300 text-slate-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-white transition-all hover:-translate-y-1 cursor-pointer w-full shadow-md">
                View Our Work
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Right Side Navigation */}
      <div className="hidden lg:flex absolute right-4 sm:right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 flex-col gap-4">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="group py-2 flex items-center justify-end cursor-pointer"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={`block transition-all duration-300 rounded-full ${currentSlide === index
                ? 'w-2 h-24 bg-primary'
                : 'w-[6px] h-10 bg-white/40 group-hover:bg-white/80 group-hover:h-16'
                }`}
            />
          </button>
        ))}
      </div>

      </section>
  );
}
