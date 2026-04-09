

## Plano: Visualizador 3D de Skins via inspect.skin

### Resumo
Ao clicar em uma skin no catálogo ou sidebar, abrir um modal/drawer com iframe do `inspect.skin` mostrando o modelo 3D da skin.

### Alterações

**1. Novo componente `src/components/SkinViewerModal.tsx`**
- Modal fullscreen overlay com fundo escuro semitransparente (`bg-black/85`)
- Animação slide-up (usando keyframes existentes ou CSS transition `translate-y`)
- Borda superior laranja sutil (`border-t-2 border-primary`)
- Conteúdo:
  - Header: nome da skin (bold, branco), rarity abaixo (cor correspondente), botão X no canto
  - iframe `https://inspect.skin/` ocupando largura total, `h-[60vh]`, com fundo transparente
  - Footer fixo: botão "Negociar no WhatsApp" (abre grupo WhatsApp com mensagem pré-preenchida referenciando a skin)
- Props: `skin: ShowcaseSkin | null`, `open: boolean`, `onClose: () => void`

**Nota sobre inspect.skin:** O site `inspect.skin` requer um inspect link ou market hash name para carregar uma skin específica. Como os dados atuais não incluem inspect links, o iframe abrirá a página base. Para skins específicas, seria necessário armazenar o `market_hash_name` no banco. O iframe carregará `https://inspect.skin/` como viewer genérico inicialmente.

**2. Alterar `src/components/CategoriesSection.tsx`**
- Adicionar state: `const [selectedSkin, setSelectedSkin] = useState<ShowcaseSkin | null>(null)`
- Mudar o `SkinCard` de `<a>` para `<button>`/`<div>` com `onClick={() => onSelect(item)}`
- O botão "Negociar" dentro do card continua abrindo WhatsApp diretamente (stopPropagation)
- Renderizar `<SkinViewerModal>` no final da seção

**3. Alterar `src/components/SkinsSidebar.tsx`**
- Mesmo padrão: clicar na skin abre o modal em vez de ir direto ao WhatsApp
- Passar callback via props ou usar um contexto simples

### Design
- Fundo do modal: `bg-black/90` overlay + conteúdo `bg-[#0a0a0a]`
- Sem branco em lugar nenhum
- Fontes e cores consistentes com o site (Rajdhani headings, laranja primary)
- Responsivo: iframe ocupa 100% largura, 60vh altura em desktop, 50vh em mobile

