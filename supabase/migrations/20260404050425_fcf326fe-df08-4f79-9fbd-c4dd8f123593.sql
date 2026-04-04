CREATE VIEW admin_skin_index AS
SELECT DISTINCT ON (weapon_name, pattern_name)
  id AS source_skin_id,
  name,
  weapon_name,
  pattern_name,
  rarity_name,
  rarity_color,
  image
FROM imported_skins
WHERE id LIKE '%\_0'
  AND id NOT LIKE '%\_st'
  AND name NOT LIKE 'StatTrak%'
  AND name NOT LIKE 'Souvenir%'
  AND weapon_name IS NOT NULL
  AND pattern_name IS NOT NULL
ORDER BY weapon_name, pattern_name, name;