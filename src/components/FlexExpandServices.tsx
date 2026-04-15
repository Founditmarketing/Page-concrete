import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    id: '01',
    title: 'Custom Driveways',
    description: 'Reinforced concrete driveways engineered for decades of performance. Every pour is graded, formed, and finished to perfection — no shortcuts, no excuses.',
    image: '/pageconcretepic1.jpg',
    slug: 'custom-driveways',
  },
  {
    id: '02',
    title: 'Stamped & Decorative',
    description: 'Texture, color, and pattern fused into structural concrete. We replicate natural stone, brick, and wood grain — with none of the maintenance headaches.',
    image: '/pageconcretepic9.jpg',
    slug: 'stamped-and-decorative',
  },
  {
    id: '03',
    title: 'Patios & Outdoor Living',
    description: 'Turn bare ground into a year-round outdoor room. Custom-poured, beautifully finished, built to host for decades without cracking or shifting.',
    image: '/pageconcretepic7.jpg',
    slug: 'patios-and-outdoor-living',
  },
  {
    id: '04',
    title: 'Commercial Flatwork',
    description: 'Large-scale pours for warehouses, distribution centers, parking lots, and commercial sites. We bring industrial-grade equipment and precision supervision.',
    image: '/pageconcretepic4.jpg',
    slug: 'commercial-flatwork',
  },
];

const secondary = [
  { title: 'Wood & Composite Decks', description: 'Custom-built decks designed to complement your outdoor concrete work.' },
  { title: 'Privacy & Decorative Fencing', description: 'Wood, vinyl, and ornamental fencing installed by the same team you trust.' },
];

export default function FlexExpandServices() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="bg-white">

      {/* Label bar */}
      <div className="border-t border-b border-slate-100 py-5 px-6 sm:px-10 lg:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs">Our Services</p>
          <div className="h-px flex-1 mx-8 bg-slate-100" />
          <p className="text-slate-400 text-xs tracking-wider uppercase">High Point, NC</p>
        </div>
      </div>

      {/* Main body */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-0 lg:gap-20">

          {/* Left: numbered list */}
          <div className="lg:w-1/2 flex flex-col divide-y divide-slate-100 py-16 lg:py-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group cursor-pointer py-10 lg:py-12"
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <span className={`text-xs font-black tracking-[0.3em] uppercase mb-4 block transition-colors duration-300 ${activeIndex === index ? 'text-primary' : 'text-slate-300'}`}>
                      {service.id}
                    </span>
                    <h3 className={`text-3xl lg:text-4xl font-black tracking-tight transition-colors duration-300 ${activeIndex === index ? 'text-slate-900' : 'text-slate-400'}`}>
                      {service.title}
                    </h3>
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-slate-500 text-lg leading-relaxed mt-5 mb-6 max-w-md">
                            {service.description}
                          </p>
                          <Link
                            to={`/services/${service.slug}`}
                            className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase hover:gap-3 transition-all"
                          >
                            Learn More <ArrowUpRight size={16} />
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 mt-2 transition-all duration-300 ${activeIndex === index ? 'bg-primary border-primary text-white' : 'border-slate-200 text-slate-300'}`}>
                    <ArrowUpRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional / secondary services */}
          <div className="border-t border-slate-100 pt-10 pb-16 lg:pb-32">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-slate-400 mb-6">Also Available</p>
            <div className="flex flex-col sm:flex-row gap-6">
              {secondary.map((s) => (
                <div key={s.title} className="flex-1 bg-slate-50 rounded-2xl px-6 py-5 border border-slate-100">
                  <p className="font-bold text-slate-700 mb-1.5">{s.title}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: sticky photo */}
          <div className="hidden lg:flex lg:w-1/2 items-start py-32">
            <div className="sticky top-32 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                  className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200"
                >
                  <img src={services[activeIndex].image} alt={services[activeIndex].title} className="w-full h-full object-cover" />
                  <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg">
                    <p className="text-xs text-primary font-black tracking-[0.2em] uppercase">{services[activeIndex].id}</p>
                    <p className="text-slate-900 font-bold text-sm">{services[activeIndex].title}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
