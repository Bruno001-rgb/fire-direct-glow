

# Melhorar o rodapé (Footer)

## Problemas identificados na imagem

1. **Logo aparece muito pequena/quebrada** — provavelmente o arquivo webp não carrega bem ou está com tamanho insuficiente
2. **Espaçamento entre as seções** poderia ser mais generoso e consistente
3. **Bottom bar** — layout dos badges de pagamento e copyright pode ficar mais limpo
4. **Falta separação visual** entre a área principal e o bottom bar

## Alterações em `src/components/Footer.tsx`

### 1. Logo maior e com fallback
- Aumentar altura da logo de `h-10` para `h-12` com `max-w-[180px]`
- Adicionar margem inferior para separar do email

### 2. Melhorar espaçamento geral
- Grid gap de `gap-10 lg:gap-8` para `gap-10 lg:gap-12`
- Padding principal de `py-10 sm:py-14` para `py-12 sm:py-16`

### 3. Links com melhor hover
- Adicionar `hover:translate-x-1` nos links das colunas Serviços e Produto para feedback visual sutil

### 4. Bottom bar mais organizada
- Separar copyright e links legais em extremos opostos com alinhamento mais claro
- Badges de pagamento com espaçamento mais uniforme
- Tagline com margem top ajustada

### 5. Newsletter — input mais polido
- Dar mais destaque ao campo de email com placeholder mais convidativo

| Arquivo | Ação |
|---------|------|
| `src/components/Footer.tsx` | Ajustes de layout, espaçamento, logo e hover states |

