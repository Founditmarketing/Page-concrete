import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FatFooter() {
  return (
    <footer className="bg-[#0D2B5E] text-slate-300 pt-28 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">

          {/* Col 1: Brand */}
          <div className="lg:col-span-1">
            <div className="font-black text-3xl tracking-tighter text-white uppercase mb-6">
              Page <span className="text-primary">Concrete</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-base mb-8">
              30 years of uncompromising quality in High Point, NC. We build legacies that outlast the rest. Licensed, insured, and dedicated to perfection.
            </p>
            {/* Facebook pending real URL from Derek */}
          </div>

          {/* Col 2: Links */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-8">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/#services' },
                { name: 'Project Gallery', path: '/gallery' },
                { name: 'FAQs', path: '/faqs' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-white transition-colors flex items-center gap-3 text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-8">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <Phone className="text-primary shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-white font-semibold mb-1">Phone</p>
                  <a href="tel:336-442-6481" className="text-slate-400 hover:text-white transition-colors">336-442-6481</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <Mail className="text-primary shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-white font-semibold mb-1">Email</p>
                  <a href="mailto:nacinc4@gmail.com" className="text-slate-400 hover:text-white transition-colors">nacinc4@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <MapPin className="text-primary shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-white font-semibold mb-1">Location</p>
                  <p className="text-slate-400">High Point, NC 27012</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Contact */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-8">Quick Contact</h3>
            <p className="text-slate-400 mb-6 text-base leading-relaxed">
              Need an estimate? Drop us a line and we'll get right back to you.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Name"
                className="bg-white/8 border border-white/15 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-500"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="bg-white/8 border border-white/15 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-500"
                required
              />
              <textarea
                placeholder="How can we help?"
                className="bg-white/8 border border-white/15 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all resize-none h-24 placeholder:text-slate-500"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white font-bold rounded-xl px-5 py-4 hover:bg-[#0D47A1] transition-colors cursor-pointer mt-1 tracking-wide"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Page Concrete and Outdoor Services. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
