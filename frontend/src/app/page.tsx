import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import DiscoverySection from "@/components/DiscoverySection";
import NewReleases from "@/components/NewReleases";
import MostViewed from "@/components/MostViewed";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <HeroCarousel />
      <DiscoverySection />
      <NewReleases />
      <MostViewed />
      <Footer />
    </main>
  );
}