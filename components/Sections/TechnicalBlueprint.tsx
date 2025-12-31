import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Configuration ---
const LAYERS = [
  {
    id: "01",
    title: "SETTLEMENT",
    sub: "FINALITY_ENGINE",
    desc: "Instant cryptographic settlement executing on the hyper-ledger via zk-SNARK proofs.",
    specs: ["TPS: 150K", "LATENCY: 0.4ms", "SHARD: #8841"]
  },
  {
    id: "02",
    title: "CONSENSUS",
    sub: "PROOF_OF_VELOCITY",
    desc: "Leaderless asynchronous node agreement minimizing latency variance across global peers.",
    specs: ["NODES: 4K+", "UPTIME: 99.9%", "SYNC: <10ms"]
  },
  {
    id: "03",
    title: "EXECUTION",
    sub: "WASM_RUNTIME",
    desc: "Parallelized smart contract execution environment utilizing multi-threaded computation.",
    specs: ["THREADS: 64", "GAS: <$0.01", "VM: WASM"]
  },
  {
    id: "04",
    title: "STORAGE",
    sub: "DEEP_ARCHIVE",
    desc: "Decentralized archival data availability layer with 12x redundancy seeding.",
    specs: ["SIZE: 40PB", "REDUN: 12x", "RET: ∞"]
  }
];

// --- Visual Sub-Components ---

const VerticalLine = () => (
  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyber-dim to-transparent" />
);

const Crosshair = ({ className }: { className?: string }) => (
  <div className={`absolute w-10 h-10 ${className}`}>
    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyber-silver/30" />
    <div className="absolute left-1/2 top-0 h-full w-[1px] bg-cyber-silver/30" />
    <div className="absolute top-1/2 left-1/2 w-full h-full border border-cyber-silver/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
  </div>
);

const HexData = () => (
  <div className="font-mono text-[9px] text-cyber-silver/20 leading-none select-none pointer-events-none">
    {Array.from({ length: 8 }).map((_, i) => (
      <div key={i}>{Math.random().toString(16).substring(2, 10).toUpperCase()}</div>
    ))}
  </div>
);

// --- Isometric Plate Component ---
interface IsoPlateProps {
  index: number;
  isActive: boolean;
  title: string;
}

