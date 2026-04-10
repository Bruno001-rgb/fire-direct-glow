import { useState } from "react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { track } from "@/lib/track";
import { whatsappDirectLink } from "@/constants";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const FinalCTA = () => {
  const [whatsapp, setWhatsapp] = useState("");
  const [skinInterest, setSkinInterest] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!whatsapp.trim() || whatsapp.trim().length < 10) {
      toast.error("Digite um número de WhatsApp válido.");
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from("leads").insert({
        whatsapp: whatsapp.trim(),
        skin_interest: skinInterest.trim() || null,
        source: "final_cta",
      });
      if (error) throw error;
      toast.success("Recebemos! Vamos te chamar em breve.");
      setWhatsapp("");
      setSkinInterest("");
    } catch {
      toast.error("Erro ao enviar. Tenta de novo.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <a href={whatsappDirectLink("Oi, vim pelo site e quero ajuda pra encontrar uma skin!")} target="_blank" rel="noopener noreferrer" onClick={() => track("cta_click", { location: "final_cta", target: "whatsapp" })}>
              <WhatsAppIcon className="size-5 sm:size-6" />
              Chamar no WhatsApp
            </a>
          </Button>

          <p className="mt-6 text-[10px] sm:text-xs text-muted-foreground/70 uppercase tracking-widest">
            Resposta em menos de 5 minutos • Sem compromisso
          </p>

          {/* Lead capture form */}
          <div className="mt-10 pt-8 border-t border-border/30">
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">
              Ou deixe seu contato que a gente te chama
            </p>

            <div className="flex flex-col gap-3 max-w-sm mx-auto">
              <input
                type="tel"
                placeholder="Seu WhatsApp (com DDD)"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full h-11 rounded-lg bg-background/60 border border-primary/15 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
              />
              <input
                type="text"
                placeholder="Qual skin procura? (opcional)"
                value={skinInterest}
                onChange={(e) => setSkinInterest(e.target.value)}
                className="w-full h-11 rounded-lg bg-background/60 border border-primary/15 px-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/40 transition-colors"
              />
              <Button variant="fire-outline" className="w-full h-11" onClick={handleSubmit} disabled={submitting}>
                {submitting ? <Loader2 className="size-4 animate-spin" /> : "Enviar"}
              </Button>
            </div>

            <p className="mt-3 text-[10px] text-muted-foreground/50">
              Sem spam. A gente só entra em contato sobre skins.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </section>
  );
};

export default FinalCTA;
