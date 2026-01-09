'use client';

import React, { useState, useEffect } from 'react';
import { Download, Shield, Zap, Terminal, ArrowRight, Github, Globe, Menu, X, ExternalLink } from 'lucide-react';
import Image from 'next/image';

// --- Translations ---
const translations = {
  pl: {
    nav: {
      features: "Funkcje",
      changelog: "Zmiany",
      download: "Pobierz",
      github: "GitHub"
    },
    hero: {
      newVersion: "Nowa wersja v0.1.1 już dostępna",
      titleLine1: "Twoje dane.",
      titleLine2: "Bezpieczne i uporządkowane.",
      description: "ssVault to lekkie narzędzie open-source do szyfrowania danych. Stworzone z myślą o dostępności dla każdego, prywatności i szybkości działania.",
      downloadBtn: "Pobierz ssVault",
      featuresBtn: "Zobacz funkcje"
    },
    features: {
      title: "Dlaczego ssVault?",
      minimalism: { title: "Minimalistyczność", desc: "Prosty i intuicyjny interfejs, który pozwala skupić się na tym, co najważniejsze - bezpieczeństwie Twoich danych." },
      privacy: { title: "Prywatność", desc: "Twoje dane nie opuszczają urządzenia bez Twojej zgody. Pełna kontrola nad lokalizacją zapisu." },
      speed: { title: "Błyskawiczne działanie", desc: "Napisany w wydajnych technologiach, ssVault uruchamia się w ułamku sekundy i nie obciąża systemu." },
      opensource: { title: "Open source", desc: "Pełna przejrzystość kodu. Możesz audytować, modyfikować i ulepszać ssVault razem z nami." },
      encryption: { title: "Zaawansowane szyfrowanie", desc: "Wykorzystanie standardu OpenPGP gwarantuje najwyższy poziom bezpieczeństwa dla Twoich danych." },
      versatility: { title: "Wszechstronność użycia", desc: "Szyfruj całe pliki lub przechowuj bezpiecznie swoje hasła i notatki w jednym miejscu." }
    },
    changelog: {
      title: "Historia zmian"
    },
    footer: {
      license: "Projekt udostępniany na licencji",
      licenseName: "MIT License",
      usage: "Możesz go używać za darmo, komercyjnie i prywatnie.",
      built: "Zbudowano w oparciu o Next.js & Tailwind.",
      portfolio: "Stworzone przez mromasze"
    },
    logs: [
      { version: "v0.1.1", date: "2026-01-09", changes: ["Dodano kolumnę 'Data dodania' w tabelach", "Optymalizacja bazy danych (usunięcie zbędnych kolumn)", "Dodano menu Ustawienia z zakładką 'O programie'", "Przejście na biblioteki offline (Bootstrap, Tailwind)", "Poprawki interfejsu i drobne błędy"] },
      { version: "v0.1.0", date: "2025-11-29", changes: ["Pierwsze stabilne, publiczne wydanie", "Pełne szyfrowanie plików i haseł", "Pełna obsługa kluczy kryptofraficznych GPG"] },
      { version: "v0.0.1", date: "2025-10-30", changes: ["Pierwsza działająca kompilacja", "Częściowa funkcjonalność", "Brak obsługi kluczy GPG"] },
    ]
  },
  en: {
    nav: {
      features: "Features",
      changelog: "Changelog",
      download: "Download",
      github: "GitHub"
    },
    hero: {
      newVersion: "New version v0.1.1 is now available",
      titleLine1: "Your data.",
      titleLine2: "Secure and organized.",
      description: "ssVault is a lightweight open-source data encryption tool. Built with accessibility, privacy, and speed in mind.",
      downloadBtn: "Download ssVault",
      featuresBtn: "View Features"
    },
    features: {
      title: "Why ssVault?",
      minimalism: { title: "Minimalism", desc: "Simple and intuitive interface that lets you focus on what matters most - your data security." },
      privacy: { title: "Privacy", desc: "Your data never leaves your device without your consent. Full control over storage location." },
      speed: { title: "Blazing Speed", desc: "Written with efficient technologies, ssVault starts in a split second and doesn't burden your system." },
      opensource: { title: "Open Source", desc: "Full code transparency. You can audit, modify, and improve ssVault with us." },
      encryption: { title: "Advanced Encryption", desc: "Using the OpenPGP standard guarantees the highest level of security for your data." },
      versatility: { title: "Versatility", desc: "Encrypt entire files or securely store your passwords and notes in one place." }
    },
    changelog: {
      title: "Changelog"
    },
    footer: {
      license: "Project released under the",
      licenseName: "MIT License",
      usage: "Free for commercial and private use.",
      built: "Built with Next.js & Tailwind.",
      portfolio: "Created by mromasze"
    },
    logs: [
      { version: "v0.1.1", date: "2026-01-09", changes: ["Added 'Added Date' column to tables", "Database optimization (removed redundant columns)", "Added Settings menu with 'About' tab", "Switched to offline libraries (Bootstrap, Tailwind)", "UI improvements and minor bug fixes"] },
      { version: "v0.1.0", date: "2025-11-29", changes: ["First stable public release", "Full file and password encryption", "Full GPG key support"] },
      { version: "v0.0.1", date: "2025-10-30", changes: ["First working build", "Partial functionality", "No GPG key support"] },
    ]
  }
};

// --- Components ---

