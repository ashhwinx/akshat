import React, { useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, Variants } from 'framer-motion';

// --- 1. DECORATIVE OVERLAYS (Optimized) ---

const NoiseTexture = () => (
  <div className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none z-0 mix-blend-overlay"
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

// --- 2. TECH VISUALS (OPTIMIZED) ---

// [Optimized] Removed SVG Filters
const SecureFlowVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-16 pointer-events-none select-none overflow-hidden transform-gpu">
    <div className="relative w-[320px] h-[280px] scale-90 md:scale-100 origin-center">
      <svg className="absolute inset-0 w-full h-full z-0 overflow-visible" viewBox="0 0 320 280">
        <path d="M 60 45 C 60 90, 160 80, 160 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <path d="M 160 45 C 160 90, 160 80, 160 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <path d="M 260 45 C 260 90, 160 80, 160 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <g style={{ filter: 'drop-shadow(0 0 4px rgba(0, 255, 255, 0.5))' }}>
          <path d="M 60 45 C 60 90, 160 80, 160 135" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow" />
          <path d="M 160 45 C 160 90, 160 80, 160 135" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow-slow" />
          <path d="M 260 45 C 260 90, 160 80, 160 135" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow-reverse" />
          <path d="M 160 185 L 160 220" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow" />
        </g>
      </svg>
      <div className="absolute top-[10px] left-[60px] -translate-x-1/2">
        <div className="px-3 py-1 bg-black border border-white/20 rounded-full flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-500"/><span className="text-[9px] font-mono font-bold text-white">BUY</span></div>
      </div>
      <div className="absolute top-[10px] left-[160px] -translate-x-1/2">
        <div className="px-3 py-1 bg-black border border-white/20 rounded-full flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-red-500"/><span className="text-[9px] font-mono font-bold text-white">SELL</span></div>
      </div>
      <div className="absolute top-[10px] left-[260px] -translate-x-1/2">
        <div className="px-3 py-1 bg-black border border-white/20 rounded-full flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500"/><span className="text-[9px] font-mono font-bold text-white">SWAP</span></div>
      </div>
      <div className="absolute top-[160px] left-[160px] -translate-x-1/2 -translate-y-1/2">
        <div className="px-4 py-2 bg-black border border-cyan-500/30 rounded-lg shadow-lg">
          <span className="text-[10px] font-display font-bold text-cyan-400 tracking-tighter">MATCH_ENGINE_v4</span>
        </div>
      </div>
    </div>
    <style>{`.animate-flow{stroke-dasharray:4 4;animation:flowAnim 0.8s linear infinite;} .animate-flow-slow{animation-duration:1.2s;} .animate-flow-reverse{animation-direction:reverse;} @keyframes flowAnim{to{stroke-dashoffset:-16;}}`}</style>
  </div>
);

