

# Remover opção "Criar conta" da tela de login

## Resumo
Remover o toggle de signup da página `/admin/login`, deixando apenas o formulário de login. Novos admins só poderão ser adicionados pelo Super Admin via aba "Admins" no painel.

## Alterações

| Arquivo | Ação |
|---------|------|
| `src/pages/AdminLogin.tsx` | Remover estado `mode`, função `handleSignup`, botão de toggle login/signup, e simplificar para apenas o formulário de login |

O formulário ficará com: campo email, campo senha, botão "Entrar", mensagem de erro. Sem nenhuma referência a criação de conta.

