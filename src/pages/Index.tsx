import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import HeroSection from "@/components/HeroSection";

import CategoriesSection from "@/components/CategoriesSection";
import VideoShowcase from "@/components/VideoShowcase";
import FinalCTA from "@/components/FinalCTA";
import SkinsSidebar from "@/components/SkinsSidebar";

const Index = () => { 
  return (
    <div className="min-h-screen bg-background">
      <StatsBar />
      <Header />

      <div className="flex pt-14 sm:pt-16">
        {/* Sidebar — desktop only */}
        <SkinsSidebar />

        {/* Main content */}
        <main className="flex-1 min-w-0">
          <HeroSection />
          
          <CategoriesSection />
          <VideoShowcase />
          <FinalCTA />

          <footer id="contato" className="py-6 border-t border-primary/10 text-center text-[10px] text-muted-foreground uppercase tracking-widest">
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
