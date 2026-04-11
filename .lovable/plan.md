

# Criar conta do primeiro Super Admin

## Problema
Não existe nenhum usuário no banco de dados. A página `/admin/login` só faz login — não cria contas.

## Solução

1. **Adicionar botão "Criar conta" na página de login** (`src/pages/AdminLogin.tsx`)
   - Adicionar um toggle entre "Entrar" e "Criar conta"
   - No modo "Criar conta", usar `supabase.auth.signUp()` com email e senha
   - Após criar a conta com sucesso, verificar se é o primeiro usuário e automaticamente inserir na `user_roles` como admin com `is_super = true`

2. **Lógica de primeiro admin automático**
   - Após signup, a edge function `manage-admins` (ou uma query direta) verifica se `user_roles` está vazia
   - Se estiver vazia, insere o novo usuário como admin + super automaticamente
   - Se já existirem admins, mostra "Você não tem permissão" (só admins existentes podem adicionar novos)

3. **Alternativa mais simples (recomendada)**
   - Eu crio a conta diretamente via SQL/API com o email `blackbot998@gmail.com` e uma senha que você definir
   - Insiro o registro na `user_roles` como Super Admin
   - Você faz login normalmente

## Recomendação

A alternativa mais simples é eu criar a conta e o Super Admin direto no banco. Me diga a **senha** que deseja usar para a conta `blackbot998@gmail.com`.

Ou, se preferir, posso adicionar a opção de "Criar conta" na tela de login com a lógica de primeiro admin automático.

