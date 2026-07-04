import { CONTACT, heroImages, newProjects, useVariantPage } from "./data";
import {
  ContraShell, ContraHeader, StatsTiles, ProjectsSection, QuoteBand, ContraFooter,
  Eyebrow, Pill, serif,
} from "./contraKit";

// V7 — magazine mosaic hero: centered headline over a scattered collage of
// real project photos (Contra's scattered-gallery motif)
export default function V7Mosaic() {
  useVariantPage();

  return (
    <ContraShell>
      <ContraHeader />

      {/* hero */}
      <section className="relative z-10 px-5 md:px-12 pt-12 md:pt-16 pb-14 md:pb-20 text-center">
        <Eyebrow className="!mb-4">נגריית בוטיק משפחתית · למעלה מ־30 שנה</Eyebrow>
        <h1
          style={serif}
          className="contra-fade mx-auto text-[2.6rem] leading-[1.12] md:text-6xl md:leading-[1.1] font-medium max-w-3xl"
        >
          נגרות בעיצוב אישי.
          <br />
          <span className="font-light">כל בית מקבל את העץ שלו.</span>
        </h1>
        <div className="contra-fade flex flex-wrap justify-center items-center gap-3 mt-8" style={{ animationDelay: "0.1s" }}>
          <Pill href={CONTACT.whatsapp} filled external>דברו איתנו בוואטסאפ</Pill>
          <Pill href="#projects">לתיק העבודות</Pill>
        </div>

        {/* collage */}
        <div className="contra-fade mt-12 md:mt-16 grid grid-cols-12 gap-3 md:gap-5 items-end" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroImages.understairsStorage.src}
            alt={heroImages.understairsStorage.alt}
            loading="eager"
            decoding="async"
            className="col-span-4 md:col-span-2 rounded-xl rotate-[-3deg] shadow-lg border-4 border-white aspect-[3/4] object-cover"
          />
          <img
            src={heroImages.penthouseKitchen.src}
            alt={heroImages.penthouseKitchen.alt}
            loading="eager"
            decoding="async"
            className="col-span-8 md:col-span-5 rounded-xl shadow-lg aspect-[16/10] object-cover"
          />
          <img
            src={heroImages.oakCounterCloseup.src}
            alt={heroImages.oakCounterCloseup.alt}
            loading="eager"
            decoding="async"
            className="col-span-7 md:col-span-3 rounded-xl rotate-[2deg] shadow-lg border-4 border-white aspect-[4/5] object-cover"
          />
          <img
            src={heroImages.navyOakNiche.src}
            alt={heroImages.navyOakNiche.alt}
            loading="eager"
            decoding="async"
            className="col-span-5 md:col-span-2 rounded-xl rotate-[-2deg] shadow-lg aspect-[3/4] object-cover"
          />
        </div>
      </section>

      <StatsTiles />
      <ProjectsSection projects={newProjects} />
      <QuoteBand />
      <ContraFooter />
    </ContraShell>
  );
}
