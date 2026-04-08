import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppIcon from "@/components/WhatsAppIcon";

const WHATSAPP_GROUP = "https://chat.whatsapp.com/JYNmohUbdnI4eppUVBCeMK";

const budgetOptions = ["Até R$300", "R$300–R$800", "R$800–R$2.000", "Acima de R$2.000"];
const weaponOptions = ["AK-47", "M4A4", "AWP", "Facas", "Luvas", "Pistolas", "Outros"];
const styleOptions = ["Minimalista", "Colorido", "Dark", "Raro", "Qualquer um"];

const InventoryBuilderSection = () => {
  const [budget, setBudget] = useState<string | null>(null);
  const [weapons, setWeapons] = useState<string[]>([]);
  const [style, setStyle] = useState<string | null>(null);

  const toggleWeapon = (w: string) => {
    setWeapons((prev) => (prev.includes(w) ? prev.filter((x) => x !== w) : [...prev, w]));
  };

  const isComplete = budget && weapons.length > 0 && style;

  const whatsappUrl = isComplete
    ? WHATSAPP_GROUP
    : "#";

  const currentStep = !budget ? 1 : weapons.length === 0 ? 2 : !style ? 3 : 3;

  return (
    <section className="relative py-16 sm:py-20 bg-black">
      <div className="container max-w-3xl">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight font-heading text-foreground mb-3">
            Montador de Inventário
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto">
            Responda 3 perguntas e receba sugestões personalizadas no WhatsApp.
          </p>
        </div>

        <div className="rounded-xl border border-primary/15 bg-card/60 backdrop-blur-sm p-5 sm:p-8">
          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`size-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    (s === 1 && budget) || (s === 2 && weapons.length > 0) || (s === 3 && style)
                      ? "bg-primary text-primary-foreground"
                      : s <= currentStep
                        ? "border border-primary/40 text-primary"
                        : "border border-muted-foreground/20 text-muted-foreground/40"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && <div className="w-8 sm:w-12 h-px bg-muted-foreground/20" />}
              </div>
            ))}
          </div>

          {/* Step 1 */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-foreground mb-3">Qual seu budget?</p>
            <div className="flex flex-wrap gap-2">
              {budgetOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setBudget(opt)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
                    budget === opt
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-muted-foreground/20 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2 */}
          {budget && (
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-3">Quais armas você usa?</p>
              <div className="flex flex-wrap gap-2">
                {weaponOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleWeapon(opt)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
                      weapons.includes(opt)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-muted-foreground/20 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {budget && weapons.length > 0 && (
            <div className="mb-8">
              <p className="text-sm font-semibold text-foreground mb-3">Qual seu estilo?</p>
              <div className="flex flex-wrap gap-2">
                {styleOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setStyle(opt)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
                      style === opt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "border-muted-foreground/20 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          {isComplete && (
            <Button variant="fire" size="lg" className="w-full uppercase tracking-wider text-sm rounded-sm" asChild>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="size-4" />
                Receber sugestões no WhatsApp
                <ArrowRight className="size-4 ml-1" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default InventoryBuilderSection;
