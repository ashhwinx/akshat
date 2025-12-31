import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FooterLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const reflectionRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current || !reflectionRef.current) return;

    // We animate based on the visibility of the footer container
    // Since the footer is fixed, we track the main scroll position relative to document height
    // But a cleaner way for the "reveal" is to trigger when the spacer enters view.
    // However, since this component is INSIDE the fixed footer, we can just use the global scroll 
    // mapped to the very end of the page.
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "bottom bottom", // When bottom of body hits bottom of viewport (fully scrolled)
        end: "bottom+=100% bottom", // No real end needed, but we map the "approach"
        scrub: 1, 
      }
    });

    // We actually want the animation to happen AS we reveal.
    // The "spacer" technique in App.tsx creates space. 
    // Let's create a trigger based on the spacer which we will target by ID in App.tsx
    
    ScrollTrigger.create({
      trigger: "#footer-spacer",
      start: "top bottom", // When top of spacer hits bottom of viewport
      end: "bottom bottom", // When bottom of spacer hits bottom of viewport
      scrub: 0,
      onUpdate: (self) => {
        // scale: 1.5 -> 1
        // tracking: -0.05 -> 0
        const progress = self.progress;
        
        // Easing the progress for impact
        const eased = 1 - Math.pow(1 - progress, 3);

        const scale = 1.5 - (eased * 0.5); 
        const spacing = -0.5 + (eased * 0.5); // rem
        
        if (textRef.current) {
          textRef.current.style.transform = `scale(${scale})`;
          textRef.current.style.letterSpacing = `${spacing}rem`;
        }
        if (reflectionRef.current) {
          reflectionRef.current.style.transform = `scale(${scale}) scaleY(-1)`;
          reflectionRef.current.style.letterSpacing = `${spacing}rem`;
        }
      }
    });

  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center justify-center py-20 overflow-hidden">
      
      {/* Main Text */}
      <h1 
        ref={textRef}
        className="text-[15vw] md:text-[22vw] leading-[0.8] font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-cyber-silver to-[#4a4a4a] tracking-tighter origin-center will-change-transform select-none"
      >
        SILVER
      </h1>

      {/* Reflection */}
      <h1 
        ref={reflectionRef}
        className="absolute top-full left-0 w-full text-center text-[15vw] md:text-[22vw] leading-[0.8] font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-t from-white/10 to-transparent tracking-tighter origin-top opacity-30 select-none pointer-events-none blur-sm"
        style={{ transform: 'scaleY(-1)' }}
      >
        SILVER
      </h1>

    </div>
  );
};

export default FooterLogo;