// @ts-nocheck
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerspectiveCamera, Float } from '@react-three/drei';
import HeroBackground from '../Hero/HeroBackground';
import HeroSphere from '../Hero/HeroSphere';
import HeroContent from '../Hero/HeroContent';
import * as THREE from 'three';
import '../../types';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-cyber-black flex flex-col items-center justify-start pt-32">
      
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          dpr={[1, 1.5]} // PERFORMANCE: Cap pixel ratio to 1.5x max
          gl={{ 
            antialias: true, 
            toneMappingExposure: 1.5, 
            powerPreference: "high-performance",
            depth: true,
            stencil: false 
          }}
        >
          {/* Camera positioned to look straight at the "horizon" of the sphere */}
          <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={45} />
          
          <Suspense fallback={null}>
            {/* Background */}
            <HeroBackground />
            
            {/* Main Sphere Component (The World) */}
            <HeroSphere />
            
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <spotLight position={[0, 10, 5]} angle={0.5} penumbra={1} intensity={2} color="#ffffff" />
            <pointLight position={[0, -5, 2]} intensity={5} color="#404040" distance={10} />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Content Layer */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 flex flex-col justify-start pt-[15vh]">
         <HeroContent />
      </div>
      
      {/* Bottom fade to seamlessly blend sphere into footer/next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-cyber-black to-transparent z-[5]" />

    </section>
  );
};

export default Hero;