import { CONTACT, heroVideo, newProjects, useVariantPage } from "./data";
import {
  ContraShell, ContraHeader, StatsTiles, ProjectsSection, QuoteBand, ContraFooter,
  Eyebrow, Pill, serif, SAGE,
} from "./contraKit";

// V8 — video hero: real installation footage in a framed portrait player
// beside the headline (muted, autoplaying, loops)
export default function V8Video() {
  useVariantPage();

  return (
    <ContraShell>
      <ContraHeader />

      {/* hero */}
      <section className="relative z-10 px-5 md:px-12 pt-10 md:pt-16 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          <div className="contra-fade md:col-span-3">
            <Eyebrow>נגריית בוטיק משפחתית · למעלה מ־30 שנה</Eyebrow>
            <h1
              style={serif}
              className="text-[2.6rem] leading-[1.12] md:text-6xl md:leading-[1.08] font-medium"
            >
              נגרות בעיצוב אישי.
              <br />
              <span className="font-light">ככה זה נראה ביום ההתקנה.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-[#4A4A44] leading-relaxed max-w-md">
              בלי הדמיות ובלי פילטרים — צילום אמיתי מהתקנה של ארון קיר
              בהתאמה אישית, כמו אלפי הפרויקטים שמסרנו בשלושים השנים האחרונות.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-8">
              <Pill href={CONTACT.whatsapp} filled external>דברו איתנו בוואטסאפ</Pill>
              <Pill href="#projects">לתיק העבודות</Pill>
            </div>
          </div>

          <div className="contra-fade relative md:col-span-2 max-w-[340px] md:max-w-none mx-auto w-full" style={{ animationDelay: "0.15s" }}>
            <div
              aria-hidden
              className="absolute -top-3 -left-3 md:-top-5 md:-left-5 w-full h-full rounded-2xl border-2"
              style={{ borderColor: SAGE }}
            />
            <video
              className="relative w-full rounded-2xl object-cover aspect-[9/16] max-h-[70vh]"
              src={heroVideo.src}
              poster={heroVideo.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={heroVideo.alt}
            />
            <div className="mt-3 text-xs text-[#8A867B] text-center">
              מתוך התקנה אמיתית אצל לקוח
            </div>
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
