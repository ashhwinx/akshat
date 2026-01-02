import React from 'react';
import { motion } from 'framer-motion';

// --- OPTIMIZED ANIMATION CONFIG ---
const smoothTransition = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1],
};

// --- PREMIUM ROLLING TEXT COMPONENT ---
// Ye text ko shutter ki tarah slide karega hover par
const RollingText: React.FC<{ text: string; className?: string }> = ({ text, className }) => {
  return (
    <div className="relative overflow-hidden block h-[1.1em] leading-[1.1em] group cursor-pointer">
      <motion.div
        initial="initial"
        whileHover="hovered"
        className="relative"
      >
        {/* 1. Original Text (Slides Up & Out) */}
        <motion.span
          variants={{
            initial: { y: 0 },
            hovered: { y: "-100%" },
          }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className={`block ${className}`}
        >
          {text}
        </motion.span>

        {/* 2. Duplicate Text (Slides Up & In) */}
        <motion.span
          variants={{
            initial: { y: "100%" },
            hovered: { y: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className={`absolute inset-0 block ${className}`}
        >
          {text}
        </motion.span>
      </motion.div>
    </div>
  );
};

// ==========================================
// 1. BITCOIN CARD
// ==========================================
const BitcoinCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 100, rotate: 10 }} 
      animate={{ opacity: 1, x: 0, rotate: 6 }}    
      transition={{ ...smoothTransition, delay: 3.2 }}
      style={{ willChange: "transform, opacity" }}
      className={`absolute hidden md:flex flex-col w-[340px] h-[170px] z-10 ${className}`}
    >
      <div className="relative w-full h-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_-10px_rgba(234,88,12,0.3)] flex flex-col group hover:border-orange-500/30 transition-colors duration-200">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:14px_14px]" />
        <div className="flex justify-between items-center p-3 border-b border-white/5 bg-white/[0.02] relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-600 to-yellow-400 flex items-center justify-center text-[10px] font-bold text-black shadow-lg shadow-orange-500/20">₿</div>
            <span className="text-xs font-display font-bold text-white tracking-widest">BTC / USD</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 border border-green-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-[pulse_2s_infinite]" />
            <span className="text-[9px] font-mono font-medium text-green-400">LIVE</span>
          </div>
        </div>
        <div className="flex-1 flex relative z-10">
          <div className="w-[55%] p-4 flex flex-col justify-center">
            <div className="text-[9px] font-bold text-white/40 tracking-widest mb-1">MARKET PRICE</div>
            <div className="text-2xl font-display font-bold text-white tracking-tight drop-shadow-sm">$64,231.40</div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] font-mono font-bold text-green-400 flex items-center gap-1">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none"><path d="M3 0L6 4H0L3 0Z" fill="currentColor"/></svg>2.45%
              </span>
              <span className="text-[9px] font-mono text-white/30">Vol: 42.1M</span>
            </div>
          </div>
          <div className="w-[45%] h-full relative">
            <div className="absolute inset-0 border-l border-white/5" />
            <svg className="absolute bottom-0 right-0 w-full h-[70%]" preserveAspectRatio="none">
              <defs>
                <linearGradient id="btc-grad-fill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,50 L10,45 L20,48 L30,30 L40,35 L50,20 L60,25 L70,10 L80,15 L90,5 L100,0 L110,10 L120,5 V90 H0 Z" fill="url(#btc-grad-fill)" />
              <path d="M0,50 L10,45 L20,48 L30,30 L40,35 L50,20 L60,25 L70,10 L80,15 L90,5 L100,0 L110,10 L120,5" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <div className="absolute top-3 right-3 flex flex-col gap-[3px] items-end opacity-80">
              <div className="h-[2px] w-8 bg-red-500 rounded-sm opacity-60" />
              <div className="h-[2px] w-5 bg-red-500 rounded-sm opacity-40" />
              <div className="h-[2px] w-3 bg-red-500 rounded-sm opacity-30" />
              <div className="h-[2px] w-6 bg-green-500 rounded-sm mt-1 opacity-60" />
              <div className="h-[2px] w-10 bg-green-500 rounded-sm opacity-80" />
            </div>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
      </div>
    </motion.div>
  );
};

