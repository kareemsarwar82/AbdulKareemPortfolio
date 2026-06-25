import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FutureGoals } from "@/components/sections/FutureGoals";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactSection } from "@/components/sections/ContactSection";
import { HeroFilmSection } from "../components/sections/HeroFilmSection";
import { Footer } from "@/components/sections/Footer";
import { PortfolioGuide } from "@/components/ui/PortfolioGuide";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />

      <main className="flex-grow">
        <HeroSection />
        <TrustBar />
        <AboutSection />
        <ServicesSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <FutureGoals />
        <Testimonials />
        <ContactSection />
        {/* Task 2 — 30s Animated Hero Film — closing section */}
        <HeroFilmSection />
      </main>

      <Footer />

      {/* Task 1 — AI Floating Guide */}
      <PortfolioGuide />
    </div>
  );
}