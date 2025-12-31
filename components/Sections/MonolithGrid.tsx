import React from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- 1. DECORATIVE OVERLAYS ---

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

// --- 2. TECH VISUALS (ANIMATED) ---

const SecureFlowVisual = () => (
  <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-16 pointer-events-none select-none overflow-hidden">
    <div className="relative w-[320px] h-[280px] scale-90 md:scale-100 origin-center">
      <svg className="absolute inset-0 w-full h-full z-0 overflow-visible" viewBox="0 0 320 280">
        <defs>
          <filter id="glow-line">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <path d="M 60 45 C 60 90, 160 80, 160 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <path d="M 160 45 C 160 90, 160 80, 160 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <path d="M 260 45 C 260 90, 160 80, 160 135" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
        <g filter="url(#glow-line)">
          <path d="M 60 45 C 60 90, 160 80, 160 135" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow" />
          <path d="M 160 45 C 160 90, 160 80, 160 135" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow-slow" />
          <path d="M 260 45 C 260 90, 160 80, 160 135" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow-reverse" />
          <path d="M 160 185 L 160 220" stroke="#00ffff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" className="animate-flow" />
        </g>
      </svg>
      {/* Visual Text Nodes */}
      <div className="absolute top-[10px] left-[60px] -translate-x-1/2">
        <div className="px-3 py-1 bg-black border border-white/20 rounded-full flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-500 animate-pulse"/><span className="text-[9px] font-mono font-bold text-white">BUY</span></div>
      </div>
      <div className="absolute top-[10px] left-[160px] -translate-x-1/2">
        <div className="px-3 py-1 bg-black border border-white/20 rounded-full flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-red-500 animate-pulse"/><span className="text-[9px] font-mono font-bold text-white">SELL</span></div>
      </div>
      <div className="absolute top-[10px] left-[260px] -translate-x-1/2">
        <div className="px-3 py-1 bg-black border border-white/20 rounded-full flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-purple-500 animate-pulse"/><span className="text-[9px] font-mono font-bold text-white">SWAP</span></div>
      </div>
      <div className="absolute top-[160px] left-[160px] -translate-x-1/2 -translate-y-1/2">
        <div className="px-4 py-2 bg-black border border-cyan-500/30 rounded-lg backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,255,0.1)]">
          <span className="text-[10px] font-display font-bold text-cyan-400 tracking-tighter">MATCH_ENGINE_v4</span>
        </div>
      </div>
    </div>
    <style>{`.animate-flow{stroke-dasharray:4 4;animation:flowAnim 0.8s linear infinite;} .animate-flow-slow{animation-duration:1.2s;} .animate-flow-reverse{animation-direction:reverse;} @keyframes flowAnim{to{stroke-dashoffset:-16;}}`}</style>
  </div>
);

const VelocityTurbine = () => (
  <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-12 pointer-events-none overflow-hidden">
    <div className="relative w-80 h-80 flex items-center justify-center group/turbine">
      
      {/* 1. Outer Static HUD (Speedometer Ticks) */}
      <svg className="absolute w-full h-full opacity-20 rotate-[-90deg]" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          strokeDasharray="1 3.5"
        />
      </svg>

      {/* 2. Fast Rotating Energy Ring (The Blur) */}
      <div className="absolute inset-8 rounded-full border-t-2 border-l-2 border-cyan-500/30 animate-[spin_1s_linear_infinite] group-hover/turbine:animate-[spin_0.3s_linear_infinite]" />
      <div className="absolute inset-8 rounded-full bg-[conic-gradient(from_0deg,transparent,rgba(6,182,212,0.1))] animate-[spin_2s_linear_infinite]" />

      {/* 3. The Turbine Blades (SVG for precision) */}
      <div className="relative w-48 h-48 animate-[spin_6s_linear_infinite] group-hover/turbine:animate-[spin_1s_linear_infinite] transition-all duration-1000">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <div
            key={deg}
            className="absolute top-1/2 left-1/2 w-[2px] h-24 bg-gradient-to-t from-transparent via-cyan-400/40 to-white origin-bottom"
            style={{
              transform: `translate(-50%, -100%) rotate(${deg}deg)`,
              filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.5))'
            }}
          >
            {/* Small tip at the end of each blade */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]" />
          </div>
        ))}
      </div>

      {/* 4. Central Reactor Core (The Heat) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        {/* Core Housing */}
        <div className="relative w-20 h-20 bg-black border border-white/20 rounded-full flex items-center justify-center backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.8)]">
          
          {/* Inner Pulsing Glass */}
          <div className="absolute inset-2 border border-cyan-500/30 rounded-full animate-pulse" />
          
          {/* Digital Readout Center */}
          <div className="flex flex-col items-center">
            <span className="text-[7px] font-mono text-cyan-400/60 uppercase tracking-[0.2em] mb-[-2px]">Load</span>
            <span className="text-sm font-display font-bold text-white group-hover/turbine:text-cyan-400 transition-colors">99%</span>
          </div>

          {/* Core Spinner (Small) */}
          <div className="absolute inset-0 rounded-full border-t border-white/40 animate-[spin_0.5s_linear_infinite]" />
        </div>
      </div>

      {/* 5. HUD Data Labels (Floating) */}
      <div className="absolute top-10 right-10 flex flex-col items-end gap-1 group-hover/turbine:translate-x-2 transition-transform duration-500">
        <div className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[8px] font-mono text-white/40 uppercase">
          Velocity_Max
        </div>
        <div className="text-2xl font-display font-bold text-white tabular-nums tracking-tighter">
          1,280<span className="text-[10px] text-cyan-500/50 ml-1">TPS</span>
        </div>
      </div>

      {/* Subtle Glow Background */}
      <div className="absolute inset-0 bg-radial-gradient from-cyan-500/5 to-transparent opacity-0 group-hover/turbine:opacity-100 transition-opacity duration-700" />

    </div>
  </div>
);

