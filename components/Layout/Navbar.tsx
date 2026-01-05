import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// ⚠️ IMPORT YOUR LOGO HERE
const logoImg = "/logo.png"; 

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      // UPDATED: 'pt-2' / 'pt-4' to move it UP (Margin Top hataya)
      className={`fixed top-0 left-0 w-full z-[100] flex justify-center pointer-events-none transition-all duration-300 ${
        scrolled ? 'pt-2 pb-2' : 'pt-4 pb-4'
      }`}
    >
      {/* UPDATED: 
         - w-[98%] ensures maximum gap between Left and Right.
         - max-w-screen-2xl allows it to stretch wider on large screens.
      */}
      <div 
        className={`pointer-events-auto w-[98%] md:w-[96%] max-w-screen-2xl flex items-center justify-between px-5 py-3 md:px-8 md:py-3 rounded-full transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border border-transparent'
        }`}
      >
        
        {/* --- LEFT: LOGO SECTION --- */}
        <div 
          className="flex items-center gap-4 cursor-pointer group" 
          onClick={() => { navigate('/'); window.scrollTo(0,0); }}
        >
          {/* Logo Image Wrapper */}
          <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
             <img 
               src={logoImg} 
               alt="Ghost Link Logo" 
               className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
               onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling?.classList.remove('hidden');
               }}
             />
             <div className="hidden w-full h-full bg-white text-black rounded-full items-center justify-center font-bold font-display">G</div>
          </div>

          <span className="font-display font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-cyber-silver transition-colors">
           BITCOIN
          </span>
        </div>

        {/* --- RIGHT: LOGIN BUTTON --- */}
        <button 
          onClick={() => navigate('/user')}
          className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-cyber-silver text-black rounded-full transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
        >
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest font-display">
            Login
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
             <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>
    </motion.nav>
  );
};

export default Navbar;