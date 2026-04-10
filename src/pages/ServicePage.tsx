import { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const servicesData = {
  'custom-driveways': {
    title: 'Custom Driveways',
    description: 'Engineered to withstand heavy loads and severe weather.',
    fullText: 'Your driveway is the first impression of your property. We pour and finish high-strength, lasting concrete driveways designed to stand up to heavy vehicles, freeze-thaw cycles, and years of use without cracking or settling.',
    image: '/pageconcretepic1.jpg',
    features: ['High-PSI Concrete Mix', 'Rebar & Wire Mesh Reinforcement', 'Proper Control Joints', 'Expert Leveling & Grading']
  },
  'stamped-and-decorative': {
    title: 'Stamped & Decorative',
    description: 'Premium textures mimicking stone or wood.',
    fullText: 'Achieve the high-end look of natural stone, brick, slate, or even wood at a fraction of the cost. Our stamped and decorative concrete services offer endless color and pattern combinations, sealed for long-lasting vibrancy and protection.',
    image: '/pageconcretepic9.jpg',
    features: ['Custom Color Integration', 'Wide Array of Stamp Patterns', 'High-Gloss or Matte Sealants', 'Slip-Resistant Additives']
  },
  'patios-and-outdoor-living': {
    title: 'Patios & Outdoor Living',
    description: 'Transform your backyard into a permanent entertainment space.',
    fullText: 'Expand your living space outdoors with a custom concrete patio. Whether you want a simple broom-finish slab for a fire pit or an elaborate, multi-tiered entertainment area, we build foundations that anchor your outdoor lifestyle.',
    image: '/pageconcretepic7.jpg',
    features: ['Custom Shapes & Contours', 'Fire Pit & Kitchen Foundations', 'Seamless Home Transitions', 'Durable Weather Resistance']
  },
  'commercial-flatwork': {
    title: 'Commercial Flatwork',
    description: 'Heavy-duty foundations built for scale and safety.',
    fullText: 'We handle large-scale commercial concrete projects with strict adherence to local codes and structural engineering requirements. From parking lots and warehouse floors to ADA-compliant ramps and sidewalks, we deliver on time and on budget.',
    image: '/pageconcretepic4.jpg',
    features: ['Warehouse Floors & Slabs', 'ADA Access Ramps', 'Heavy-Duty Loading Docks', 'Commercial Parking Lots']
  }
};

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();

  // Scroll to top on mount or when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!id || !servicesData[id as keyof typeof servicesData]) {
    // Redirect if invalid service URL
    return <Navigate to="/#services" replace />;
  }

  const service = servicesData[id as keyof typeof servicesData];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888046428-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 MixBlendMode-overlay"></div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={service.title} // Re-animate if title changes
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            key={service.description}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            {service.description}
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative overflow-hidden">
        {/* Background aesthetic elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Service Image */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              key={service.image}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] w-full"
            >
              <img 
                src={service.image} 
                alt={service.title} 
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl"></div>
            </motion.div>

            {/* Service Details */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              key={`text-${service.title}`}
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-6">Uncompromising Quality</h2>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {service.fullText}
              </p>

              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 mb-10">
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-blue-50 text-[#1d4e89] flex items-center justify-center shrink-0">★</span>
                  Features & Details
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="text-[#1d4e89] shrink-0 mt-0.5" size={20} />
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to="/contact">
                <button className="bg-[#1d4e89] text-white font-bold text-lg py-4 px-8 rounded-xl hover:bg-[#15396b] transition-all shadow-xl #1d4e89/20 active:scale-[0.98] flex items-center gap-2 group cursor-pointer inline-flex">
                  Request an Estimate
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
