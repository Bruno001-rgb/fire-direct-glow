

# Atualizar catálogo com produtos reais e visual estilo FireSkins

## O que muda

Com base nas imagens do catálogo real da FireSkins, vou:

1. **Expandir o array de skins** para incluir todos os produtos mostrados nos catálogos
2. **Gerar imagens** para cada skin nova usando AI image generation
3. **Aplicar visual mais próximo do catálogo** — cards com barra vermelha/laranja, estrela de raridade, tipografia bold

## Produtos a adicionar

### Facas (16 itens)
| Modelo | Skins |
|--------|-------|
| Talon Knife | Doppler, Fade, Case Hardened, Tiger Tooth |
| Karambit | Fade, Lore, Gamma Doppler, Doppler |
| Skeleton Knife | Doppler, Tiger Tooth, Fade, Case Hardened |
| Butterfly Knife | Fade, Gamma Doppler, Doppler, Lore |

### Luvas (14 itens)
| Modelo | Skins |
|--------|-------|
| Sport Gloves | Vice, Pandora's Box, Hedge Maze, Superconductor |
| Specialist Gloves | Emerald Web, Crimson Kimono, Fade, Foundation |
| Driver Gloves | Lunar Weave, Crimson Weave, Imperial Plaid, Snow Leopard |
| Hand Wraps | Cobalt Skulls, Overprint |

### Rifles (2 itens extras)
| Modelo | Skins |
|--------|-------|
| AK-47 | Slaughter, CAUTION! |

## Visual do card (inspirado no catálogo)

- Fundo escuro com bordas laranja/vermelhas
- Estrela (★) antes do nome do modelo
- Nome do modelo em bold laranja
- Nome da skin abaixo em texto menor
- Imagem da skin dominante no card
- Barra de destaque inferior com cor de raridade
- Hover com glow laranja

## Arquivos editados

| Arquivo | Mudança |
|---------|---------|
| `src/components/CategoriesSection.tsx` | Novo array com ~32 skins, cards redesenhados com visual do catálogo |
| `src/components/SkinsSidebar.tsx` | Atualizado com novos itens |
| `src/assets/` | ~20 novas imagens geradas via AI |

## Detalhes técnicos

- Imagens geradas com Nano banana (gemini flash) — renders 3D de cada skin em fundo escuro
- Cards mantêm link direto para WhatsApp com nome da skin
- Grid permanece 4 colunas desktop, 2 mobile
- Tabs permanecem funcionais filtrando por categoria
- Categoria "rifles" inclui os AK-47 extras; AWP permanece em "snipers"