// ==========================================
// 2. ETHEREUM CARD
// ==========================================
const EthereumCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -100, rotate: -10 }} 
      animate={{ opacity: 1, x: 0, rotate: -3 }}     
      transition={{ ...smoothTransition, delay: 3.4 }}
      style={{ willChange: "transform, opacity" }}
      className={`absolute hidden md:flex flex-col w-[320px] h-[160px] z-10 ${className}`}
    >
      <div className="relative w-full h-full bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)] flex flex-col group hover:border-blue-500/30 transition-colors duration-200">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
        <div className="flex justify-between items-center p-3 border-b border-white/5 bg-white/[0.02] relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-[10px] text-white shadow-lg shadow-blue-500/20">♦</div>
            <span className="text-xs font-display font-bold text-white tracking-widest">ETH / NET</span>
          </div>
          <div className="text-[9px] font-mono font-bold text-blue-300 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 shadow-[0_0_10px_-2px_rgba(59,130,246,0.3)]">GAS: 12 Gwei</div>
        </div>
        <div className="flex-1 relative flex flex-col justify-between p-4 z-10">
          <div className="flex justify-between items-end">
            <div>
              <div className="text-xl font-display font-bold text-white tracking-tight drop-shadow-sm">$3,450.12</div>
              <div className="text-[10px] font-mono text-red-400 mt-1 flex items-center gap-1 font-bold">
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" className="rotate-180"><path d="M3 0L6 4H0L3 0Z" fill="currentColor"/></svg>0.85% (24h)
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-white/40 font-mono tracking-wider mb-0.5">TPS RATE</div>
              <div className="text-sm font-mono text-white font-bold">28.4 <span className="text-[9px] text-white/30 font-normal">tx/s</span></div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[60px] opacity-70">
             <svg className="w-full h-full" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="eth-grad-fill" x1="0" x2="0" y1="0" y2="1">
                   <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                   <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                 </linearGradient>
               </defs>
               <path d="M0,60 C20,60 30,30 50,35 C70,40 80,20 100,15 C120,10 150,30 300,50 V60 H0 Z" fill="url(#eth-grad-fill)" />
               <path d="M0,60 C20,60 30,30 50,35 C70,40 80,20 100,15 C120,10 150,30 300,50" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
             </svg>
          </div>
        </div>
        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
      </div>
    </motion.div>
  );
};

// ==========================================
// 3. MAIN HERO CONTENT
// ==========================================
const HeroContent: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full h-full z-20 pb-40 select-none overflow-hidden">
      
      {/* AMBIENT ORBS */}
      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.0 }} 
          className="absolute top-1/2 -translate-y-1/2 left-0 md:left-10 lg:left-20 w-[500px] h-[500px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
            willChange: 'opacity' 
          }}
      />
      <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 3.2 }} 
          className="absolute top-1/2 -translate-y-1/2 right-0 md:right-10 lg:right-20 w-[500px] h-[500px] pointer-events-none"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
            willChange: 'opacity' 
          }}
      />

      {/* CARDS */}
      <BitcoinCard className="top-[15%] right-[8%]" />
      <EthereumCard className="bottom-[20%] left-[5%]" />

      {/* TEXT CONTENT */}
      {/* pointer-events-auto ensures buttons and text interactions work over the 3D canvas */}
      <div className="relative z-30 flex flex-col items-center pointer-events-auto">
        
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)', y: 30 }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ ...smoothTransition, delay: 3.0 }}
          style={{ willChange: "transform, opacity, filter" }}
          className="flex flex-col items-center leading-[0.85] tracking-tighter mb-16"
        >
          {/* TOP LINE: TRADE */}
          <div className="font-display font-bold text-6xl md:text-[7.5rem] text-white uppercase drop-shadow-2xl">
             <RollingText text="TRADE" />
          </div>

          {/* BOTTOM LINE: LIMITLESS (Gradient) */}
          <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...smoothTransition, delay: 3.2 }}
              className="font-display font-bold text-6xl md:text-[7.5rem] uppercase opacity-90 drop-shadow-lg"
          >
             <RollingText 
               text="LIMITLESS" 
               className="text-transparent bg-clip-text bg-gradient-to-b from-cyber-silver via-white to-cyber-dim"
             />
          </motion.div>
        </motion.div>

        {/* Buttons - MORE VISIBLE & STYLISH */}
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 3.3 }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col sm:flex-row mt-12 mb-8 items-center gap-6"
        >
          {/* Primary Button */}
          <button className="group relative h-12 px-10 overflow-hidden bg-white text-black font-display font-bold text-sm tracking-widest uppercase transition-all duration-200 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] flex items-center justify-center rounded-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out" />
              <span className="relative z-10 flex items-center gap-3">
                  START TRADING
                  <svg width="12" height="12" viewBox="0 0 10 10" fill="none" className="transition-transform duration-200 group-hover:translate-x-1"><path d="M1 5H9M9 5L5 1M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
          </button>
          
          
        </motion.div>
      </div>

    </div>
  );
};

export default HeroContent;