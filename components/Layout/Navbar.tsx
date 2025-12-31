import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    // Determine scroll direction and hide/show navbar
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Add background blur when scrolled away from top
    if (latest > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const handleNavigation = (item: string) => {
    const sectionId = item.toLowerCase();
    
    if (sectionId === 'user') {
      navigate('/user');
      window.scrollTo(0, 0);
      return;
    }

    // For other links, navigation logic
    if (location.pathname !== '/') {
      navigate('/');
      // Allow time for route change then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) window.lenis?.scrollTo(element);
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) window.lenis?.scrollTo(element);
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 pointer-events-none flex justify-center ${
        scrolled ? 'py-4' : 'py-8'
      }`}
    >
      {/* 
         Main Navbar "Pill" 
         - pointer-events-auto allows interaction
         - w-fit keeps it compact
      */}
      <div 
        className={`pointer-events-auto relative flex items-center gap-8 md:gap-12 px-3 py-2 md:px-3 md:py-2 rounded-full transition-all duration-500 ${
          scrolled 
            ? 'bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]' 
            : 'bg-transparent border border-transparent'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer group pl-2" onClick={() => { navigate('/'); window.scrollTo(0,0); }}>
          <div className="w-9 h-9 bg-white text-black flex items-center justify-center font-display font-bold text-lg rounded-full group-hover:rotate-180 transition-transform duration-500 shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            S
          </div>
          <span className="font-display font-bold text-lg tracking-tight hidden sm:block text-white">SILVER</span>
        </div>

        {/* Navigation Links - Premium Text Swap Animation */}
        <div className="hidden md:flex items-center gap-8">
          {['Protocol', 'Features', 'Updates', 'User'].map((item) => (
            <button 
              key={item}
              onClick={() => handleNavigation(item)}
              className="relative h-4 overflow-hidden group"
            >
              <span className="block text-xs font-bold font-display text-cyber-silver/70 uppercase tracking-widest transition-transform duration-300 group-hover:-translate-y-full">
                {item}
              </span>
              <span className="absolute top-0 left-0 block text-xs font-bold font-display text-white uppercase tracking-widest translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                {item}
              </span>
            </button>
          ))}
        </div>

        {/* Login CTA - Compact & Modern (No green dot, Arrow added) */}
        <button 
          onClick={() => navigate('/user')}
          className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-cyber-silver text-black rounded-full transition-all duration-300 group shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-105"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest font-display">Login</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
             <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;