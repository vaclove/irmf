# Systém správy hostů

Kompletní systém pro správu hostů, ročníků akcí a odesílání pozvánek.

## Funkcionalita

- **Správa hostů**: Přidávání, zobrazování a vyhledávání hostů s kontaktními informacemi
- **Správa ročníků**: Vytváření a správa ročníků akcí
- **Odesílání pozvánek**: Přiřazování hostů k ročníkům a odesílání pozvánek
- **Čestký interface**: Kompletně přeloženo do češtiny

## Technologie

- **Next.js 14** s App Router
- **TypeScript** pro type safety
- **Tailwind CSS** pro styling
- **shadcn/ui** pro komponenty
- **Lucide Icons** pro ikony

## Nastavení

1. **Naklonujte repozitář a nainstalujte závislosti:**
   ```bash
   npm install
   ```

2. **Nastavte environment variables:**
   
   Zkopírujte `.env.example` do `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   
   Upravte `.env.local` podle vašich potřeb:
   ```env
   # Pro lokální vývoj
   NEXT_PUBLIC_BACKEND_API=http://localhost:3000
   BACKEND_API=http://localhost:3000
   
   # Pro produkci
   NEXT_PUBLIC_BACKEND_API=https://your-api-domain.com
   BACKEND_API=https://your-api-domain.com
   ```

3. **Spusťte aplikaci:**
   ```bash
   npm run dev
   ```

## API Konfigurace

Aplikace automaticky používá správnou API URL na základě environment variables:

- **`NEXT_PUBLIC_BACKEND_API`**: Používá se pro client-side API volání
- **`BACKEND_API`**: Používá se pro server-side API volání

Pokud nejsou nastaveny, aplikace použije současnou doménu jako fallback.

## Struktura API

### Endpoints

- **GET /api/guests** - Načte všechny hosty
- **POST /api/guests** - Vytvoří nového hosta
- **GET /api/editions** - Načte všechny ročníky
- **POST /api/editions** - Vytvoří nový ročník
- **POST /api/invitations/assign** - Pošle pozvánku hostovi
- **GET /api/invitations/confirm/[guestId]/[editionId]** - Potvrdí pozvánku

### Ukázková data

Aplikace obsahuje ukázková data českých hostů:
- Jan Novák (Tech Solutions s.r.o.)
- Marie Svobodová (Business Consulting a.s.)
- Petr Dvořák (Inovační startup s.r.o.)
- Anna Procházková (Digital Marketing Praha)

## Nasazení

Pro nasazení do produkce:

1. Nastavte produkční environment variables
2. Ujistěte se, že `NEXT_PUBLIC_BACKEND_API` odkazuje na váš backend API
3. Buildněte aplikaci: `npm run build`
4. Spusťte: `npm start`

## Vývoj

Pro přidání nových funkcí:

1. API endpointy přidejte do `app/api/`
2. Komponenty vytvořte v `app/` nebo `components/`
3. Použijte `apiRequest` helper z `lib/api-config.ts` pro API volání
4. Dodržujte české překlady pro UI elementy