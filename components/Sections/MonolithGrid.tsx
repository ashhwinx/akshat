import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- ASSETS & TEXTURES ---

const NoiseTexture = () => (
  <div className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none z-0 mix-blend-overlay"
       style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} 
  />
);

const GridLines = () => (
  <div className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none z-0"
       style={{ 
         backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', 
         backgroundSize: '40px 40px' 
       }} 
  />
);

// --- VISUAL 1: SECURE FLOW (Compact & Aligned Circuit) ---

const SecureFlowVisual = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-16 pointer-events-none select-none overflow-hidden">
      
      {/* Container to constrain size and ensure perfect alignment */}
      <div className="relative w-[320px] h-[280px] scale-90 md:scale-100 origin-center">
        
        {/* SVG Layer for Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full z-0 overflow-visible" viewBox="0 0 320 280">
          <defs>
             <filter id="glow-line">
               <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
               <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
               </feMerge>
             </filter>
          </defs>

          {/* Background Paths (Dim) */}
          <path d="M 60 45 C 60 90, 160 80, 160 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M 160 45 C 160 90, 160 80, 160 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M 260 45 C 260 90, 160 80, 160 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M 160 185 L 160 220" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M 160 220 C 160 240, 90 230, 90 250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
          <path d="M 160 220 C 160 240, 230 230, 230 250" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />

          {/* Active Flow Paths (Bright & Animated) */}
          <g filter="url(#glow-line)">
            <path d="M 60 45 C 60 90, 160 80, 160 135" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow" />
            <path d="M 160 45 C 160 90, 160 80, 160 135" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow-slow" />
            <path d="M 260 45 C 260 90, 160 80, 160 135" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow-reverse" />
            <path d="M 160 185 L 160 220" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow" />
          </g>
        </svg>

        {/* Nodes Layer */}
        
        {/* Top Row Nodes */}
        <div className="absolute top-[10px] left-[60px] -translate-x-1/2">
            <div className="px-3 py-1.5 bg-[#0A0A0A] border border-white/20 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-white">GET</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/20" />
        </div>

        <div className="absolute top-[10px] left-[160px] -translate-x-1/2">
            <div className="px-3 py-1.5 bg-[#0A0A0A] border border-white/20 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-white">POST</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/20" />
        </div>

        <div className="absolute top-[10px] left-[260px] -translate-x-1/2">
            <div className="px-3 py-1.5 bg-[#0A0A0A] border border-white/20 rounded-full flex items-center gap-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-white">PUT</span>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/20" />
        </div>

        {/* Center Processor */}
        <div className="absolute top-[160px] left-[160px] -translate-x-1/2 -translate-y-1/2 w-full flex justify-center z-20">
            <div className="relative px-5 py-3 bg-black/90 border border-white/30 rounded-xl flex items-center gap-3 shadow-[0_0_30px_rgba(0,255,255,0.1)] backdrop-blur-xl">
               <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_cyan]" />
               <span className="text-[11px] font-display font-bold text-white tracking-wide">REST_API_GATEWAY</span>
               
               {/* Decorative Dots */}
               <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full border border-black" />
               <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full border border-black" />
            </div>
        </div>

        {/* Bottom Output Nodes */}
        <div className="absolute top-[250px] left-[90px] -translate-x-1/2">
             <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm flex items-center gap-2">
                 <span className="text-[9px] font-mono text-gray-400">JSON_v2</span>
             </div>
        </div>

        <div className="absolute top-[250px] left-[230px] -translate-x-1/2">
             <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm flex items-center gap-2">
                 <span className="text-[9px] font-mono text-gray-400">Log_01</span>
             </div>
        </div>

      </div>

      <style>{`
        .animate-flow { stroke-dasharray: 4 4; animation: flowAnimation 0.8s linear infinite; }
        .animate-flow-slow { stroke-dasharray: 4 4; animation: flowAnimation 1.2s linear infinite; }
        .animate-flow-reverse { stroke-dasharray: 4 4; animation: flowAnimation 1s linear infinite reverse; }
        @keyframes flowAnimation { to { stroke-dashoffset: -16; } }
      `}</style>
    </div>
  )
}

// --- VISUAL 2: VELOCITY TURBINE (For "Hyper Velocity") ---

