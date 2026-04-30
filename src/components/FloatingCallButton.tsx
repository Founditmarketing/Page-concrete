import { motion } from 'motion/react';
import { PhoneCall } from 'lucide-react';

export default function FloatingCallButton() {
  return (
    <div className="fixed bottom-6 md:bottom-10 right-6 md:right-10 z-[100]">
      {/* Outer wrapper manages the vertical levitation heartbeat motion */}
      <motion.div
        className="relative w-14 h-14 md:w-16 md:h-16"
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap="tap"
        variants={{
          rest: { y: [0, -4, 0] },
          hover: { y: 0 },
          tap: { y: 0 }
        }}
        transition={{
          y: { duration: 2.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }
        }}
        title="Call Us Now"
      >
        {/* Exterior slim white ring that collapses inward against the edge of the button */}
        <motion.div
          className="absolute inset-0 rounded-full border-[1.5px] border-[#1d4e89] pointer-events-none"
          variants={{
            rest: { scale: 1.25, opacity: 0.8 },
            hover: { scale: 1.05, opacity: 0 }
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
        
        {/* The true red background button itself that scales outward on hover */}
        <motion.a
          href="tel:336-442-6481"
          className="absolute inset-0 flex items-center justify-center bg-[#1d4e89] text-white hover:bg-[#15396b] rounded-full shadow-xl shadow-[#1d4e89]/40 z-10 transition-colors overflow-hidden"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.05 },
            tap: { scale: 0.95 }
          }}
          transition={{ scale: { duration: 0.2 } }}
        >
          {/* Shimmer Effect */}
          <motion.div
            key="shimmer-fastest"
            className="absolute inset-0 w-[30%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 z-10"
            animate={{ x: ["-400%", "400%"] }}
            initial={{ x: "-400%" }}
            transition={{
              duration: 0.15,
              repeat: Infinity,
              repeatDelay: 4.0,
              ease: "linear",
            }}
          />
          
          <PhoneCall className="w-6 h-6 md:w-7 md:h-7 text-white relative z-20" fill="currentColor" strokeWidth={0} />
        </motion.a>
      </motion.div>
    </div>
  );
}
