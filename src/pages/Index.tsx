import ParticleBackground from "@/components/ParticleBackground";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ContentAnalyzer from "@/components/ContentAnalyzer";
import FeaturesSection from "@/components/FeaturesSection";
import PricingSection from "@/components/PricingSection";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-gradient-bg overflow-x-hidden">
      <ParticleBackground />
      <Header />
      
      <main className="relative z-10">
        <HeroSection />
        <ContentAnalyzer />
        <FeaturesSection />
        <PricingSection />
      </main>
    </div>
  );
};

export default Index;
