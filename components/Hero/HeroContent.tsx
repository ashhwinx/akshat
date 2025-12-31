import React from 'react';
import { motion } from 'framer-motion';

const HeroContent: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full h-full pointer-events-auto z-20 pb-40 select-none">
      
      {/* --- AMBIENT ORBS (Optimized) --- */}
      {/* Using Radial Gradients instead of CSS Blur filters for 60FPS performance */}
      
      {/* Left Orb */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1.5, ease: "easeOut" }}
         className="absolute top-1/2 -translate-y-1/2 left-0 md:left-10 lg:left-20 w-[500px] h-[500px] pointer-events-none"
         style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
            willChange: 'opacity, transform'
         }}
      />
      
      {/* Right Orb */}
      <motion.div 
         initial={{ opacity: 0, scale: 0.8 }}
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
         className="absolute top-1/2 -translate-y-1/2 right-0 md:right-10 lg:right-20 w-[500px] h-[500px] pointer-events-none"
         style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
            willChange: 'opacity, transform'
         }}
      />


      {/* Main Headline - Stacked & Styled for Impact */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex flex-col items-center leading-[0.85] tracking-tighter"
      >
        <h1 className="font-display font-bold text-6xl md:text-[7.5rem] text-white uppercase drop-shadow-2xl">
          INFINITE <h1 className="font-display font-bold text-6xl md:text-[7.5rem] text-transparent bg-clip-text bg-gradient-to-b from-cyber-silver via-white to-cyber-dim uppercase opacity-90 drop-shadow-lg">
          VELOCITY
        </h1>
        </h1>
       
      </motion.div>

      {/* Subtext */}
      <motion.p 
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
  className="relative z-10 mt-6 mb-10 font-sans font-medium text-sm md:text-lg text-white/80 max-w-lg leading-relaxed tracking-wide text-center"
>
  The settlement layer for the post-fiat era. 
  <br className="hidden md:block" />
  <span className="text-white/60 font-normal">Instant finality. Zero compromise.</span>
</motion.p>

      {/* Compact Buttons with Cool Animations */}
      <motion.div
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 0.6 }}
         className="relative z-10 flex flex-col sm:flex-row items-center gap-5"
      >
        {/* Primary Button: Compact with Fluid Fill */}
        <button className="group relative h-11 px-8 overflow-hidden bg-white text-black font-display font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:w-[180px] w-[160px] flex items-center justify-center rounded-sm">
           <div className="absolute inset-0 bg-cyber-silver translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.85,0,0.15,1)]" />
           <span className="relative z-10 flex items-center gap-2">
              INITIATE
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-1 opacity-0 group-hover:opacity-100 -ml-2 group-hover:ml-0">
                 <path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
           </span>
        </button>

        {/* Secondary Button: Tech Scanline Effect */}
        <button className="group relative h-11 px-6 overflow-hidden border border-white/10 hover:border-white/30 bg-white/[0.02] text-white font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 w-[160px] rounded-sm">
           <span className="relative z-10 group-hover:text-cyber-silver transition-colors">
              READ_DOCS
           </span>
           {/* Scanline line */}
           <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-silver scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
           {/* Subtle glow bg */}
           <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>
      </motion.div>

    </div>
  );
};

export default HeroContent;