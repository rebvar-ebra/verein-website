import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectSection } from "@/components/sections/ProjectSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { CTASection } from "@/components/sections/CTASection";
import { NewsSection } from "@/components/sections/NewsSection";
import { HelpSection } from "@/components/sections/HelpSection";
export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <ProjectSection />
      <IntroSection />
      <CTASection />
      <NewsSection />
      <HelpSection />
    </main>
  );
}
