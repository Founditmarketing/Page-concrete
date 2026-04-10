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
          className="bg-slate-950 text-slate-200 py-2 px-4 sm:px-6 lg:px-8 text-xs sm:text-sm border-b border-white/10"
        >
          <div className="w-full flex flex-row justify-between items-center gap-2">
            <div className="flex items-center gap-4">
              <a href="tel:336-442-6481" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Phone size={14} />
                <span>336-442-6481</span>
              </a>
              <a href="mailto:nacinc4@gmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={14} />
                <span>nacinc4@gmail.com</span>
              </a>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>Mon-Fri 8-6, Sat 8-5</span>
            </div>
          </div>
        </motion.div>

        {/* Main Navbar - Transparent Background over Hero */}
        <div className="bg-transparent pt-4 pb-4">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-2 min-h-[5rem]">

              {/* Logo */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="flex-shrink-0 flex items-center"
              >
                <Link to="/">
                  <img src="/pageconcretenewlogo.png" alt="Page Concrete Logo" className="h-20 md:h-24 lg:h-28 w-auto drop-shadow-md origin-left scale-110" />
                </Link>
              </motion.div>

              {/* Desktop Menu */}
              <motion.nav 
                initial={{ y: -30, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={`hidden lg:flex items-center space-x-2 backdrop-blur-xl px-4 py-2 rounded-full border fixed left-1/2 z-[100] transition-[top,background-color,border-color,box-shadow,transform] duration-500 ease-out ${isScrolled ? 'top-4 scale-95 shadow-2xl shadow-black/50 bg-slate-900/95 border-slate-800' : 'top-[78px] scale-100 shadow-transparent bg-black/20 border-white/10'}`}
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
                          className={`font-bold tracking-wide transition-all px-4 py-2 rounded-full cursor-pointer flex items-center gap-1 ${
                            activeItem === item || window.location.pathname.includes('/services')
                              ? 'bg-[#1d4e89] text-white shadow-inner' 
                              : 'text-white hover:bg-[#1d4e89] hover:text-white'
                          }`}
                        >
                          Services <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isServicesHovered && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.2 }}
                              className="absolute top-10 left-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl overflow-hidden backdrop-blur-xl z-50 flex flex-col"
                            >
                              <Link to="/services/custom-driveways" className="px-5 py-3.5 text-slate-300 hover:text-white hover:bg-[#1d4e89] transition-colors border-b border-slate-800 font-medium">
                                Custom Driveways
                              </Link>
                              <Link to="/services/stamped-and-decorative" className="px-5 py-3.5 text-slate-300 hover:text-white hover:bg-[#1d4e89] transition-colors border-b border-slate-800 font-medium">
                                Stamped & Decorative
                              </Link>
                              <Link to="/services/patios-and-outdoor-living" className="px-5 py-3.5 text-slate-300 hover:text-white hover:bg-[#1d4e89] transition-colors border-b border-slate-800 font-medium">
                                Patios & Outdoor Living
                              </Link>
                              <Link to="/services/commercial-flatwork" className="px-5 py-3.5 text-slate-300 hover:text-white hover:bg-[#1d4e89] transition-colors font-medium">
                                Commercial Flatwork
                              </Link>
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
                      className={`font-bold tracking-wide transition-all px-4 py-2 rounded-full cursor-pointer ${
                        activeItem === item 
                          ? 'bg-[#1d4e89] text-white shadow-inner' 
                          : 'text-white hover:bg-[#1d4e89] hover:text-white'
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
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="hidden md:flex items-center"
            >
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1d4e89] text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-[#1d4e89]/30 hover:shadow-[#1d4e89]/50 hover:bg-blue-900 transition-all cursor-pointer border border-white/20"
                >
                  Get a Free Estimate
                </motion.button>
              </Link>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:hidden absolute top-[52px] right-4 z-[110]"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="bg-slate-950/80 backdrop-blur-md border border-white/20 text-white p-2.5 cursor-pointer hover:bg-primary rounded-lg transition-colors shadow-2xl"
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-[135px] left-4 right-4 bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden pointer-events-auto flex flex-col z-[100]"
          >
            <div className="flex flex-col p-4 gap-2">
              {['Home', 'Services', 'Gallery', 'Service Area', 'FAQs', 'Reviews', 'Contact'].map((item) => {
                if (item === 'Services') {
                  return (
                    <div key={item} className="flex flex-col">
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className={`w-full text-left font-bold tracking-wide transition-all p-3.5 rounded-xl cursor-pointer flex items-center justify-between ${
                          window.location.pathname.includes('/services') || isMobileServicesOpen
                            ? 'bg-[#1d4e89] text-white' 
                            : 'text-white hover:bg-white/10'
                        }`}
                      >
                        Services
                        <ChevronDown size={20} className={`text-slate-200 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <AnimatePresence>
                        {isMobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden flex flex-col pl-4 mt-2 mb-2 space-y-1 mx-2 border-l-2 border-white/10"
                          >
                            <Link to="/services/custom-driveways" onClick={() => setIsMobileMenuOpen(false)} className="py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium">
                              Custom Driveways
                            </Link>
                            <Link to="/services/stamped-and-decorative" onClick={() => setIsMobileMenuOpen(false)} className="py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium">
                              Stamped & Decorative
                            </Link>
                            <Link to="/services/patios-and-outdoor-living" onClick={() => setIsMobileMenuOpen(false)} className="py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium">
                              Patios & Outdoor Living
                            </Link>
                            <Link to="/services/commercial-flatwork" onClick={() => setIsMobileMenuOpen(false)} className="py-2.5 px-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors font-medium">
                              Commercial Flatwork
                            </Link>
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
                    onClick={() => {
                      setActiveItem(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`font-bold tracking-wide transition-all p-3.5 rounded-xl cursor-pointer ${
                      activeItem === item 
                        ? 'bg-[#1d4e89] text-white shadow-inner' 
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
              
              <div className="w-full h-px bg-white/10 my-2"></div>
              
              <Link
                to="/contact"
                className="bg-[#1d4e89] text-white w-full py-4 rounded-xl font-bold shadow-lg hover:bg-[#15396b] transition-all cursor-pointer text-center block"
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
