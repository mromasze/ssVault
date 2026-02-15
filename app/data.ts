export const translations = {
  pl: {
    nav: {
      features: "Funkcje",
      changelog: "Zmiany",
      download: "Pobierz",
      github: "GitHub"
    },
    hero: {
      newVersion: "Nowa wersja v0.1.3 już dostępna",
      ssMeaning: "Simple. Secure.",
      titleLine1: "Twoje dane.",
      titleLine2: "Bezpieczne i uporządkowane.",
      description: "ssVault to lekkie narzędzie open-source do szyfrowania danych. Stworzone z myślą o dostępności dla każdego, prywatności i szybkości działania.",
      downloadBtn: "Pobierz dla",
      otherVersions: "Inne wersje",
      featuresBtn: "Zobacz funkcje"
    },
    download: {
      title: "Pobierz ssVault",
      subtitle: "Wybierz wersję odpowiednią dla Twojego systemu operacyjnego.",
      windows: "Windows",
      mac: "macOS",
      linux: "Linux",
      requirements: "Wymagania systemowe",
      downloadNow: "Pobierz",
      checksum: "Suma kontrolna SHA-256"
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
      title: "Historia zmian",
      viewAll: "Zobacz pełną historię zmian",
      stable: "Stabilna"
    },
    footer: {
      license: "Projekt udostępniany na licencji",
      licenseName: "MIT License",
      usage: "Możesz go używać za darmo, komercyjnie i prywatnie.",
      built: "Zbudowano w oparciu o Next.js & Tailwind.",
      portfolio: "Stworzone przez mromasze"
    },
    logs: [
      { 
        version: "v0.1.3", 
        date: "2026-02-15", 
        isStable: true,
        changes: [
          "Poprawki w linkach do pobierania", 
          "Drobne usprawnienia stabilności", 
        ] 
      },
      { 
        version: "v0.1.2", 
        date: "2026-02-15", 
        changes: [
          "Poprawki bezpieczeństwa w module szyfrowania", 
          "Zwiększona wydajność przy dużej liczbie plików", 
          "Nowy, odświeżony interfejs użytkownika"
        ] 
      },
      { 
        version: "v0.1.1", 
        date: "2026-01-09", 
        changes: [
          "Dodano kolumnę 'Data dodania' w tabelach", 
          "Optymalizacja bazy danych (usunięcie zbędnych kolumn)", 
          "Dodano menu Ustawienia z zakładką 'O programie'", 
          "Przejście na biblioteki offline (Bootstrap, Tailwind)", 
          "Poprawki interfejsu i drobne błędy"
        ] 
      },
      { 
        version: "v0.1.0", 
        date: "2025-11-29", 
        changes: [
          "Pierwsze stabilne, publiczne wydanie", 
          "Pełne szyfrowanie plików i haseł", 
          "Pełna obsługa kluczy kryptofraficznych GPG"
        ] 
      },
      { 
        version: "v0.0.1", 
        date: "2025-10-30", 
        changes: [
          "Pierwsza działająca kompilacja", 
          "Częściowa funkcjonalność", 
          "Brak obsługi kluczy GPG"
        ] 
      },
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
      newVersion: "New version v0.1.3 is now available",
      ssMeaning: "Simple. Secure.",
      titleLine1: "Your data.",
      titleLine2: "Secure and organized.",
      description: "ssVault is a lightweight open-source data encryption tool. Built with accessibility, privacy, and speed in mind.",
      downloadBtn: "Download for",
      otherVersions: "Other versions",
      featuresBtn: "View Features"
    },
    download: {
      title: "Download ssVault",
      subtitle: "Choose the version appropriate for your operating system.",
      windows: "Windows",
      mac: "macOS",
      linux: "Linux",
      requirements: "System Requirements",
      downloadNow: "Download",
      checksum: "SHA-256 Checksum"
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
      title: "Changelog",
      viewAll: "View full changelog",
      stable: "Stable"
    },
    footer: {
      license: "Project released under the",
      licenseName: "MIT License",
      usage: "Free for commercial and private use.",
      built: "Built with Next.js & Tailwind.",
      portfolio: "Created by mromasze"
    },
    logs: [
      { 
        version: "v0.1.3", 
        date: "2026-02-15", 
        isStable: true,
        changes: [
          "Fixed download links", 
          "Minor stability improvements", 
        ] 
      },
      { 
        version: "v0.1.2", 
        date: "2026-02-15", 
        changes: [
          "Security fixes in encryption module", 
          "Performance improvements for large file sets", 
          "Refreshed and modernized UI"
        ] 
      },
      { 
        version: "v0.1.1", 
        date: "2026-01-09", 
        changes: [
          "Added 'Added Date' column to tables", 
          "Database optimization (removed redundant columns)", 
          "Added Settings menu with 'About' tab", 
          "Switched to offline libraries (Bootstrap, Tailwind)", 
          "UI improvements and minor bug fixes"
        ] 
      },
      { 
        version: "v0.1.0", 
        date: "2025-11-29", 
        changes: [
          "First stable public release", 
          "Full file and password encryption", 
          "Full GPG key support"
        ] 
      },
      { 
        version: "v0.0.1", 
        date: "2025-10-30", 
        changes: [
          "First working build", 
          "Partial functionality", 
          "No GPG key support"
        ] 
      },
    ]
  }
};
