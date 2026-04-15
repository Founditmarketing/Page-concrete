import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Custom Driveways',
    description: 'Engineered to withstand heavy loads and severe weather. Built to outlast the rest.',
    image: '/pageconcretepic1.jpg',
    slug: 'custom-driveways'
  },
  {
    id: 2,
    title: 'Stamped & Decorative',
    description: 'Premium textures that mimic natural stone, brick, or wood — without the maintenance.',
    image: '/pageconcretepic9.jpg',
    slug: 'stamped-and-decorative'
  },
  {
    id: 3,
    title: 'Patios & Outdoor Living',
    description: 'Transform your backyard into a permanent, beautiful entertainment space.',
    image: '/pageconcretepic7.jpg',
    slug: 'patios-and-outdoor-living'
  },
  {
    id: 4,
    title: 'Commercial Flatwork',
    description: 'Heavy-duty foundations built for scale, compliance, and long-term performance.',
    image: '/pageconcretepic4.jpg',
    slug: 'commercial-flatwork'
  },
];

export default function FlexExpandServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section id="services" className="py-32 md:py-48 bg-white mt-16 md:mt-0">

      {/* Section header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mb-16 md:mb-24">
        <p className="text-primary font-bold tracking-[0.25em] uppercase text-sm mb-5">What We Do</p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none uppercase">
            Concrete <span className="text-primary">Solutions</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-sm font-medium leading-relaxed">
            From foundations to decorative finishes — decades of experience, built into every pour.
          </p>
        </div>
      </div>

      {/* Accordion */}
      <div className="w-full px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 h-[900px] lg:h-[560px]">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={service.id}
                className="relative rounded-3xl overflow-hidden cursor-pointer flex-1 lg:flex-auto"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(0)}
                animate={{ flex: isHovered && isDesktop ? 3 : 1 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                style={{ flexBasis: isDesktop ? (isHovered ? '60%' : '13%') : 'auto' }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <div className={`flex ${isHovered || !isDesktop ? 'flex-row items-center gap-4' : 'flex-col items-start gap-3'} mb-3 transition-all duration-300`}>
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0 text-sm">
                      {service.id}
                    </div>
                    <h3 className={`font-black text-white leading-tight drop-shadow-md transition-all duration-300 ${isHovered || !isDesktop ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                      {service.title}
                    </h3>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isHovered || !isDesktop ? 1 : 0,
                      height: isHovered || !isDesktop ? 'auto' : 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-5 pt-2 pb-2">
                      <p className="text-slate-200 text-lg md:text-xl leading-relaxed">
                        {service.description}
                      </p>
                      <Link to={`/services/${service.slug}`} className="inline-block">
                        <button className="flex items-center gap-2 text-white font-semibold hover:text-secondary transition-colors cursor-pointer text-lg">
                          Learn More <ArrowRight size={16} />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
