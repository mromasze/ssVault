import React from 'react';

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-4">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 border-t-2 border-emerald-500 rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-b-2 border-slate-700 rounded-full animate-spin direction-reverse"></div>
      </div>
      <p className="text-slate-500 font-mono text-sm animate-pulse tracking-widest uppercase">Initializing...</p>
    </div>
  );
}
