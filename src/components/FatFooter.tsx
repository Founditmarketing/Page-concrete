import { useState } from 'react';
import { Phone, Mail, MapPin, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

type FooterStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function FatFooter() {
  const [status, setStatus] = useState<FooterStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.name,
          phone: form.phone,
          message: form.message,
          formSource: 'Footer Quick Contact',
        }),
      });

      let data: { error?: string; success?: boolean } = {};
      try { data = await res.json(); } catch { /* ignore parse errors */ }

      if (!res.ok) {
        setErrorMsg(data.error || `Error ${res.status}: Please try again.`);
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', phone: '', message: '' });
    } catch (err) {
      console.error('Footer form fetch error:', err);
      setErrorMsg('Could not reach the server. Please try again.');
      setStatus('error');
    }
  };

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
                  <a href="mailto:info@pageconcretenc.com" className="text-slate-400 hover:text-white transition-colors">info@pageconcretenc.com</a>
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

          {/* Col 4: Quick Contact Form */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-[0.15em] uppercase mb-8">Quick Contact</h3>
            <p className="text-slate-400 mb-6 text-base leading-relaxed">
              Need an estimate? Drop us a line and we'll get right back to you.
            </p>

            {/* Success state */}
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center gap-3 py-6"
                >
                  <CheckCircle className="text-green-400 w-10 h-10" />
                  <p className="text-white font-bold">Message Sent!</p>
                  <p className="text-slate-400 text-sm">We'll be in touch shortly.</p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="text-blue-300 text-sm underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Send another
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {status !== 'success' && (
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="bg-white/8 border border-white/15 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-500"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="bg-white/8 border border-white/15 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all placeholder:text-slate-500"
                  required
                />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="bg-white/8 border border-white/15 rounded-xl px-5 py-4 text-sm text-white focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all resize-none h-24 placeholder:text-slate-500"
                  required
                />

                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-400/20 rounded-xl px-4 py-3 text-sm">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="bg-primary text-white font-bold rounded-xl px-5 py-4 hover:bg-[#0D47A1] transition-colors cursor-pointer mt-1 tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 text-slate-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Page Concrete and Outdoor Services. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
