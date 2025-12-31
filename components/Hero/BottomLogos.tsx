import React from 'react';

const BottomLogos: React.FC = () => {
  const companies = ['Boltshift', 'Lightbox', 'FeatherDev', 'Spherule', 'GlobalBank'];

  return (
    <div className="absolute bottom-10 left-0 w-full z-10 flex flex-col items-center justify-center">
      <p className="text-xs text-cyber-silver/40 uppercase tracking-[0.2em] mb-6">
        Trusted by over 100+ Companies
      </p>
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
        {companies.map((company, i) => (
          <div key={i} className="flex items-center gap-2 group cursor-pointer">
            <div className="w-6 h-6 rounded-full border border-cyber-silver/50 group-hover:bg-white group-hover:border-white transition-colors duration-300" />
            <span className="font-display font-medium text-cyber-silver group-hover:text-white transition-colors duration-300">{company}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomLogos;