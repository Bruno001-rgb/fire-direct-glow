

## Plano: Suavizar todos os CTAs do site

### Problema atual
A variante `fire` do botão usa gradiente agressivo, `brightness-110` no hover, e sombras fortes (`shadow-[0_4px_20px...]`). Além disso, cada componente adiciona overrides inconsistentes (uns com `rounded-sm`, outros com `rounded-xl`, sombras extras, `hover:scale-105`, etc.).

### Mudanças

**1. `src/components/ui/button.tsx` — Variante `fire` suavizada**
- Gradiente sutil: `from-[#E95A0C] to-[#C94A08]` (laranja → laranja escuro, sem secondary)
- Bordas arredondadas: `rounded-xl` 
- Sombra difusa: `shadow-lg shadow-primary/15` (sem glow forte)
- Hover suave: `hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]`
- Remover `hover:brightness-110`
- Transição: `transition-all duration-300 ease-out`

**2. Limpar overrides inconsistentes em cada componente:**

| Arquivo | O que remover/ajustar |
|---------|----------------------|
| `Header.tsx` | Remover `rounded-sm` (herda `rounded-xl` da variante) |
| `HeroSection.tsx` | Remover `rounded-sm` |
| `FinalCTA.tsx` | Remover `rounded-sm`, remover `shadow-[0_0_25px...]` e `hover:shadow-[0_0_40px...]` |
| `CategoriesSection.tsx` | Remover `shadow-[0_0_40px...]`, `hover:shadow-[0_0_60px...]`, `hover:scale-105` (agora `scale-[1.02]` vem da variante) |
| `VideoShowcase.tsx` | Remover `rounded-sm` |
| `SkinDetailModal.tsx` | Manter `w-full h-12` |
| `TryInGameModal.tsx` | Manter `w-full h-12` |
| `LoadoutSummary.tsx` | Sem mudança extra |
| `Loadout.tsx` | Sem mudança extra |
| `Catalogo.tsx` | Sem mudança extra |

**3. Variante `fire-outline` — Também suavizar:**
- Bordas: `rounded-xl border-primary/20`
- Hover mais suave: `hover:bg-primary/5`

### Resultado
Todos os CTAs do site ficam visualmente consistentes, com bordas arredondadas, sombras suaves, hover com micro-scale, sem brilhos exagerados.

