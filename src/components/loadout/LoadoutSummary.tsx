import { useLoadout, LOADOUT_SLOTS } from "@/contexts/LoadoutContext";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { useWhatsAppUrl } from "@/hooks/useWhatsAppUrl";

export default function LoadoutSummary() {
  const { loadout, filledCount, clearAll } = useLoadout();
  const whatsappUrl = useWhatsAppUrl();

  if (filledCount === 0) return null;

  const items = LOADOUT_SLOTS.filter((s) => loadout[s.key]).map(
    (s) => `- ${s.label}: ${loadout[s.key]!.name}`
  );

  const message = encodeURIComponent(
    `Olá! Gostaria de montar esse loadout na FireSkins:\n${items.join("\n")}\nPodem me passar os preços e disponibilidade?`
  );

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
            <a href={`${whatsappUrl}?text=${message}`} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" />
              Enviar loadout no WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
