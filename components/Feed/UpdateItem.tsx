import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UpdateItemProps {
  id: string;
  title: string;
  date: string;
  tags: string[];
  index: number;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ id, title, date, tags, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-md cursor-pointer overflow-hidden hover:border-white/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,255,255,0.05)] hover:-translate-y-1"
    >
      {/* Background Hover Effect - Swipe Up / Fade In */}
      <div 
        className={`absolute inset-0 bg-white transition-opacity duration-300 ease-out z-0 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />
      
      {/* Content Container */}
      <div className="relative z-10 w-full px-8 py-8 md:px-12 md:py-10 flex flex-col md:flex-row items-baseline justify-between gap-6">
        
        {/* Left: Meta Data */}
        <div className="flex items-center gap-6 w-full md:w-32 shrink-0">
          <div className="flex flex-col">
            <span className={`font-mono text-[9px] tracking-widest uppercase transition-colors duration-300 ${isHovered ? 'text-black/40' : 'text-cyber-silver/40'}`}>
               HASH_ID
            </span>
            <span className={`font-mono text-xs tracking-widest transition-colors duration-300 ${isHovered ? 'text-black' : 'text-cyber-silver'}`}>
               {id}
            </span>
          </div>
        </div>

        {/* Center: Title & Description */}
        <div className="flex-grow md:pl-10">
           <h3 className={`text-3xl md:text-5xl font-display font-bold uppercase tracking-tight leading-none transition-colors duration-300 ${isHovered ? 'text-black' : 'text-white'}`}>
             {title}
           </h3>
           
           {/* Smoother Expand Animation */}
           <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isHovered ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
             <div className="overflow-hidden">
                <div className="pt-6 max-w-2xl">
                    <p className="font-sans text-base md:text-lg leading-relaxed text-black/70">
                      Incoming encrypted transmission verified. Protocol {id} initiates immediate execution of smart contract logic across the decentralized network layer.
                    </p>
                    <div className="mt-6 flex items-center gap-6">
                        <span className="text-xs font-bold uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity">
                            View Transaction
                        </span>
                        <span className="text-xs font-bold uppercase border-b border-black pb-1 hover:opacity-50 transition-opacity">
                            Copy JSON
                        </span>
                    </div>
                </div>
             </div>
           </div>
        </div>

        {/* Right: Tags & Status */}
        <div className="hidden md:flex items-center gap-4 min-w-[150px] justify-end">
           <div className={`
              px-4 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest border transition-all duration-300
              ${isHovered ? 'border-black text-black' : 'border-white/20 text-cyber-silver'}
           `}>
              {tags[0]}
           </div>
           
           {/* Animated Arrow */}
           <div className={`w-8 h-8 flex items-center justify-center rounded-full border border-transparent transition-all duration-500 ease-out ${isHovered ? 'rotate-90 bg-black text-white' : 'rotate-0 text-white'}`}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                 <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default UpdateItem;