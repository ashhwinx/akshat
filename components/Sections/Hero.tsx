// @ts-nocheck
import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, PerformanceMonitor } from '@react-three/drei';
import HeroBackground from '../Hero/HeroBackground';
import HeroSphere from '../Hero/HeroSphere';
import HeroContent from '../Hero/HeroContent';
import HeroCoins from '../Hero/HeroCoins';
import '../../types';

const Hero: React.FC = () => {
  const [dpr, setDpr] = useState(1.5); 
  // Ye Ref magic karega: pure section ke mouse events Canvas ko dega
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-cyber-black flex flex-col items-center justify-start pt-32"
    >
      
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          dpr={dpr} 
          // IMPORTANT: eventSource={containerRef} lagane se Coins ko hamesha 
          // mouse ka position milega, bhale hi HTML layer upar ho.
          eventSource={containerRef}
          eventPrefix="client"
          gl={{ 
            antialias: false, 
            powerPreference: "high-performance",
            depth: true,
            stencil: false,
            alpha: false 
          }}
        >
          <PerformanceMonitor 
            onDecline={() => setDpr(1)} 
            onIncline={() => setDpr(1.5)} 
            flipflops={3} 
            onFallback={() => setDpr(0.75)} 
          />

          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
          
          <Suspense fallback={null}>
            <HeroBackground />
            <HeroSphere />
            <HeroCoins />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Content Layer */}
      {/* pointer-events-none: Isse ye layer 'ghost' ban jati hai clicks ke liye */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-start pt-[23vh]">
          {/* pointer-events-auto: Lekin buttons aur content ko wapis interactive banana hoga */}
          <div className="pointer-events-auto">
            <HeroContent />
          </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyber-black to-transparent z-[5] pointer-events-none" />

    </section>
  );
};

export default Hero;