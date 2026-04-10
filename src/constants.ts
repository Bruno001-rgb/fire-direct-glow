// ============================================
// DADOS PENDENTES — Preencher com dados reais
// ============================================
// WHATSAPP_DIRECT: trocar 55XXXXXXXXXXX pelo número real da FireSkins
// URL_PRODUCAO: domínio final do site (para SEO, OG tags, canonical)
// ============================================

// Canal direto — conversa privada com a FireSkins (intenção de compra)
export const WHATSAPP_DIRECT = "https://wa.me/55XXXXXXXXXXX";
// TODO: substituir 55XXXXXXXXXXX pelo número real

// Comunidade — grupo aberto pra galera trocar ideia
export const WHATSAPP_COMMUNITY = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

// Helper: gera link direto com mensagem pré-preenchida
export function whatsappDirectLink(context?: string) {
  const base = WHATSAPP_DIRECT;
  if (context) {
    return `${base}?text=${encodeURIComponent(context)}`;
  }
  return `${base}?text=${encodeURIComponent("Oi, vim pelo site da FireSkins e quero saber mais sobre skins!")}`;
}

// Helper: gera link direto com nome da skin
export function whatsappSkinLink(skinName: string, float?: number) {
  const floatInfo = float != null ? ` com float ${float.toFixed(2)}` : "";
  return `${WHATSAPP_DIRECT}?text=${encodeURIComponent(`Oi! Vi no site e tenho interesse na skin: ${skinName}${floatInfo}. Qual o valor e disponibilidade?`)}`;
}

// Helper: gera link direto com lista do loadout
export function whatsappLoadoutLink(items: { slot: string; skinName: string }[]) {
  const lines = items.map((i) => `• ${i.slot}: ${i.skinName}`).join("\n");
  const message = `Oi! Montei minha lista de skins no site:\n\n${lines}\n\nQuero saber disponibilidade e valores!`;
  return `${WHATSAPP_DIRECT}?text=${encodeURIComponent(message)}`;
}
