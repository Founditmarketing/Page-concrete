import { Phone, Mail, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FatFooter() {
  return (
    <footer className="bg-[#0D2B5E] text-slate-300 py-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">

          {/* Col 1: Logo & Bio */}
          <div>
            <div className="font-black text-2xl tracking-tighter text-white uppercase mb-6">
              Page <span className="text-primary">Concrete</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              30 years of uncompromising quality in High Point, NC. We build legacies that outlast the rest. Licensed, insured, and dedicated to perfection.
            </p>
            <div className="flex gap-4">
              {/* Facebook link pending real URL from Derek */}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Services', path: '/#services' },
                { name: 'Project Gallery', path: '/gallery' },
                { name: 'FAQs', path: '/faqs' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-medium">Phone</p>
                  <a href="tel:336-442-6481" className="text-slate-300 hover:text-white transition-colors">336-442-6481</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <a href="mailto:nacinc4@gmail.com" className="text-slate-400 hover:text-white transition-colors">nacinc4@gmail.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0 mt-1" size={20} />
                <div>
                  <p className="text-white font-medium">Location</p>
                  <p className="text-slate-400">High Point, NC 27012</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Contact Form */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6">Quick Contact</h3>
            <p className="text-slate-400 mb-4 text-sm">
              Have a question or need an estimate? Drop us a line and we'll get right back to you.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Name"
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                required
              />
              <textarea
                placeholder="How can we help?"
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none h-20"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-primary text-white font-bold rounded-lg px-4 py-3 hover:bg-[#0D47A1] transition-colors cursor-pointer mt-1"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-white/10 text-center text-slate-400 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Page Concrete and Outdoor Services. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
