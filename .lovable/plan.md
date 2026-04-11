

# Informação de retenção na aba Logs

## Alteração

| Arquivo | Ação |
|---------|------|
| `src/components/admin/LoginLogsViewer.tsx` | Adicionar texto informativo sobre a política de retenção de 90 dias |

## Detalhe

Adicionar um pequeno aviso (ícone de info + texto) abaixo do texto existente "Últimas 100 tentativas de login", informando: "Registros com mais de 90 dias são apagados automaticamente."

Usar o ícone `Info` do lucide-react com estilo `text-muted-foreground` para manter consistência visual.

