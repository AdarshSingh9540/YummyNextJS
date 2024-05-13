import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import DrawerAppBar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <DrawerAppBar/>
      <HeroSection/>
      <Footer/>
    </div>

  );
}
