import { useState, useEffect } from 'react';
import { Phone, Mail, Clock, Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function UltraHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="absolute top-0 left-0 w-full flex flex-col z-50 pointer-events-none">
      <div className="pointer-events-auto">
        {/* Top Utility Bar */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-primary text-white py-3 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm border-b border-primary/20"
        >
          <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-6">
              <a href="tel:336-442-6481" className="flex items-center gap-2 hover:text-blue-100 transition-colors tracking-wide">
                <Phone size={13} />
                <span>336-442-6481</span>
              </a>
              <a href="mailto:nacinc4@gmail.com" className="hidden sm:flex items-center gap-2 hover:text-blue-100 transition-colors tracking-wide">
                <Mail size={13} />
                <span>nacinc4@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-2 tracking-wide">
              <Clock size={13} />
              <span>Mon–Fri 8–6 &nbsp;·&nbsp; Sat 8–5</span>
            </div>
          </div>
        </motion.div>

        {/* Main Navbar */}
        <div className="bg-transparent pt-4 pb-4">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 min-h-[5rem]">

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="flex-shrink-0 flex items-center"
              >
                <Link to="/">
                  <img src="/pageconcretenewlogo.png" alt="Page Concrete Logo" className="h-20 md:h-24 lg:h-28 w-auto drop-shadow-md origin-left scale-110" />
                </Link>
              </motion.div>

              {/* Desktop Nav Pill */}
              <motion.nav
                initial={{ y: -30, x: '-50%', opacity: 0 }}
                animate={{ y: 0, x: '-50%', opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`hidden lg:flex items-center space-x-1 backdrop-blur-xl px-5 py-2.5 rounded-full border fixed left-1/2 z-[100] transition-[top,background-color,border-color,box-shadow,transform] duration-500 ease-out ${isScrolled ? 'top-4 scale-95 shadow-2xl shadow-black/20 bg-white border-slate-200' : 'top-[84px] scale-100 shadow-transparent bg-white/75 border-white/50'}`}
              >
                {['Home', 'Services', 'Gallery', 'Service Area', 'FAQs', 'Reviews', 'Contact'].map((item) => {
                  if (item === 'Services') {
                    return (
                      <div
                        key={item}
                        className="relative"
                        onMouseEnter={() => setIsServicesHovered(true)}
                        onMouseLeave={() => setIsServicesHovered(false)}
                      >
                        <button
                          className={`font-semibold tracking-wide transition-all px-4 py-2 rounded-full cursor-pointer flex items-center gap-1.5 text-sm ${
                            activeItem === item || window.location.pathname.includes('/services')
                              ? 'bg-primary text-white shadow-sm'
                              : 'text-slate-600 hover:bg-primary hover:text-white'
                          }`}
                        >
                          Services <ChevronDown size={13} className={`transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />
                        </button>

                        <AnimatePresence>
                          {isServicesHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-12 left-0 mt-1 w-64 bg-white border border-slate-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50 flex flex-col"
                            >
                              <Link to="/services/custom-driveways" className="px-5 py-4 text-slate-700 hover:text-white hover:bg-primary transition-colors border-b border-slate-50 font-medium text-sm">Custom Driveways</Link>
                              <Link to="/services/stamped-and-decorative" className="px-5 py-4 text-slate-700 hover:text-white hover:bg-primary transition-colors border-b border-slate-50 font-medium text-sm">Stamped & Decorative</Link>
                              <Link to="/services/patios-and-outdoor-living" className="px-5 py-4 text-slate-700 hover:text-white hover:bg-primary transition-colors border-b border-slate-50 font-medium text-sm">Patios & Outdoor Living</Link>
                              <Link to="/services/commercial-flatwork" className="px-5 py-4 text-slate-700 hover:text-white hover:bg-primary transition-colors font-medium text-sm">Commercial Flatwork</Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item}
                      to={item === 'FAQs' ? '/faqs' : item === 'Gallery' ? '/gallery' : item === 'Contact' ? '/contact' : item === 'Service Area' ? '/service-area' : item === 'Reviews' ? '/reviews' : item === 'Home' ? '/' : `/#${item.toLowerCase().replace(' ', '-')}`}
                      onClick={() => setActiveItem(item)}
                      className={`font-semibold tracking-wide transition-all px-4 py-2 rounded-full cursor-pointer text-sm ${
                        activeItem === item
                          ? 'bg-primary text-white shadow-sm'
                          : 'text-slate-600 hover:bg-primary hover:text-white'
                      }`}
                    >
                      {item}
                    </Link>
                  );
                })}
              </motion.nav>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
                className="hidden md:flex items-center"
              >
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-primary text-white px-8 py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/30 hover:bg-[#0D47A1] transition-all cursor-pointer tracking-wide"
                  >
                    Get a Free Estimate
                  </motion.button>
                </Link>
              </motion.div>

              {/* Mobile Hamburger */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:hidden absolute top-[58px] right-4 z-[110]"
              >
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="bg-white/95 backdrop-blur-md border border-slate-200 text-slate-800 p-2.5 cursor-pointer hover:bg-primary hover:text-white rounded-xl transition-colors shadow-lg"
                >
                  {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-[140px] left-4 right-4 bg-white/98 backdrop-blur-2xl border border-slate-100 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden pointer-events-auto flex flex-col z-[100]"
          >
            <div className="flex flex-col p-5 gap-1.5">
              {['Home', 'Services', 'Gallery', 'Service Area', 'FAQs', 'Reviews', 'Contact'].map((item) => {
                if (item === 'Services') {
                  return (
                    <div key={item} className="flex flex-col">
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className={`w-full text-left font-semibold tracking-wide transition-all p-4 rounded-xl cursor-pointer flex items-center justify-between ${
                          window.location.pathname.includes('/services') || isMobileServicesOpen
                            ? 'bg-primary text-white'
                            : 'text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        Services
                        <ChevronDown size={18} className={`transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {isMobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col pl-4 mt-1 mb-1 space-y-0.5 mx-2 border-l-2 border-primary/30"
                          >
                            <Link to="/services/custom-driveways" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-3 rounded-lg text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors font-medium text-sm">Custom Driveways</Link>
                            <Link to="/services/stamped-and-decorative" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-3 rounded-lg text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors font-medium text-sm">Stamped & Decorative</Link>
                            <Link to="/services/patios-and-outdoor-living" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-3 rounded-lg text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors font-medium text-sm">Patios & Outdoor Living</Link>
                            <Link to="/services/commercial-flatwork" onClick={() => setIsMobileMenuOpen(false)} className="py-3 px-3 rounded-lg text-slate-600 hover:text-primary hover:bg-primary/5 transition-colors font-medium text-sm">Commercial Flatwork</Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item}
                    to={item === 'FAQs' ? '/faqs' : item === 'Gallery' ? '/gallery' : item === 'Contact' ? '/contact' : item === 'Service Area' ? '/service-area' : item === 'Reviews' ? '/reviews' : item === 'Home' ? '/' : `/#${item.toLowerCase().replace(' ', '-')}`}
                    onClick={() => { setActiveItem(item); setIsMobileMenuOpen(false); }}
                    className={`font-semibold tracking-wide transition-all p-4 rounded-xl cursor-pointer ${
                      activeItem === item
                        ? 'bg-primary text-white'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}

              <div className="w-full h-px bg-slate-100 my-2"></div>

              <Link
                to="/contact"
                className="bg-primary text-white w-full py-4 rounded-xl font-bold shadow-lg hover:bg-[#0D47A1] transition-all cursor-pointer text-center block tracking-wide"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get a Free Estimate
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
