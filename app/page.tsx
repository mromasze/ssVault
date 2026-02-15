'use client';

import React, { useState, useEffect } from 'react';
import { Download, Shield, Zap, Terminal, ArrowRight, Github, Globe, Menu, X, ExternalLink, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { translations } from './data';

import Loading from './components/Loading';

// --- Components ---

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: string }) {
  return (
    <div className={`p-6 rounded-none border border-white/10 bg-black hover:border-emerald-500/50 transition-all duration-300 group reveal ${delay}`}>
      <div className="mb-4 p-3 bg-white/5 w-fit rounded-none group-hover:text-emerald-400 text-slate-400 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 font-mono group-hover:text-emerald-400 transition-colors tracking-tight">{title}</h3>
      <p className="text-slate-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

// --- Main Page ---

export default function Home() {
  const [lang, setLang] = useState<'pl' | 'en'>('en'); // Default to EN initially to avoid hydration mismatch
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [os, setOs] = useState<'Windows' | 'macOS' | 'Linux' | 'Unknown'>('Unknown');

  // Language & Init Effect
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const savedLang = localStorage.getItem('ssvault-lang');
    if (savedLang === 'pl' || savedLang === 'en') {
      setLang(savedLang);
    } else {
      const sysLang = navigator.language.startsWith('pl') ? 'pl' : 'en';
      setLang(sysLang);
    }

    // OS Detection
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf('Win') !== -1) setOs('Windows');
    else if (userAgent.indexOf('Mac') !== -1) setOs('macOS');
    else if (userAgent.indexOf('Linux') !== -1) setOs('Linux');
  }, []);

  // Scroll Observer for animations
  useEffect(() => {
    if (!mounted) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [mounted]);

  const toggleLang = () => {
    const newLang = lang === 'pl' ? 'en' : 'pl';
    setLang(newLang);
    localStorage.setItem('ssvault-lang', newLang);
  };

  const getDownloadLink = () => {
    switch(os) {
        case 'Windows': return 'https://github.com/mromasze/ssVault/releases/latest/download/ssVault-0.1.3.Setup.exe';
        case 'macOS': return 'https://github.com/mromasze/ssVault/releases/latest/download/ssVault-darwin-arm64-0.1.3.zip';
        case 'Linux': return 'https://github.com/mromasze/ssVault/releases/latest'; // Direct to releases for choice
        default: return '/download';
    }
  };

  const t = translations[lang];
  // Slice to show only first 3 logs
  const recentLogs = t.logs.slice(0, 3);
  const logoPath = "/ssVault/logo-full.svg";

  // Prevent hydration mismatch by rendering a loader or simple view until mounted
  if (!mounted) return <Loading />;

  return (
    <div className="min-h-screen bg-black text-slate-200 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="border-b border-white/10 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="font-bold text-3xl text-white tracking-tighter pt-1 hover:text-emerald-400 transition-colors cursor-default">
              ssVault<span className="text-emerald-500">.</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 animate-fade-in delay-100">
            <a href="#features" className="text-sm font-medium hover:text-emerald-400 transition-colors uppercase tracking-widest">{t.nav.features}</a>
            <a href="#changelog" className="text-sm font-medium hover:text-emerald-400 transition-colors uppercase tracking-widest">{t.nav.changelog}</a>
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
          <div className="md:hidden border-t border-white/10 bg-black p-6 flex flex-col gap-6 animate-fade-in-up">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block text-xl font-mono hover:text-emerald-400">{t.nav.features}</a>
            <a href="#changelog" onClick={() => setIsMenuOpen(false)} className="block text-xl font-mono hover:text-emerald-400">{t.nav.changelog}</a>
            <a href="https://github.com/mromasze/ssVault" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xl font-mono text-emerald-400">
              <Github size={20} /> GitHub
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 text-center relative border-b border-white/5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/20 via-black to-black">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10 py-10">
          
          <div className="mb-2 animate-float relative group flex flex-col items-center">
             <Image
              src={logoPath}
              alt="ssVault Main Logo"
              width={350}
              height={350}
              className="h-56 w-auto object-contain drop-shadow-2xl"
              priority
            />
             <div className="mt-4 text-emerald-500 font-mono text-lg font-bold tracking-[0.2em] uppercase">
                {t.hero.ssMeaning}
             </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter animate-fade-in-up delay-100 leading-tight">
            {t.hero.titleLine1}<br />
            <span className="text-slate-500">
              {t.hero.titleLine2}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-0 items-center animate-fade-in-up delay-300 w-full sm:w-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
            <a href={getDownloadLink()}
               className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-black text-lg font-bold flex items-center justify-center gap-3 transition-colors uppercase tracking-wide rounded-l-sm border-r border-black/20">
              <Download size={20} />
              {t.hero.downloadBtn} {os !== 'Unknown' ? os : 'ssVault'}
            </a>
            <Link href="/download" className="w-full sm:w-auto px-4 py-4 bg-emerald-600 hover:bg-emerald-500 text-black hover:text-black font-bold flex items-center justify-center transition-colors rounded-r-sm" title={t.hero.otherVersions}>
               <ChevronRight size={28} />
            </Link>
          </div>
          <div className="mt-2 text-slate-500 text-xs font-mono uppercase tracking-widest animate-fade-in-up delay-500">
             {t.hero.otherVersions}
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-32 bg-black relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-20 text-center reveal tracking-tighter flex items-center justify-center gap-4">
            <span className="text-emerald-500 font-mono">01.</span> {t.features.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            <FeatureCard
              delay="delay-100"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h4"/></svg>}
              title={t.features.minimalism.title}
              desc={t.features.minimalism.desc}
            />
            <FeatureCard
              delay="delay-200"
              icon={<Shield />}
              title={t.features.privacy.title}
              desc={t.features.privacy.desc}
            />
            <FeatureCard
              delay="delay-300"
              icon={<Zap />}
              title={t.features.speed.title}
              desc={t.features.speed.desc}
            />
            <FeatureCard
              delay="delay-100"
              icon={<Terminal />}
              title={t.features.opensource.title}
              desc={t.features.opensource.desc}
            />
            <FeatureCard
              delay="delay-200"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>}
              title={t.features.encryption.title}
              desc={t.features.encryption.desc}
            />
            <FeatureCard
              delay="delay-300"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12.5 15.5h-5"/><path d="M12.5 12.5h-5"/><path d="m9 9.5-2.5 2.5 2.5 2.5"/></svg>}
              title={t.features.versatility.title}
              desc={t.features.versatility.desc}
            />
          </div>
        </div>
      </section>

      {/* Changelog Section */}
      <section id="changelog" className="py-32 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter flex items-center gap-4">
                <span className="text-emerald-500 font-mono">02.</span> {t.changelog.title}
            </h2>
            <Link href="/changelog" className="hidden md:flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-mono text-sm uppercase tracking-wider group">
                {t.changelog.viewAll} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
          </div>
          
          <div className="border-l border-white/10 ml-4 space-y-12 reveal delay-200">
            {recentLogs.map((log, index) => (
              <div key={index} className="relative pl-10 group">
                <div className={`absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full border border-black ${log.isStable ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-700'}`}></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                  <h3 className="text-2xl font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">{log.version}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500 font-mono">{log.date}</span>
                    {log.isStable && (
                        <span className="text-[10px] font-bold text-black bg-emerald-500 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.3)] uppercase tracking-wider">
                            {t.changelog.stable}
                        </span>
                    )}
                  </div>
                </div>
                <ul className="space-y-2">
                  {log.changes.map((change, i) => (
                    <li key={i} className="text-slate-400 flex items-start gap-3 text-lg leading-relaxed">
                      <ChevronRight size={16} className="mt-1.5 text-emerald-500/50 shrink-0" />
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 md:hidden text-center">
             <Link href="/changelog" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 font-mono text-sm uppercase tracking-wider">
                {t.changelog.viewAll} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black py-16 text-center reveal">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-8">
          <div className="flex items-center gap-2 text-3xl font-bold text-white tracking-tighter">
             ssVault<span className="text-emerald-500">.</span>
          </div>
          <p className="text-slate-500 max-w-md">
            {t.footer.license} <span className="text-slate-300 font-semibold">{t.footer.licenseName}</span>.
            <br />{t.footer.usage}
          </p>
          
          <div className="flex gap-8 mt-2">
             <a href="https://github.com/mromasze" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 font-mono text-sm uppercase tracking-wide">
                <Globe size={14} />
                {t.footer.portfolio} <ExternalLink size={12} />
             </a>
             <a href="https://github.com/mromasze/ssVault" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors font-mono text-sm uppercase tracking-wide">
                GitHub
             </a>
          </div>

          <p className="text-slate-700 text-sm mt-8 border-t border-white/5 pt-8 w-full font-mono">
            © {new Date().getFullYear()} mromasze. {t.footer.built}
          </p>
        </div>
      </footer>
    </div>
  );
}
