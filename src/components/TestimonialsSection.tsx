import { useState, useEffect } from "react";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useIsMobile } from "@/hooks/use-mobile";
import { MessageCircle } from "lucide-react";

const TestimonialsSection = () => {
  const { data: testimonials } = useTestimonials(true);
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  useEffect(() => {
    if (!isMobile || !testimonials || testimonials.length === 0) return;
    const interval = setInterval(() => {
      setSlideDirection('left');
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [isMobile, testimonials]);

  if (!testimonials || testimonials.length === 0) return null;

  const items = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden bg-black py-10 sm:py-14 lg:py-16">
      {/* Top separator */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(22 91% 47% / 0.4), hsl(38 92% 49% / 0.3), transparent)",
        }}
      />

      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, hsl(22 91% 47% / 0.04) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, hsl(0 0% 0% / 0.5) 100%)",
        }}
      />

      {/* Header */}
      <div className="container relative z-10 mb-6 sm:mb-8 lg:mb-10">
        <div className="flex items-center gap-2.5 mb-3">
          <MessageCircle className="size-5 text-primary" />
          <h2 className="section-heading font-heading">
            O que dizem nossos{" "}
            <span className="text-gradient-fire">clientes</span>
          </h2>
        </div>
        <p className="text-sm text-muted-foreground max-w-md">
          Prints reais de negociações e feedbacks no WhatsApp.
        </p>
      </div>

      {/* Mobile: single card carousel */}
      {isMobile ? (
        <div className="relative z-10 flex justify-center px-4">
          <div
            className="w-[85vw] max-w-[320px] rounded-xl overflow-hidden border border-primary/10 bg-card/40 backdrop-blur-sm shadow-lg transition-opacity duration-700"
            key={testimonials[currentIndex].id}
          >
            <img
              src={testimonials[currentIndex].image_url}
              alt={testimonials[currentIndex].title || "Depoimento de cliente"}
              loading="lazy"
              className="w-full h-auto object-contain"
            />
            {testimonials[currentIndex].title && (
              <div className="px-3 py-2 border-t border-primary/8">
                <p className="text-sm text-muted-foreground font-medium truncate">
                  {testimonials[currentIndex].title}
                </p>
              </div>
            )}
          </div>
          {/* Dots */}
          <div className="absolute -bottom-6 left-0 right-0 flex justify-center gap-1.5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
              />
            ))}
          </div>
        </div>
      ) : (
        /* Desktop: continuous scroll */
        <div className="relative z-10 overflow-hidden" style={{ touchAction: "pan-x" }}>
          <div className="testimonials-track flex gap-3 sm:gap-5 px-4">
            {items.map((t, i) => (
              <div
                key={`${t.id}-${i}`}
                className="flex-shrink-0 w-[220px] sm:w-[280px] lg:w-[300px] rounded-xl overflow-hidden border border-primary/10 bg-card/40 backdrop-blur-sm shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <img
                  src={t.image_url}
                  alt={t.title || "Depoimento de cliente"}
                  loading="lazy"
                  className="w-full h-auto object-contain"
                />
                {t.title && (
                  <div className="px-3 py-2 border-t border-primary/8">
                    <p className="text-sm text-muted-foreground font-medium truncate">
                      {t.title}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Edge fades */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-20 lg:w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-20 lg:w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>
      )}

      {/* Bottom separator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, hsl(254 55% 52% / 0.3), hsl(22 91% 47% / 0.3), transparent)",
        }}
      />
    </section>
  );
};

export default TestimonialsSection;
