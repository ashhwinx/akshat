import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import WorkflowCanvas from '../Workflow/WorkflowCanvas';
import WorkflowNode from '../Workflow/WorkflowNode';
import DepthRuler from '../Workflow/DepthRuler';

gsap.registerPlugin(ScrollTrigger);

const NeuralWorkflow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top", // When top of section hits top of viewport
        end: "bottom bottom", // When bottom of section hits bottom of viewport
        scrub: 0.5,
        onUpdate: (self) => {
          setProgress(self.progress);
        }
      });

      return () => {
        trigger.kill();
      };
    }
  }, []);

  return (
    <section ref={containerRef} className="relative w-full bg-cyber-black z-30 h-[400vh]">
      
      {/* Sticky Background Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        <DepthRuler />
        <WorkflowCanvas progress={progress} />
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-cyber-black via-transparent to-cyber-black opacity-80 pointer-events-none" />
      </div>

      {/* Scrolling Content Overlay */}
      <div className="absolute top-0 left-0 w-full z-10 pt-[50vh] pb-[50vh]">
        <div className="max-w-6xl mx-auto px-4 w-full flex flex-col items-center">
          
          {/* Step 1: Left */}
          <div className="w-full flex justify-start pl-10 md:pl-20">
             <WorkflowNode 
               step="STEP 01" 
               title="INGESTION" 
               description="Real-time data ingestion via decentralized oracles. High-frequency localized buffering ensures zero packet loss during initial handshake protocols."
               align="left"
             />
          </div>

          {/* Spacer */}
          <div className="h-[20vh]" />

          {/* Step 2: Right */}
          <div className="w-full flex justify-end pr-10 md:pr-20">
             <WorkflowNode 
               step="STEP 02" 
               title="ENCRYPTION" 
               description="Poly-morphic encryption layers are applied instantaneously. Sharding algorithms distribute the key fragments across the immutable ledger."
               align="right"
             />
          </div>

          {/* Spacer */}
          <div className="h-[20vh]" />

          {/* Step 3: Left */}
          <div className="w-full flex justify-start pl-10 md:pl-20">
             <WorkflowNode 
               step="STEP 03" 
               title="VALIDATION" 
               description="Consensus nodes verify integrity using Zero-Knowledge Proofs. The neural network validates transaction authenticity without revealing underlying assets."
               align="left"
             />
          </div>

          {/* Spacer */}
          <div className="h-[20vh]" />

           {/* Step 4: Right */}
           <div className="w-full flex justify-end pr-10 md:pr-20">
             <WorkflowNode 
               step="STEP 04" 
               title="IMMUTABLE STORAGE" 
               description="Finalized blocks are woven into the chain. Deep storage protocols ensure redundancy across geographically distributed archives."
               align="right"
             />
          </div>

        </div>
      </div>

    </section>
  );
};

export default NeuralWorkflow;