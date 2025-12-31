import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
  locked?: boolean;
}

// Extend window interface to include lenis
declare global {
  interface Window {
    lenis: Lenis;
  }
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children, locked = false }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis; // Expose to window

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      // @ts-ignore
      window.lenis = null;
    };
  }, []);

  // Handle locking/unlocking scroll
  useEffect(() => {
    if (!lenisRef.current) return;
    
    if (locked) {
      lenisRef.current.stop();
      window.scrollTo(0, 0);
    } else {
      lenisRef.current.start();
    }
  }, [locked]);

  return <div className="relative z-10">{children}</div>;
};

export default SmoothScroll;