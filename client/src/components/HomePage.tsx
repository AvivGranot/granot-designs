import { useEffect } from "react";

import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import OverlayMenu from "./OverlayMenu";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import FloatingContactButton from "./FloatingContactButton";
import FloatingShareNav from "./FloatingShareNav";
import PortfolioGrid from "./PortfolioGrid";

export default function HomePage() {
  useEffect(() => {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'he');
  }, []);

  return (
    <>
      <Navigation />

      <section id="hero">
        <HeroSection />
      </section>

      <section id="portfolio">
        <PortfolioGrid />
      </section>

      <AboutSection />
      <ContactSection />
      <FloatingContactButton />
      <FloatingShareNav />
      <OverlayMenu />
    </>
  );
}
