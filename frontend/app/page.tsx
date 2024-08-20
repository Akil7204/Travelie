import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import HeroSection from "@/components/page/HeroSection";
import ServiceSection from "@/components/page/ServiceSection";
import TopSection from "@/components/page/TopSection";


export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServiceSection />
      <TopSection />
      <Footer />
    </div>
    
  );
}
