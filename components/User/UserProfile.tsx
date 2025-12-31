import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');
  const [amount, setAmount] = useState('0.00');
  const [selectedToken, setSelectedToken] = useState('ETH');

  const tokens = [
    { symbol: 'ETH', balance: '12.42' },
    { symbol: 'USDC', balance: '8,402.00' },
    { symbol: 'SLVR', balance: '124,092.5' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050505] pt-32 pb-20 px-4 flex flex-col items-center relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-silver/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: IDENTITY & STATS */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Identity Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full border-2 border-white/10 bg-gradient-to-tr from-gray-800 to-black flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
               <span className="font-display font-bold text-3xl text-white">S</span>
            </div>
            
            <h2 className="text-2xl font-display font-bold text-white mb-1">SilverUser_01</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5 mb-6 cursor-pointer hover:bg-white/10 transition-colors">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
               <span className="font-mono text-xs text-cyber-silver tracking-wide">0x71A...89B2</span>
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-cyber-silver/50">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" />
               </svg>
            </div>

            <div className="w-full h-[1px] bg-white/10 mb-6" />

            <div className="w-full flex justify-between items-center px-2">
               <div className="flex flex-col items-start">
                  <span className="text-[10px] font-mono text-cyber-silver/50 uppercase tracking-widest">Net Worth</span>
                  <span className="text-xl font-display font-bold text-white">$42,892.10</span>
               </div>
               <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer text-white">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>
            </div>
          </motion.div>

          {/* Quick Actions / Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-1 p-6 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-md"
          >
             <div className="flex justify-between items-end mb-6">
                <span className="text-xs font-mono text-cyber-silver/40 uppercase tracking-widest">Recent Activity</span>
                <span className="text-[10px] text-white underline cursor-pointer">View All</span>
             </div>
             
             <div className="flex flex-col gap-4">
                {[1,2,3].map((_,i) => (
                   <div key={i} className="flex items-center justify-between group cursor-pointer">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 group-hover:bg-white group-hover:text-black transition-colors">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                               <path d="M7 17l9.2-9.2M17 17V7H7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                         </div>
                         <div className="flex flex-col">
                            <span className="text-sm font-bold text-white">Sent ETH</span>
                            <span className="text-[10px] font-mono text-cyber-silver/50">2 mins ago</span>
                         </div>
                      </div>
                      <span className="font-mono text-sm text-white">-0.5 ETH</span>
                   </div>
                ))}
             </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: TRANSACTION INTERFACE */}
        <div className="lg:col-span-8">
           <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="w-full h-full min-h-[500px] rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-2xl relative overflow-hidden flex flex-col"
           >
              {/* Tab Switcher */}
              <div className="flex border-b border-white/10">
                 <button 
                    onClick={() => setActiveTab('send')}
                    className={`flex-1 py-6 text-sm font-display font-bold uppercase tracking-widest transition-all relative ${activeTab === 'send' ? 'text-white bg-white/5' : 'text-white/40 hover:text-white'}`}
                 >
                    Send Crypto
                    {activeTab === 'send' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
                 </button>
                 <button 
                    onClick={() => setActiveTab('receive')}
                    className={`flex-1 py-6 text-sm font-display font-bold uppercase tracking-widest transition-all relative ${activeTab === 'receive' ? 'text-white bg-white/5' : 'text-white/40 hover:text-white'}`}
                 >
                    Receive
                    {activeTab === 'receive' && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white" />}
                 </button>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                 <AnimatePresence mode="wait">
                    {activeTab === 'send' ? (
                       <motion.div 
                          key="send"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="flex flex-col gap-8 max-w-xl mx-auto w-full"
                       >
                          {/* Token Selector */}
                          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
                             {tokens.map((token) => (
                                <button 
                                   key={token.symbol}
                                   onClick={() => setSelectedToken(token.symbol)}
                                   className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300 min-w-[140px] ${selectedToken === token.symbol ? 'bg-white text-black border-white' : 'bg-transparent border-white/10 text-white hover:border-white/40'}`}
                                >
                                   <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] ${selectedToken === token.symbol ? 'bg-black text-white' : 'bg-white text-black'}`}>
                                      {token.symbol[0]}
                                   </div>
                                   <div className="flex flex-col items-start">
                                      <span className="font-bold text-xs">{token.symbol}</span>
                                      <span className={`text-[10px] font-mono ${selectedToken === token.symbol ? 'text-black/60' : 'text-white/40'}`}>{token.balance}</span>
                                   </div>
                                </button>
                             ))}
                          </div>

                          {/* Amount Input */}
                          <div className="relative group">
                             <label className="block text-xs font-mono text-cyber-silver/50 uppercase tracking-widest mb-4">Amount</label>
                             <div className="relative">
                                <input 
                                   type="text" 
                                   value={amount}
                                   onChange={(e) => setAmount(e.target.value)}
                                   className="w-full bg-transparent text-6xl md:text-8xl font-display font-bold text-white placeholder:text-white/10 outline-none border-none py-2"
                                />
                                <span className="absolute right-0 bottom-6 text-xl text-white/40 font-display font-bold">{selectedToken}</span>
                             </div>
                             <div className="h-[1px] w-full bg-white/10 group-hover:bg-white/30 transition-colors" />
                          </div>

                          {/* Recipient */}
                          <div>
                             <label className="block text-xs font-mono text-cyber-silver/50 uppercase tracking-widest mb-2">Recipient Address</label>
                             <input 
                                type="text" 
                                placeholder="0x..." 
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white font-mono text-sm focus:border-white/40 outline-none transition-colors"
                             />
                          </div>

                          {/* Action Button */}
                          <button className="mt-4 w-full py-5 bg-white text-black font-display font-bold text-lg uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                             Confirm Transaction
                          </button>

                       </motion.div>
                    ) : (
                       <motion.div 
                          key="receive"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex flex-col items-center gap-8 text-center"
                       >
                          <div className="p-1 bg-gradient-to-tr from-white/10 to-transparent rounded-3xl">
                             <div className="bg-white p-6 rounded-[20px]">
                                {/* Mock QR Code Grid */}
                                <div className="w-48 h-48 bg-black grid grid-cols-6 grid-rows-6 gap-1 p-2">
                                   {Array.from({length: 36}).map((_, i) => (
                                      <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-white' : 'bg-black'}`} />
                                   ))}
                                </div>
                             </div>
                          </div>

                          <div>
                             <p className="text-xs font-mono text-cyber-silver/50 uppercase tracking-widest mb-3">Your Wallet Address</p>
                             <div className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-xl group cursor-pointer hover:bg-white/10 transition-colors">
                                <span className="font-mono text-lg text-white">0x71A...89B2</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white/50 group-hover:text-white">
                                   <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" />
                                   <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" />
                                </svg>
                             </div>
                          </div>

                          <div className="max-w-md text-sm text-white/40">
                             Only send ETH, USDC, or SLVR tokens to this address. Sending other assets may result in permanent loss.
                          </div>

                       </motion.div>
                    )}
                 </AnimatePresence>
              </div>

           </motion.div>
        </div>

      </div>

    </div>
  );
};

export default UserProfile;