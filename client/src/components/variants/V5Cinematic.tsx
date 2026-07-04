import { CONTACT, heroImages, newProjects, useVariantPage } from "./data";
import {
  ContraShell, ContraHeader, StatsTiles, ProjectsSection, QuoteBand, ContraFooter,
  Eyebrow, serif, LINEN,
} from "./contraKit";

// V5 — cinematic full-bleed photo hero with slow Ken Burns motion
export default function V5Cinematic() {
  useVariantPage();

  return (
    <ContraShell>
      {/* hero */}
      <section className="relative z-10 min-h-[92vh] flex flex-col overflow-hidden">
        <div aria-hidden className="absolute inset-0">
          <img
            src={heroImages.penthouseKitchen.src}
            alt=""
            className="contra-kenburns w-full h-full object-cover"
            style={{ objectPosition: "70% 60%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(38,36,31,0.82) 0%, rgba(38,36,31,0.35) 45%, rgba(38,36,31,0.25) 100%)",
            }}
          />
        </div>

        <div className="relative">
          <ContraHeader onDark />
        </div>

        <div className="relative mt-auto px-5 md:px-12 pb-14 md:pb-20 pt-24 text-white">
          <Eyebrow className="!text-white/70">נגריית בוטיק משפחתית · למעלה מ־30 שנה</Eyebrow>
          <h1
            style={serif}
            className="contra-fade text-[2.6rem] leading-[1.12] md:text-7xl md:leading-[1.08] font-medium max-w-3xl"
          >
            נגרות בעיצוב אישי.
            <br />
            <span className="font-light">מהנגרייה שלנו, לבית שלכם.</span>
          </h1>
          <div className="contra-fade flex flex-wrap items-center gap-3 mt-8" style={{ animationDelay: "0.15s" }}>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-6 py-3 text-[15px] font-semibold transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: LINEN, color: "#26241F" }}
            >
              דברו איתנו בוואטסאפ
            </a>
            <a
              href="#projects"
              className="rounded-full px-6 py-3 text-[15px] font-semibold border border-white/60 text-white hover:bg-white/10 transition-colors"
            >
              לתיק העבודות
            </a>
          </div>
        </div>
      </section>

      <div className="relative z-10 pt-14 md:pt-20">
        <StatsTiles />
      </div>
      <ProjectsSection projects={newProjects} />
      <QuoteBand />
      <ContraFooter />
    </ContraShell>
  );
}
