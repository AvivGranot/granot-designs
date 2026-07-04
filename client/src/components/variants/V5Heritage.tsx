import PortfolioCarousel from "../PortfolioCarousel";
import FloatingContactButton from "../FloatingContactButton";
import { CONTACT, FACTS, heroImages, newProjects, useVariantPage } from "./data";

// V5 — the natural next chapter of granotdesign.com: pure white, serif
// headings, gold accents, the familiar carousel — now opening on a large
// cinematic photo hero.

const display = { fontFamily: "'Frank Ruhl Libre', 'Playfair Display', serif" };
const latin = { fontFamily: "'Playfair Display', serif" };
const body = { fontFamily: "'Inter', 'Assistant', sans-serif" };

const GOLD = "#C9A24B";
const BROWN = "hsl(28, 75%, 19%)";

export default function V5Heritage() {
  useVariantPage();

  return (
    <div dir="rtl" style={{ ...body, backgroundColor: "#FFFFFF", color: "#1A1A1A" }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes v5hFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        .v5h-fade { animation: v5hFade 1s ease-out both; }
      `}</style>

      {/* nav — same spirit as the live site */}
      <header className="flex items-center justify-between px-5 md:px-14 py-5 md:py-7">
        <div style={display} className="text-2xl md:text-[28px] font-medium tracking-tight">
          גרנות עיצובים
        </div>
        <nav className="hidden md:flex items-center gap-8 text-[13px] tracking-wide text-[#555]">
          <a href="#portfolio" className="hover:text-black transition-colors">תיק עבודות</a>
          <a href="#about" className="hover:text-black transition-colors">אודות</a>
          <a href="#contact" className="hover:text-black transition-colors">צור קשר</a>
        </nav>
        <a
          href={CONTACT.phoneHref}
          className="text-[13px] font-semibold border border-black/80 px-4 py-2 hover:bg-black hover:text-white transition-colors"
        >
          {CONTACT.phoneDisplay}
        </a>
      </header>

      {/* hero — full-width photo, headline beneath like an exhibition plate */}
      <section className="v5h-fade">
        <div className="px-0 md:px-14">
          <img
            src={heroImages.penthouseKitchen.src}
            alt={heroImages.penthouseKitchen.alt}
            loading="eager"
            decoding="async"
            className="w-full h-[52vh] md:h-[72vh] object-cover"
            style={{ objectPosition: "65% 60%" }}
          />
        </div>
        <div className="px-5 md:px-14 pt-8 md:pt-12 pb-12 md:pb-20 text-center">
          <div style={latin} className="italic text-[11px] md:text-xs tracking-[0.35em] mb-4" >
            <span style={{ color: GOLD }}>GRANOT DESIGNS · EST. 30+ YEARS</span>
          </div>
          <h1 style={display} className="text-4xl md:text-6xl leading-[1.15] font-medium max-w-3xl mx-auto">
            מטבחים וריהוט פנים
            <br />
            בעיצוב אישי
          </h1>
          <div className="mx-auto mt-6 h-px w-16" style={{ backgroundColor: GOLD }} />
          <p className="mt-6 text-[15px] md:text-lg text-[#555] max-w-xl mx-auto leading-relaxed">
            נגריית בוטיק משפחתית. למעלה משלושים שנות ניסיון ואלפי פרויקטים
            שעוצבו, נבנו והותקנו במרכז הארץ.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 text-[14px] font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: "#1A1A1A" }}
            >
              דברו איתנו בוואטסאפ
            </a>
            <a
              href="#portfolio"
              className="px-7 py-3 text-[14px] font-semibold border transition-colors hover:bg-black/5"
              style={{ borderColor: GOLD, color: BROWN }}
            >
              לתיק העבודות
            </a>
          </div>
        </div>
      </section>

      {/* stats — quiet gold numerals */}
      <section id="about" className="border-y border-black/10">
        <div className="grid grid-cols-3 divide-x divide-x-reverse divide-black/10">
          {FACTS.map((f) => (
            <div key={f.label} className="py-8 md:py-12 text-center px-2">
              <div style={display} className="text-3xl md:text-5xl font-medium" >
                <span style={{ color: GOLD }}>{f.value}</span>
              </div>
              <div className="mt-2 text-[12px] md:text-sm text-[#666]">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* portfolio — the site's familiar carousel, new work */}
      <section id="portfolio" className="pt-14 md:pt-20">
        <h2 style={display} className="text-3xl md:text-5xl font-medium text-center mb-3">
          תיק עבודות
        </h2>
        <p className="text-center text-[#666] text-[14px] md:text-base mb-8 md:mb-10">
          פרויקטים אחרונים מהנגרייה — לחצו להגדלה
        </p>
        <PortfolioCarousel images={newProjects.map(({ src, alt }) => ({ src, alt }))} />
      </section>

      {/* quote — the founder's line, like the live about section */}
      <section className="px-5 md:px-14 py-16 md:py-24 text-center">
        <div style={display} className="text-3xl md:text-5xl font-medium leading-snug" >
          ״עיצוב משפיע.״
        </div>
        <p className="mt-5 text-[14px] md:text-base text-[#666] max-w-2xl mx-auto leading-relaxed">
          דוב גרנות, מייסד שותף ובוגר בצלאל — האקדמיה לאמנות ועיצוב. אנחנו
          עובדים בשיתוף פעולה מלא איתכם, עם תכנון קפדני של כל פרט ברמת
          המאקרו והמיקרו.
        </p>
        <div className="mx-auto mt-8 h-px w-16" style={{ backgroundColor: GOLD }} />
      </section>

      {/* contact */}
      <footer id="contact" className="px-5 md:px-14 pb-16 md:pb-24 text-center">
        <h2 style={display} className="text-3xl md:text-4xl font-medium mb-8">צור קשר</h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-10 text-[15px]">
          <a href={CONTACT.phoneHref} className="hover:opacity-70" style={{ color: BROWN }}>
            <span className="text-[#888] me-2">טלפון:</span>{CONTACT.phoneDisplay}
          </a>
          <a href={`mailto:${CONTACT.email}`} className="hover:opacity-70" style={{ color: BROWN }}>
            <span className="text-[#888] me-2">אימייל:</span>{CONTACT.email}
          </a>
        </div>
        <div className="mt-12 text-[11px] tracking-[0.3em] text-[#999]" style={latin}>
          GRANOT DESIGNS
        </div>
      </footer>

      <FloatingContactButton />
    </div>
  );
}
