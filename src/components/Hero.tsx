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
      transition: { staggerChildren: 0.012, delayChildren: 0.1 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-[260px] lg:pt-64 pb-32 lg:pb-48">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-slate-100 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={currentSlide}
            src={heroImages[currentSlide]}
            alt="Hero background"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Light scrim — photo shows through, left side reads clean */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[65%] bg-gradient-to-r from-white/85 via-white/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full lg:w-[62%] flex flex-col justify-center items-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl w-full flex flex-col items-center lg:items-start">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-primary font-bold tracking-[0.25em] uppercase text-sm mb-6"
          >
            High Point, NC &nbsp;·&nbsp; Est. 1996
          </motion.p>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.08] drop-shadow-sm"
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

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-slate-600 font-medium mb-12 leading-relaxed max-w-lg"
          >
            30 years of uncompromising craftsmanship in the Triad. Engineered to outlast everything else.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-50"
          >
            <Link to="/contact" className="w-full sm:w-auto">
              <button className="bg-primary text-white px-10 py-5 rounded-full font-bold text-lg shadow-lg shadow-primary/40 hover:bg-[#0D47A1] transition-all hover:-translate-y-0.5 cursor-pointer w-full tracking-wide">
                Start Your Project
              </button>
            </Link>
            <Link to="/gallery" className="w-full sm:w-auto">
              <button className="bg-white border border-slate-200 text-slate-800 px-10 py-5 rounded-full font-bold text-lg hover:bg-slate-50 transition-all hover:-translate-y-0.5 cursor-pointer w-full shadow-md tracking-wide">
                View Our Work
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 z-20 flex-col gap-4">
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
                : 'w-[5px] h-10 bg-slate-400/50 group-hover:bg-slate-600/70 group-hover:h-16'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
