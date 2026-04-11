

# Slide lateral nos depoimentos mobile

Trocar a transição de fade (via `key` + `transition-opacity`) por um slide lateral usando `overflow-hidden` + `translateX` animado com `useState` para direção.

## Alterações em `src/components/TestimonialsSection.tsx`

1. **Adicionar state `slideDirection`** (`'left' | 'right'`) para controlar a direção do slide
2. **No `useEffect` do interval**: setar `slideDirection = 'left'` antes de avançar o índice
3. **No click dos dots**: setar direção baseado em `i > currentIndex ? 'left' : 'right'`
4. **Container mobile**: adicionar `overflow-hidden` no wrapper
5. **Card**: trocar `transition-opacity duration-700` por classes de animação CSS inline com `translateX`. Usar `key={currentIndex}` para re-montar com animação de entrada:
   - Entrada: `animate-[slide-in-left_0.4s_ease-out]` ou `slide-in-right` dependendo da direção
6. **Adicionar keyframes** em `tailwind.config.ts`:
   - `slide-in-left`: `from { transform: translateX(-100%); opacity: 0 } to { transform: translateX(0); opacity: 1 }`
   - `slide-in-right`: `from { transform: translateX(100%); opacity: 0 } to { transform: translateX(0); opacity: 1 }`

| Arquivo | Ação |
|---------|------|
| `src/components/TestimonialsSection.tsx` | Slide lateral com direção dinâmica |
| `tailwind.config.ts` | Adicionar keyframes slide-in-left/right |

