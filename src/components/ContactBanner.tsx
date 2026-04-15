import { motion } from 'motion/react';
import { User, Mail, Phone as PhoneIcon } from 'lucide-react';

export default function ContactBanner() {
  return (
    <section className="w-full bg-[#0D2B5E] py-28 md:py-36 relative z-30 overflow-hidden">

      {/* Subtle decorative rings */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] border border-white/5 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/8 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full bg-primary/10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-blue-300 font-bold tracking-[0.25em] uppercase text-sm mb-5">Free Estimate</p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            Get A Quick Estimate
          </h2>
        </div>

        {/* Form row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-stretch gap-4"
        >
          <div className="flex-1 relative group">
            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-white transition-colors" size={18} />
            <input type="text" placeholder="Full Name" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/12 text-white font-medium placeholder:text-slate-400 transition-all text-base" />
          </div>

          <div className="flex-1 relative group hidden lg:block">
            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-white transition-colors" size={18} />
            <input type="email" placeholder="Email (Optional)" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/12 text-white font-medium placeholder:text-slate-400 transition-all text-base" />
          </div>

          <div className="flex-1 relative group">
            <PhoneIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-white transition-colors" size={18} />
            <input type="tel" placeholder="Phone Number" className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/12 text-white font-medium placeholder:text-slate-400 transition-all text-base" />
          </div>

          <div className="flex-1 relative group">
            <select className="w-full px-6 py-5 rounded-2xl bg-white/8 backdrop-blur-md border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/30 text-white font-medium transition-all appearance-none cursor-pointer text-base">
              <option value="" disabled>Select Service...</option>
              <option value="driveway">Driveway</option>
              <option value="patio">Patio</option>
              <option value="walkway">Walkway</option>
              <option value="stamped">Stamped</option>
              <option value="commercial">Commercial</option>
              <option value="other">Other</option>
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>

          <div className="flex-shrink-0">
            <button className="w-full md:w-auto bg-primary hover:bg-[#0D47A1] text-white font-black text-lg py-5 px-10 rounded-2xl transition-all hover:-translate-y-0.5 cursor-pointer whitespace-nowrap shadow-lg shadow-primary/30 tracking-wide">
              Request Estimate
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
