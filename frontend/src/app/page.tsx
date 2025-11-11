import Navbar from "@/components/Navbar"
import HeroCarousel from "@/components/HeroCarousel"
import Footer from "@/components/Footer";


export default function Home() {
  return(
    <>
    <Navbar></Navbar>
    <HeroCarousel mangas={[]}/>
    <Footer/>
    </>
  );
}