# Secure Vault App

Aplikacja desktopowa do bezpiecznego przechowywania plików z szyfrowaniem i profilami użytkowników.

## Wymagania
- Node.js (LTS)
- Electron

## Uruchomienie

### Windows / macOS
1. Zainstaluj zależności: `npm install`
2. Uruchom aplikację: `npm start`

### Linux
Jeśli aplikacja wymaga dodatkowych bibliotek lokalnych (np. w katalogu `./lib`), uruchom ją poleceniem:
```bash
LD_LIBRARY_PATH=./lib npm start
```

W przypadku problemów z biblioteką SQLCipher, upewnij się, że masz zainstalowane odpowiednie pakiety w systemie (np. dla Ubuntu/Debian):
```bash
sudo apt-get install libsqlcipher0 build-essential
```

## Budowanie aplikacji
Aby zbudować wersję produkcyjną (pliki wykonywalne):
```bash
npm run package
```
Lub aby stworzyć instalatory:
```bash
npm run make
```

[![Build](https://github.com/Amazir/ssVault/actions/workflows/node.js.yml/badge.svg)](https://github.com/Amazir/ssVault/actions/workflows/node.js.yml)
