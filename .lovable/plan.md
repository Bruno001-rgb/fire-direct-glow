

# Melhorar legibilidade — textos maiores e mais visíveis

O site tem muitos textos com tamanhos minúsculos (`text-[8px]`, `text-[9px]`, `text-[10px]`) e cor `text-muted-foreground` (cinza ~50% de opacidade no tema escuro), que ficam difíceis de ler especialmente no mobile. Vamos aumentar os tamanhos mínimos e melhorar o contraste.

## Regra geral aplicada
- Nenhum texto abaixo de `text-xs` (12px) no mobile
- Textos informativos: trocar `text-muted-foreground` por `text-foreground/70` (mais claro, mais legível)
- Textos de destaque menores: subir 1 step de tamanho

## Alterações por arquivo

### 1. `src/index.css`
- Alterar `--muted-foreground` de `225 10% 50%` para `225 10% 62%` — aumenta contraste global de todos os textos muted

### 2. `src/components/StatsBar.tsx`
- Labels: `text-xs` → `text-sm` no mobile

### 3. `src/components/Header.tsx`
- Nav desktop: `text-[11px]` → `text-xs`
- Nav mobile: `text-sm` está ok, manter

### 4. `src/components/HeroSection.tsx`
- Label badge: `text-[9px]` → `text-xs`
- Trust items: `text-[10px] sm:text-[11px]` → `text-xs sm:text-sm`
- Subtitle: `text-sm` → `text-base` no mobile

### 5. `src/components/CategoriesSection.tsx`
- Subtitle: `text-xs sm:text-sm` → `text-sm`
- Skin card nome: `text-xs sm:text-sm` → `text-sm`
- Skin card skin name: `text-[10px] sm:text-xs` → `text-xs sm:text-sm`
- Rarity: `text-[8px] sm:text-[9px]` → `text-[10px] sm:text-xs`

### 6. `src/components/VideoShowcase.tsx`
- Label badge: `text-[10px] sm:text-[11px]` → `text-xs`
- Card header label: `text-[10px] sm:text-xs` → `text-xs sm:text-sm`
- Trust line: `text-[10px] sm:text-[11px]` → `text-xs sm:text-sm`
- Card footer: `text-[9px] sm:text-[10px]` → `text-xs`
- HUD "REC" e "00:00": `text-[8px]` → `text-[10px]`

### 7. `src/components/TestimonialsSection.tsx`
- Subtitle: `text-xs sm:text-sm` → `text-sm`
- Card title: `text-[10px] sm:text-xs` → `text-xs sm:text-sm`

### 8. `src/components/FinalCTA.tsx`
- Rifas paragraph: `text-sm` → `text-base`, cor `text-foreground/70` em vez de `text-muted-foreground`

### 9. `src/components/Footer.tsx`
- Copyright: `text-[10px] sm:text-[11px]` → `text-xs`
- BlackBot / Privacidade / Termos: `text-[10px] sm:text-[11px]` → `text-xs`

| Arquivo | Ação |
|---------|------|
| `src/index.css` | Aumentar luminosidade de muted-foreground |
| `src/components/StatsBar.tsx` | Bump tamanho labels |
| `src/components/Header.tsx` | Bump nav links |
| `src/components/HeroSection.tsx` | Bump label, trust items, subtitle |
| `src/components/CategoriesSection.tsx` | Bump textos dos cards e subtitle |
| `src/components/VideoShowcase.tsx` | Bump label, trust, card header/footer |
| `src/components/TestimonialsSection.tsx` | Bump subtitle e card title |
| `src/components/FinalCTA.tsx` | Bump rifas paragraph |
| `src/components/Footer.tsx` | Bump copyright e links |

