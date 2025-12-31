import React from 'react';

const CenterContent: React.FC = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-4xl px-4 mt-10">
      {/* Decorative Stars Overlay (CSS only) */}
      <div className="absolute -top-20 left-1/4 w-1 h-1 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]" />
      <div className="absolute top-0 right-1/4 w-2 h-2 bg-cyber-silver rounded-full animate-bounce shadow-[0_0_15px_silver]" />

      <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-2xl">
        Seamless crypto <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-cyber-silver">
          distribution for teams
        </span>
      </h1>
      
      <p className="text-cyber-silver/70 text-base md:text-lg max-w-2xl font-sans tracking-wide leading-relaxed mb-10">
        Whether you're managing a DAO, running a token launch, or rewarding your team, 
        our platform handles crypto payouts at scale, securely and in seconds.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        {/* Primary Button */}
        <button className="px-8 py-4 bg-white text-black font-display font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
          Get Started
        </button>

        {/* Secondary Button */}
        <button className="px-8 py-4 bg-cyber-black border border-cyber-dim text-white font-display font-medium rounded-full hover:border-white transition-colors duration-300 flex items-center justify-center gap-2">
          <span>7 Day Free Trial</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Floating Input-like visual (matches reference center pill) */}
      <div className="mt-12 flex items-center gap-4 bg-cyber-black/80 border border-cyber-dim rounded-2xl p-2 pr-6 backdrop-blur-md">
         <div className="w-10 h-10 bg-cyber-silver/20 rounded-xl flex items-center justify-center text-white font-bold">
            ₿
         </div>
         <div className="text-left">
            <p className="text-xs text-cyber-silver/50 uppercase tracking-widest">Payout</p>
            <p className="text-white font-mono font-bold">12.5 BTC</p>
         </div>
         <div className="h-8 w-[1px] bg-cyber-dim mx-2"></div>
         <div className="text-green-400 text-sm font-bold animate-pulse">
            Processing...
         </div>
      </div>
    </div>
  );
};

export default CenterContent;