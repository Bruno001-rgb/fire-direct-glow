

# Esconder número do WhatsApp no card de Atendimento

## O que será feito

No `AboutSection.tsx`, quando o card for do tipo WhatsApp (icon `message-circle`), substituir a exibição do número (`item.value`) por um texto alternativo como **"Clique para falar"** ou **"Fale conosco"**.

## Alteração em `src/components/AboutSection.tsx`

Na linha 84-86, onde exibe `{item.value}`, adicionar uma condição: se `item.icon === "message-circle"`, mostrar `"Fale conosco"` em vez do valor real (o número de telefone).

```tsx
<span className="text-gradient-fire font-bold text-xl">
  {item.icon === "message-circle" ? "Fale conosco" : item.value}
</span>
```

| Arquivo | Ação |
|---------|------|
| `src/components/AboutSection.tsx` | Ocultar número no card WhatsApp, mostrar "Fale conosco" |

