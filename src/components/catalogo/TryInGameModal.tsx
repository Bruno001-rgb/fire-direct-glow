import { useState, useCallback } from "react";
import { X, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import type { ByMykelSkin } from "@/hooks/useByMykelSkins";

interface Props {
  skin: ByMykelSkin;
  floatValue: number;
  onClose: () => void;
}

function CopyBox({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="flex items-center gap-2 rounded-lg p-3" style={{ background: "#1a1a1a" }}>
      <pre className="flex-1 text-sm font-mono text-foreground overflow-x-auto whitespace-pre">
        {code}
      </pre>
      <button
        onClick={handleCopy}
        className="shrink-0 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-md transition-colors"
        style={{
          background: copied ? "hsl(142 71% 45% / 0.2)" : "hsl(24 90% 50% / 0.2)",
          color: copied ? "hsl(142 71% 45%)" : "hsl(24 90% 50%)",
        }}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {copied ? "Copiado!" : "Copiar"}
      </button>
    </div>
  );
}

const STEPS = (serverCmd: string, skinCmd: string) => [
  {
    title: "Conectar ao servidor",
    desc: "Abra o CS2, pressione ~ para abrir o console e cole o comando:",
    code: serverCmd,
  },
  {
    title: "Entrar no servidor",
    desc: "Entre no servidor, escolha qualquer time e abra o chat do jogo (pressione Enter).",
  },
  {
    title: "Equipar a skin",
    desc: "Cole esse código no chat do jogo e pressione Enter:",
    code: skinCmd,
  },
  {
    title: "Confirmação",
    desc: "A skin vai aparecer na sua mão em segundos. Aproveite o test drive!",
  },
];

const defindexMap: Record<string, number> = {
  // PISTOLAS
  "weapon_deagle": 1,
  "weapon_elite": 2,
  "weapon_fiveseven": 3,
  "weapon_glock": 4,
  "weapon_hkp2000": 32,
  "weapon_p250": 36,
  "weapon_usp_silencer": 61,
  "weapon_cz75a": 63,
  "weapon_revolver": 64,
  "weapon_tec9": 30,
  // RIFLES
  "weapon_ak47": 7,
  "weapon_aug": 8,
  "weapon_awp": 9,
  "weapon_famas": 10,
  "weapon_g3sg1": 11,
  "weapon_galilar": 13,
  "weapon_m4a4": 16,
  "weapon_m4a1_silencer": 60,
  "weapon_sg556": 39,
  "weapon_ssg08": 40,
  "weapon_scar20": 38,
  // SMGs
  "weapon_mac10": 17,
  "weapon_p90": 19,
  "weapon_mp5sd": 23,
  "weapon_ump45": 24,
  "weapon_bizon": 26,
  "weapon_mp7": 33,
  "weapon_mp9": 34,
  // PESADAS
  "weapon_m249": 14,
  "weapon_xm1014": 25,
  "weapon_mag7": 27,
  "weapon_negev": 28,
  "weapon_sawedoff": 29,
  "weapon_nova": 35,
  // FACAS
  "weapon_bayonet": 500,
  "weapon_knife_css": 503,
  "weapon_knife_flip": 505,
  "weapon_knife_gut": 506,
  "weapon_knife_karambit": 507,
  "weapon_knife_m9_bayonet": 508,
  "weapon_knife_tactical": 509,
  "weapon_knife_falchion": 512,
  "weapon_knife_bowie": 514,
  "weapon_knife_butterfly": 515,
  "weapon_knife_push": 517,
  "weapon_knife_cord": 517,
  "weapon_knife_canis": 518,
  "weapon_knife_survival_bowie": 518,
  "weapon_knife_ursus": 519,
  "weapon_knife_gypsy_jackknife": 520,
  "weapon_knife_navaja": 520,
  "weapon_knife_nomad": 521,
  "weapon_knife_stiletto": 522,
  "weapon_knife_talon": 523,
  "weapon_knife_skeleton": 525,
  "weapon_knife_kukri": 526,
  "weapon_knife_widowmaker": 527,
  // LUVAS
  "weapon_bloodhound_gloves": 5027,
  "weapon_gloves_sporty": 5030,
  "weapon_gloves_slick": 5031,
  "weapon_gloves_handwrap_leathery": 5032,
  "weapon_gloves_motorcycle": 5033,
  "weapon_gloves_specialist": 5034,
  "weapon_gloves_hydra": 5035,
  "weapon_gloves_broken_fang": 4725,
};

const nameAliasMap: Record<string, string> = {
  "M4A1-S": "weapon_m4a1_silencer",
  "USP-S": "weapon_usp_silencer",
  "CZ75-Auto": "weapon_cz75a",
  "PP-Bizon": "weapon_bizon",
  "Dual Berettas": "weapon_elite",
  "R8 Revolver": "weapon_revolver",
  "SCAR-20": "weapon_scar20",
  "G3SG1": "weapon_g3sg1",
  "SSG 08": "weapon_ssg08",
  "SG 553": "weapon_sg556",
  "MP5-SD": "weapon_mp5sd",
};

function toWeaponKey(name: string): string {
  return "weapon_" + name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/_+$/, "");
}

