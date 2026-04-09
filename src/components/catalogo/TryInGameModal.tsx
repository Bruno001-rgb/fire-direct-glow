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

export default function TryInGameModal({ skin, floatValue, onClose }: Props) {
  const weaponId = skin.weapon_id ?? 0;
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
