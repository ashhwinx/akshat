import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentProgress = 0;
    
    // Progress Logic (0 to 100)
    const interval = setInterval(() => {
      const diff = 100 - currentProgress;
      const step = Math.max(1, Math.ceil(diff / 8)); 
      const randomStep = Math.min(step, Math.floor(Math.random() * 4) + 1);
      currentProgress += randomStep;

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(exitAnimation, 400);
      }
      setProgress(currentProgress);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  const exitAnimation = () => {
    const tl = gsap.timeline({ onComplete: onComplete });

    // Fade out title
    tl.to(contentRef.current, {
       opacity: 0,
       y: -20,
       duration: 0.5,
       ease: "power2.in"
    });

    // Expand bar to fill screen
    tl.to(barRef.current, {
       height: "100vh",
       duration: 0.8,
       ease: "expo.inOut"
    }, "-=0.2");

    // Slide out the whole preloader
    tl.to(containerRef.current, {
       yPercent: -100,
       duration: 0.8,
       ease: "power4.inOut"
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col justify-between overflow-hidden cursor-none"
    >
       {/* Background Grid */}
       <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
            style={{ 
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} 
       />

       {/* Top Section - Static Title */}
       <div ref={contentRef} className="relative z-10 px-6 md:px-12 pt-12 flex justify-center items-start">
             <h1 className="font-display font-bold text-4xl md:text-6xl tracking-tighter leading-none text-center uppercase">
                ghost link
             </h1>
       </div>

       {/* Center Visual (Minimalist Circle) */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 rounded-full flex items-center justify-center pointer-events-none opacity-20">
           <div className="w-[90%] h-[90%] border border-dashed border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
       </div>

       {/* Bottom Section: Huge Percentage Counter */}
       <div className="relative z-10 w-full">
          {/* Subtle Progress Line */}
          <div 
             ref={barRef}
             className="absolute bottom-0 left-0 h-1 bg-white w-full origin-bottom z-0"
             style={{ transform: `scaleX(${progress / 100})`, transformOrigin: 'left' }}
          />

          <div className="px-6 md:px-12 pb-4 flex items-end justify-center relative z-10 mix-blend-difference">
             <div className="font-display font-black text-[20vw] leading-[0.8] tracking-tighter text-white">
                {progress}%
             </div>
          </div>
       </div>
    </div>
  );
};

export default Preloader;