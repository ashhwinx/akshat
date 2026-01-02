// @ts-nocheck
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, PerformanceMonitor } from '@react-three/drei';
import HeroBackground from '../Hero/HeroBackground';
import HeroSphere from '../Hero/HeroSphere';
import HeroContent from '../Hero/HeroContent';
import HeroCoins from '../Hero/HeroCoins';
import '../../types';


const Hero: React.FC = () => {
  // OPTIMIZATION: State to dynamically adjust quality based on device speed
  const [dpr, setDpr] = useState(1.5); 

  return (
    <section className="relative w-full h-screen overflow-hidden bg-cyber-black flex flex-col items-center justify-start pt-32">
      
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          // OPTIMIZATION: Dynamic Pixel Ratio. Drops to 0.5 on slow devices, max 1.5 on fast ones.
          dpr={dpr} 
          
          // OPTIMIZATION: Renderer Settings
          gl={{ 
            antialias: false, // HUGE performance boost. True is too expensive for mobile.
            powerPreference: "high-performance",
            depth: true,
            stencil: false,
            alpha: false // We have a background, so transparency isn't needed on the canvas itself
          }}
        >
          {/* OPTIMIZATION: PerformanceMonitor automatically detects lag and downgrades quality */}
          <PerformanceMonitor 
            onDecline={() => setDpr(1)} // If FPS drops, lower resolution
            onIncline={() => setDpr(1.5)} // If smooth, increase resolution
            flipflops={3} // Stop adjusting after 3 tries to prevent flickering
            onFallback={() => setDpr(0.75)} // Worst case scenario
          />

          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
          
          <Suspense fallback={null}>
            {/* OPTIMIZATION: Lighting removed here because HeroBackground 
              now handles the Environment and Lights globally. 
              Duplicating lights kills performance.
            */}
            
            <HeroBackground />
            <HeroSphere />
            <HeroCoins/>
            
            
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Content Layer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-start pt-[15vh]">
        
         <HeroContent />


            
        
         
      </div>
      
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyber-black to-transparent z-[5]" />

    </section>
  );
};

export default Hero;