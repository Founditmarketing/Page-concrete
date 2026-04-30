import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const REVIEWS = [
  {
    id: 1,
    name: "Jennifer M.",
    date: "2 months ago",
    text: "Wow!! Page Concrete was amazing! They have great communication and were timely and responsive. On the day of the project they arrived bright and early and worked hard. They did a beautiful job adding stamped concrete to our driveway.",
    rating: 5,
    source: "Google"
  },
  {
    id: 2,
    name: "Robert D.",
    date: "4 months ago",
    text: "Very informative on the estimate and answers all my questions. Did the work when he said and did it quickly. Took pictures before and after. And did it all at a great price! I would do business with them again!",
    rating: 5,
    source: "HomeAdvisor"
  },
  {
    id: 3,
    name: "Sarah L.",
    date: "6 months ago",
    text: "Extremely professional concrete contractors. I've used several in the Triad over the years but Page Concrete & Outdoor's attention to detail on our commercial flatwork was unmatched. Very clean job site.",
    rating: 5,
    source: "Google"
  },
  {
    id: 4,
    name: "Mark T.",
    date: "8 months ago",
    text: "His team work very hard and completed everything on in one day! The clean up was great, you could hardly tell all that equipment was here and dirt had been moved.",
    rating: 5,
    source: "Google"
  },
  {
    id: 5,
    name: "Emily W.",
    date: "1 year ago",
    text: "Derek and his crew poured a massive 40x20 stamped patio for our backyard. The color match was perfect and the stone texture looks incredibly realistic. Highly recommend.",
    rating: 5,
    source: "Google"
  },
  {
    id: 6,
    name: "David C.",
    date: "1 year ago",
    text: "We needed our crumbling driveway ripped out and repoured. They handled the entire tear-out, grading, and pouring seamlessly. Excellent communication throughout the whole process.",
    rating: 5,
    source: "HomeAdvisor"
  }
];

export default function ReviewsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Dark hero banner */}
      <div className="bg-slate-950 pt-48 md:pt-56 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888046428-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 MixBlendMode-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-8"
          >
            <div className="flex text-yellow-500">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
            </div>
            <span className="text-white font-bold tracking-wider">4.8 AVERAGE RATING</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase mb-6"
          >
            What Our <span className="text-primary">Clients</span> Say
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Don't just take our word for it. Read verified reviews from homeowners and businesses across the Triad.
          </motion.p>
        </div>
      </div>

      <section className="py-24 relative overflow-hidden z-10">
        {/* Background aesthetic elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {REVIEWS.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 break-inside-avoid relative group hover:-translate-y-1 transition-transform duration-300"
              >
                <Quote className="absolute top-6 right-6 text-slate-100 group-hover:text-blue-50 transition-colors" size={60} strokeWidth={1} />
                
                <div className="flex gap-1 text-yellow-500 mb-6 relative z-10">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" className="drop-shadow-sm" />
                  ))}
                </div>
                
                <p className="text-slate-700 text-lg leading-relaxed mb-8 relative z-10 font-medium italic">
                  "{review.text}"
                </p>
                
                <div className="flex items-center justify-between border-t border-slate-100 pt-6 relative z-10">
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg flex items-center gap-2">
                      {review.name}
                      <CheckCircle2 size={16} className="text-[#1d4e89]" />
                    </h4>
                    <span className="text-sm text-slate-500 font-medium">{review.date}</span>
                  </div>
                  
                  <div className="bg-slate-50 px-3 py-1 rounded-full text-xs font-bold text-slate-500 tracking-wider uppercase border border-slate-200">
                    {review.source}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h3 className="text-2xl font-black text-slate-900 mb-6">Ready to start your own project?</h3>
            <Link to="/contact">
              <button className="bg-[#1d4e89] text-white font-bold text-xl py-4 px-10 rounded-xl hover:bg-[#15396b] transition-all shadow-xl #1d4e89/20 active:scale-[0.98] cursor-pointer">
                Get a Free Estimate
              </button>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
