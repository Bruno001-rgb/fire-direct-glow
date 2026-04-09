

# Preencher espaço vazio no modal de detalhes da skin

## Problema
O modal de detalhes da skin tem um grande espaço vazio entre as informações (wear tiers, categoria, arma) e os botões CTA no fundo. Isso acontece porque o layout usa `md:justify-center` e `mt-auto` nos CTAs, empurrando o conteúdo para cima e os botões para baixo.

## Solução
Adicionar 3 novos blocos de conteúdo ao modal, preenchendo o espaço de forma útil:

### 1. Barra visual de float
Uma barra colorida horizontal com gradiente FN→BS mostrando o range de desgaste da skin. Um indicador (ponteiro) marca a posição atual do float. A barra mostra visualmente o `min_float` e `max_float` da skin.

### 2. Descrição / lore da skin
O campo `description` já existe na API do ByMykel mas não está sendo capturado. Vou:
- Adicionar `description` ao tipo `ByMykelSkin`
- Exibir o texto no modal com estilo de citação/lore (itálico, cor suave)

### 3. Skins relacionadas
Mostrar até 4-6 skins da mesma coleção ou mesma arma como sugestões clicáveis. Ao clicar, troca a skin exibida no modal.

## Mudanças técnicas

**`src/hooks/useByMykelSkins.ts`**
- Adicionar `description?: string` ao tipo `ByMykelSkin`

**`src/components/catalogo/SkinDetailModal.tsx`**
- Adicionar componente `FloatBar` — barra horizontal com gradiente de cores dos tiers, indicador da posição atual, labels de min/max float
- Adicionar seção de descrição/lore abaixo do float
- Adicionar seção "Skins relacionadas" — recebe lista de skins filtradas por coleção ou arma, exibe como mini-cards clicáveis
- Remover `md:justify-center` do layout para distribuir melhor o conteúdo

**`src/pages/Catalogo.tsx`** (ou onde o modal é invocado)
- Passar lista de `allSkins` ao modal para calcular skins relacionadas

