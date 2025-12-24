
import React, { useState } from 'react';
import { PostOffice } from '../types';
import { ChevronDown, MapPin, Building, Globe, Truck, Info } from 'lucide-react';

interface PostOfficeCardProps {
  office: PostOffice;
  index: number;
}

const PostOfficeCard: React.FC<PostOfficeCardProps> = ({ office, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getBranchTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'head post office': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      case 'sub post office': return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      default: return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const isDelivery = office.DeliveryStatus === 'Delivery';

  return (
    <div 
      className="glass-card rounded-2xl p-6 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-blue-500/10 group cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {office.Name}
        </h3>
        <span className={`px-3 py-1 text-[10px] uppercase font-bold rounded-full border ${getBranchTypeColor(office.BranchType)}`}>
          {office.BranchType}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-slate-400 text-sm">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          <span>{office.District}, {office.State}</span>
        </div>
        
        <div className="flex items-center text-slate-400 text-sm">
          <Truck className={`w-4 h-4 mr-2 ${isDelivery ? 'text-emerald-500' : 'text-rose-500'}`} />
          <span className="flex items-center">
            {office.DeliveryStatus}
            <span className={`ml-2 w-2 h-2 rounded-full ${isDelivery ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`} />
          </span>
        </div>
      </div>

      <div className={`mt-4 pt-4 border-t border-white/5 space-y-3 transition-all duration-300 ${isExpanded ? 'block' : 'hidden md:block'}`}>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="space-y-1">
            <span className="text-slate-500 uppercase block tracking-wider">Division</span>
            <span className="text-slate-300 font-medium">{office.Division}</span>
          </div>
          <div className="space-y-1">
            <span className="text-slate-500 uppercase block tracking-wider">Region</span>
            <span className="text-slate-300 font-medium">{office.Region}</span>
          </div>
        </div>
        
        {isExpanded && (
          <div className="grid grid-cols-2 gap-4 text-xs pt-2 animate-in fade-in slide-in-from-top-2">
            <div className="space-y-1">
              <span className="text-slate-500 uppercase block tracking-wider">Block</span>
              <span className="text-slate-300 font-medium">{office.Block || 'N/A'}</span>
            </div>
            <div className="space-y-1">
              <span className="text-slate-500 uppercase block tracking-wider">Circle</span>
              <span className="text-slate-300 font-medium">{office.Circle}</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-center md:hidden">
        <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
      </div>
    </div>
  );
};

export default PostOfficeCard;