export function resolveDefindex(skin: ByMykelSkin): number | null {
  // 1. Try skin.weapon_id directly
  if (skin.weapon_id != null) {
    const key = typeof skin.weapon_id === "string" ? skin.weapon_id : null;
    if (key && defindexMap[key]) return defindexMap[key];
    // If weapon_id is already a number in defindexMap values, use it
    if (typeof skin.weapon_id === "number" && skin.weapon_id > 0) {
      const exists = Object.values(defindexMap).includes(skin.weapon_id);
      if (exists) return skin.weapon_id;
    }
  }

  // 2. Fallback: weapon.name → alias or snake_case
  const weaponName = skin.weapon?.name;
  if (weaponName) {
    const alias = nameAliasMap[weaponName];
    if (alias && defindexMap[alias]) return defindexMap[alias];
    const key = toWeaponKey(weaponName);
    if (defindexMap[key]) return defindexMap[key];
  }

  return null;
}

export function canTryInGame(skin: ByMykelSkin): boolean {
  const defindex = resolveDefindex(skin);
  const paintIndex = Number(skin.paint_index);
  return defindex != null && paintIndex > 0;
}

export default function TryInGameModal({ skin, floatValue, onClose }: Props) {
  const weaponId = resolveDefindex(skin) ?? 0;
  const paintIndex = skin.paint_index ?? "0";
  const serverCmd = "connect dust2.epidemic.gg";
  const skinCmd = `!g ${weaponId} ${paintIndex} 0 ${floatValue.toFixed(2)}`;

  const steps = STEPS(serverCmd, skinCmd);

  const whatsappMsg = encodeURIComponent(
    `Olá! Testei a ${skin.name} e quero comprar!`
  );

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border/30 p-6 md:p-8"
        style={{ background: "#0d0d0d" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted/50 hover:bg-muted transition-colors"
        >
          <X className="size-4 text-foreground" />
        </button>

        {/* Header */}
        <h3 className="text-xl font-bold text-foreground mb-1">
          Jogue com essa skin antes de comprar
        </h3>
        <p className="text-sm text-muted-foreground mb-6">
          Siga os passos abaixo — leva menos de 1 minuto
        </p>

        {/* Steps */}
        <div className="space-y-5">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-3">
              <div
                className="shrink-0 flex items-center justify-center size-7 rounded-full text-xs font-bold text-white"
                style={{ background: "#E95A0C" }}
              >
                {i + 1}
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-sm font-semibold text-foreground">{step.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                {step.code && <CopyBox code={step.code} />}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-8">
          <Button variant="fire" className="w-full h-12 text-base" asChild>
            <a
              href={`https://wa.me/?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-5" />
              Gostou? Falar no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
