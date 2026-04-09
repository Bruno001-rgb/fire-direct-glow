

# Plano: Melhorias no Catálogo e Admin

## Resumo
5 funcionalidades: filtro de preço no catálogo, contador de skins publicadas no admin, autenticação no admin, e contador de skins por wear nos chips de filtro.

---

## 1. Filtro por faixa de preço no catálogo

**Arquivo:** `src/hooks/useByMykelSkins.ts`
- Adicionar constante `PRICE_FILTERS` com faixas: Todos, Até R$20, R$20-50, R$50-100, R$100-300, R$300+
- Atualizar `filterSkins()` para aceitar parâmetro `priceRange` e filtrar por `skin.price`

**Arquivo:** `src/components/catalogo/CatalogoFilters.tsx`
- Adicionar novo `CollapsibleFilter` "Preço" com chips das faixas
- Passar novo prop `priceRange` / `onPriceRangeChange`

**Arquivo:** `src/pages/Catalogo.tsx`
- Adicionar state `priceRange` e passar para filtros e `filterSkins()`

---

## 2. Contador de skins publicadas no admin

**Arquivo:** `src/components/admin/SlotManager.tsx`
- Adicionar query para contar skins distintas com `skin_id not null` na tabela `showcase_slots`
- Exibir badge/contador no topo: "X skins publicadas"

---

## 3. Autenticação no admin

**Banco de dados:**
- Criar tabela `user_roles` com enum `app_role` (admin, user)
- Criar função `has_role()` security definer
- Configurar RLS nas tabelas existentes para proteger operações de escrita

**Novos arquivos:**
- `src/pages/AdminLogin.tsx` — tela de login com email/senha
- `src/hooks/useAuth.ts` — hook para gerenciar sessão e verificar role admin
- `src/components/admin/AdminGuard.tsx` — wrapper que redireciona para login se não autenticado/admin

**Arquivo:** `src/pages/Admin.tsx`
- Envolver conteúdo com `AdminGuard`
- Adicionar botão de logout

**Arquivo:** `src/App.tsx`
- Adicionar rota `/admin/login`

---

## 4. Contador visual nos chips de wear

**Arquivo:** `src/components/catalogo/CatalogoFilters.tsx`
- Receber a lista completa de skins como prop (ou via contexto)
- Para cada chip de wear, calcular quantas skins se enquadram naquela faixa de float
- Exibir o número ao lado do label: "Factory New (12)"

**Arquivo:** `src/pages/Catalogo.tsx`
- Passar `skins` (lista completa, sem filtro de wear) para `CatalogoFilters`

---

## Detalhes técnicos

### Migração SQL para autenticação
```sql
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Users can read own roles" ON public.user_roles
FOR SELECT TO authenticated USING (auth.uid() = user_id);
```

### Faixas de preço
```typescript
export const PRICE_FILTERS = [
  { label: "Todos", value: "all", min: 0, max: Infinity },
  { label: "Até R$20", value: "0-20", min: 0, max: 20 },
  { label: "R$20-50", value: "20-50", min: 20, max: 50 },
  { label: "R$50-100", value: "50-100", min: 50, max: 100 },
  { label: "R$100-300", value: "100-300", min: 100, max: 300 },
  { label: "R$300+", value: "300+", min: 300, max: Infinity },
] as const;
```

### Ordem de implementação
1. Filtro de preço (catálogo)
2. Contador de wear nos chips
3. Contador de skins no admin
4. Autenticação no admin (mais complexo, por último)

