

# Etapa 6 — Traduzir 404 e integrar StatsBar no Header

## Abordagem

Usar a alternativa mais simples: integrar o conteúdo do StatsBar diretamente dentro do Header (como barra superior acima da nav), eliminando o componente separado e evitando complexidade de z-index duplo.

## Mudanças

### 1. `src/pages/NotFound.tsx`
- "Oops! Page not found" → "Página não encontrada"
- "Return to Home" → "Voltar para o início"

### 2. `src/components/Header.tsx`
- Importar os ícones do StatsBar (Tag, Users, Clock, ShieldCheck)
- Adicionar a stats bar como primeira seção dentro do `<header>`, acima do container da nav
- Manter o mesmo markup/estilo do StatsBar atual
- Ajustar mobile menu `top` de `top-14` para `top-[5.5rem]` (h-8 stats + h-14 nav)

### 3. `src/pages/Index.tsx`
- Remover import e uso de `<StatsBar />`
- Atualizar padding-top de `pt-14 sm:pt-16` para `pt-[5.5rem] sm:pt-24` para compensar a altura extra

### 4. `src/components/StatsBar.tsx`
- Pode ser deletado (ou mantido sem uso). Preferência: deletar.

### Detalhes técnicos

O Header ficará com esta estrutura:
```
<header fixed top-0 z-50>
  <div> <!-- stats bar, h-8 --> </div>
  <div> <!-- nav bar, h-14/h-16 --> </div>
</header>
```

O mobile overlay e hamburger menu ajustam `top` para `top-[5.5rem] sm:top-24`.

