

## Plano: Remover slider de float, manter botões e badge numérico

### Mudança
No `SkinDetailModal.tsx`, remover apenas o componente `<Slider>` e os labels min/max abaixo dele. Manter:
- Os botões de condição (FN, MW, FT, WW, BS)
- O badge numérico do float (ex: "0.03")
- O badge com o nome da condição (ex: "Factory New")

### Arquivo alterado
- `src/components/catalogo/SkinDetailModal.tsx` — deletar o bloco `<div className="space-y-1">` que contém o `<Slider>`, e os `<span>` de min/max. Remover o import do `Slider`.