const VelocityTurbine = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-12 pointer-events-none overflow-hidden">
        
        {/* Container */}
        <div className="relative w-[240px] h-[240px] group">
            
            {/* Outer Static Ring (HUD) */}
            <div className="absolute inset-0 border border-white/10 rounded-full flex items-center justify-center">
                <div className="absolute inset-2 border border-dashed border-white/20 rounded-full opacity-50" />
                <div className="absolute top-0 w-[1px] h-4 bg-white/40" />
                <div className="absolute bottom-0 w-[1px] h-4 bg-white/40" />
                <div className="absolute left-0 w-4 h-[1px] bg-white/40" />
                <div className="absolute right-0 w-4 h-[1px] bg-white/40" />
            </div>

            {/* Spinning Turbine Blade */}
            <div className="absolute inset-4 rounded-full overflow-hidden animate-[spin_4s_linear_infinite] group-hover:animate-[spin_1s_linear_infinite] transition-[animation-duration] duration-1000">
                <div className="w-full h-full rounded-full border-4 border-white/5 bg-white/5 backdrop-blur-sm relative">
                     {/* Blades */}
                     {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                        <div 
                          key={deg}
                          className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent to-white/40 origin-left"
                          style={{ transform: `rotate(${deg}deg)` }}
                        />
                     ))}
                     {/* Speed Blur Gradient */}
                     <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.1))]" />
                </div>
            </div>

            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-cyber-black rounded-full border border-white/30 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_30px_cyan] group-hover:border-cyan-400 transition-all duration-500">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>

            {/* Data Counters (Floating) */}
            <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex flex-col items-end gap-1">
                 <div className="px-2 py-0.5 bg-white/10 rounded text-[9px] font-mono text-white/60 backdrop-blur-md border border-white/10">
                    RPM
                 </div>
                 <div className="text-xl font-display font-bold text-white w-16 text-right tabular-nums">
                    9,204
                 </div>
            </div>

            {/* Motion Streaks */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />

        </div>
    </div>
  )
}

// --- VISUAL 3: HYPER-VISOR (Holographic Dashboard) ---

const HyperVisor = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[1200px] overflow-hidden">
      <div className="relative w-[85%] h-[75%] bg-cyber-black/80 border border-white/10 rounded-xl p-5 transform rotate-x-[10deg] rotate-y-[-10deg] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out hover:rotate-x-0 hover:rotate-y-0 group backdrop-blur-sm">
        
        {/* Reflection Gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />

        {/* Header Bar */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-3">
          <div className="flex gap-2 items-center">
             <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
             <span className="text-[9px] font-mono text-cyber-silver tracking-widest uppercase">Live_Analytics</span>
          </div>
          <div className="flex gap-1">
             <div className="w-1 h-1 rounded-full bg-white/20" />
             <div className="w-1 h-1 rounded-full bg-white/20" />
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-3 gap-4 h-[calc(100%-2rem)]">
           <div className="col-span-2 flex flex-col justify-end bg-white/5 rounded-lg p-3 border border-white/5 relative overflow-hidden">
              <div className="flex items-end gap-1.5 h-32 w-full">
                {[35, 60, 25, 80, 45, 90, 55, 40, 70, 50].map((h, i) => (
                  <div key={i} className="flex-1 bg-white/10 relative rounded-sm overflow-hidden">
                     <div 
                        className="absolute bottom-0 w-full bg-gradient-to-t from-cyber-silver to-white transition-all duration-700 ease-in-out animate-[barHeight_3s_infinite_alternate]"
                        style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }} 
                     />
                  </div>
                ))}
              </div>
           </div>
           <div className="col-span-1 flex flex-col gap-2">
              <div className="flex-1 bg-white/5 rounded-lg border border-white/5 p-3 flex flex-col gap-2">
                 {Array.from({length: 4}).map((_, i) => (
                    <div key={i} className="flex justify-between items-center text-[8px] font-mono border-b border-white/5 pb-1">
                       <span className="text-white/60">BTC</span>
                       <span className="text-green-400">{(42000 + Math.random() * 1000).toFixed(0)}</span>
                    </div>
                 ))}
              </div>
              <div className="h-10 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center">
                 <span className="text-[9px] font-bold text-green-400 tracking-widest animate-pulse">BUY</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}

