import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLDivElement>(null); // Ref for the number text
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          exitAnimation();
        }
      });

      // 1. Progress Animation (Exactly 2 Seconds)
      // We animate a proxy object so we don't trigger React re-renders
      const progressObj = { value: 0 };
      
      tl.to(progressObj, {
        value: 100,
        duration: 2, // Fixed time: 2 seconds
        ease: "power2.inOut", // Smooth start and end
        onUpdate: () => {
          // Update text directly (Performance Optimization)
          if (percentRef.current) {
            percentRef.current.innerText = `${Math.round(progressObj.value)}%`;
          }
          // Update bar width directly
          if (barRef.current) {
            barRef.current.style.transform = `scaleX(${progressObj.value / 100})`;
          }
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const exitAnimation = () => {
    const tl = gsap.timeline({ 
        onComplete: onComplete,
        defaults: { ease: "power3.inOut" } 
    });

    // 1. Fade out text elements nicely
    tl.to([contentRef.current, percentRef.current], {
       opacity: 0,
       y: -20,
       duration: 0.4
    });

    // 2. Expand bar to fill screen (Using ScaleY instead of Height for performance)
    tl.to(barRef.current, {
       scaleY: 1000, // Scales up to fill screen vertically
       duration: 0.8,
       transformOrigin: "bottom"
    }, "-=0.2");

    // 3. Slide the whole container up
    tl.to(containerRef.current, {
       yPercent: -100,
       duration: 0.8,
    }, "-=0.4");
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#050505] text-white flex flex-col justify-between overflow-hidden cursor-none"
    >
       {/* Background Grid - Optimized opacity */}
       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ 
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
            }} 
       />

       {/* Top Section - Static Title */}
       <div ref={contentRef} className="relative z-10 px-6 md:px-12 pt-12 flex justify-center items-start">
             <h1 className="font-display font-bold text-2xl md:text-3xl tracking-widest leading-none text-center uppercase opacity-80">
               ghost link
             </h1>
       </div>

       {/* Center Visual (Minimalist Circle) - Smoother Animation */}
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full flex items-center justify-center pointer-events-none opacity-20">
           <div className="w-[90%] h-[90%] border border-dashed border-white/20 rounded-full animate-[spin_4s_linear_infinite]" />
       </div>

       {/* Bottom Section: Smaller, Cleaner Counter */}
       <div className="relative z-10 w-full">
         
         {/* Progress Bar */}
         <div 
             ref={barRef}
             className="absolute bottom-0 left-0 h-1 bg-white w-full origin-bottom z-0 will-change-transform"
             style={{ transform: 'scaleX(0)' }}
         />

         {/* Percentage Text - Smaller Size */}
         <div className="px-6 md:px-12 pb-8 flex items-end justify-end relative z-10 mix-blend-difference">
             <div 
                ref={percentRef}
                className="font-display font-bold text-6xl md:text-8xl tracking-tighter text-white tabular-nums"
             >
                0%
             </div>
         </div>
       </div>
    </div>
  );
};

export default Preloader;