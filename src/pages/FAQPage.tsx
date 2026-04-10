import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What is Cement and Concrete?",
    answer: "Cement and concrete often are used interchangeably. However, cement is actually an ingredient of concrete.\n\nConcrete is a mixture of sand, gravel or crushed stone, a paste of water and Portland Cement. Cement comprises from 10 to 15 percent of the concrete mix, by volume. Through a process called hydration, the cement and water harden and bind it all into a rocklike mass. This hardening process continues for years meaning that concrete gets stronger as it gets older."
  },
  {
    question: "How long does it take for concrete to cure?",
    answer: "The concrete will take a full 28 days to cure on its own and fully dry."
  },
  {
    question: "What is Fibermesh?",
    answer: "This is a concrete additive that is mixed in with the cement at the ready mix plant. If you could look at a cross section of Fibermesh fibrous concrete, you would see millions of polypropylene Fibermesh fibers uniformly distributed in all directions throughout the concrete mix. These fibers provide top-to-bottom, side-to-side uniform reinforcement and are a cost-effective and superior alternative to rebar or wire mesh reinforcement. We use Fibermesh in most of our concrete mixtures."
  },
  {
    question: "How thick should my concrete be poured?",
    answer: "Thickness is the major factor (even more than the strength of the concrete) in determining a structural capacity. Concrete is to be poured at a minimum thickness of 4 inches. Increasing the thickness from 4 inches to 5 inches will add approximately 20% to your concrete cost, but will also boost the load-carrying capacity nearly 50%. Depending on the traffic you will have or the weight you intend for the concrete area to be able to withstand, you may want to increase to 6″ or 8″. We use a minimum thickness of 4 inches unless noted otherwise."
  },
  {
    question: "Does concrete have to be grey?",
    answer: "Not at all. There is an almost limitless palette of special finishes for concrete pavements and slabs. With the addition of color and a skilled decorative concrete contractor, concrete can take on almost any shape, pattern, color or texture, in both exterior and interior applications."
  },
  {
    question: "How long does it take before I can drive on new driveway?",
    answer: "In our market area, the American Concrete Institute and the American Concrete Pavement association recommend a minimum of (7) seven days following concrete placement before using a concrete driveway."
  },
  {
    question: "How long does it take before I can walk on my new concrete?",
    answer: "We recommend not to walk on new concrete for (3) days."
  },
  {
    question: "Is the process of installing concrete affected by weather?",
    answer: "Yes. The rate at which concrete hardens is very much affected by temperature, moisture and wind. Wind can cause the surface to crack. Rain will significantly weaken the surface. Placing concrete in cold weather often involves heading some of the concrete ingredients and protecting the freshly-placed concrete from freezing. Placing concrete in hot weather might mean cooling materials or adding ingredients to slow the curing of the concrete."
  },
  {
    question: "Will concrete crack?",
    answer: "Yes, concrete does crack. To minimize and control cracking, control joints are placed in the concrete so that the concrete cracks where those control joints are placed. These are either hand control joints or a saw cuts. We also add concrete products that contain millions of fibers mixed throughout the concrete to help control cracking even more. There is NO GUARANTEE that concrete will not crack in other places."
  },
  {
    question: "Is there a recommended on-going maintenance program for my concrete?",
    answer: "In addition to sealing concrete every 2-3 years, do not allow rusting metals to set on the concrete.\n\nFrequent sweeping and occasional hosing will be enough to keep your concrete looking good. Wet leaves on a driveway have a tendency to stain, so be prepared to clean your driveway often in fall.\n\nDo not allow water to drain beneath the slab. Settlement cracks may develop.\n\nDo not allow snow and ice to accumulate the first winter. Keep the driveway shoveled off.\n\nDo not apply deicing chemicals for snow and ice removal the first winter. As an alternative, sand can be used for traction.\n\nWARNING: Never use deicers containing ammonium sulfate or ammonium nitrate (i.e. fertilizers). Such products are known to aggressively attack concrete."
  },
  {
    question: "What strength of concrete do we use?",
    answer: "3500 psi for patios and sidewalks.\nAdd Commercial work and occasional some residential we will use 5000 psi.\n\nWith added fiber reinforcement on all projects."
  },
  {
    question: "How are concrete and asphalt different?",
    answer: "Concrete is more versatile than asphalt because it can be used both outdoors and indoors. For example, you may decide you want a decorative concrete floor inside your commercial building. Asphalt, on the other hand, can only be used for outdoor applications. Concrete lasts longer than asphalt while needing less maintenance. While a concrete driveway can last up to 30 years, an asphalt driveway may only last 12 years. Keep in mind that you’ll still need to apply concrete sealer. However, you won’t have to seal pavement as often as you would with asphalt. Concrete is not only long-lasting, but durable enough to withstand heavy traffic. Many of our customers appreciate how concrete is durable enough to use on freeways, intersections and other high traffic areas without potholing."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dark hero banner so the header white text is visible */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888046428-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 MixBlendMode-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            Frequently Asked <span className="text-primary gap-2">Questions</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Everything you need to know about our premium concrete services, materials, and specialized processes.
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative overflow-hidden">
        {/* Background aesthetic elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  openIndex === index 
                    ? 'border-[#1d4e89] shadow-xl shadow-[#1d4e89]/10' 
                    : 'border-slate-200 shadow-md hover:border-slate-300 hover:shadow-lg'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none cursor-pointer"
                >
                  <span className={`font-bold text-lg md:text-xl pr-8 transition-colors ${openIndex === index ? 'text-[#1d4e89]' : 'text-slate-900'}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'bg-blue-50 rotate-180' : 'bg-slate-50'}`}>
                    <ChevronDown className={`w-6 h-6 ${openIndex === index ? 'text-[#1d4e89]' : 'text-slate-500'}`} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 text-slate-600 space-y-4">
                        <div className="w-full h-px bg-slate-100 mb-6"></div>
                        {faq.answer.split('\n\n').map((paragraph, i) => (
                          <p key={i} className="leading-relaxed text-base md:text-lg whitespace-pre-line">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
