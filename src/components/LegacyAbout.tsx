import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const sections = [
  {
    title: (
      <>
        3 Decades.<br />
        <span className="text-primary">Countless Pours.</span><br />
        Zero Compromises.
      </>
    ),
    description: "Page Concrete brings 30 years of craftsmanship to every site in the Triad. We don't cut corners, we don't use subpar materials, and we don't leave until the job is perfect. When you hire us, you're investing in a foundation that will outlast you.",
    stats: [
      { value: "30+", label: "Years Experience", color: "text-secondary" },
      { value: "1,000+", label: "Projects Completed", color: "text-primary" }
    ],
    imgSrc: "/pageconcretepic12.jpg",
    imgAlt: "Concrete pouring team"
  },
  {
    title: (
      <>
        Commercial Scale.<br />
        <span className="text-secondary">Precision Quality.</span><br />
        Every Time.
      </>
    ),
    description: "From large-scale industrial distribution centers to intricate decorative concrete projects, our skilled supervisors and crews bring the same level of precise attention to detail to every job site, regardless of size or scope.",
    stats: [
      { value: "100%", label: "Satisfaction", color: "text-secondary" },
      { value: "50+", label: "Expert Crew Members", color: "text-primary" }
    ],
    imgSrc: "/pageconcretepic5.jpg",
    imgAlt: "Finished concrete driveway"
  },
  {
    title: (
      <>
        Built to Last.<br />
        <span className="text-primary">Engineered to Perform.</span><br />
        Guaranteed.
      </>
    ),
    description: "We partner with the industry's best suppliers to source premium concrete mixes, utilizing advanced curing techniques and structural reinforcements to ensure that every yard we pour is built to stand the test of time.",
    stats: [
      { value: "A+", label: "Better Business Bureau", color: "text-secondary" },
      { value: "Top", label: "Rated Contractor", color: "text-primary" }
    ],
    imgSrc: "/pageconcretepic6.jpg",
    imgAlt: "Commercial concrete project"
  }
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
          // If the middle of the screen is inside the image bounds
          if (rect.top <= triggerY && rect.bottom >= triggerY) {
            setActiveIndex(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="legacy" className="bg-white relative">

      {/* --- MOBILE STATIC SECTION --- */}
      <div className="flex flex-col lg:hidden w-full px-4 py-24 bg-white relative z-10">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-8 leading-tight">
            3 Decades.<br />
            <span className="text-primary">Countless Pours.</span><br />
            Zero Compromises.
          </h2>
          
          <div className="text-base sm:text-lg text-slate-600 mb-10 leading-relaxed space-y-6">
            <p>{sections[0].description}</p>
            <p>{sections[1].description}</p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-12">
            <div className="border-l-4 border-primary pl-4">
              <div className="text-4xl font-black text-slate-900 mb-1">30+</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Years Experience</div>
            </div>
            <div className="border-l-4 border-secondary pl-4">
              <div className="text-4xl font-black text-slate-900 mb-1">100%</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Satisfaction</div>
            </div>
            <div className="border-l-4 border-slate-300 pl-4">
              <div className="text-4xl font-black text-slate-900 mb-1">1k+</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Projects</div>
            </div>
            <div className="border-l-4 border-primary pl-4">
              <div className="text-4xl font-black text-slate-900 mb-1">A+</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">BBB Rated</div>
            </div>
          </div>
          
          <img 
            src="/pageconcretepic12.jpg" 
            alt="Page Concrete finished project" 
            className="w-full h-64 object-cover rounded-2xl shadow-2xl"
          />
        </div>
      </div>

      {/* --- DESKTOP INTERACTIVE SCROLLING SECTION --- */}
      <div className="hidden lg:flex w-full">
        
        {/* Left: Sticky Text */}
        <div className="w-1/2 flex justify-center px-8 py-32 pb-32">
          <div className="w-full max-w-xl sticky top-32 h-fit">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-5xl xl:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-tight">
                  {sections[activeIndex].title}
                </h2>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  {sections[activeIndex].description}
                </p>
                
                <div className="flex flex-row gap-8 mt-12">
                  {sections[activeIndex].stats.map((stat, i) => (
                    <div key={i}>
                      <div className={`text-5xl font-black ${stat.color} mb-2`}>
                        {stat.value}
                      </div>
                      <div className="text-slate-500 font-bold uppercase tracking-wider text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right: Scrolling Images */}
        <div className="w-1/2 flex flex-col">
          {sections.map((section, index) => (
            <img 
              key={index}
              ref={(el) => sectionRefs.current[index] = el}
              src={section.imgSrc} 
              alt={section.imgAlt} 
              className="w-full h-screen object-cover"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