// --- VISUAL 4: ZK-CIPHER (REPLACES ZK-TESSERACT) ---
// A massive, high-detail holographic vault lock visual to convey security and privacy.

const ZkCipher = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-24 pointer-events-none overflow-hidden">
      
      {/* Container - Sized larger for impact */}
      <div className="relative w-[280px] h-[280px] flex items-center justify-center group">
         
         {/* Rotating Data Rings */}
         <div className="absolute inset-0 rounded-full border border-white/5 border-t-white/20 animate-[spin_10s_linear_infinite]" />
         <div className="absolute inset-4 rounded-full border border-white/5 border-b-white/20 animate-[spin_15s_linear_infinite_reverse]" />
         <div className="absolute inset-12 rounded-full border border-dashed border-white/10 animate-[spin_30s_linear_infinite]" />

         {/* Central Mechanism */}
         <div className="relative z-10 w-32 h-32 bg-cyber-black/50 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:border-white/30 transition-colors duration-500">
            
            {/* The Lock Icon */}
            <div className="relative flex flex-col items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                {/* Shackle */}
                <div className="w-10 h-8 border-4 border-white/40 border-b-0 rounded-t-full mb-[-4px] group-hover:translate-y-[-5px] group-hover:border-cyan-400 transition-all duration-500 ease-out" />
                {/* Body */}
                <div className="w-14 h-10 bg-white/10 border-2 border-white/40 rounded-lg backdrop-blur-md relative overflow-hidden group-hover:bg-white/20 group-hover:border-cyan-400 transition-all duration-500">
                   {/* Keyhole / Scanner */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white/50 rounded-full group-hover:bg-cyan-400 shadow-[0_0_10px_cyan] transition-all duration-500" />
                   
                   {/* Scanning Beam effect inside lock body */}
                   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent -translate-y-full group-hover:animate-[scan_1.5s_linear_infinite]" />
                </div>
            </div>

            {/* Orbiting Particles */}
            <div className="absolute inset-0 animate-[spin_4s_linear_infinite]">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]" />
            </div>

         </div>

         {/* Floating Tech Labels */}
         <div className="absolute bottom-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
             <div className="px-2 py-0.5 bg-cyan-900/30 border border-cyan-500/30 rounded text-[9px] font-mono text-cyan-300">
                ZK-SNARK
             </div>
             <div className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono text-white/50">
                VERIFIED
             </div>
         </div>

      </div>

      <style>{`
         @keyframes scan {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
         }
      `}</style>
    </div>
  )
}


// --- OBSIDIAN CARD (The Main Container) ---

interface CardProps {
  title: string;
  subtitle: string;
  description: string;
  metric: string;
  metricLabel: string;
  colSpan: string;
  delay: number;
  visual?: React.ReactNode;
}