const HyperVisor = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none perspective-[1500px] overflow-hidden">
    {/* Laptop / Monitor Frame */}
    <div className="relative w-[90%] h-[75%] bg-[#0a0a0a] rounded-[2rem] border-[6px] border-[#1a1a1a] shadow-[0_40px_100px_rgba(0,0,0,0.8)] transform rotate-x-[15deg] transition-transform duration-1000 group-hover:rotate-x-[12deg]">
      
      {/* Top Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a1a1a] rounded-b-xl flex items-center justify-center z-30">
        <div className="w-1 h-1 rounded-full bg-white/10" />
      </div>

      {/* Content Container with 40% Top-Right Mask */}
      <div 
        className="absolute inset-2 bg-[#050505] rounded-[1.6rem] p-6 overflow-hidden flex flex-col"
        style={{
          // Only top-right 40% is visible. Bottom-left is fully transparent.
          maskImage: 'linear-gradient(225deg, black 35%, rgba(0,0,0,0.5) 45%, transparent 60%)',
          WebkitMaskImage: 'linear-gradient(225deg, black 35%, rgba(0,0,0,0.5) 45%, transparent 60%)'
        }}
      >
        {/* Header Section (Top Right focus) */}
        <div className="flex justify-end items-center mb-6 border-b border-white/5 pb-3">
          <div className="flex items-center gap-3">
             <span className="text-[10px] font-mono font-bold text-white/40 tracking-[0.2em] uppercase">
                System_Node_v4
             </span>
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_cyan]" />
          </div>
        </div>

        {/* Dashboard Grid - Focused on Right Side */}
        <div className="flex flex-col gap-4 items-end">
             {/* Metric 1 */}
             <div className="w-48 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-md">
                 <div className="text-[9px] font-mono text-white/30 mb-1 uppercase tracking-wider">Operational Load</div>
                 <div className="text-2xl font-display font-bold text-white">24.8%</div>
             </div>

             {/* Metric 2 */}
             <div className="w-48 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-md">
                 <div className="text-[9px] font-mono text-white/30 mb-1 uppercase tracking-wider">Sync Latency</div>
                 <div className="text-2xl font-display font-bold text-cyan-400">12ms</div>
             </div>

             {/* Metric 3 */}
             <div className="w-64 bg-white/5 p-4 rounded-xl border border-white/5 backdrop-blur-md mt-2">
                 <div className="text-[9px] font-mono text-white/30 mb-2 uppercase tracking-wider">Traffic Pulse</div>
                 <div className="flex gap-1 items-end h-8">
                     {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                         <div 
                            key={i} 
                            className="flex-1 bg-cyan-500/20 rounded-t-sm" 
                            style={{ height: `${h}%` }} 
                         />
                     ))}
                 </div>
             </div>
        </div>

        {/* Static Background Decorative Elements */}
        <div className="absolute top-1/2 right-4 -translate-y-1/2 opacity-10">
            <div className="w-32 h-32 border border-white rounded-full flex items-center justify-center">
                <div className="w-24 h-24 border border-dashed border-white rounded-full animate-[spin_10s_linear_infinite]" />
            </div>
        </div>
      </div>

      {/* Glass Glare */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none rounded-[2rem] z-20" />
    </div>
  </div>
);

