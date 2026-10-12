import { AboutSection } from "../components/home/AboutSection";
import { CinematicShowcase } from "../components/home/CinematicShowcase";
import { HomeHero } from "../components/home/HomeHero";
import { FeaturedVehicles } from "../features/vehicles/components/FeaturedVehicles";

export function HomePage() {
  return (
    <main>
      <HomeHero />
      <CinematicShowcase />
      <FeaturedVehicles />
      <AboutSection />
    </main>
  );
}
