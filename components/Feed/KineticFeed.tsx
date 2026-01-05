import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  GitCommit, 
  ShieldCheck, 
  Zap, 
  Globe, 
  FileText, 
  Activity, 
  Clock, 
  ArrowUpRight 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- 1. Structured Data ---
const FEED_DATA = [
  {
    id: "SYS-8821",
    date: "Dec 31, 2025",
    time: "14:00 UTC",
    title: "Genesis Core Launch",
    desc: "Successfully deployed the v1.0 genesis block with zero downtime. Validator nodes initialized.",
    type: "PROTOCOL",
    icon: <GitCommit className="w-5 h-5" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    id: "LIQ-9942",
    date: "Nov 15, 2025",
    time: "09:30 UTC",
    title: "Liquidity Surge Event",
    desc: "Total Value Locked (TVL) crossed the $500M mark following the Asian market opening.",
    type: "MARKET",
    icon: <Activity className="w-5 h-5" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    id: "SEC-1102",
    date: "Oct 02, 2025",
    time: "11:15 UTC",
    title: "Shield Audit Complete",
    desc: "External audit by CertiK completed with a 99/100 security score. No critical vulnerabilities.",
    type: "SECURITY",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20"
  },
  {
    id: "BRG-3391",
    date: "Sep 14, 2025",
    time: "16:45 UTC",
    title: "Institutional Bridge",
    desc: "Cross-chain bridge enabled for institutional partners via API v3 endpoints.",
    type: "PARTNERS",
    icon: <Globe className="w-5 h-5" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20"
  },
  {
    id: "GOV-4402",
    date: "Aug 22, 2025",
    time: "08:00 UTC",
    title: "Proposal 42: Accepted",
    desc: "Community voted 88% in favor of reducing gas fees by 15% for Layer 2 transactions.",
    type: "GOVERNANCE",
    icon: <FileText className="w-5 h-5" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  {
    id: "NET-5519",
    date: "Jul 10, 2025",
    time: "03:20 UTC",
    title: "Node Expansion: Asia",
    desc: "200 new validator nodes spun up in Tokyo and Singapore regions to reduce latency.",
    type: "NETWORK",
    icon: <Zap className="w-5 h-5" />,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20"
  }
];

// --- 2. Sub-Component: Feed Card ---
const FeedItem = ({ item, index, isLast }) => {
  return (
    <div className="feed-item group relative flex gap-6 md:gap-10 opacity-0 translate-y-8">
      
      {/* LEFT: Timeline Visuals */}
      <div className="flex flex-col items-center">
        {/* The Dot */}
        <div className={`
          relative z-10 w-12 h-12 rounded-full flex items-center justify-center 
          bg-[#0F0F0F] border border-white/10 group-hover:border-white/30 transition-colors
        `}>
          <div className={`${item.color} transform group-hover:scale-110 transition-transform duration-300`}>
            {item.icon}
          </div>
          {/* Subtle Glow behind dot */}
          <div className={`absolute inset-0 rounded-full ${item.bg} opacity-0 group-hover:opacity-50 blur-md transition-opacity duration-500`} />
        </div>

        {/* The Line (Only show if not the last item) */}
        {!isLast && (
          <div className="flex-grow w-[2px] bg-gradient-to-b from-white/10 to-transparent my-2" />
        )}
      </div>

      {/* RIGHT: Content Card */}
      <div className="flex-1 pb-12">
        {/* Date Header (Mobile view mainly, or small text) */}
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono text-gray-500 flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {item.date} • {item.time}
          </span>
          <span className={`text-[10px] font-bold tracking-widest px-2 py-1 rounded-full ${item.bg} ${item.color} ${item.border} border`}>
            {item.type}
          </span>
        </div>

        {/* The Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-white/10 hover:bg-[#161616] transition-all duration-300 group-hover:shadow-2xl group-hover:translate-x-1">
            <div className="flex justify-between items-start">
               <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base max-w-xl">
                    {item.desc}
                  </p>
               </div>
               
               {/* ID Badge */}
               <div className="hidden md:block text-right">
                  <span className="font-mono text-xs text-gray-600 block mb-1">REF_ID</span>
                  <span className="font-mono text-sm text-gray-400">{item.id}</span>
               </div>
            </div>

            {/* Action Link (Optional Decoration) */}
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 group-hover:text-white transition-colors cursor-pointer w-max">
               <span>View Transaction Details</span>
               <ArrowUpRight className="w-4 h-4" />
            </div>
        </div>
      </div>
    </div>
  );
};

// --- 3. Main Component ---
const KineticFeed = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the items one by one as they scroll into view
      const items = document.querySelectorAll('.feed-item');
      
      items.forEach((item, i) => {
         gsap.to(item, {
            scrollTrigger: {
               trigger: item,
               start: "top 85%", // Start animation when item is 85% down viewport
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            delay: i * 0.1 // Slight stagger for effect
         });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-[#050505] min-h-screen py-24 px-6 md:px-12 flex flex-col items-center font-sans">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-zinc-900 to-transparent opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      {/* --- HEADER --- */}
      <div className="relative z-10 text-center max-w-3xl mb-20">
         
         
         <h2 className="text-5xl md:text-7xl font-bold font-display text-white tracking-tight mb-6">
            PROTOCOL <br/><span className="text-gray-500">ACTIVITY</span>
         </h2>
         <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Real-time updates on network consensus, governance proposals, and institutional liquidity flows.
         </p>
      </div>

      {/* --- TIMELINE LIST --- */}
      <div className="relative z-10 w-full max-w-4xl">
         {/* Vertical Guide Line (Subtle background line for continuity) */}
         <div className="absolute left-[23px] md:left-[23px] top-0 bottom-0 w-[2px] bg-white/5" />
         
         {FEED_DATA.map((item, index) => (
            <FeedItem 
               key={item.id} 
               item={item} 
               index={index} 
               isLast={index === FEED_DATA.length - 1}
            />
         ))}
      </div>

    </section>
  );
};

export default KineticFeed;