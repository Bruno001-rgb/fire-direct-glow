

# Substituir faca pela foto da equipe com glow laranja pulsante

## O que muda

Trocar a imagem da faca na hero pela foto da equipe FireSkins, mantendo o efeito de glow laranja pulsante que já existe no componente `InteractiveKnife` — adaptado para uma foto de pessoas (sem rotação 3D, apenas flutuação suave e aura).

## Alterações

### 1. Copiar a imagem para o projeto
- Copiar `user-uploads://image-2.png` para `src/assets/team-photo.png`

### 2. Atualizar `src/components/HeroSection.tsx`
- Trocar o import de `heroKnife` pelo `team-photo.png`
- Remover o componente `InteractiveKnife` e os anéis HUD/glow ao redor
- Criar uma composição nova: a foto da equipe com recorte arredondado, e por trás um glow laranja pulsante usando CSS animation (keyframes de opacity e blur)
- A foto terá flutuação idle suave (translateY com animation CSS) sem a interação 3D de mouse (não faz sentido para foto de pessoas)
- Drop-shadow laranja sutil na foto

### 3. Remover dependência do `InteractiveKnife`
- O componente `InteractiveKnife` não será mais usado na hero (pode permanecer no projeto caso usado em outro lugar)

| Arquivo | Ação |
|---------|------|
| `src/assets/team-photo.png` | Novo — imagem da equipe |
| `src/components/HeroSection.tsx` | Substituir faca pela foto com glow pulsante |

