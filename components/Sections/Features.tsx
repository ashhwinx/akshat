import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Features: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 50%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    { title: "Zero Latency", desc: "Optimized for 60FPS on all devices." },
    { title: "Web3 Native", desc: "Integrated wallet connection and contract interaction." },
    { title: "Cyber Aesthetics", desc: "Visuals that push the boundary of browser rendering." }
  ];

  return (
    <section ref={sectionRef} className="relative py-32 px-4 border-t border-cyber-dim/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div 
              key={i} 
              ref={(el) => { cardsRef.current[i] = el; }}
              className="p-8 border border-cyber-dim bg-cyber-black/50 backdrop-blur-sm hover:border-cyber-silver transition-colors duration-500 group"
            >
              <div className="w-12 h-12 mb-6 border border-cyber-silver/30 flex items-center justify-center group-hover:bg-cyber-silver group-hover:text-black transition-colors duration-500">
                <span className="font-display font-bold text-xl">{`0${i+1}`}</span>
              </div>
              <h3 className="text-2xl font-display font-bold text-white mb-4">{feat.title}</h3>
              <p className="text-cyber-silver/70 font-sans">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;