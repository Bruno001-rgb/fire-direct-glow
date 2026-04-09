import { X } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import type { ShowcaseSkin } from "@/hooks/useShowcaseSkins";

const WHATSAPP_URL = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

const rarityText: Record<string, string> = {
  Covert: "text-red-400",
  Contraband: "text-amber-400",
  Extraordinary: "text-fuchsia-400",
  Remarkable: "text-purple-400",
  Exotic: "text-pink-400",
  Classified: "text-rose-400",
  "Mil-Spec Grade": "text-blue-400",
  Restricted: "text-indigo-400",
  Industrial: "text-cyan-400",
  Consumer: "text-gray-400",
};

interface SkinViewerModalProps {
  skin: ShowcaseSkin | null;
  open: boolean;
  onClose: () => void;
}

const SkinViewerModal = ({ skin, open, onClose }: SkinViewerModalProps) => {
  if (!open || !skin) return null;

  const skinLabel = `${skin.name} | ${skin.skin}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center"
      onClick={onClose}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/85" />

      {/* Modal */}
      <div
        className="relative w-full max-w-5xl mx-auto flex flex-col animate-slide-up border-t-2 border-primary rounded-t-xl overflow-hidden"
        style={{ background: "#0a0a0a" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-4 sm:p-5">
          <div className="min-w-0">
            <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground truncate">
              {skinLabel}
            </h3>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${rarityText[skin.rarity] || "text-muted-foreground"}`}
            >
              {skin.rarity}
            </span>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Viewer iframe */}
        <div className="w-full px-2 sm:px-4">
          <iframe
            src="https://inspect.skin/"
            title={`Visualizador 3D — ${skinLabel}`}
            className="w-full rounded-lg border border-primary/10"
            style={{ height: "60vh", background: "transparent" }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
            loading="lazy"
          />
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-primary text-primary-foreground font-bold text-sm uppercase tracking-wider hover:brightness-110 transition-all"
          >
            <WhatsAppIcon className="size-4" />
            Negociar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default SkinViewerModal;
