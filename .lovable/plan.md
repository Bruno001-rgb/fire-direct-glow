

# Usar ícone real do Steam na seção "Conheça a FireSkins"

## Problema

O Lucide não tem o logo oficial da Steam — `Gamepad2` é um controle genérico. O usuário quer o logo real do Steam (círculo azul com a "alavanca").

## Plano

### 1. Criar componente SVG do Steam

Criar um componente `SteamIcon` inline em `AboutSection.tsx` que renderiza o logo oficial do Steam como SVG, seguindo a mesma interface de props (`className`) que os ícones Lucide.

### 2. Atualizar `iconMap` em `AboutSection.tsx`

Substituir `Gamepad2` pelo componente `SteamIcon` customizado no mapeamento `"gamepad-2"` (ou renomear a key para `"steam"`). Como o iconMap espera `LucideIcon`, vou criar o componente compatível com a interface SVG.

### 3. Migration para atualizar o valor no banco

```sql
UPDATE site_credentials SET icon = 'steam' WHERE key = 'steam';
```

| Arquivo | Ação |
|---------|------|
| `src/components/AboutSection.tsx` | Adicionar `SteamIcon` SVG + atualizar iconMap |
| `supabase/migrations/` | UPDATE icon = 'steam' |

