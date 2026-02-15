'use client';

import React, { useState, useEffect } from 'react';
import { Download, Monitor, Command, Server, ArrowLeft, Github, Globe, Menu, X, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { translations } from '../data';
import Loading from '../components/Loading';

export default function DownloadPage() {
  const [lang, setLang] = useState<'pl' | 'en'>('en');
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('ssvault-lang');
    if (savedLang === 'pl' || savedLang === 'en') {
      setLang(savedLang);
    } else {
      const sysLang = navigator.language.startsWith('pl') ? 'pl' : 'en';
      setLang(sysLang);
    }
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'pl' ? 'en' : 'pl';
    setLang(newLang);
    localStorage.setItem('ssvault-lang', newLang);
  };

  if (!mounted) return <Loading />;

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-emerald-500/30">
      
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <Link href="/" className="font-bold text-2xl text-white tracking-tight pt-1 hover:text-emerald-400 transition-colors">
              ssVault<span className="text-emerald-500">.</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-emerald-400 transition-colors uppercase tracking-widest">{t.nav.features}</Link>
            <Link href="/changelog" className="text-sm font-medium hover:text-emerald-400 transition-colors uppercase tracking-widest">{t.nav.changelog}</Link>
            <button onClick={toggleLang} className="flex items-center gap-2 text-xs font-bold hover:text-white transition-colors px-3 py-1 bg-white/5 border border-white/10 text-emerald-500 uppercase">
              <Globe size={12} />
              {lang.toUpperCase()}
            </button>
            <a href="https://github.com/mromasze/ssVault" target="_blank" rel="noreferrer"
               className="flex items-center gap-2 text-sm font-bold text-black bg-emerald-500 hover:bg-emerald-400 px-6 py-2.5 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] uppercase tracking-wide">
              <Github size={18} />
              {t.nav.github}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="text-sm font-bold text-slate-400 uppercase">
              {lang.toUpperCase()}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2 hover:bg-white/5 rounded">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black p-4 flex flex-col gap-4">
            <Link href="/#features" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-mono hover:text-emerald-400">{t.nav.features}</Link>
            <Link href="/changelog" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-mono hover:text-emerald-400">{t.nav.changelog}</Link>
            <a href="https://github.com/mromasze/ssVault" target="_blank" rel="noreferrer" className="flex items-center gap-2 py-2 text-lg font-mono text-emerald-400">
              <Github size={20} /> GitHub
            </a>
          </div>
        )}
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
                {t.download.title}
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                {t.download.subtitle}
            </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {/* Windows */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-none hover:border-emerald-500/50 transition-colors group text-center flex flex-col items-center">
                <div className="p-4 bg-white/5 rounded-full mb-6 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                    <Monitor size={48} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{t.download.windows}</h2>
                <p className="text-slate-500 mb-8 font-mono text-sm">Installer .exe (x64)</p>
                <a href="https://github.com/mromasze/ssVault/releases/latest/download/ssVault-0.1.3.Setup.exe" 
                   className="w-full px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-black font-bold flex items-center justify-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] uppercase tracking-wide">
                    <Download size={18} />
                    {t.download.downloadNow}
                </a>
            </div>

            {/* macOS */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-none hover:border-emerald-500/50 transition-colors group text-center flex flex-col items-center">
                <div className="p-4 bg-white/5 rounded-full mb-6 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                    <Command size={48} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{t.download.mac}</h2>
                <p className="text-slate-500 mb-8 font-mono text-sm">Apple Silicon .zip</p>
                <a href="https://github.com/mromasze/ssVault/releases/latest/download/ssVault-darwin-arm64-0.1.3.zip" 
                   className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-wide">
                    <Download size={18} />
                    {t.download.downloadNow}
                </a>
            </div>

            {/* Linux */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-none hover:border-emerald-500/50 transition-colors group text-center flex flex-col items-center">
                <div className="p-4 bg-white/5 rounded-full mb-6 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors">
                    <Server size={48} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{t.download.linux}</h2>
                <p className="text-slate-500 mb-8 font-mono text-sm">.deb, .rpm, .zip</p>
                <a href="https://github.com/mromasze/ssVault/releases/latest" 
                   className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold flex items-center justify-center gap-2 transition-all uppercase tracking-wide">
                    <Download size={18} />
                    {t.download.downloadNow}
                </a>
            </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-10 text-center">
             <p className="text-slate-500 font-mono text-sm">
                Latest Release: <span className="text-white font-bold">v0.1.3</span> • Released: <span className="text-white">2026-02-15</span>
             </p>
             <a href="https://github.com/mromasze/ssVault/releases" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 mt-4 font-mono text-sm uppercase tracking-wide group">
                View all releases on GitHub <ExternalLink size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"/>
             </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12 text-center">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6">
          <p className="text-slate-500 max-w-md">
            {t.footer.license} <span className="text-slate-300 font-semibold">{t.footer.licenseName}</span>.
          </p>
          <p className="text-slate-600 text-sm w-full">
            © {new Date().getFullYear()} mromasze. {t.footer.built}
          </p>
        </div>
      </footer>
    </div>
  );
}
