

# Paginação na aba de Logs

## Alteração

| Arquivo | Ação |
|---------|------|
| `src/components/admin/LoginLogsViewer.tsx` | Adicionar paginação client-side com 20 registros por página |

## Lógica

- Buscar até 500 registros do banco (em vez de 100)
- Paginar client-side com 20 itens por página
- Controles: botões Anterior/Próxima + indicador "Página X de Y"
- Reset para página 1 ao clicar Refresh
- Usar componentes `Button` existentes para os controles
- Atualizar texto informativo para "Últimos 500 registros"

