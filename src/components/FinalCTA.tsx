import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/track";

const WHATSAPP_URL = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      {/* Main content */}
      <div
        className="relative py-16 sm:py-24 px-4"
        style={{
          background: "radial-gradient(ellipse at center, rgba(233,90,12,0.05) 0%, rgba(0,0,0,0.95) 70%, #000 100%)",
        }}
      >
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-heading uppercase tracking-wider mb-4 text-foreground">
            Não achou o que queria?
          </h2>

          <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-10">
            Fala com a gente no WhatsApp que a gente encontra pra você.
          </p>

          <Button
            variant="fire"
            size="lg"
            className="text-sm sm:text-base px-12 sm:px-16 h-14 uppercase tracking-wider"
            asChild
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" onClick={() => track("cta_click", { location: "final_cta", target: "whatsapp" })}>
              <WhatsAppIcon className="size-5 sm:size-6" />
              Chamar no WhatsApp
            </a>
          </Button>

          <p className="mt-6 text-[10px] sm:text-xs text-muted-foreground/70 uppercase tracking-widest">
            Resposta em menos de 5 minutos • Sem compromisso
          </p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default FinalCTA;
