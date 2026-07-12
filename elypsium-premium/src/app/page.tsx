import { HeroCarousel } from "@/components/home/HeroCarousel";
import { DetailsSection } from "@/components/home/DetailsSection";
import { UpcomingProjectsSection } from "@/components/home/UpcomingProjectsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { AboutSection } from "@/components/home/AboutSection";

export default function Home() {
  return (
    <main className="w-full bg-[var(--background)]">
      <HeroCarousel />
      <DetailsSection />
      <UpcomingProjectsSection />
      <CategoriesSection />
      <AboutSection />
    </main>
  );
}
