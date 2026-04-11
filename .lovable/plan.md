

# Nova seção "Sobre a Empresa" — credenciais e confiança

Criar um componente `AboutSection.tsx` posicionado entre o `VideoShowcase` e o `TestimonialsSection` na home. A seção apresenta a empresa com CNPJ, link Steam e outros dados de credibilidade, usando o estilo visual do site (dark + orange/gold).

## Componente: `src/components/AboutSection.tsx`

- Layout com 2-3 colunas no desktop, empilhado no mobile
- Cards com ícones para cada credencial:
  - **CNPJ**: ícone de documento + número placeholder (`XX.XXX.XXX/0001-XX`)
  - **Steam**: ícone Steam + link para perfil placeholder
  - **Tempo de mercado**: ícone de calendário + texto placeholder
- Heading: "CONHEÇA A FIRESKINS" com destaque gradient no nome
- Subtítulo: "Transparência e segurança em cada negociação"
- Estilo consistente com o resto do site: bordas `border-orange-500/20`, backgrounds escuros, gradientes orange→gold nos destaques

## Alteração: `src/pages/Index.tsx`

- Importar `AboutSection`
- Inserir `<AboutSection />` entre `<VideoShowcase />` e `<TestimonialsSection />`

| Arquivo | Ação |
|---------|------|
| `src/components/AboutSection.tsx` | Criar seção com CNPJ, Steam, credenciais |
| `src/pages/Index.tsx` | Inserir AboutSection após VideoShowcase |

