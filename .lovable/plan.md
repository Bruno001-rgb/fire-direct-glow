

## Auditoria de Responsividade — Diagnóstico e Plano

### Problemas encontrados

#### 1. Hero — InteractiveKnife overflow no mobile
- `InteractiveKnife` usa `w-[380px]` fixo no mobile. Em tela de 320px, a faca estoura 60px para fora, gerando scroll horizontal.
- Os glow rings (280–500px fixos) também excedem a viewport em mobile.

#### 2. Footer — layout quebra no mobile
- Logo do footer tem `h-80` (~320px) com margin negativo (`-my-20`), criando sobreposição e espaço vazio em mobile.
- Bloco de métodos de pagamento (PIX/CRYPTO/CARTÃO) usa flex horizontal sem wrap — estoura em telas < 375px.
- `text-4xl sm:text-5xl lg:text-6xl` no heading do footer é grande demais para 320px.

#### 3. VideoShowcase — logo gigante no preview
- Logo center: `w-[66rem]` (1056px!) no mobile e `sm:w-[90rem]` (1440px!). Extremamente oversized, provavelmente gera overflow no container (contido por `overflow-hidden` mas carrega imagem enorme desnecessariamente).

#### 4. StatsBar — itens cortados no mobile
- 4 stats em flex horizontal sem wrap. Em 320px, os últimos itens ficam fora da tela (scrollbar-hide esconde mas perde conteúdo).

#### 5. SkinsSidebar — fixed width comprime conteúdo
- `w-[110px] xl:w-[130px]` + sticky. Funciona em lg+ mas em telas 1024–1280px pode comprimir o main content desnecessariamente.

#### 6. Admin — SlotManager grid no mobile
- `grid-cols-2 sm:grid-cols-4` — funciona, mas botões dentro dos slots (`text-[10px]`, `h-7`) são muito pequenos para touch (< 44px).
- SkinSearchModal: `max-w-2xl` — OK para desktop, mas em mobile o grid `grid-cols-2 sm:grid-cols-3` pode ter cards apertados.

#### 7. Admin — TestimonialsManager
- Lista de depoimentos usa `flex items-center gap-4` horizontal. Em mobile (< 640px), os action buttons se espremem. A row inteira pode não caber.

#### 8. CategoriesSection — `grid-cols-2` no mobile
- Cards em 320px com 2 colunas e `gap-3` ficam com ~145px cada. Funciona mas fica apertado. Texto `truncate` salva, mas touch targets são borderline.

#### 9. Carrossel de depoimentos
- Cards com `w-[260px] sm:w-[300px]` — OK, mas sem interação touch (swipe). Auto-scroll sem pause no touch pode ser frustrante no mobile.

#### 10. Performance
- `AmbientParticles` roda canvas animation loop contínuo com requestAnimationFrame — gasta CPU mesmo quando seção não está visível.
- `LiveDropTicker` importa ~13 imagens estáticas hardcoded que são sempre carregadas.
- VideoShowcase logo image é absurdamente grande (66rem / 90rem).

---

### Plano de correção

#### A. Hero + InteractiveKnife (overflow fix)
- Trocar tamanhos fixos da faca para valores responsivos: `w-[min(80vw,380px)] sm:w-[420px] lg:w-[550px]`
- Ajustar glow rings proporcionalmente
- Reduzir min-h no mobile: `min-h-[75vh] sm:min-h-[85vh]`

#### B. Footer (mobile layout)
- Wrap métodos de pagamento: adicionar `flex-wrap` e reduzir padding
- Reduzir logo no mobile: `h-48 sm:h-80 lg:h-[26rem]` com margin negativo proporcional
- Stack layout vertical no mobile para a 3-column footer

#### C. VideoShowcase — logo sizing
- Reduzir logo de `w-[66rem]` para `w-40 sm:w-56` (valores sãos)

#### D. StatsBar — mobile adaptation
- Mostrar apenas 2 stats no mobile (hidden nos outros) ou reduzir gap/font

#### E. Admin — touch targets
- Aumentar botões mínimos para 44px em mobile
- TestimonialsManager: stack actions verticalmente em mobile
- SkinSearchModal: usar `grid-cols-2` fixo em mobile, com scroll

#### F. Testimonials carousel — touch
- Adicionar `touch-action: pan-x` e pausar auto-scroll durante touch

#### G. Performance
- AmbientParticles: usar IntersectionObserver para pausar quando fora da viewport
- VideoShowcase: reduzir dimensão da logo image
- Adicionar `loading="lazy"` em imagens do LiveDropTicker

### Arquivos a alterar

| Arquivo | Mudanças |
|---|---|
| `src/components/InteractiveKnife.tsx` | Tamanhos responsivos com min/max |
| `src/components/HeroSection.tsx` | Ajustar min-h, glow ring sizes |
| `src/components/Footer.tsx` | Wrap pagamento, logo sizing, stack mobile |
| `src/components/VideoShowcase.tsx` | Fix logo size absurda |
| `src/components/StatsBar.tsx` | Adaptar para mobile |
| `src/components/TestimonialsSection.tsx` | Touch-friendly carousel |
| `src/components/AmbientParticles.tsx` | IntersectionObserver pause |
| `src/components/LiveDropTicker.tsx` | lazy load images |
| `src/components/admin/TestimonialsManager.tsx` | Mobile layout para actions |
| `src/components/admin/SkinSearchModal.tsx` | Touch targets maiores |
| `src/components/admin/SlotManager.tsx` | Touch target mínimo 44px |

### Fora de escopo
- Autenticação do admin
- Refazer identidade visual
- Trocar componentes por libs externas

