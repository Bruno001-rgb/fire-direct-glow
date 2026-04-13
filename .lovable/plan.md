

# Clicar na skin da vitrine → abrir catálogo com a skin

## Problema
Atualmente, clicar em qualquer skin na vitrine (seção "SKINS DE TODOS OS PREÇOS") navega para `/catalogo` sem filtro. O usuário precisa procurar a skin manualmente.

## Solução
Alterar o link do `SkinCard` em `CategoriesSection.tsx` para incluir o nome da skin como parâmetro de busca: `/catalogo?search=Nome+da+Skin`.

O catálogo já lê `searchParams.get("search")` e inicializa o filtro — então basta passar o nome correto.

## Mudança

**`src/components/CategoriesSection.tsx`** — No componente `SkinCard`, mudar o `href` de `/catalogo` para incluir o nome completo (weapon + pattern):

```tsx
// De:
href="/catalogo"

// Para:
href={`/catalogo?search=${encodeURIComponent(item.name + (item.skin ? " " + item.skin : ""))}`}
```

Isso garante que ao clicar em "Hand Wraps Desert Shamagh" ou "M4A4 Neo-Noir", o catálogo abre já filtrado para essa skin específica.