const IsoPlate: React.FC<IsoPlateProps> = ({ index, isActive, title }) => {
  return (
    <div 
      className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] md:w-[320px] md:h-[320px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform`}
      style={{
        transform: `
          translateY(${(index - 1.5) * 45}px) 
          translateZ(${isActive ? 80 : 0}px)
          scale(${isActive ? 1 : 0.95})
        `,
        zIndex: isActive ? 50 : 10 - index,
        opacity: isActive ? 1 : 0.3,
        filter: isActive ? 'none' : 'grayscale(100%) brightness(0.6)',
      }}
    >
      {/* The Physical Plate */}
      <div className={`
        relative w-full h-full 
        bg-cyber-black 
        border ${isActive ? 'border-white' : 'border-white/10'} 
        shadow-[0_0_40px_rgba(0,0,0,0.9)]
        transition-colors duration-500
      `}>
         {/* Inner Circuitry Background */}
         <div className="absolute inset-1 border border-dashed border-white/10 opacity-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
         
         {/* Tech Detail Lines */}
         <div className="absolute top-4 left-4 w-2 h-2 bg-white/20" />
         <div className="absolute bottom-4 right-4 w-2 h-2 bg-white/20" />
         <div className="absolute top-4 right-4 w-8 h-[1px] bg-white/20" />
         <div className="absolute bottom-4 left-4 w-8 h-[1px] bg-white/20" />

         {/* Center Visual */}
         <div className="absolute inset-0 flex items-center justify-center transform -rotate-45">
            {/* Spinning Ring */}
            <div className={`w-32 h-32 rounded-full border border-dotted border-white/30 flex items-center justify-center ${isActive ? 'animate-[spin_10s_linear_infinite]' : ''}`}>
               {/* Inner Core */}
               <div className={`w-20 h-20 bg-white/5 backdrop-blur-md rounded-full border border-white/10 ${isActive ? 'shadow-[0_0_20px_white]' : ''}`} />
            </div>
            
            {/* Huge Layer ID Number */}
            <div className="absolute font-display font-bold text-6xl text-white/5 pointer-events-none select-none mix-blend-overlay">
               0{index + 1}
            </div>
         </div>

         {/* Connection Node (Right side) */}
         <div className={`absolute top-1/2 -right-1 w-2 h-2 bg-white rounded-full transition-all ${isActive ? 'opacity-100 shadow-[0_0_10px_white]' : 'opacity-0'}`} />
      </div>
    </div>
  );
};

const TechnicalBlueprint: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300%", 
        pin: true,
        scrub: 0.5,
        onUpdate: (self) => {
          const idx = Math.floor(self.progress * LAYERS.length);
          setActiveIndex(Math.min(idx, LAYERS.length - 1));
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeLayer = LAYERS[activeIndex];

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col border-t border-white/5">
      
      {/* --- BACKGROUND: INFINITE TUNNEL --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         
         {/* Top Fade (Black) */}
         <div className="absolute top-0 left-0 w-full h-2/3 bg-black z-10" />
         
         {/* Bottom Tunnel Grid */}
         <div className="absolute bottom-0 left-0 w-full h-2/3 perspective-[1000px] z-0 overflow-hidden opacity-30">
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black z-20" />
             <div 
                 className="absolute bottom-[-50%] left-[-50%] w-[200%] h-[200%] origin-bottom"
                 style={{ 
                     backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), 
                        linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
                     `,
                     backgroundSize: '60px 60px',
                     transform: 'rotateX(60deg) translateY(0)',
                     animation: 'tunnelMove 10s linear infinite'
                 }} 
             />
         </div>

         {/* Static Noise Overlay */}
         <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      {/* --- MAXIMALIST DECORATIONS (HUD) --- */}
      <div className="absolute inset-0 z-10 pointer-events-none px-8 md:px-32">
        <div className="absolute top-1/4 left-10 hidden md:block"><HexData /></div>
        <div className="absolute bottom-1/4 right-10 hidden md:block text-right"><HexData /></div>
        
        <Crosshair className="top-20 left-20 opacity-20" />
        <Crosshair className="bottom-20 right-20 opacity-20" />
        
        <div className="absolute top-32 right-12 w-32 h-[1px] bg-white/20" />
        <div className="absolute top-32 right-12 w-[1px] h-10 bg-white/20" />
        <span className="absolute top-[8.5rem] right-12 font-mono text-[9px] text-cyber-silver/50 tracking-widest">SYS_READY</span>
      </div>

      {/* --- CENTERED HEADER --- */}
      <div className="relative z-20 w-full pt-24 px-4 flex flex-col items-center justify-center text-center">
         <div className="inline-flex items-center gap-2 mb-4">
             <div className="w-16 h-[1px] bg-cyber-silver/30" />
             <span className="font-mono text-[10px] text-cyber-silver/60 tracking-[0.3em] uppercase">/// Architecture_Stack</span>
             <div className="w-16 h-[1px] bg-cyber-silver/30" />
         </div>
         
         <h2 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tighter mb-4">
            CORE <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">INFRASTRUCTURE</span>
         </h2>
         
         <div className="flex items-center gap-4 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
             <div className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_lime]" />
                 <span className="font-mono text-[10px] text-green-500 tracking-widest uppercase">Live_Feed_Active</span>
             </div>
             <div className="w-[1px] h-3 bg-white/20" />
             <span className="font-mono text-[10px] text-gray-400 tracking-widest">LATENCY: 12ms</span>
         </div>
      </div>

      {/* --- MAIN CONTENT (Increased Padding) --- */}
      <div className="relative z-20 w-full max-w-[1600px] mx-auto flex-grow flex flex-col md:flex-row items-center px-8 md:px-32 lg:px-40 pb-10 mt-8">
        
        {/* LEFT: OPEN TEXT LAYOUT (Maximalist) */}
        <div className="w-full md:w-5/12 h-full flex flex-col justify-center relative pl-4 md:pl-0 pr-8 md:pr-16">
           
           <VerticalLine />

           {/* Animated Text Content */}
           <div className="relative">
              {/* Giant Background Number */}
              <div className="absolute -top-20 -left-10 text-[12rem] font-display font-bold text-white/[0.03] select-none leading-none z-0">
                  {activeLayer.id}
              </div>

              <div className="relative z-10 flex flex-col gap-6">
                  {/* Title Block */}
                  <div>
                      <div className="flex items-center gap-3 mb-2">
                          <span className="px-2 py-0.5 border border-cyber-silver/30 bg-white/5 text-[9px] font-mono text-cyber-silver tracking-widest rounded-sm">
                             MODULE_{activeLayer.id}
                          </span>
                          <div className="h-[1px] w-20 bg-cyber-silver/30" />
                      </div>
                      <h3 className="text-5xl md:text-7xl font-display font-bold text-white leading-[0.9] tracking-tighter uppercase mb-2">
                          {activeLayer.title}
                      </h3>
                      <span className="font-mono text-sm text-cyber-silver/60 tracking-[0.2em] uppercase">
                          // {activeLayer.sub}
                      </span>
                  </div>

                  {/* Description - Open Text */}
                  <p className="text-gray-400 font-sans text-base md:text-lg leading-relaxed max-w-md border-l-2 border-white/10 pl-6">
                      {activeLayer.desc}
                  </p>

                  {/* Data Specs - Open Grid */}
                  <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 mt-4 border-t border-dashed border-white/10">
                      {activeLayer.specs.map((spec, i) => (
                          <div key={i} className="flex flex-col">
                              <span className="text-[9px] font-mono text-gray-600 uppercase mb-1">PARAM_0{i+1}</span>
                              <span className="text-sm font-mono text-cyber-silver">{spec}</span>
                          </div>
                      ))}
                  </div>
              </div>
           </div>

        </div>

        {/* RIGHT: CONTAINED ISOMETRIC STACK (With Right Padding) */}
        <div className="w-full md:w-7/12 h-[50vh] md:h-full relative flex items-center justify-center perspective-[2000px] overflow-visible md:pr-12">
            
           {/* Decorative Floor Ring (Static) */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full transform rotate-x-[60deg] pointer-events-none" />

           {/* The Container for Isometric Rotation - SCALED DOWN */}
           <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] transform-style-3d scale-75 md:scale-90" 
                style={{ transform: 'rotateX(55deg) rotateZ(-45deg)' }}>
              
              {/* Render Plates in Stack */}
              {LAYERS.map((layer, i) => (
                 <IsoPlate 
                    key={i} 
                    index={i} 
                    isActive={i === activeIndex} 
                    title={layer.title}
                 />
              ))}

              {/* Data Connection Line (To Center) */}
              <div 
                  className="absolute top-1/2 left-1/2 w-[1px] bg-gradient-to-b from-white via-white/50 to-transparent transform -translate-x-1/2 origin-top transition-all duration-300"
                  style={{ 
                      height: '400px', 
                      transform: `translateZ(100px) translateY(${(activeIndex - 1.5) * 45}px) rotateX(-90deg)` 
                  }}
              />
           </div>
        </div>

      </div>

      <style>{`
        @keyframes tunnelMove {
          0% { transform: rotateX(60deg) translateY(0); }
          100% { transform: rotateX(60deg) translateY(60px); }
        }
      `}</style>
    </section>
  );
};

export default TechnicalBlueprint;