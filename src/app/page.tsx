import { HeroCarousel } from "@/components/home/HeroCarousel";
import { DetailsSection } from "@/components/home/DetailsSection";
import { UpcomingProjectsSection } from "@/components/home/UpcomingProjectsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { VideoSection } from "@/components/home/VideoSection";
import { TeamsSection } from "@/components/home/TeamsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { InstagramSection } from "@/components/home/InstagramSection";
import { ContactSection } from "@/components/home/ContactSection";

export default function Home() {
  return (
    <main className="w-full bg-[var(--background)]">
      <HeroCarousel />
      <DetailsSection />
      <UpcomingProjectsSection />
      <CategoriesSection />
      <AboutSection />
      <VideoSection />
      <TeamsSection />
      <FaqSection />
      <InstagramSection />
      <ContactSection />
    </main>
  );
}
