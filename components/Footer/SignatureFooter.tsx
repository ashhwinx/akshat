import React, { useState, useEffect } from 'react';
import FooterLinks from './FooterLinks';

const SignatureFooter: React.FC = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format: HH:MM UTC
      const timeString = now.getUTCHours().toString().padStart(2, '0') + ":" + now.getUTCMinutes().toString().padStart(2, '0') + " UTC";
      setTime(timeString);
    };
    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="fixed bottom-0 left-0 w-full min-h-screen bg-[#050505] z-0 flex flex-col justify-end">
      
      {/* 1. NEWSLETTER SECTION (The Uplink) */}
      <div className="w-full pt-32 pb-12 px-6 md:px-12 border-b border-white/20 bg-[#050505]">
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="w-full max-w-4xl">
               <label className="block font-mono text-xs text-cyber-silver/60 mb-6 uppercase tracking-widest">
                  [ Initiate_Uplink_Sequence ]
               </label>
               <div className="relative group">
                  <input 
                     type="email" 
                     placeholder="ENTER_EMAIL_ADDRESS" 
                     className="w-full bg-transparent border-b-2 border-white/20 py-4 font-display font-bold text-3xl md:text-6xl text-white placeholder:text-white/20 outline-none focus:border-white transition-colors uppercase"
                  />
                  <div className="absolute right-0 bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <span className="font-mono text-xs bg-white text-black px-3 py-1">RETURN ⏎</span>
                  </div>
               </div>
            </div>
            
            <div className="hidden md:block">
               <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                  <div className="w-24 h-24 border border-dashed border-white/30 rounded-full" />
               </div>
            </div>
         </div>
      </div>

      {/* 2. LINKS & DATA GRID */}
      <FooterLinks />

      {/* 3. BASE FOOTER (Brand & Copyright) */}
      <div className="relative w-full bg-[#050505] overflow-hidden">
         
         {/* Marquee Border */}
         <div className="w-full py-2 bg-white text-black overflow-hidden flex whitespace-nowrap">
            {Array.from({length: 10}).map((_, i) => (
               <span key={i} className="mx-4 font-mono text-xs font-bold uppercase tracking-widest">
                  /// SILVER_PROTOCOL_EST_2025 /// DECENTRALIZED_INFRASTRUCTURE ///
               </span>
            ))}
         </div>

         <div className="px-6 md:px-12 pt-12 pb-6 flex flex-col md:flex-row justify-between items-end gap-8">
            
            {/* Left: Metadata */}
            <div className="flex gap-8 md:gap-16 z-10">
               <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-cyber-silver/50 uppercase">Location</span>
                  <span className="font-mono text-xs text-white uppercase">Worldwide / Remote</span>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-cyber-silver/50 uppercase">System Time</span>
                  <span className="font-mono text-xs text-white uppercase tabular-nums">{time}</span>
               </div>
               <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-cyber-silver/50 uppercase">Legal</span>
                  <div className="flex gap-4">
                     <a href="#" className="font-mono text-xs text-white hover:underline">Privacy</a>
                     <a href="#" className="font-mono text-xs text-white hover:underline">Terms</a>
                  </div>
               </div>
            </div>

            {/* Right: Copyright */}
            <div className="z-10">
               <span className="font-mono text-[10px] text-cyber-silver/40 uppercase">
                  © 2025 Silver Protocol Inc. All Rights Reserved.
               </span>
            </div>
         </div>

         {/* GIANT BACKGROUND LOGO (Clipped) */}
         <div className="w-full flex justify-center pointer-events-none select-none leading-none -mb-[4vw] opacity-30 mix-blend-difference">
            <h1 className="text-[25vw] font-display font-black text-white tracking-tighter">
               SILVER
            </h1>
         </div>

         {/* Grain Overlay for Texture */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      </div>

    </footer>
  );
};

export default SignatureFooter;