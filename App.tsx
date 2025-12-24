
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, MapPin, Package, ArrowRight } from 'lucide-react';
import { PostOffice, FetchStatus } from './types';
import { fetchPincodeDetails } from './services/pincodeService';
import PostOfficeCard from './components/PostOfficeCard';
import SkeletonCard from './components/SkeletonCard';
import EmptyState from './components/EmptyState';

const App: React.FC = () => {
  const [pincode, setPincode] = useState('');
  const [results, setResults] = useState<PostOffice[]>([]);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleFetch = async (code: string) => {
    if (code.length !== 6) return;
    
    setStatus('loading');
    setErrorMsg('');
    
    try {
      const data = await fetchPincodeDetails(code);
      const res = data[0];
      
      if (res.Status === 'Success' && res.PostOffice) {
        setResults(res.PostOffice);
        setStatus('success');
      } else {
        setResults([]);
        setStatus('error');
        setErrorMsg(res.Message || 'Invalid Pincode. No records found.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg('Failed to connect to the postal service. Please try again later.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    
    if (value.length === 6) {
      handleFetch(value);
    } else if (value.length === 0) {
      setStatus('idle');
      setResults([]);
    }
  };

  const clearInput = () => {
    setPincode('');
    setResults([]);
    setStatus('idle');
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-screen selection:bg-blue-500/30">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-600/10 blur-[100px] rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[40%] right-[15%] w-[20%] h-[20%] bg-indigo-500/10 blur-[80px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Header Section */}
      <header className="relative pt-12 pb-24 md:pt-20 md:pb-32 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col items-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/50 transform rotate-12 transition-transform hover:rotate-0">
              <Package className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
              PinPoint <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">India</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-lg font-medium">
              Discover India, One Pincode at a Time. Real-time insights into postal divisions, circles, and delivery points.
            </p>
          </div>

          <div className="relative max-w-xl mx-auto group animate-in zoom-in duration-700 delay-300">
            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500 ${pincode.length === 6 ? 'opacity-40 scale-105' : ''}`}></div>
            <div className="relative glass-input flex items-center p-2 rounded-2xl shadow-xl">
              <div className="pl-4 pr-3">
                {status === 'loading' ? (
                  <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                ) : (
                  <MapPin className={`w-6 h-6 transition-colors ${pincode.length === 6 ? 'text-blue-400' : 'text-slate-500'}`} />
                )}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={pincode}
                onChange={handleInputChange}
                placeholder="Enter 6-digit Pincode..."
                className="w-full bg-transparent py-4 text-2xl font-mono text-white placeholder-slate-600 focus:outline-none tracking-[0.2em]"
              />
              {pincode && (
                <button 
                  onClick={clearInput}
                  className="p-3 text-slate-500 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
          
          {status === 'success' && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-500">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-sm font-medium">
                Showing {results.length} locations found for {pincode}
              </span>
            </div>
          )}
        </div>
      </header>

      {/* Results Section */}
      <main className="max-w-7xl mx-auto px-4 pb-24">
        {status === 'idle' && <EmptyState type="initial" />}
        
        {status === 'loading' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-in">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {status === 'error' && <EmptyState type="error" message={errorMsg} />}

        {status === 'success' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-in">
            {results.map((office, idx) => (
              <PostOfficeCard key={`${office.Name}-${idx}`} office={office} index={idx} />
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-slate-500 text-sm">
          Data sourced from Department of Posts, Ministry of Communications, India.
        </p>
      </footer>
    </div>
  );
};

export default App;
