import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import DrawerAppBar from "@/components/Navbar";
import Body from "@/components/Body";


export default function Home() {
  return (
    <div>
      <DrawerAppBar/>
      <HeroSection/>
      <Body/>
    </div>

  );
}
