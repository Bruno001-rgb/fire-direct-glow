

# Páginas de Termos de Serviço e Políticas de Privacidade

## O que será feito

Criar duas páginas dedicadas com conteúdo padrão para um marketplace de skins CS2, e atualizar os links no rodapé.

## Alterações

| Arquivo | Ação |
|---------|------|
| `src/pages/TermosDeServico.tsx` | Criar página com termos de serviço genéricos para marketplace de skins |
| `src/pages/PoliticaDePrivacidade.tsx` | Criar página com política de privacidade genérica |
| `src/App.tsx` | Adicionar rotas `/termos` e `/privacidade` |
| `src/components/Footer.tsx` | Atualizar links de `#` para `/termos` e `/privacidade`, usar `<Link>` do React Router |

Ambas as páginas seguirão o visual do site (fundo escuro, tipografia existente, header/footer incluídos) com seções expansíveis (accordion) para facilitar a leitura. O conteúdo será em PT-BR e contextualizado para a FireSkins.

