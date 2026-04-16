import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, UploadCloud, CheckCircle, AlertCircle, Loader } from 'lucide-react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, formSource: 'Contact Page' }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ firstName: '', lastName: '', phone: '', email: '', service: '', message: '' });
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888046428-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 MixBlendMode-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            Contact <span className="text-primary gap-2">Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Ready to start your next project? Get in touch with us for a free estimate or any questions.
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative">
        {/* Background aesthetic elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:items-start">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-32"
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-[#1d4e89] p-4 rounded-full">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Phone Number</h3>
                    <a href="tel:336-442-6481" className="text-lg text-slate-600 hover:text-[#1d4e89] transition-colors font-medium">336-442-6481</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-[#1d4e89] p-4 rounded-full">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Email Address</h3>
                    <a href="mailto:nacinc4@gmail.com" className="text-lg text-slate-600 hover:text-[#1d4e89] transition-colors font-medium">nacinc4@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-[#1d4e89] p-4 rounded-full">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Location</h3>
                    <p className="text-lg text-slate-600 font-medium">High Point, NC 27012</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 text-[#1d4e89] p-4 rounded-full">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">Business Hours</h3>
                    <p className="text-lg text-slate-600 font-medium">Monday - Friday: 8:00 AM - 6:00 PM</p>
                    <p className="text-lg text-slate-600 font-medium">Saturday: 8:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-slate-100 relative"
            >
              <h2 className="text-3xl font-black text-slate-900 uppercase mb-8">Send a Message</h2>

              {/* Success State */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center text-center py-16 gap-4"
                  >
                    <CheckCircle className="text-green-500 w-16 h-16" />
                    <h3 className="text-2xl font-black text-slate-900">Message Sent!</h3>
                    <p className="text-slate-600 max-w-sm">Thanks for reaching out. We'll get back to you as soon as possible.</p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="mt-4 text-[#1d4e89] font-bold underline underline-offset-2 hover:text-[#15396b] transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {status !== 'success' && (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1d4e89] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1d4e89] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1d4e89] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1d4e89] focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Service Needed</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1d4e89] focus:border-transparent transition-all appearance-none cursor-pointer text-slate-700"
                    >
                      <option value="" disabled>Select a Service</option>
                      <option value="Concrete Driveway">Concrete Driveway</option>
                      <option value="Concrete Patio">Concrete Patio</option>
                      <option value="Walkway / Sidewalk">Walkway / Sidewalk</option>
                      <option value="Stamped / Decorative Concrete">Stamped / Decorative Concrete</option>
                      <option value="Commercial Concrete">Commercial Concrete</option>
                      <option value="General Inquiry / Other">General Inquiry / Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Project Photos (Optional)</label>
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-8 h-8 mb-3 text-slate-400 group-hover:text-[#1d4e89] transition-colors" />
                        <p className="mb-1 text-sm text-slate-500"><span className="font-bold text-[#1d4e89]">Click to upload</span> photos</p>
                        <p className="text-xs text-slate-400">PNG, JPG or WEBP</p>
                      </div>
                      <input type="file" className="hidden" multiple accept="image/*" />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">How can we help?</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={4}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1d4e89] focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>

                  {/* Error message */}
                  {status === 'error' && (
                    <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3">
                      <AlertCircle size={18} className="shrink-0" />
                      <span className="text-sm font-medium">{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-[#1d4e89] text-white font-bold text-lg py-4 rounded-xl hover:bg-[#15396b] transition-all shadow-xl active:scale-[0.98] cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader size={20} className="animate-spin" />
                        Sending…
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}
