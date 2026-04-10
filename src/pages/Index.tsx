import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import VideoShowcase from "@/components/VideoShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SkinsSidebar from "@/components/SkinsSidebar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex pt-[5.5rem] sm:pt-24">
        <SkinsSidebar />

        <main className="flex-1 min-w-0">
          <HeroSection />
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
