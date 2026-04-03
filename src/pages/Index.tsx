import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedSkins from "@/components/FeaturedSkins";
import HowItWorks from "@/components/HowItWorks";
import BenefitsSection from "@/components/BenefitsSection";
import FinalCTA from "@/components/FinalCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <TrustStrip />
      <CategoriesSection />
      <FeaturedSkins />
      <HowItWorks />
      <BenefitsSection />
      <FinalCTA />

      <footer className="py-8 border-t border-primary/10 text-center text-xs text-muted-foreground uppercase tracking-widest">
        <div className="container">
          © {new Date().getFullYear()} <span className="text-gradient-fire font-bold">FireSkins</span> — Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default Index;
