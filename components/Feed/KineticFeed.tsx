import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import FeedVisualizer from './FeedVisualizer';
import UpdateItem from './UpdateItem';

// --- DATA SOURCE ---
const feedData = [
  {
    id: "SYS-8821",
    date: "2025.12.31",
    title: "Genesis Core Launch",
    tags: ["PROTOCOL"],
  },
  {
    id: "LIQ-9942",
    date: "2025.11.15",
    title: "Liquidity Surge Event",
    tags: ["MARKET"],
  },
  {
    id: "SEC-1102",
    date: "2025.10.02",
    title: "Shield Audit Complete",
    tags: ["SECURITY"],
  },
  {
    id: "BRG-3391",
    date: "2025.09.14",
    title: "Institutional Bridge",
    tags: ["PARTNERS"],
  },
  {
    id: "GOV-4402",
    date: "2025.08.22",
    title: "Proposal 42: Accepted",
    tags: ["GOVERNANCE"],
  },
  {
    id: "NET-5519",
    date: "2025.07.10",
    title: "Node Expansion: Asia",
    tags: ["NETWORK"],
  }
];

// --- CSS MARQUEE (Smoother than JS) ---
const Marquee: React.FC<{ text: string, reverse?: boolean }> = ({ text, reverse = false }) => {
  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-white/5 bg-cyber-black/20 backdrop-blur-sm z-20">
      <div className={`flex w-max ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}>
        {Array.from({ length: 8 }).map((_, i) => (
           <span key={i} className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent uppercase px-8">
             {text} <span className="text-cyber-silver/10 mx-4">//</span>
           </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 40s linear infinite;
        }
      `}</style>
    </div>
  )
}

const KineticFeed: React.FC = () => {
  return (
    <section className="relative w-full bg-cyber-black min-h-screen overflow-hidden flex flex-col justify-center py-20 border-t border-white/5">
      
      {/* --- BACKGROUND: GPU PARTICLE RAIN --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
         <Canvas 
            camera={{ position: [0, 0, 15], fov: 35 }} 
            dpr={[1, 1.5]} // PERFORMANCE: Cap pixel ratio
            gl={{ 
              antialias: false, 
              powerPreference: 'high-performance',
              stencil: false,
              depth: true
            }}
         >
             <FeedVisualizer />
         </Canvas>
         {/* Fade Overlay for readability */}
         <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-transparent to-cyber-black opacity-80" />
      </div>

      {/* --- TOP MARQUEE --- */}
      <Marquee text="SYSTEM UPDATES  LIVE FEED  BLOCKCHAIN ACTIVITY" />

      {/* --- HEADER --- */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-24 text-center">
         <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="font-mono text-[10px] text-cyber-silver tracking-[0.2em] uppercase">
               Live_Transmission_Active
            </span>
         </div>
         <h2 className="text-5xl md:text-8xl font-display font-bold text-white tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl">
            KINETIC <span className="text-transparent bg-clip-text bg-gradient-to-b from-cyber-silver to-gray-600">LEDGER</span>
         </h2>
         <p className="max-w-xl mx-auto text-cyber-silver/60 font-sans text-lg tracking-wide">
            Immutable records of protocol upgrades, governance votes, and network expansion events synced in real-time.
         </p>
      </div>

      {/* --- THE FEED LIST --- */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-20 flex flex-col gap-6">
         {feedData.map((item, index) => (
            <UpdateItem 
               key={item.id}
               index={index}
               {...item}
            />
         ))}
      </div>

      {/* --- BOTTOM MARQUEE --- */}
      <Marquee text="ENCRYPTED  SECURE  DECENTRALIZED  IMMUTABLE" reverse />

    </section>
  );
};

export default KineticFeed;