const ZkCipher = () => (
  <div className="absolute inset-0 flex items-center justify-center md:justify-end md:pr-24 pointer-events-none overflow-hidden">
    <div className="relative w-96 h-96 flex items-center justify-center group/cipher">
      
      {/* 1. The Neural Network Aura (Deep Background) */}
      <div className="absolute inset-0 opacity-20 group-hover/cipher:opacity-40 transition-opacity duration-1000">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-cyan-500/10 rounded-full scale-110 animate-[ping_4s_linear_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-white/5 rounded-full scale-125 animate-[ping_6s_linear_infinite]" />
      </div>

      {/* 2. Layered Rotating HUD (Mechanical Rings) */}
      <div className="absolute inset-4 border-[1px] border-white/5 rounded-full" />
      <div className="absolute inset-4 border-t-2 border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
      <div className="absolute inset-12 border-r-2 border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      
      {/* Circular Dash Ring */}
      <svg className="absolute w-[80%] h-[80%] opacity-20 animate-[spin_30s_linear_infinite]" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="2 6" />
      </svg>

      {/* 3. The Sentinel Core (Deconstructing Center) */}
      <div className="relative w-40 h-40 flex items-center justify-center">
        
        {/* Four Corner Brackets (They expand on hover) */}
        <div className="absolute inset-0 flex flex-col justify-between group-hover/cipher:scale-110 transition-transform duration-700">
            <div className="flex justify-between w-full">
                <div className="w-6 h-6 border-t-2 border-l-2 border-cyan-500/50" />
                <div className="w-6 h-6 border-t-2 border-r-2 border-cyan-500/50" />
            </div>
            <div className="flex justify-between w-full">
                <div className="w-6 h-6 border-b-2 border-l-2 border-cyan-500/50" />
                <div className="w-6 h-6 border-b-2 border-r-2 border-cyan-500/50" />
            </div>
        </div>

        {/* Floating Identity Shards */}
        <div className="absolute inset-6 bg-cyan-950/20 backdrop-blur-3xl border border-white/10 rounded-lg rotate-45 group-hover/cipher:rotate-[135deg] transition-transform duration-1000" />
        
        {/* Central Core Prism */}
        <div className="relative z-10 w-16 h-16 flex items-center justify-center">
            {/* Inner Glowing Hex */}
            <div className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/40 [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] animate-pulse" />
            
            {/* The "Eye" or Logic Center */}
            <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_20px_white,0_0_40px_cyan]" />
            
            {/* Radial Scan Ring */}
            <div className="absolute inset-[-10px] border border-cyan-400/50 rounded-full opacity-0 animate-[radar_3s_ease-out_infinite]" />
        </div>

        {/* Digital Text Bits (Tiny labels) */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 font-mono text-[7px] text-cyan-400/40 tracking-[0.5em] uppercase">
             Quantum_State: Verified
        </div>
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 font-mono text-[7px] text-white/20 tracking-[0.5em] uppercase">
             Hash_Lock_Active
        </div>
      </div>

      {/* 4. Data Streams (Falling tiny lines) */}
      <div className="absolute inset-0 flex justify-around opacity-10 pointer-events-none">
        {[1,2,3,4,5].map(i => (
            <div key={i} className="w-[1px] h-full bg-gradient-to-b from-transparent via-cyan-400 to-transparent animate-[flow_4s_linear_infinite]" style={{ animationDelay: `${i * 0.8}s` }} />
        ))}
      </div>

    </div>

    <style>{`
      @keyframes radar {
        0% { transform: scale(0.5); opacity: 0.8; }
        100% { transform: scale(2); opacity: 0; }
      }
      @keyframes flow {
        0% { transform: translateY(-100%); }
        100% { transform: translateY(100%); }
      }
    `}</style>
  </div>
);

// --- 3. THE CARD COMPONENT ---

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
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
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

// --- 4. THE MAIN GRID ---

const MonolithGrid: React.FC = () => {
  return (
    <section className="relative w-full bg-[#050505] py-32 px-4 md:px-8 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
           <div className="max-w-4xl">
              <h2 className="text-6xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.85] uppercase">
                ENGINE<br />
                <span className="opacity-30">ARCHITECT</span>
              </h2>
           </div>
           <div className="hidden md:block text-right">
              <div className="font-mono text-[10px] text-cyan-500/50 mb-2 uppercase tracking-widest animate-pulse">Core Status: Overclocked</div>
              <div className="w-40 h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="w-3/4 h-full bg-gradient-to-r from-cyan-600 to-cyan-400" />
              </div>
           </div>
        </div>

        {/* Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <ObsidianCard 
            title="SYNAPSE HFT CORE"
            subtitle="Processing Pipeline"
            description="Ultra-low latency execution engine designed for high-frequency algorithmic trade routing and instant match-making."
            metric="4.2M"
            metricLabel="Orders / Second"
            colSpan="md:col-span-7"
            delay={0}
            visual={<SecureFlowVisual />}
          />

          <ObsidianCard 
            title="ATOMIC FINALITY"
            subtitle="Execution Layer"
            description="Parallel settlement protocol that guarantees trade finality in sub-millisecond cycles with zero buffer time."
            metric="<20ms"
            metricLabel="Avg. Settlement"
            colSpan="md:col-span-5"
            delay={0.1}
            visual={<VelocityTurbine />}
          />

           <ObsidianCard 
            title="LIQUIDITY MATRIX"
            subtitle="Aggregation Layer"
            description="Deep liquidity routing across 100+ institutional providers, ensuring best-in-class spreads and market depth."
            metric="$80B+"
            metricLabel="Daily Volume"
            colSpan="md:col-span-5"
            delay={0.2}
            visual={<HyperVisor />}
          />

           <ObsidianCard 
            title="MPC VAULT SHIELD"
            subtitle="Security Layer"
            description="Multi-Party Computation (MPC) vaults combined with hardware isolation for institutional asset custody."
            metric="FIPS-3"
            metricLabel="Compliance Level"
            colSpan="md:col-span-7"
            delay={0.3}
            visual={<ZkCipher />}
          />

        </div>
      </div>
    </section>
  );
};

export default MonolithGrid;