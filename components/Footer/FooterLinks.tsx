import React from 'react';
import { motion } from 'framer-motion';

const mainLinks = [
  { label: "PROTOCOL", href: "#protocol", tag: "V2.0" },
  { label: "ECOSYSTEM", href: "#ecosystem", tag: "100+" },
  { label: "GOVERNANCE", href: "#gov", tag: "DAO" },
  { label: "DEVELOPERS", href: "#dev", tag: "API" },
  { label: "WHITEPAPER", href: "#paper", tag: "PDF" }
];

const socialLinks = [
  { name: "TWITTER / X", handle: "@silver_proto", status: "LIVE" },
  { name: "DISCORD", handle: "discord.gg/silver", status: "12k ON" },
  { name: "GITHUB", handle: "github/silver", status: "OPEN" },
  { name: "TELEGRAM", handle: "t.me/silver", status: "JOIN" }
];

const FooterLinks: React.FC = () => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 border-t border-white/20">
      
      {/* LEFT COL: MASSIVE NAV (7 Cols) */}
      <div className="lg:col-span-7 border-r border-white/20">
        <div className="flex flex-col">
          {mainLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.href}
              className="group relative flex items-center justify-between px-6 md:px-12 py-8 md:py-10 border-b border-white/10 hover:bg-white transition-colors duration-500 overflow-hidden"
            >
              <div className="flex items-baseline gap-6 relative z-10 transition-transform duration-500 group-hover:translate-x-6">
                <span className="font-mono text-xs text-cyber-silver/50 group-hover:text-black/50 transition-colors">
                  0{i + 1}
                </span>
                <h3 className="font-display font-bold text-4xl md:text-6xl text-white group-hover:text-black transition-colors">
                  {link.label}
                </h3>
              </div>

              {/* Tag & Arrow */}
              <div className="relative z-10 flex items-center gap-4">
                 <span className="hidden md:block px-3 py-1 rounded-full border border-white/20 text-[10px] font-mono text-cyber-silver uppercase group-hover:border-black/20 group-hover:text-black transition-colors">
                    {link.tag}
                 </span>
                 <div className="w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-black transform -rotate-45">
                       <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                 </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* RIGHT COL: SOCIALS & INFO (5 Cols) */}
      <div className="lg:col-span-5 flex flex-col">
         
         {/* Social Grid */}
         <div className="grid grid-cols-2 h-full">
            {socialLinks.map((social, i) => (
               <a 
                 key={i} 
                 href="#" 
                 className="group relative flex flex-col justify-between p-6 border-b border-r border-white/10 hover:bg-white/5 transition-colors aspect-square md:aspect-auto md:h-auto"
               >
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                     <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all">
                        <div className="w-2 h-2 bg-white rounded-full group-hover:bg-black" />
                     </div>
                     <span className="font-mono text-[9px] text-green-400 border border-green-900/30 bg-green-900/10 px-2 py-0.5 rounded">
                        ● {social.status}
                     </span>
                  </div>

                  {/* Bottom Text */}
                  <div>
                     <h4 className="font-display font-bold text-xl text-white mb-1">{social.name}</h4>
                     <p className="font-mono text-xs text-cyber-silver/50 group-hover:text-white transition-colors">
                        {social.handle}
                     </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-[20px] border-r-[20px] border-b-white/10 border-r-transparent group-hover:border-b-white group-hover:border-r-white/10 transition-all" />
               </a>
            ))}
         </div>

         {/* Technical Block */}
         <div className="p-8 md:p-12 border-t border-white/20 bg-white/[0.02]">
            <h4 className="font-mono text-xs text-cyber-silver/40 uppercase tracking-widest mb-6">
               /// Network_Parameters
            </h4>
            <div className="space-y-4">
               <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-sm font-sans text-cyber-silver">Validator Yield</span>
                  <span className="text-sm font-mono text-white">4.82% APY</span>
               </div>
               <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-sm font-sans text-cyber-silver">Total Staked</span>
                  <span className="text-sm font-mono text-white">$8.2B USD</span>
               </div>
               <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="text-sm font-sans text-cyber-silver">24h Volume</span>
                  <span className="text-sm font-mono text-white">$420M USD</span>
               </div>
            </div>
         </div>
         
      </div>

    </div>
  );
};

export default FooterLinks;