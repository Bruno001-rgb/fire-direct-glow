import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import HeroSection from "@/components/HeroSection";
import BudgetSection from "@/components/BudgetSection";
import InventoryBuilderSection from "@/components/InventoryBuilderSection";
import TrustLevelsSection from "@/components/TrustLevelsSection";
import CategoriesSection from "@/components/CategoriesSection";
import VideoShowcase from "@/components/VideoShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SkinsSidebar from "@/components/SkinsSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StatsBar />
      <Header />

      <div className="flex pt-14 sm:pt-16">
        <SkinsSidebar />

        <main className="flex-1 min-w-0">
          <HeroSection />
          <BudgetSection />
          <InventoryBuilderSection />
          <TrustLevelsSection />
          <CategoriesSection />
          <VideoShowcase />
          <TestimonialsSection />
          <FinalCTA />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;
