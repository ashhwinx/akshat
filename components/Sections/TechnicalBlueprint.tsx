import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Database, Activity, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const FEATURES = [
  {
    id: 1,
    title: "Instant Settlement",
    desc: "Zero-knowledge proofs execute instantly on the ledger.",
    icon: <Shield className="w-6 h-6" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500",
    border: "border-cyan-500/20",
    metric: "0.04ms LATENCY",
    graph: [20, 45, 30, 80, 50, 90, 40, 70]
  },
  {
    id: 2,
    title: "Global Consensus",
    desc: "Leaderless agreement across 4,000+ nodes.",
    icon: <Activity className="w-6 h-6" />,
    color: "text-violet-400",
    bg: "bg-violet-500",
    border: "border-violet-500/20",
    metric: "99.99% UPTIME",
    graph: [60, 65, 70, 72, 75, 80, 85, 90]
  },
  {
    id: 3,
    title: "Hyper Execution",
    desc: "Parallelized WASM runtime for zero gas costs.",
    icon: <Zap className="w-6 h-6" />,
    color: "text-amber-400",
    bg: "bg-amber-500",
    border: "border-amber-500/20",
    metric: "150K TPS",
    graph: [30, 50, 40, 60, 80, 100, 90, 95]
  },
  {
    id: 4,
    title: "Deep Storage",
    desc: "Archival layer with 12x redundancy seeding.",
    icon: <Database className="w-6 h-6" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500",
    border: "border-emerald-500/20",
    metric: "40PB DATA",
    graph: [90, 90, 90, 90, 90, 90, 90, 90]
  }
];

// --- Sub-Components ---

const DetailCard = ({ feature, isActive }) => {
  return (
    <div 
      className={`
        absolute inset-0 w-full h-full p-8 md:p-12 flex items-center justify-center
        transition-all duration-700 ease-out
        ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}
      `}
    >
      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
         {/* Card Header with Icon */}
         <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${feature.color}`}>
               {feature.icon}
            </div>
            <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">Sys_Mod_0{feature.id}</span>
         </div>

         {/* Technical Viz Area */}
         <div className="p-6 flex flex-col gap-6">
            
            {/* Metric Display */}
            <div>
               <span className="text-[10px] uppercase text-gray-500 font-mono block mb-1">Performance Metric</span>
               <div className={`text-3xl font-bold font-mono ${feature.color}`}>{feature.metric}</div>
            </div>

            {/* Simulated Graph */}
            <div className="h-24 w-full flex items-end gap-2 p-2 border border-white/5 rounded bg-black/20">
               {feature.graph.map((val, i) => (
                  <div 
                    key={i} 
                    className={`flex-1 rounded-t-sm opacity-50 ${feature.bg} transition-all duration-500`}
                    style={{ 
                       height: isActive ? `${val}%` : '0%',
                       transitionDelay: `${i * 50}ms`
                    }}
                  />
               ))}
            </div>

            {/* Code Line */}
            <div className="flex items-center gap-2 text-[10px] text-gray-600 font-mono bg-black/40 p-2 rounded border border-white/5">
               <Terminal className="w-3 h-3" />
               <span>exec --node {feature.title.toLowerCase().replace(' ', '_')}</span>
            </div>
         </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ feature, isActive, progress }) => {
  return (
    <div className={`relative pl-8 py-4 mb-4 transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      {/* Base Line (Gray) */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 rounded-full" />
      
      {/* Active Fill Line (Colored) */}
      <div 
         className={`absolute left-0 top-0 w-1 ${feature.bg} rounded-full shadow-[0_0_10px_currentColor] transition-all duration-75 ease-linear`}
         style={{ height: `${progress * 100}%` }}
      />

      <h3 className={`text-xl font-bold mb-1 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
        {feature.title}
      </h3>
      <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
        {feature.desc}
      </p>
    </div>
  );
};

// --- Main Component ---
const CoreInfrastructure = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [localProgress, setLocalProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", // When section top hits viewport top
        end: "bottom bottom", // When section bottom hits viewport bottom
        pin: containerRef.current, // Pin the Container, not the section
        scrub: 0.1,
        onUpdate: (self) => {
           // Map total progress (0 to 1) to number of slides (0 to 4)
           const total = self.progress * FEATURES.length;
           const idx = Math.floor(total);
           const clampedIdx = Math.min(idx, FEATURES.length - 1);
           
           // Calculate local progress (0 to 1) for the current active slide
           const currentProgress = total - clampedIdx;

           setActiveIndex(clampedIdx);
           setLocalProgress(currentProgress);
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    // 1. Parent Section controls the SCROLL HEIGHT (400vh = long scroll)
    <section ref={sectionRef} className="relative w-full h-[400vh] bg-neutral-950">
      
      {/* 2. The Container that gets PINNED (Sticky) */}
      <div ref={containerRef} className="h-screen w-full flex flex-col items-center justify-center overflow-hidden">
         
         {/* --- HEADER (Outside the Div, Top of Screen) --- */}
         <div className="absolute top-10 w-full text-center z-20 px-4">
            <h2 className="text-4xl md:text-6xl font-bold font-display  text-white tracking-tight mb-4">
               CORE <span className="text-gray-600">INFRASTRUCTURE</span>
            </h2>
            <p className="text-gray-500 text-sm md:text-base max-w-lg  mx-auto">
               Advanced cryptographic primitives enabling the next generation of value exchange.
            </p>
         </div>

         {/* --- MAIN DASHBOARD (Centered) --- */}
         <div className="relative w-full max-w-6xl h-[60vh] mt-20 bg-[#0A0A0A] border border-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden z-10">
            
            {/* Left Side: Navigation & Progress */}
            <div className="w-full md:w-5/12 h-full p-8 md:p-12 flex flex-col justify-center bg-white/[0.02] border-r border-white/5">
               {FEATURES.map((feature, i) => (
                  <SidebarItem 
                     key={feature.id}
                     feature={feature}
                     isActive={i === activeIndex}
                     // Logic: If past, 100%. If future, 0%. If active, use dynamic progress.
                     progress={i < activeIndex ? 1 : (i === activeIndex ? localProgress : 0)}
                  />
               ))}
            </div>

            {/* Right Side: Visual Cards */}
            <div className="w-full md:w-7/12 h-full relative bg-gradient-to-br from-black to-gray-900/50">
               {/* Grid Background */}
               <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
               
               {/* Cards Stack */}
               {FEATURES.map((feature, i) => (
                  <DetailCard 
                     key={feature.id}
                     feature={feature}
                     isActive={i === activeIndex}
                  />
               ))}
            </div>

         </div>

      </div>
    </section>
  );
};

export default CoreInfrastructure;