const ObsidianCard: React.FC<CardProps> = ({ title, subtitle, description, metric, metricLabel, colSpan, delay, visual }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`
        group relative ${colSpan} min-h-[450px] 
        bg-cyber-black 
        rounded-xl border border-white/10
        overflow-hidden flex flex-col justify-between 
        p-8 md:p-10
        hover:border-white/20 transition-colors duration-500
      `}
      onMouseMove={handleMouseMove}
    >
      {/* 1. VISUAL LAYER (Behind Text) */}
      {visual ? (
         <div className="absolute inset-0 z-0">
             {visual}
             {/* Gradient Fade for Readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/70 to-transparent pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-r from-cyber-black/80 to-transparent pointer-events-none" />
         </div>
      ) : (
        <div className="absolute inset-0 z-0">
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-700" />
        </div>
      )}

      {/* 2. SPOTLIGHT EFFECT */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 z-10"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              600px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 255, 255, 0.08),
              transparent 80%
            )
          `,
        }}
      />
      
      {/* 3. TEXTURES & OVERLAYS */}
      <NoiseTexture />
      <GridLines />

      {/* --- CARD CONTENT --- */}
      <div className="relative z-20 pointer-events-none">
        
        {/* Header Pill */}
        <div className="flex items-start justify-between mb-8">
           <div className="px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
              <span className="font-mono text-[10px] text-cyber-silver/80 tracking-widest uppercase flex items-center gap-2">
                <div className="w-1 h-1 bg-cyber-silver rounded-full" />
                {subtitle}
              </span>
           </div>
           
           {/* Corner Icon */}
           <div className="w-8 h-8 rounded-full border border-dashed border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 text-white">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor">
                 <path d="M1 11L11 1M11 1H3M11 1V9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
           </div>
        </div>

        {/* Title */}
        <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-[0.9] tracking-tighter mb-4 drop-shadow-xl group-hover:translate-x-1 transition-transform duration-500">
           {title.split(' ').map((word, i) => (
             <span key={i} className="block">{word}</span>
           ))}
        </h3>
      </div>

      {/* Bottom Section */}
      <div className="relative z-20 border-t border-white/10 pt-8 mt-auto flex flex-col md:flex-row md:items-end justify-between gap-6 pointer-events-auto">
        <p className="font-sans text-sm md:text-base text-cyber-silver/60 max-w-xs leading-relaxed group-hover:text-white transition-colors duration-300">
          {description}
        </p>

        <div className="text-right">
           <div className="font-display font-bold text-5xl md:text-6xl text-white">
             {metric}
           </div>
           <div className="font-mono text-[10px] text-cyber-silver/40 tracking-[0.3em] uppercase mt-1">
             {metricLabel}
           </div>
        </div>
      </div>
    </motion.div>
  );
};


// --- MAIN GRID SECTION ---

const MonolithGrid: React.FC = () => {
  return (
    <section className="relative w-full bg-cyber-black py-32 px-4 md:px-8 border-t border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
           <div className="max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                 <div className="h-[1px] w-12 bg-cyber-silver" />
                 <span className="font-mono text-xs text-cyber-silver tracking-[0.4em] uppercase">
                    System_Architecture_v2.0
                 </span>
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.85]">
                 THE OBSIDIAN <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-silver via-white to-cyber-silver opacity-50">
                    NEXUS FRAMEWORK
                 </span>
              </h2>
           </div>
           
           <div className="hidden md:block text-right">
              <div className="font-mono text-xs text-cyber-silver/40 mb-2">
                 Active Nodes: 4,092
              </div>
              <div className="w-32 h-1 bg-white/10 overflow-hidden rounded-full">
                 <div className="w-2/3 h-full bg-cyber-silver animate-pulse" />
              </div>
           </div>
        </div>

        {/* THE BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(450px,auto)]">
          
          {/* Card 1: Security */}
          <ObsidianCard 
            title="QUANTUM SHIELDING"
            subtitle="Security Layer"
            description="Post-quantum cryptographic proof generation ensures assets remain immutable."
            metric="100%"
            metricLabel="Encryption Strength"
            colSpan="md:col-span-7"
            delay={0}
            visual={<SecureFlowVisual />}
          />

          {/* Card 2: Speed (NEW VISUAL) */}
          <ObsidianCard 
            title="HYPER VELOCITY"
            subtitle="Execution Layer"
            description="Optimized WASM runtime delivering sub-millisecond finality."
            metric="<1ms"
            metricLabel="Block Time"
            colSpan="md:col-span-5"
            delay={0.1}
            visual={<VelocityTurbine />}
          />

           {/* Card 3: Liquidity */}
           <ObsidianCard 
            title="DEEP LIQUIDITY"
            subtitle="Aggregation Layer"
            description="Unified liquidity pools aggregated from 50+ chains."
            metric="$40B+"
            metricLabel="Total Volume"
            colSpan="md:col-span-5"
            delay={0.2}
            visual={<HyperVisor />}
          />

           {/* Card 4: Privacy (NEW VISUAL) */}
           <ObsidianCard 
            title="ZERO KNOWLEDGE"
            subtitle="Privacy Layer"
            description="Institutional-grade privacy compliant with global regulatory standards using zk-STARKs."
            metric="ZK-EVM"
            metricLabel="Compatibility"
            colSpan="md:col-span-7"
            delay={0.3}
            visual={<ZkCipher />}
          />

        </div>

      </div>
      
      {/* Global Animation Styles */}
      <style>{`
        @keyframes barHeight {
          0% { height: 10%; }
          50% { height: 90%; }
          100% { height: 40%; }
        }
      `}</style>
    </section>
  );
};

export default MonolithGrid;