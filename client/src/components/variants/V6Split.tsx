import { CONTACT, heroImages, newProjects, useVariantPage } from "./data";
import {
  ContraShell, ContraHeader, StatsTiles, ProjectsSection, QuoteBand, ContraFooter,
  Eyebrow, Pill, serif, SAGE,
} from "./contraKit";

// V6 — editorial split hero: serif headline beside a tall photo with an
// offset sage frame and a small overlapping detail shot
export default function V6Split() {
  useVariantPage();

  return (
    <ContraShell>
      <ContraHeader />

      {/* hero */}
      <section className="relative z-10 px-5 md:px-12 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="contra-fade">
            <Eyebrow>נגריית בוטיק משפחתית · למעלה מ־30 שנה</Eyebrow>
            <h1
              style={serif}
              className="text-[2.6rem] leading-[1.12] md:text-6xl md:leading-[1.08] font-medium"
            >
              נגרות בעיצוב אישי.
              <br />
              <span className="font-light">שלושים שנה של דיוק,</span>
              <br />
              <span className="font-light">אלפי בתים במרכז הארץ.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-9">
              <Pill href={CONTACT.whatsapp} filled external>דברו איתנו בוואטסאפ</Pill>
              <Pill href="#projects">לתיק העבודות</Pill>
            </div>
          </div>

          <div className="contra-fade relative me-2 mb-6 md:mb-0" style={{ animationDelay: "0.15s" }}>
            <div
              aria-hidden
              className="absolute -top-3 -left-3 md:-top-5 md:-left-5 w-full h-full rounded-xl border-2"
              style={{ borderColor: SAGE }}
            />
            <img
              src={heroImages.oakCounterCloseup.src}
              alt={heroImages.oakCounterCloseup.alt}
              loading="eager"
              decoding="async"
              className="relative w-full max-h-[420px] md:max-h-[560px] object-cover rounded-xl"
            />
            <img
              src={heroImages.understairsStorage.src}
              alt={heroImages.understairsStorage.alt}
              loading="eager"
              decoding="async"
              className="absolute -bottom-8 -right-3 md:-bottom-10 md:-right-6 w-28 md:w-40 rounded-lg shadow-xl rotate-[-4deg] border-4 border-white"
            />
          </div>
        </div>
      </section>

      <StatsTiles />
      <ProjectsSection projects={newProjects} />
      <QuoteBand />
      <ContraFooter />
    </ContraShell>
  );
}
