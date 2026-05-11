import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import { Navigation } from "./components/navigation";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about-section";
import { ServicesSection } from "./components/services-section";
import { ProjectsSection } from "./components/projects-section";
import { ContactSection } from "./components/contact-section";
import { Footer } from "./components/footer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />

        <main className="relative">
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <ProjectsSection />
          <ContactSection />
        </main>

        <Footer />

        <Toaster position="top-right" richColors />
      </div>
    </ThemeProvider>
  );
}