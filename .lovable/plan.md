

# Colocar ícones reais na seção "Conheça a FireSkins"

## Problema

Hoje o `iconMap` só tem 3 ícones (`file-text`, `external-link`, `calendar`). Steam, Instagram e YouTube usam o genérico `external-link`, e WhatsApp usa `message-circle` que nem existe no map.

## Plano

### 1. Expandir `iconMap` em `AboutSection.tsx`

Adicionar imports e mapeamentos:

| Card | icon no DB (atual) | icon no DB (novo) | Lucide |
|------|--------------------|--------------------|--------|
| CNPJ | `file-text` | `file-text` | `FileText` ✓ |
| Steam | `external-link` | `gamepad-2` | `Gamepad2` |
| No Mercado | `calendar` | `calendar` | `Calendar` ✓ |
| WhatsApp | `message-circle` | `message-circle` | `MessageCircle` |
| Instagram | `external-link` | `instagram` | `Instagram` |
| YouTube | `external-link` | `youtube` | `Youtube` |

### 2. Migration SQL para atualizar ícones no banco

```sql
UPDATE site_credentials SET icon = 'gamepad-2' WHERE key = 'steam';
UPDATE site_credentials SET icon = 'instagram' WHERE key = 'instagram';
UPDATE site_credentials SET icon = 'youtube' WHERE key = 'youtube';
```

### 3. Campo ícone no admin (`CredentialsManager.tsx`)

Adicionar campo editável de `icon` + incluir `icon` no `update()` para o admin poder trocar futuramente.

| Arquivo | Ação |
|---------|------|
| `src/components/AboutSection.tsx` | Expandir iconMap com 6 ícones |
| `supabase/migrations/` | UPDATE icon values |
| `src/components/admin/CredentialsManager.tsx` | Campo icon editável + salvar |

