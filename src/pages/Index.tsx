import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import PetCareGuide from "@/components/PetCareGuide";
import ServicesSection from "@/components/ServicesSection";
import TrustSafety from "@/components/TrustSafety";
import Testimonials from "@/components/Testimonials";
import AppDownload from "@/components/AppDownload";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <PetCareGuide />
      <ServicesSection />
      <TrustSafety />
      <Testimonials />
      <AppDownload />
      <CTASection />
      <Footer />
    </div>
  );
};

export default Index;
