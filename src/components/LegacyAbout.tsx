import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const sections = [
  {
    eyebrow: '30 Years Strong',
    title: (
      <>
        3 Decades.<br />
        <span className="text-primary">Countless Pours.</span><br />
        Zero Compromises.
      </>
    ),
    description: "Page Concrete brings 30 years of craftsmanship to every site in the Triad. We don't cut corners, we don't use subpar materials, and we don't leave until the job is perfect. When you hire us, you're investing in a foundation that will outlast you.",
    stats: [
      { value: '30+', label: 'Years Experience' },
      { value: '1,000+', label: 'Projects Completed' },
    ],
    imgSrc: '/pageconcretepic12.jpg',
    imgAlt: 'Concrete pouring team',
  },
  {
    eyebrow: 'Scale & Precision',
    title: (
      <>
        Commercial Scale.<br />
        <span className="text-primary">Precision Quality.</span><br />
        Every Time.
      </>
    ),
    description: 'From large-scale industrial distribution centers to intricate decorative concrete projects, our skilled supervisors and crews bring the same level of precise attention to detail to every job site, regardless of size or scope.',
    stats: [
      { value: '100%', label: 'Satisfaction' },
      { value: '50+', label: 'Expert Crew Members' },
    ],
    imgSrc: '/pageconcretepic5.jpg',
    imgAlt: 'Finished concrete driveway',
  },
  {
    eyebrow: 'Our Promise',
    title: (
      <>
        Built to Last.<br />
        <span className="text-primary">Engineered to Perform.</span><br />
        Guaranteed.
      </>
    ),
    description: 'We partner with the industry\'s best suppliers to source premium concrete mixes, utilizing advanced curing techniques and structural reinforcements to ensure that every yard we pour is built to stand the test of time.',
    stats: [
      { value: 'A+', label: 'Better Business Bureau' },
      { value: 'Top', label: 'Rated Contractor' },
    ],
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
          if (rect.top <= triggerY && rect.bottom >= triggerY) {
            setActiveIndex(index);
          }
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="legacy" className="bg-white relative">

      {/* MOBILE */}
      <div className="flex flex-col lg:hidden w-full px-6 py-36 bg-white">
        <div className="max-w-2xl mx-auto w-full">
          <p className="text-primary font-bold tracking-[0.25em] uppercase text-sm mb-6">Our Story</p>
          <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-10 leading-tight">
            3 Decades.<br />
            <span className="text-primary">Countless Pours.</span><br />
            Zero Compromises.
          </h2>

          <div className="text-lg text-slate-600 mb-14 leading-relaxed space-y-6">
            <p>{sections[0].description}</p>
            <p>{sections[1].description}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-16">
            {[
              { value: '30+', label: 'Years Experience', border: 'border-primary' },
              { value: '100%', label: 'Satisfaction', border: 'border-secondary' },
              { value: '1,000+', label: 'Projects', border: 'border-slate-300' },
              { value: 'A+', label: 'BBB Rated', border: 'border-primary' },
            ].map((stat) => (
              <div key={stat.label} className={`border-l-4 ${stat.border} pl-5`}>
                <div className="text-5xl font-black text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          <img
            src="/pageconcretepic12.jpg"
            alt="Page Concrete finished project"
            className="w-full h-72 object-cover rounded-3xl shadow-2xl"
          />
        </div>
      </div>

      {/* DESKTOP — Sticky scroll */}
      <div className="hidden lg:flex w-full">

        {/* Left sticky text */}
        <div className="w-1/2 flex justify-center px-16 py-48 pb-48">
          <div className="w-full max-w-xl sticky top-36 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-primary font-bold tracking-[0.25em] uppercase text-sm mb-6">
                  {sections[activeIndex].eyebrow}
                </p>
                <h2 className="text-5xl xl:text-6xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
                  {sections[activeIndex].title}
                </h2>
                <p className="text-xl text-slate-600 mb-14 leading-relaxed">
                  {sections[activeIndex].description}
                </p>

                <div className="flex flex-row gap-14 border-t border-slate-100 pt-12">
                  {sections[activeIndex].stats.map((stat, i) => (
                    <div key={i}>
                      <div className="text-6xl font-black text-primary mb-3">{stat.value}</div>
                      <div className="text-slate-500 font-bold uppercase tracking-wider text-sm">{stat.label}</div>
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
