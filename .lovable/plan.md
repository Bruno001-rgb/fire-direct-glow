
# Rate Limiting no Login Admin

## Alteração

| Arquivo | Ação |
|---------|------|
| `src/pages/AdminLogin.tsx` | Adicionar rate limiting client-side |

## Lógica

- Estado `attempts` e `lockedUntil` persistidos em `sessionStorage`
- Lockout progressivo: 5 falhas → 30s, 10 → 2min, 15 → 5min
- `useEffect` com intervalo de 1s para countdown visual
- Botão desabilitado e mensagem "Muitas tentativas. Tente novamente em Xs." durante lockout
- Reset do contador após login bem-sucedido
- Inicialização do estado a partir de `sessionStorage` para sobreviver refresh
