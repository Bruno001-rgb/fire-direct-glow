import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustStrip from "@/components/TrustStrip";
import CategoriesSection from "@/components/CategoriesSection";
import HowItWorks from "@/components/HowItWorks";
import FinalCTA from "@/components/FinalCTA";
import SkinsSidebar from "@/components/SkinsSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex pt-14 sm:pt-16">
        {/* Sidebar — desktop only */}
        <SkinsSidebar />

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <HeroSection />
          <TrustStrip />
          <CategoriesSection />
          <HowItWorks />
          <FinalCTA />

          <footer className="py-6 border-t border-primary/10 text-center text-[10px] text-muted-foreground uppercase tracking-widest">
            <div className="container">
              © {new Date().getFullYear()} <span className="text-gradient-fire font-bold">FireSkins</span> — Todos os direitos reservados.
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Index;
