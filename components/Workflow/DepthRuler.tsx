import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DepthRuler: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -500]);

  return (
    <div className="absolute left-0 top-0 bottom-0 w-16 z-20 hidden md:flex flex-col items-center overflow-hidden border-r border-cyber-dim/20 bg-cyber-black/50 backdrop-blur-sm">
      <div className="flex-1 w-full relative">
        <motion.div style={{ y }} className="absolute top-0 left-0 w-full flex flex-col items-center gap-10 py-10">
           {Array.from({ length: 50 }).map((_, i) => (
             <div key={i} className="flex flex-col items-center gap-2 w-full opacity-50">
               <div className="w-[1px] h-4 bg-cyber-silver/50" />
               <span className="text-[9px] font-mono text-cyber-silver/70 rotate-90">{i * 10}m</span>
               <div className="w-[1px] h-4 bg-cyber-silver/50" />
             </div>
           ))}
        </motion.div>
      </div>
      <div className="h-20 w-full bg-gradient-to-t from-cyber-black to-transparent absolute bottom-0 z-10" />
      <div className="h-20 w-full bg-gradient-to-b from-cyber-black to-transparent absolute top-0 z-10" />
    </div>
  );
};

export default DepthRuler;