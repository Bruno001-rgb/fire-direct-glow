

## Plano: Botão "Testar no jogo" + Modal de instruções

### Contexto
O modal de detalhes da skin tem espaço vazio entre as infos e os botões. O usuário quer preencher esse espaço com um botão "Testar no jogo" que abre um modal/drawer com instruções para testar a skin no CS2 via servidor epidemic.gg.

### Dados necessários
A API byMykel fornece `weapon.weapon_id` e `paint_index` para cada skin. Esses dados precisam ser passados junto com cada skin no catálogo para gerar o comando `!g [weapon_id] [paint_index] [seed] [wear]`.

### Arquivos a alterar

**1. `src/hooks/useByMykelSkins.ts`** — Adicionar `paint_index` e `weapon_id` ao tipo `ByMykelSkin`:
```ts
paint_index?: string | null;
weapon_id?: number | null;
```

**2. `src/hooks/useCatalogSkins.ts`** — Extrair `paint_index` e `weapon_id` do lookup da API byMykel e incluí-los no objeto retornado. Expandir o `floatLookup` para armazenar esses campos extras.

**3. `src/components/catalogo/TryInGameModal.tsx`** — Novo componente:
- Drawer/modal com fundo `#0d0d0d`
- 4 passos numerados com círculos laranja
- Caixas de código copiáveis (`#1a1a1a`, fonte mono, botão "Copiar" laranja → "Copiado!" por 2s)
- Comando dinâmico: `!g {weapon_id} {paint_index} 0 {floatValue}`
- Botão rodapé: "Gostou? Falar no WhatsApp"

**4. `src/components/catalogo/SkinDetailModal.tsx`** — Adicionar:
- State `showTryModal`
- Botão "Testar no jogo" com ícone Gamepad2 (lucide), variant `fire-outline`, posicionado entre "Adicionar ao loadout" e o separador
- Renderizar `<TryInGameModal>` quando aberto

### Design do modal de teste
- Fundo escuro `#0d0d0d`, border sutil
- Cada passo: número em círculo laranja (`#E95A0C`) + título + descrição
- Código em `<pre>` com fundo `#1a1a1a`, botão copiar laranja
- Responsivo: drawer no mobile, modal centrado no desktop

