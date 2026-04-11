

# Testimonials mobile — um card por vez a cada 8 segundos

No mobile (viewport < 640px), trocar o scroll contínuo CSS por um carrossel controlado via React state que mostra um card centralizado por vez, avançando automaticamente a cada 8 segundos com transição suave.

## Alterações

### 1. `src/components/TestimonialsSection.tsx`

- Adicionar state `currentIndex` com `useState(0)` e `useEffect` com `setInterval` de 8s que avança o índice (cicla pelos testimonials originais, não os duplicados)
- Usar o hook `useIsMobile` existente para alternar entre os dois modos
- **Mobile**: renderizar apenas `testimonials[currentIndex]` centralizado no container, com `transition-opacity` ou `transition-transform` para fade/slide suave entre cards. Card ocupa ~85% da largura da tela. Sem duplicação de items.
- **Desktop**: manter o comportamento atual (scroll contínuo CSS com `testimonials-track`)
- Remover edge fades no mobile (desnecessários com card único)

### 2. `src/index.css`
- Nenhuma alteração necessária — o CSS existente continua para desktop

| Arquivo | Ação |
|---------|------|
| `src/components/TestimonialsSection.tsx` | Carrossel mobile 1-por-1 com auto-advance 8s |

