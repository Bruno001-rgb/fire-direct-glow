

# Adicionar banner FireSkins no topo do Footer

Copiar a primeira imagem (banner com os dois caras e logo FireSkins) para o projeto e exibi-la como banner full-width no topo do footer, acima do "Ir ao topo".

## Alterações

### 1. Copiar imagem para `src/assets/footer-banner.jpg`
Copiar `user-uploads://bddddf84-2e02-4f85-a5ad-61911b214515.jpg` para o projeto.

### 2. Editar `src/components/Footer.tsx`
- Importar a imagem: `import footerBanner from "@/assets/footer-banner.jpg"`
- Adicionar um `<img>` full-width antes do botão "Ir ao topo", com `w-full object-cover` e altura limitada (ex: `max-h-[200px] sm:max-h-[280px]`)

| Arquivo | Ação |
|---------|------|
| `src/assets/footer-banner.jpg` | Copiar imagem |
| `src/components/Footer.tsx` | Adicionar banner no topo |

