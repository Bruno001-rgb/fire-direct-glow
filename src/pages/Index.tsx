import Header from "@/components/Header";
import StatsBar from "@/components/StatsBar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import VideoShowcase from "@/components/VideoShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StatsBar />
      <Header />

      <main className="pt-14 sm:pt-16">
        <HeroSection />
        <CategoriesSection />
        <VideoShowcase />
        <TestimonialsSection />
        <FinalCTA />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
