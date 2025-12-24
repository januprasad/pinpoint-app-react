
import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="flex justify-between items-start">
        <div className="h-6 w-3/4 bg-slate-700 rounded-md"></div>
        <div className="h-5 w-16 bg-slate-700 rounded-full"></div>
      </div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-700/50 rounded-md"></div>
        <div className="h-4 w-2/3 bg-slate-700/50 rounded-md"></div>
      </div>
      <div className="pt-4 border-t border-white/5 flex justify-between">
        <div className="h-4 w-20 bg-slate-700/30 rounded-md"></div>
        <div className="h-4 w-20 bg-slate-700/30 rounded-md"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;
