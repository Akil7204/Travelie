import Navbar from "@/components/NavBar";
import HeroSection from "@/components/page/HeroSection";
import ServiceSection from "@/components/page/ServiceSection";


export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServiceSection />
    </div>
    
  );
}
