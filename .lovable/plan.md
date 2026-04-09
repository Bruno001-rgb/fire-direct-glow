

## Plano: Redesign "acessível" — manter dark, simplificar visual

### Problema
O site transmite uma imagem muito premium/cara, afastando leads que buscam preços acessíveis. Precisamos comunicar que aqui tem skins **para todos os bolsos**.

### Alterações

**1. Paleta de cores — suavizar o "luxo" (index.css)**
- Trocar gradiente dourado (#F5A006) por um tom laranja mais quente e menos "gold"
- Reduzir intensidade dos glows e shadows em 50%
- Remover `text-gradient-fire` dourado dos headings — usar laranja sólido
- Simplificar `.glass-card-glow` — menos brilho, mais clean

**2. Hero (HeroSection.tsx)**
- Trocar headline de "Compre, Venda e Faça Upgrade das Suas Skins" para algo mais acessível: **"Skins de CS2 para Todos os Bolsos"** ou **"Sua Skin dos Sonhos pelo Melhor Preço"**
- Remover texto "premium" da label superior — trocar "FireSkins • Skins Premium CS2" por **"FireSkins • Skins CS2"**
- Reduzir efeitos de glow/blur dos backgrounds (diminuir tamanho e opacidade dos blurs decorativos)
- Subtitle mais direto: "Encontre a skin perfeita com preço justo, pagamento facilitado e atendimento humano no WhatsApp."

**3. Seção Catálogo (CategoriesSection.tsx)**
- Trocar título "Catálogo premium" por **"Nossas Skins"** ou **"Confira Nossas Skins"**
- Trocar subtítulo para "Skins para todos os estilos e bolsos"
- Remover badge "Disponível" dos cards — substituir por preço ou simplesmente remover
- Reduzir glow no hover dos cards

**4. Stats Bar (StatsBar.tsx)**
- Adicionar stat "Preços a partir de R$5" ou "Skins a partir de R$5" para reforçar acessibilidade

**5. FinalCTA (FinalCTA.tsx)**
- Reduzir intensidade das fire lines e glows
- Manter estrutura mas com menos "premium feel"

**6. CSS global (index.css)**
- `--secondary`: diminuir saturação do dourado, tornando mais laranja
- Reduzir opacidade dos `glow-orange`, `pulse-glow` em ~40%
- `glass-card-glow` hover: reduzir box-shadow

### O que NÃO muda
- Estrutura de páginas e componentes
- Funcionalidade do admin, catálogo, loadout
- Cores base (dark theme, laranja primário)
- CTAs e links do WhatsApp

### Arquivos alterados
- `src/index.css` — paleta e efeitos
- `src/components/HeroSection.tsx` — textos e efeitos
- `src/components/CategoriesSection.tsx` — textos
- `src/components/StatsBar.tsx` — novo stat
- `src/components/FinalCTA.tsx` — reduzir glows

