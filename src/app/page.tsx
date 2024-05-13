import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import DrawerAppBar from "@/components/Navbar";
import Body from "@/components/Body";
import Restrauant from "@/components/Restrauant";


export default function Home() {
  return (
    <div>
      <DrawerAppBar/>
      <HeroSection/>
      <Body/>
      <Restrauant/>
    </div>

  );
}
