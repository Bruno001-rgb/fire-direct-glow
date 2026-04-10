import { useLoadout, LOADOUT_SLOTS } from "@/contexts/LoadoutContext";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { whatsappLoadoutLink } from "@/constants";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { track } from "@/lib/track";

export default function LoadoutSummary() {
  const { loadout, filledCount, clearAll } = useLoadout();

  if (filledCount === 0) return null;

  const items = LOADOUT_SLOTS.filter((s) => loadout[s.key]).map((s) => ({
    slot: s.label,
    skinName: loadout[s.key]!.name,
  }));

  const whatsappHref = whatsappLoadoutLink(items);

  const handleCopy = () => {
    const lines = items.map(i => `• ${i.slot}: ${i.skinName}`).join("\n");
    const text = `Minha lista de skins FireSkins:\n\n${lines}`;
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Lista copiada!");
      track("copy_list", { count: String(filledCount) });
    }).catch(() => {
      toast.error("Erro ao copiar.");
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-t border-border p-4">
      <div className="container flex flex-col sm:flex-row items-center gap-3">
        <div className="flex-1 text-sm text-foreground">
          <span className="font-bold">{filledCount}</span> skin{filledCount !== 1 && "s"} selecionada{filledCount !== 1 && "s"}
          <span className="text-muted-foreground ml-2">· Consultar preço por item</span>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
            Limpar
          </Button>
          <Button variant="fire" size="sm" className="flex-1 sm:flex-none" asChild>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("cta_click", { location: "loadout", target: "whatsapp", count: String(filledCount) })}
            >
              <WhatsAppIcon className="size-4" />
              Enviar lista no WhatsApp
            </a>
          </Button>
        </div>
      </div>
      <div className="container mt-2 flex justify-end">
        <button
          onClick={handleCopy}
          className="text-xs text-muted-foreground hover:text-primary underline transition-colors"
        >
          <Copy className="size-3 inline mr-1" />
          Copiar lista
        </button>
      </div>
    </div>
  );
}