// [Optimized] Slowed down animation speeds
const VelocityTurbine = () => (
  <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-12 pointer-events-none overflow-hidden transform-gpu">
    <div className="relative w-80 h-80 flex items-center justify-center group/turbine">
      <svg className="absolute w-full h-full opacity-20 rotate-[-90deg]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 3.5" />
      </svg>
      <div className="absolute inset-8 rounded-full border-t-2 border-l-2 border-cyan-500/30 animate-[spin_3s_linear_infinite]" />
      <div className="absolute inset-8 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(6,182,212,0.1))] animate-[spin_5s_linear_infinite]" />
      <div className="relative w-48 h-48 animate-[spin_15s_linear_infinite] transition-all duration-1000">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 w-[2px] h-24 bg-gradient-to-t from-transparent via-cyan-400/40 to-white origin-bottom"
            style={{ transform: `translate(-50%, -100%) rotate(${deg}deg)`, filter: 'drop-shadow(0 0 4px rgba(6,182,212,0.5))' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="relative w-20 h-20 bg-black border border-white/20 rounded-full flex items-center justify-center shadow-lg">
          <div className="absolute inset-2 border border-cyan-500/30 rounded-full animate-pulse" />
          <div className="flex flex-col items-center">
            <span className="text-[7px] font-mono text-cyan-400/60 uppercase tracking-[0.2em] mb-[-2px]">Load</span>
            <span className="text-sm font-display font-bold text-white transition-colors">99%</span>
          </div>
          <div className="absolute inset-0 rounded-full border-t border-white/40 animate-[spin_1.5s_linear_infinite]" />
        </div>
      </div>
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent opacity-50" />
    </div>
  </div>
);

// [NEW] Simple Flat Dashboard Visual
const HyperVisor = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden transform-gpu">
    {/* Main Dashboard Container - No 3D transform, simple flat card */}
    <div className="relative w-[85%] h-[80%] bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 flex flex-col shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold text-white/60 tracking-widest uppercase">Global_Liquidity_Node</span>
        </div>
        <div className="text-[9px] font-mono text-white/30">v4.2.1 LIVE</div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-2 gap-4 h-full">
           {/* Metric 1 */}
           <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
               <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-1">24h Volume</div>
               <div className="text-2xl font-display font-bold text-white">$84.2B</div>
               <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden"><div className="h-full w-[85%] bg-cyan-500 rounded-full"/></div>
           </div>

           {/* Metric 2 */}
           <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
               <div className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-1">Active Pairs</div>
               <div className="text-2xl font-display font-bold text-cyan-400">2,405</div>
                <div className="flex gap-0.5 items-end h-4 mt-2 opacity-50">
                    {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85].map((h, i) => (
                        <div key={i} className="flex-1 bg-cyan-500 rounded-t-[1px]" style={{ height: `${h}%` }} />
                    ))}
                </div>
           </div>

           {/* Bottom Row - Map/Graph Placeholder */}
           <div className="col-span-2 bg-white/5 p-4 rounded-xl border border-white/5 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.5),transparent_70%)]" />
                <svg className="w-full h-full opacity-30 absolute top-0 left-0" viewBox="0 0 200 100" preserveAspectRatio="none">
                    <path d="M0 80 C 50 70, 70 30, 100 40 S 150 60, 200 20" stroke="cyan" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
                    <path d="M0 90 C 40 85, 80 60, 120 70 S 160 80, 200 50" stroke="white" strokeWidth="0.5" fill="none" vectorEffect="non-scaling-stroke" opacity="0.5" />
                </svg>
                <div className="text-[9px] font-mono text-white/30 uppercase tracking-widest relative z-10">Network Heatmap Loading...</div>
           </div>
      </div>

      {/* Subtle Scanline */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[5px] w-full animate-[scan_4s_linear_infinite] pointer-events-none" />
    </div>
    <style>{`@keyframes scan { 0% { top: -5%; opacity: 0; } 50% { opacity: 1; } 100% { top: 105%; opacity: 0; } }`}</style>
  </div>
);

// [Optimized] Reduced shadow complexity
const ZkCipher = () => (
  <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-24 pointer-events-none overflow-hidden transform-gpu">
    <div className="relative w-96 h-96 flex items-center justify-center group/cipher">
      <div className="absolute inset-0 opacity-20 group-hover/cipher:opacity-40 transition-opacity duration-1000">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-cyan-500/10 rounded-full scale-110 animate-[ping_4s_linear_infinite]" />
      </div>
      <div className="absolute inset-4 border-[1px] border-white/5 rounded-full" />
      <div className="absolute inset-4 border-t-2 border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div className="absolute inset-6 bg-cyan-950/20 backdrop-blur-md border border-white/10 rounded-lg rotate-45 group-hover/cipher:rotate-[135deg] transition-transform duration-1000" />
        <div className="relative z-10 w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/40 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] animate-pulse" />
            <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
        </div>
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-[7px] text-cyan-400/40 tracking-[0.5em] uppercase">Verified</div>
      </div>
    </div>
  </div>
);

// --- 3. CYBER TEXT HEADER ---

const CyberTextHeader = ({ text, subtext }: { text: string, subtext: string }) => {
  return (
    <div className="max-w-4xl cursor-default group">
      <h2 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.85] uppercase relative">
        <span className="relative z-10">{text}</span>
        <span className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-100 group-hover:-translate-x-[2px] transition-all duration-200 ease-out select-none">{text}</span>
        <span className="absolute top-0 left-0 -z-10 text-cyan-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-[2px] transition-all duration-200 ease-out select-none">{text}</span>
        <br />
        <span className="relative inline-block overflow-hidden opacity-40 group-hover:opacity-80 transition-opacity duration-500">
          {subtext}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]" />
        </span>
      </h2>
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
};

