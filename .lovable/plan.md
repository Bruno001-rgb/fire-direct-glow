

# Admin: gerenciar WhatsApp na aba "Sobre"

O número/link de WhatsApp está hardcoded em 6+ arquivos como `https://wa.me/5562996632201`. Vamos adicionar uma entrada na tabela `site_credentials` para o WhatsApp e fazer todos os componentes lerem de lá.

## 1. Inserir registro WhatsApp na tabela `site_credentials`

Usar a ferramenta de insert (não migration) para adicionar:
```sql
INSERT INTO public.site_credentials (key, title, value, description, icon, href, sort_order)
VALUES ('whatsapp', 'WhatsApp', '5562996632201', 'Número ou link de grupo para contato', 'message-circle', NULL, 3);
```

O campo `value` guarda o número ou link completo do grupo. O campo `href` fica opcional (se preenchido, usa como link direto em vez de `wa.me/{value}`).

## 2. Criar hook `useWhatsAppUrl` — `src/hooks/useWhatsAppUrl.ts`

- Busca da tabela `site_credentials` onde `key = 'whatsapp'`
- Retorna a URL formatada: se `href` existir usa direto, senão monta `https://wa.me/{value}`
- Cache com `useState` + `useEffect` (fetch uma vez)

## 3. Atualizar componentes que usam WhatsApp hardcoded

Substituir a constante `WHATSAPP_URL` e links hardcoded pelo hook em:
- `src/components/Header.tsx`
- `src/components/HeroSection.tsx`
- `src/components/FinalCTA.tsx`
- `src/components/loadout/LoadoutSummary.tsx`
- `src/components/catalogo/SkinDetailModal.tsx`
- `src/components/catalogo/TryInGameModal.tsx`

## 4. Nenhuma alteração no CredentialsManager

O componente já lista todas as credentials da tabela automaticamente — o novo registro "whatsapp" vai aparecer na aba "Sobre" do admin sem mudanças no código.

| Arquivo | Ação |
|---------|------|
| Insert SQL | Adicionar registro `whatsapp` em `site_credentials` |
| `src/hooks/useWhatsAppUrl.ts` | Novo hook para buscar URL do WhatsApp |
| `src/components/Header.tsx` | Usar hook em vez de hardcoded |
| `src/components/HeroSection.tsx` | Usar hook |
| `src/components/FinalCTA.tsx` | Usar hook |
| `src/components/loadout/LoadoutSummary.tsx` | Usar hook |
| `src/components/catalogo/SkinDetailModal.tsx` | Usar hook |
| `src/components/catalogo/TryInGameModal.tsx` | Usar hook |

