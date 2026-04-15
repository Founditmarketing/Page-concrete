import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: 'Custom Driveways',
    description: 'Engineered to withstand heavy loads and severe weather.',
    image: '/pageconcretepic1.jpg',
    slug: 'custom-driveways'
  },
  {
    id: 2,
    title: 'Stamped & Decorative',
    description: 'Premium textures mimicking stone or wood.',
    image: '/pageconcretepic9.jpg',
    slug: 'stamped-and-decorative'
  },
  {
    id: 3,
    title: 'Patios & Outdoor Living',
    description: 'Transform your backyard into a permanent entertainment space.',
    image: '/pageconcretepic7.jpg',
    slug: 'patios-and-outdoor-living'
  },
  {
    id: 4,
    title: 'Commercial Flatwork',
    description: 'Heavy-duty foundations built for scale and safety.',
    image: '/pageconcretepic4.jpg',
    slug: 'commercial-flatwork'
  },
];

export default function FlexExpandServices() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(0);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section id="services" className="pt-20 md:pt-40 pb-24 md:pb-32 bg-slate-50 mt-16 md:mt-0">
      {/* Massive Watermark Title (100% Absolute True Full Width) */}
      <div className="w-full mb-12 md:mb-16 relative z-10 text-center px-4 md:px-0">
        <h2 className="text-[11vw] md:text-[7vw] font-black text-slate-900 tracking-tighter leading-none uppercase mb-4 drop-shadow-sm md:whitespace-nowrap">
          Concrete <br className="md:hidden" />
          <span className="text-primary">Solutions</span>
        </h2>
        <p className="text-slate-500 text-lg max-w-2xl font-medium mx-auto px-4">
          From foundations to decorative finishes, our decades of experience ensure your concrete is poured perfectly, built to last, and stunningly executed.
        </p>
      </div>

      {/* Desktop: Horizontal Accordion, Mobile: Vertical Stack - FULL WIDTH */}
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 h-[800px] lg:h-[500px]">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            
            return (
              <motion.div
                key={service.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer flex-1 lg:flex-auto"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(0)} // Default to first
                animate={{
                  flex: isHovered && isDesktop ? 3 : 1,
                }}
                transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
                style={{
                  flexBasis: isDesktop ? (isHovered ? '60%' : '13%') : 'auto',
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className={`flex ${isHovered || !isDesktop ? 'flex-row items-center gap-3' : 'flex-col items-start gap-3'} mb-2 transition-all duration-300`}>
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold shrink-0">
                      {service.id}
                    </div>
                    <h3 className={`font-bold text-white leading-tight drop-shadow-md pb-1 md:pb-0 transition-all duration-300 ${isHovered || !isDesktop ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
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
                    <div className="flex flex-col gap-4 pt-1 pb-2">
                      <p className={`text-slate-200 transition-all duration-300 ${isHovered || !isDesktop ? 'text-lg md:text-xl' : 'text-base'}`}>
                        {service.description}
                      </p>
                      <div>
                        <Link to={`/services/${service.slug}`} className="inline-block">
                          <button className="flex items-center gap-2 text-white font-semibold hover:text-secondary transition-colors cursor-pointer text-lg leading-normal">
                            Learn More <ArrowRight size={16} />
                          </button>
                        </Link>
                      </div>
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
