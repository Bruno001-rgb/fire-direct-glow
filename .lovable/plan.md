

# Adicionar card "Comunidade" na seção Sobre

## Contexto
Os cards da seção "Sobre" vêm da tabela `site_credentials` no banco de dados. Atualmente há 8 cards (3+3+2). Adicionar um 9º card "Comunidade" completa a última linha (3+3+3).

## O que será feito

1. **Inserir novo registro na tabela `site_credentials`** via migração:
   - `title`: "Comunidade"
   - `value`: "Acesse"
   - `description`: "Área administrativa FireSkins"
   - `icon`: "external-link"
   - `href`: "/admin"
   - `sort_order`: 9

2. **Ajustar link interno no `AboutSection.tsx`**: O card "Comunidade" usa um link interno (`/admin`), não externo. Preciso ajustar o componente para que links sem `http` usem `<Link>` do React Router em vez de `<a target="_blank">`.

## Alterações

| Arquivo | Ação |
|---------|------|
| Migração SQL | Inserir registro "Comunidade" na `site_credentials` |
| `src/components/AboutSection.tsx` | Usar `<Link>` para hrefs internos (sem http) |