// --- 4. THE CARD COMPONENT (LAG FREE) ---

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

  const cardVariants: Variants = {
    offscreen: { y: 50, opacity: 0, scale: 0.98 },
    onscreen: { y: 0, opacity: 1, scale: 1, transition: { ease: [0.25, 0.1, 0.25, 1], duration: 0.6, delay: delay } }
  };

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      style={{ willChange: "transform, opacity", backfaceVisibility: "hidden" }}
      className={`group relative ${colSpan} min-h-[480px] bg-[#080808] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between p-8 md:p-10 hover:border-white/25 transition-all duration-500`}
    >
      <div className="absolute inset-0 z-0">
        {visual}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-transparent" />
      </div>
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition group-hover:opacity-100 z-10"
        style={{ background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)` }}
      />
      <NoiseTexture />
      <GridLines />
      <div className="relative z-20">
        <div className="px-3 py-1 w-fit rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <span className="font-mono text-[9px] text-white/50 tracking-widest uppercase flex items-center gap-2">
            <div className="w-1 h-1 bg-cyan-500 rounded-full" /> {subtitle}
          </span>
        </div>
        <h3 className="text-4xl md:text-5xl font-display font-bold text-white leading-[0.9] tracking-tighter uppercase">
          {title.split(' ').map((w, i) => <span key={i} className="block">{w}</span>)}
        </h3>
      </div>
      <div className="relative z-20 border-t border-white/5 pt-8 mt-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
        <p className="font-sans text-sm text-white/40 max-w-xs leading-relaxed group-hover:text-white/80 transition-colors">
          {description}
        </p>
        <div className="text-right">
           <div className="font-display font-bold text-5xl md:text-6xl text-white tracking-tighter">{metric}</div>
           <div className="font-mono text-[9px] text-white/20 tracking-[0.3em] uppercase mt-1">{metricLabel}</div>
        </div>
      </div>
    </motion.div>
  );
};

// --- 5. THE MAIN GRID ---

const MonolithGrid: React.FC = () => {
  return (
    <section className="relative w-full bg-[#050505] py-32 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
           <CyberTextHeader text="ENGINE" subtext="ARCHITECT" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <ObsidianCard 
            title="SYNAPSE HFT CORE" subtitle="Processing Pipeline" description="Ultra-low latency execution engine designed for high-frequency algorithmic trade routing and instant match-making." metric="4.2M" metricLabel="Orders / Second" colSpan="md:col-span-7" delay={0}
            visual={<SecureFlowVisual />}
          />
          <ObsidianCard 
            title="ATOMIC FINALITY" subtitle="Execution Layer" description="Parallel settlement protocol that guarantees trade finality in sub-millisecond cycles with zero buffer time." metric="<20ms" metricLabel="Avg. Settlement" colSpan="md:col-span-5" delay={0.15} 
            visual={<VelocityTurbine />}
          />
           <ObsidianCard 
            title="LIQUIDITY MATRIX" subtitle="Aggregation Layer" description="Deep liquidity routing across 100+ institutional providers, ensuring best-in-class spreads and market depth." metric="$80B+" metricLabel="Daily Volume" colSpan="md:col-span-5" delay={0.3} 
            visual={<HyperVisor />}
          />
           <ObsidianCard 
            title="MPC VAULT SHIELD" subtitle="Security Layer" description="Multi-Party Computation (MPC) vaults combined with hardware isolation for institutional asset custody." metric="FIPS-3" metricLabel="Compliance Level" colSpan="md:col-span-7" delay={0.45} 
            visual={<ZkCipher />}
          />
        </div>
      </div>
    </section>
  );
};

export default MonolithGrid;