'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, ArrowRight, Github, Globe, Menu, X, ExternalLink, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { translations } from '../data';

import Loading from '../components/Loading';

export default function ChangelogPage() {
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
              ssVault
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-emerald-400 transition-colors">{t.nav.features}</Link>
            <Link href="/changelog" className="text-sm font-medium text-emerald-400 transition-colors">{t.nav.changelog}</Link>
            <button onClick={toggleLang} className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>
            <a href="https://github.com/mromasze/ssVault" target="_blank" rel="noreferrer"
               className="flex items-center gap-2 text-sm font-medium text-black bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-lg transition-all hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <Github size={18} />
              {t.nav.github}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="text-sm font-bold text-slate-400">
              {lang.toUpperCase()}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white p-2">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-black p-4 flex flex-col gap-4">
            <Link href="/#features" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-medium">{t.nav.features}</Link>
            <Link href="/changelog" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-medium text-emerald-400">{t.nav.changelog}</Link>
            <a href="https://github.com/mromasze/ssVault" target="_blank" rel="noreferrer" className="flex items-center gap-2 py-2 text-lg font-medium text-emerald-400">
              <Github size={20} /> GitHub
            </a>
          </div>
        )}
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-12">
            <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6 group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center gap-4">
                <Terminal className="text-emerald-500" size={40} />
                {t.changelog.title}
            </h1>
            <p className="text-slate-400 text-lg">
                Full history of changes and updates to ssVault.
            </p>
        </div>

        <div className="relative border-l border-white/10 ml-4 space-y-16">
            {t.logs.map((log, index) => (
              <div key={index} className="relative pl-8 group">
                {/* Timeline dot */}
                <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border border-black ${log.isStable ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-600'}`}></div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4">
                  <h2 className="text-2xl font-bold text-white font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
                    {log.version}
                  </h2>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                        {log.date}
                    </span>
                    {log.isStable && (
                        <span className="text-xs font-bold text-black bg-emerald-500 px-2 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                            STABLE
                        </span>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-3 bg-white/5 p-6 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                  {log.changes.map((change, i) => (
                    <li key={i} className="text-slate-300 flex items-start gap-3">
                      <ArrowRight size={16} className="mt-1 text-emerald-500/50 shrink-0" />
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-12 text-center mt-20">
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
