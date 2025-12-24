
import React from 'react';
import { Search, Map, AlertCircle } from 'lucide-react';

interface EmptyStateProps {
  type: 'initial' | 'no-results' | 'error';
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, message }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 ring-1 ring-blue-500/20">
        {type === 'initial' && <Search className="w-10 h-10 text-blue-400 animate-pulse" />}
        {type === 'no-results' && <Map className="w-10 h-10 text-amber-400" />}
        {type === 'error' && <AlertCircle className="w-10 h-10 text-rose-400" />}
      </div>
      <h3 className="text-2xl font-bold text-white mb-2">
        {type === 'initial' && 'Start Your Search'}
        {type === 'no-results' && 'No Locations Found'}
        {type === 'error' && 'Something Went Wrong'}
      </h3>
      <p className="text-slate-400 max-w-xs mx-auto">
        {type === 'initial' && 'Enter a 6-digit Indian Pincode to discover post office details, divisions, and more.'}
        {type === 'no-results' && (message || 'We couldn\'t find any post offices for this pincode. Please check and try again.')}
        {type === 'error' && (message || 'An error occurred while fetching data. Please check your internet connection.')}
      </p>
    </div>
  );
};

export default EmptyState;
