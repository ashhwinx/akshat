import React, { useState } from 'react';
import FAQItem from './FAQItem';

const SilverSlateFAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: "How secure is the protocol?",
      answer: "Built on a non-custodial architecture with ZK-SNARKs and military-grade hardware security modules. We utilize MPC (Multi-Party Computation) to ensure no single point of failure exists within the node validation layer.",
      serial: "SEC-LVL-5"
    },
    {
      question: "What are the transaction fees?",
      answer: "Our Layer-2 liquid-silver layer reduces gas costs to near-zero (<$0.001), settled in sub-seconds. The protocol subsidizes validator costs through treasury yields, passing the savings directly to institutional partners.",
      serial: "FEE-STRUCT-A"
    },
    {
      question: "Institutional API Access?",
      answer: "Yes, we provide a robust, low-latency gRPC and REST interface for high-frequency institutional trading. Our SDKs support Python, Go, and TypeScript with full type safety and websocket subscriptions.",
      serial: "API-GATE-V2"
    },
    {
      question: "Is there a lock-up period?",
      answer: "Liquidity is completely liquid. Our 'Liquid-Core' engine allows for instant unbonding and withdrawal of assets without the traditional 21-day wait period found in other POS networks.",
      serial: "LIQ-ENG-04"
    },
    {
      question: "Cross-chain compatibility?",
      answer: "We support native bridging to Ethereum, Solana, and Cosmos via our trustless 'Silver-Bridge' adaptors, allowing seamless asset portability without wrapped token risks.",
      serial: "INT-OP-X"
    },
    // Adding extra items to demonstrate sticky scrolling better if needed
    {
       question: "Governance participation?",
       answer: "Token holders can propose and vote on protocol upgrades via our on-chain governance portal. Voting power is proportional to staked assets and time-weighted multipliers.",
       serial: "GOV-DAO-01"
    }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative w-full bg-cyber-black py-32 px-4 md:px-8 border-t border-white/5">
      
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
         {/* Subtle Grid */}
         <div className="absolute inset-0 opacity-[0.03]" 
              style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
         />
         {/* Radial Glow */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full opacity-20" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* 
            Sticky Layout Logic:
            - 'items-start' on mobile to stack naturally.
            - 'lg:items-stretch' ensures both columns are equal height on desktop.
              This creates the 'track' for the sticky element in the left column to float within.
        */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start lg:items-stretch">
          
          {/* Left Column: Sticky Title & Info */}
          {/* NOTE: Explicitly using 'font-clash' and 'font-instrument' here to preserve legacy look as requested */}
          <div className="lg:w-1/3">
             <div className="sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                   <div className="w-2 h-2 bg-cyber-silver rounded-full animate-pulse" />
                   {/* Using cool Space Mono for the label as it fits the new global vibe without clashing with the specific font request for title/body */}
                   <span className="font-mono text-xs text-cyber-silver/60 tracking-[0.2em] uppercase">
                      /// System_Knowledge_Base
                   </span>
                </div>
                
                {/* PRESERVED FONT: Clash Display */}
                <h2 className="text-5xl md:text-7xl font-clash font-black text-white tracking-tighter leading-[0.9] mb-8">
                   PROTOCOL <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-silver to-white/20">
                      INTELLIGENCE
                   </span>
                </h2>
                
                {/* PRESERVED FONT: Instrument Sans */}
                <p className="font-instrument text-cyber-silver/60 text-lg leading-relaxed max-w-sm mb-12 font-medium">
                   Decrypted documentation regarding security, fee structures, and institutional integration patterns.
                </p>

                <button className="group flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full hover:bg-white hover:text-black transition-all duration-300">
                   <span className="text-xs font-bold uppercase tracking-widest font-display">Full Documentation</span>
                   <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" className="group-hover:translate-x-1 transition-transform">
                      <path d="M1 6H11M11 6L6 1M11 6L6 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                </button>
             </div>
          </div>

          {/* Right Column: The FAQ List - Uses Global Fonts (Space Grotesk / Outfit) */}
          <div className="lg:w-2/3 min-h-[600px]">
             <div className="border-b border-white/10">
                {faqData.map((item, index) => (
                  <FAQItem 
                    key={index}
                    index={index}
                    question={item.question}
                    answer={item.answer}
                    serial={item.serial}
                    isOpen={activeIndex === index}
                    onClick={() => handleToggle(index)}
                  />
                ))}
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SilverSlateFAQ;