function FeatureCard({ icon, title, desc, delay }: { icon: React.ReactNode, title: string, desc: string, delay: string }) {
  return (
    <div className={`p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 hover:bg-slate-900 hover:-translate-y-1 group reveal ${delay}`}>
      <div className="mb-4 p-3 bg-slate-950 w-fit rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

// --- Main Page ---

export default function Home() {
  const [lang, setLang] = useState<'pl' | 'en'>('en'); // Default to EN initially to avoid hydration mismatch
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const t = translations[lang];
  const logoPath = "/ssVault/logo-full.svg";

  // Prevent hydration mismatch by rendering a loader or simple view until mounted
  if (!mounted) return <div className="min-h-screen bg-slate-950"></div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3 animate-fade-in">
            <span className="font-bold text-2xl text-white tracking-tight pt-1 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-white">
              ssVault
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6 animate-fade-in delay-100">
            <a href="#features" className="text-sm font-medium hover:text-blue-400 transition-colors">{t.nav.features}</a>
            <a href="#changelog" className="text-sm font-medium hover:text-blue-400 transition-colors">{t.nav.changelog}</a>
            <button onClick={toggleLang} className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>
            <a href="https://github.com/mromasze/ssVault" target="_blank" rel="noreferrer"
               className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-all hover:shadow-lg hover:shadow-blue-500/20">
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
          <div className="md:hidden border-t border-slate-800 bg-slate-950 p-4 flex flex-col gap-4 animate-fade-in-up">
            <a href="#features" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-medium">{t.nav.features}</a>
            <a href="#changelog" onClick={() => setIsMenuOpen(false)} className="block py-2 text-lg font-medium">{t.nav.changelog}</a>
            <a href="https://github.com/mromasze/ssVault" target="_blank" rel="noreferrer" className="flex items-center gap-2 py-2 text-lg font-medium text-blue-400">
              <Github size={20} /> GitHub
            </a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="pt-24 pb-20 px-4 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="mb-10 animate-float drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Image
              src={logoPath}
              alt="ssVault Main Logo"
              width={400}
              height={400}
              className="h-48 w-auto object-contain"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-blue-500/30 text-blue-400 text-sm font-medium mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            {t.hero.newVersion}
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight animate-fade-in-up delay-100">
            {t.hero.titleLine1}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 animate-glow">
              {t.hero.titleLine2}
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            {t.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-fade-in-up delay-300">
            <a href="https://github.com/mromasze/ssVault/releases"
               className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold flex items-center gap-2 transition-all hover:scale-105 shadow-lg shadow-blue-500/25 ring-offset-2 ring-offset-slate-950 focus:ring-2 ring-blue-500">
              <Download size={20} />
              {t.hero.downloadBtn}
            </a>
            <a href="#features" className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 rounded-xl font-semibold transition-all">
              {t.hero.featuresBtn}
            </a>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-950 relative">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10"></div>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center reveal">
            {t.features.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              delay="delay-100"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h4"/></svg>}
              title={t.features.minimalism.title}
              desc={t.features.minimalism.desc}
            />
            <FeatureCard
              delay="delay-200"
              icon={<Shield className="text-emerald-400" />}
              title={t.features.privacy.title}
              desc={t.features.privacy.desc}
            />
            <FeatureCard
              delay="delay-300"
              icon={<Zap className="text-yellow-400" />}
              title={t.features.speed.title}
              desc={t.features.speed.desc}
            />
            <FeatureCard
              delay="delay-100"
              icon={<Terminal className="text-purple-400" />}
              title={t.features.opensource.title}
              desc={t.features.opensource.desc}
            />
            <FeatureCard
              delay="delay-200"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>}
              title={t.features.encryption.title}
              desc={t.features.encryption.desc}
            />
            <FeatureCard
              delay="delay-300"
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12.5 15.5h-5"/><path d="M12.5 12.5h-5"/><path d="m9 9.5-2.5 2.5 2.5 2.5"/></svg>}
              title={t.features.versatility.title}
              desc={t.features.versatility.desc}
            />
          </div>
        </div>
      </section>

      {/* Changelog Section */}
      <section id="changelog" className="py-24 px-4 bg-slate-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 flex items-center gap-3 reveal">
            <Terminal size={32} className="text-blue-500" /> {t.changelog.title}
          </h2>
          <div className="border-l-2 border-slate-800 ml-4 space-y-12 reveal delay-200">
            {t.logs.map((log, index) => (
              <div key={index} className="relative pl-8 group">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-600 group-hover:border-blue-500 group-hover:bg-blue-500/20 transition-colors"></div>
                <div className="flex items-baseline gap-4 mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{log.version}</h3>
                  <span className="text-sm text-slate-500 font-mono bg-slate-900 px-2 py-0.5 rounded">{log.date}</span>
                </div>
                <ul className="space-y-3">
                  {log.changes.map((change, i) => (
                    <li key={i} className="text-slate-400 flex items-start gap-3 hover:text-slate-300 transition-colors">
                      <ArrowRight size={16} className="mt-1 text-blue-500/50 shrink-0" />
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-16 text-center reveal">
        <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-2xl font-bold text-white mb-2">
             ssVault
          </div>
          <p className="text-slate-500 max-w-md">
            {t.footer.license} <span className="text-slate-300 font-semibold">{t.footer.licenseName}</span>.
            <br />{t.footer.usage}
          </p>
          
          <div className="flex gap-6 mt-4">
             <a href="https://github.com/mromasze" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2">
                <Globe size={16} />
                {t.footer.portfolio} <ExternalLink size={12} />
             </a>
             <a href="https://github.com/mromasze/ssVault" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                GitHub
             </a>
          </div>

          <p className="text-slate-600 text-sm mt-8 border-t border-slate-900 pt-8 w-full">
            © {new Date().getFullYear()} mromasze. {t.footer.built}
          </p>
        </div>
      </footer>
    </div>
  );
}
