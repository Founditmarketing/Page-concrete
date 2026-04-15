import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const sections = [
  {
    eyebrow: '30 Years Strong',
    title: (<>3 Decades.<br /><span className="text-primary">Countless Pours.</span><br />Zero Compromises.</>),
    description: "Page Concrete brings 30 years of craftsmanship to every site in the Triad. We don't cut corners, we don't use subpar materials, and we don't leave until the job is perfect. When you hire us, you're investing in a foundation that will outlast you.",
    stats: [{ value: '30+', label: 'Years Experience' }, { value: '1,000+', label: 'Projects Completed' }],
    imgSrc: '/pageconcretepic12.jpg',
    imgAlt: 'Concrete team at work',
  },
  {
    eyebrow: 'Scale & Precision',
    title: (<>Commercial Scale.<br /><span className="text-primary">Precision Quality.</span><br />Every Time.</>),
    description: 'From large-scale industrial distribution centers to intricate decorative concrete projects, our skilled supervisors and crews bring the same level of precise attention to detail to every job site, regardless of size or scope.',
    stats: [{ value: '100%', label: 'Satisfaction' }, { value: '50+', label: 'Expert Crew Members' }],
    imgSrc: '/pageconcretepic5.jpg',
    imgAlt: 'Finished concrete driveway',
  },
  {
    eyebrow: 'Our Promise',
    title: (<>Built to Last.<br /><span className="text-primary">Engineered to Perform.</span><br />Guaranteed.</>),
    description: "We partner with the industry's best suppliers to source premium concrete mixes, utilizing advanced curing techniques and structural reinforcements to ensure that every yard we pour is built to stand the test of time.",
    stats: [{ value: 'A+', label: 'Better Business Bureau' }, { value: 'Top', label: 'Rated Contractor' }],
    imgSrc: '/pageconcretepic6.jpg',
    imgAlt: 'Commercial concrete project',
  },
];

export default function LegacyAbout() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.innerHeight / 2;
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom >= triggerY) setActiveIndex(index);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="legacy" className="bg-slate-50">

      {/* Large stat bar — always visible */}
      <div className="border-t border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200">
            {[
              { value: '30+', label: 'Years in Business' },
              { value: '1,000+', label: 'Projects Completed' },
              { value: '100%', label: 'Satisfaction Rate' },
              { value: 'A+', label: 'BBB Rating' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center py-12 lg:py-16 px-6 text-center">
                <span className="text-5xl lg:text-6xl font-black text-primary mb-2">{stat.value}</span>
                <span className="text-slate-500 text-sm font-semibold tracking-widest uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE version */}
      <div className="flex flex-col lg:hidden w-full px-6 py-24 bg-white mt-4">
        <div className="max-w-2xl mx-auto w-full">
          <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-6">Our Story</p>
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
            3 Decades.<br /><span className="text-primary">Countless Pours.</span><br />Zero Compromises.
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">{sections[0].description}</p>
          <p className="text-lg text-slate-600 mb-14 leading-relaxed">{sections[1].description}</p>
          <img src="/pageconcretepic12.jpg" alt="Page Concrete work" className="w-full h-72 object-cover rounded-3xl shadow-xl" />
        </div>
      </div>

      {/* DESKTOP sticky scroll */}
      <div className="hidden lg:flex w-full mt-4 bg-white">
        {/* Left sticky text */}
        <div className="w-1/2 px-16 py-40 pb-40">
          <div className="w-full max-w-xl sticky top-36 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45 }}
              >
                <p className="text-primary font-bold tracking-[0.25em] uppercase text-xs mb-6">{sections[activeIndex].eyebrow}</p>
                <h2 className="text-5xl xl:text-6xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
                  {sections[activeIndex].title}
                </h2>
                <p className="text-xl text-slate-600 leading-relaxed mb-14">
                  {sections[activeIndex].description}
                </p>
                <div className="flex gap-16 border-t border-slate-100 pt-10">
                  {sections[activeIndex].stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-5xl font-black text-primary mb-2">{stat.value}</div>
                      <div className="text-slate-500 font-semibold uppercase tracking-widest text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right scrolling photos */}
        <div className="w-1/2 flex flex-col">
          {sections.map((section, index) => (
            <img
              key={index}
              ref={(el) => sectionRefs.current[index] = el}
              src={section.imgSrc}
              alt={section.imgAlt}
              className="w-full h-screen object-cover"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
