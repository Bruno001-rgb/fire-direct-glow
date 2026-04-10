

## Etapa 17 — Seção de confiança (TrustSection)

### What changes

1. **New `src/components/Placeholder.tsx`** — Inline placeholder component for dynamic values (renders an orange-tinted span with the label text)

2. **New `src/components/TrustSection.tsx`** — Trust-building section with:
   - Dark section background, gradient separator lines top/bottom
   - "Segurança primeiro" label badge (matching HeroSection style)
   - Heading: "Por que confiar na **FireSkins**?"
   - Subtitle addressing scam fears directly
   - 4-card responsive grid (1→2→4 cols) with ShieldCheck, MessageCircle, Clock, Users icons
   - Card styling: `bg-card/60 border border-primary/10 rounded-xl p-6 hover:border-primary/25 transition-colors`
   - Steam profile card links to `#` with pending note

3. **`src/pages/Index.tsx`** — Import TrustSection, place between `<CategoriesSection />` and `<VideoShowcase />`

### Technical details

- Placeholder component: `<span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded text-xs font-mono">{label}</span>`
- Separator pattern: `<div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />` (consistent with existing sections)
- No data fetching, no state — purely presentational
- 3 files touched total (2 new, 1 edit)

