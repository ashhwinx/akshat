import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItemProps {
  question: string;
  answer: string;
  serial: string;
  isOpen: boolean;
  onClick: () => void;
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, serial, isOpen, onClick, index }) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative w-full border-t border-white/10 cursor-pointer transition-all duration-500 ${isOpen ? 'bg-white/[0.02]' : 'hover:bg-white/[0.01]'}`}
    >
      {/* Active Indicator Line (Left) */}
      <div className={`absolute left-0 top-0 bottom-0 w-[2px] bg-cyber-silver transition-all duration-500 ease-out ${isOpen ? 'h-full opacity-100' : 'h-0 opacity-0 group-hover:h-4 group-hover:opacity-50'}`} />

      <div className="relative z-10 p-6 md:p-10 flex flex-col">
        
        {/* Header Row */}
        <div className="flex items-baseline justify-between gap-6">
          
          <div className="flex items-baseline gap-6 md:gap-12 flex-grow">
            {/* Serial Number */}
            <div className="font-mono text-xs md:text-sm tracking-widest text-cyber-silver/40 w-12 shrink-0 group-hover:text-cyber-silver transition-colors duration-300">
               {index < 9 ? `0${index + 1}` : index + 1} //
            </div>

            {/* Question */}
            <h3 className={`font-display font-medium text-xl md:text-3xl uppercase tracking-wide transition-all duration-300 ${isOpen ? 'text-white translate-x-2' : 'text-white/60 group-hover:text-white group-hover:translate-x-2'}`}>
              {question}
            </h3>
          </div>

          {/* Toggle Icon */}
          <div className="relative w-6 h-6 shrink-0 flex items-center justify-center">
            {/* Horizontal Line */}
            <div className="absolute w-full h-[1px] bg-white transition-colors duration-300 group-hover:bg-cyber-silver" />
            {/* Vertical Line */}
            <div 
              className={`absolute h-full w-[1px] bg-white transition-all duration-300 ease-out group-hover:bg-cyber-silver ${isOpen ? 'rotate-90 scale-y-0' : 'rotate-0 scale-y-100'}`} 
            />
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-8 pl-0 md:pl-[6rem] pr-0 md:pr-20 flex flex-col gap-6">
                 
                 {/* Decorative Tech Line */}
                 <div className="w-12 h-[1px] bg-cyber-silver/30" />

                 <p className="font-sans text-base md:text-lg text-cyber-silver/80 leading-relaxed">
                   {answer}
                 </p>

                 {/* Footer Metadata for the Item */}
                 <div className="flex items-center gap-4 pt-2">
                    <div className="px-2 py-1 border border-white/10 rounded text-[9px] font-mono text-cyber-silver/40 uppercase tracking-widest">
                       {serial}
                    </div>
                    <div className="text-[9px] font-mono text-green-500/80 uppercase tracking-widest animate-pulse">
                       /// Verified_Response
                    </div>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      
      {/* Hover Scanline Effect */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 ease-in-out transform ${isOpen ? 'translate-x-0 opacity-20' : '-translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-20'}`} />

    </div>
  );
};

export default FAQItem;