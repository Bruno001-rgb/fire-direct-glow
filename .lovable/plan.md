

# Fix: busca da vitrine não encontra skin no catálogo

## Problema
A vitrine monta a busca como `"Hand Wraps Desert Shamagh"` ou `"M4A4 Neo-Noir"`, mas os nomes reais no catálogo são `"★ Hand Wraps | Desert Shamagh (Factory New)"` e `"M4A4 | Neo-Noir (Factory New)"`. O filtro faz substring match simples, então falha porque as palavras não são contíguas no nome real.

## Solução
Mudar o `filterSkins` para fazer match por **todas as palavras** individualmente em vez de substring exata. Assim `"hand wraps desert shamagh"` encontra `"★ hand wraps | desert shamagh (factory new)"` porque cada palavra existe no nome.

## Mudança

**`src/hooks/useByMykelSkins.ts`** — na função `filterSkins`, trocar o bloco de search (linhas 87-90):

```tsx
// De:
if (search) {
  const q = search.toLowerCase();
  filtered = filtered.filter((s) => s.name.toLowerCase().includes(q));
}

// Para:
if (search) {
  const words = search.toLowerCase().split(/\s+/).filter(Boolean);
  filtered = filtered.filter((s) => {
    const name = s.name.toLowerCase();
    return words.every((w) => name.includes(w));
  });
}
```

Cada palavra da busca precisa existir no nome da skin, em qualquer ordem. Isso resolve tanto `"Hand Wraps Desert Shamagh"` quanto `"M4A4 Neo-Noir"` e mantém a busca normal do catálogo funcionando.

