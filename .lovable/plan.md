

# Verificação e correção dos IDs de armas para "Testar no Jogo"

## Análise

Testei cada `weapon_name` do banco de dados contra a função `resolveDefindex`. O fluxo é: `weapon_id` (da API byMykel) → `nameAliasMap` → `toWeaponKey` fallback → `defindexMap`.

### Problema 1: ID errado

| Arma | Valor atual | Valor correto |
|------|-------------|---------------|
| Shadow Daggers (`weapon_knife_push`) | **517** | **516** |

### Problema 2: 30+ armas sem fallback no `nameAliasMap`

Quando a API byMykel não retorna `weapon_id`, o `toWeaponKey` gera chaves erradas (ex: "AK-47" → `weapon_ak_47` em vez de `weapon_ak47`). Armas afetadas:

**Pistolas:** AK-47, Desert Eagle, Five-SeveN, Glock-18, P2000, Tec-9
**SMGs:** MAC-10, UMP-45
**Pesadas:** MAG-7, Sawed-Off, Galil AR
**Facas:** Bowie, Butterfly, Classic, Falchion, Flip, Gut, Huntsman, Karambit, Kukri, M9 Bayonet, Navaja, Nomad, Paracord, Shadow Daggers, Skeleton, Stiletto, Survival, Talon, Ursus
**Luvas:** Broken Fang, Driver, Hand Wraps, Hydra, Moto, Specialist, Sport

### Armas que já funcionam (11 via nameAliasMap + 14 via toWeaponKey)
M4A1-S, USP-S, CZ75-Auto, PP-Bizon, Dual Berettas, R8 Revolver, SCAR-20, G3SG1, SSG 08, SG 553, MP5-SD, AUG, AWP, Bayonet, FAMAS, M249, M4A4, MP7, MP9, Negev, Nova, P250, P90, XM1014, Bloodhound Gloves

## Solução

| Arquivo | Ação |
|---------|------|
| `src/components/catalogo/TryInGameModal.tsx` | Corrigir defindex do Shadow Daggers (517→516) e expandir `nameAliasMap` com os 30+ aliases faltantes |

## Aliases a adicionar

```text
"AK-47"              → "weapon_ak47"
"Desert Eagle"       → "weapon_deagle"
"Five-SeveN"         → "weapon_fiveseven"
"Glock-18"           → "weapon_glock"
"P2000"              → "weapon_hkp2000"
"Tec-9"              → "weapon_tec9"
"MAC-10"             → "weapon_mac10"
"UMP-45"             → "weapon_ump45"
"MAG-7"              → "weapon_mag7"
"Sawed-Off"          → "weapon_sawedoff"
"Galil AR"           → "weapon_galilar"
"Bowie Knife"        → "weapon_knife_bowie"
"Butterfly Knife"    → "weapon_knife_butterfly"
"Classic Knife"      → "weapon_knife_css"
"Falchion Knife"     → "weapon_knife_falchion"
"Flip Knife"         → "weapon_knife_flip"
"Gut Knife"          → "weapon_knife_gut"
"Huntsman Knife"     → "weapon_knife_tactical"
"Karambit"           → "weapon_knife_karambit"
"Kukri Knife"        → "weapon_knife_kukri"
"M9 Bayonet"         → "weapon_knife_m9_bayonet"
"Navaja Knife"       → "weapon_knife_gypsy_jackknife"
"Nomad Knife"        → "weapon_knife_nomad"
"Paracord Knife"     → "weapon_knife_cord"
"Shadow Daggers"     → "weapon_knife_push"
"Skeleton Knife"     → "weapon_knife_skeleton"
"Stiletto Knife"     → "weapon_knife_stiletto"
"Survival Knife"     → "weapon_knife_survival_bowie"
"Talon Knife"        → "weapon_knife_talon"
"Ursus Knife"        → "weapon_knife_ursus"
"Broken Fang Gloves" → "weapon_gloves_broken_fang"
"Driver Gloves"      → "weapon_gloves_slick"
"Hand Wraps"         → "weapon_gloves_handwrap_leathery"
"Hydra Gloves"       → "weapon_gloves_hydra"
"Moto Gloves"        → "weapon_gloves_motorcycle"
"Specialist Gloves"  → "weapon_gloves_specialist"
"Sport Gloves"       → "weapon_gloves_sporty"
```

Isso corrige o ID errado e garante que **todas** as 63 armas do banco resolvem corretamente para o defindex.

