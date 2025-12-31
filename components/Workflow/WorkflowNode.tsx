import React from 'react';

interface WorkflowNodeProps {
  step: string;
  title: string;
  description: string;
  align?: 'left' | 'right';
}

const WorkflowNode: React.FC<WorkflowNodeProps> = ({ step, title, description, align = 'left' }) => {
  return (
    <div className={`flex flex-col ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} mb-64 relative pointer-events-auto`}>
      {/* Connection Dot */}
      <div className={`absolute top-8 ${align === 'right' ? '-left-12' : '-right-12'} w-4 h-4 rounded-full bg-cyber-silver shadow-[0_0_15px_white] z-20`} />
      
      {/* Connection Line */}
      <div className={`absolute top-10 ${align === 'right' ? '-left-12 w-12' : '-right-12 w-12'} h-[1px] bg-cyber-silver/50 z-10`} />

      {/* Card */}
      <div className="bg-cyber-black/80 backdrop-blur-md border border-cyber-silver/30 p-8 rounded-2xl max-w-md hover:border-cyber-silver transition-colors duration-500 group shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        <span className="text-xs font-mono text-cyber-silver/60 mb-2 block tracking-widest">{step}</span>
        <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-cyber-silver transition-colors">{title}</h3>
        <p className="text-cyber-silver/70 font-sans leading-relaxed text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};

export default WorkflowNode;