import { motion } from 'motion/react';
import { User, Mail, Phone as PhoneIcon } from 'lucide-react';

export default function ContactBanner() {
  return (
    <section className="w-full bg-[#0D2B5E] py-20 md:py-28 relative z-30 border-y border-white/10 overflow-hidden">
      {/* Decorative background elements matching the Abstract Map Section */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-white/10 rounded-full opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/15 rounded-full opacity-50 bg-primary/10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">Get A Quick Estimate</h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="p-2 md:p-0 flex flex-col md:flex-row items-center gap-3 md:gap-5"
        >
          <div className="w-full lg:flex-1 relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" size={20} />
            <input type="text" placeholder="Full Name" className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-900 text-white font-medium placeholder:text-slate-500 transition-all shadow-inner" />
          </div>
          <div className="w-full lg:flex-1 relative group md:hidden lg:block hidden">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" size={20} />
            <input type="email" placeholder="Email (Opt)" className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-900 text-white font-medium placeholder:text-slate-500 transition-all shadow-inner" />
          </div>
          <div className="w-full lg:flex-1 relative group">
            <PhoneIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors" size={20} />
            <input type="tel" placeholder="Phone Number" className="w-full pl-12 pr-5 py-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-900 text-white font-medium placeholder:text-slate-500 transition-all shadow-inner" />
          </div>
          <div className="w-full lg:flex-1 relative group">
            <select className="w-full px-5 py-4 rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-slate-900 text-white font-medium transition-all shadow-inner appearance-none cursor-pointer">
              <option value="" disabled selected>Select Service...</option>
              <option value="driveway">Driveway</option>
              <option value="patio">Patio</option>
              <option value="walkway">Walkway</option>
              <option value="stamped">Stamped</option>
              <option value="commercial">Commercial</option>
              <option value="other">Other</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
          <div className="w-full lg:w-auto relative group flex-shrink-0">
            <input type="file" id="banner-upload" className="hidden" multiple accept="image/*" />
            <label htmlFor="banner-upload" className="w-full lg:w-14 h-14 flex items-center justify-center rounded-xl bg-slate-900/60 backdrop-blur-md border border-slate-700 hover:border-primary hover:bg-slate-800 text-slate-400 hover:text-white transition-all shadow-inner cursor-pointer group-focus-within:ring-2 group-focus-within:ring-primary" title="Attach Project Photos">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              <span className="lg:hidden ml-3 font-medium">Attach Photos</span>
            </label>
          </div>
          <div className="w-full lg:flex-1 relative">
            <button className="relative z-10 w-full bg-primary hover:bg-[#0D47A1] text-white font-black text-lg py-4 px-6 rounded-xl transition-all transform hover:-translate-y-1 cursor-pointer whitespace-nowrap overflow-hidden group">
              <span className="relative z-10 w-full flex items-center justify-center gap-2">
                Request Estimate
              </span>
              <div className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-20 glow-effect block transition-opacity duration-300 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+Cjwvc3ZnPg==')]"></div>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
