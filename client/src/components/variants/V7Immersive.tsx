import { CONTACT, heroImages, newProjects, useVariantPage } from "./data";

// V7 — free style: immersive dark showcase in the vein of award-winning
// studio portfolios. Full-screen crossfading hero, oversized display serif,
// scrolling marquee, numbered full-width project panels, brass accents.

const display = { fontFamily: "'Frank Ruhl Libre', serif", fontWeight: 900 as const };
const serifLight = { fontFamily: "'Frank Ruhl Libre', serif" };
const body = { fontFamily: "'Assistant', sans-serif" };

const CHARCOAL = "#161412";
const CREAM = "#F2EDE4";
const BRASS = "#B08D57";

const slides = [
  heroImages.penthouseKitchen,
  { src: newProjects[1].src, alt: newProjects[1].alt },
  { src: newProjects[0].src, alt: newProjects[0].alt },
];

const panels = [
  { ...newProjects[0], line: "אי מרכזי עם חזיתות אלון — הלב של הבית." },
  { ...newProjects[2], line: "קיר ארונות שנמדד, תוכנן והותקן במילימטרים." },
  { ...newProjects[5], line: "גם מתחת למדרגות — אף סנטימטר לא הולך לאיבוד." },
];

const marqueeWords = ["מטבחים", "ארונות קיר", "ריהוט מובנה", "חדרי שינה", "נגרות אומן", "עיצוב אישי"];

export default function V7Immersive() {
  useVariantPage();

  return (
    <div dir="rtl" style={{ ...body, backgroundColor: CHARCOAL, color: CREAM }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes v7Slide {
          0% { opacity: 0; transform: scale(1.06); }
          7% { opacity: 1; }
          33% { opacity: 1; }
          41% { opacity: 0; transform: scale(1); }
          100% { opacity: 0; }
        }
        .v7-slide { animation: v7Slide 15s linear infinite; opacity: 0; }
        @keyframes v7Marquee { from { transform: translateX(0); } to { transform: translateX(50%); } }
        .v7-marquee { animation: v7Marquee 28s linear infinite; }
        @keyframes v7Up { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
        .v7-up { animation: v7Up 1.1s cubic-bezier(0.22,1,0.36,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .v7-slide { animation: none; opacity: 1; }
          .v7-slide:not(:first-child) { display: none; }
          .v7-marquee { animation: none; }
        }
      `}</style>

      {/* hero — full-screen slideshow */}
      <section className="relative h-[100svh] min-h-[560px]">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          {slides.map((s, i) => (
            <img
              key={i}
              src={s.src}
              alt=""
              loading="eager"
              decoding="async"
              className="v7-slide absolute inset-0 w-full h-full object-cover"
              style={{ animationDelay: `${i * 5}s` }}
            />
          ))}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(22,20,18,0.95), rgba(22,20,18,0.35) 55%, rgba(22,20,18,0.45))" }} />
        </div>

        <header className="relative flex items-center justify-between px-5 md:px-12 pt-6">
          <div style={serifLight} className="text-xl md:text-2xl font-medium">גרנות עיצובים</div>
          <a
            href={CONTACT.phoneHref}
            className="text-sm border px-4 py-2 hover:bg-white/10 transition-colors rounded-full"
            style={{ borderColor: BRASS, color: CREAM }}
          >
            {CONTACT.phoneDisplay}
          </a>
        </header>

        <div className="absolute inset-x-0 bottom-0 px-5 md:px-12 pb-12 md:pb-16">
          <div className="v7-up text-[11px] md:text-xs tracking-[0.4em]" style={{ color: BRASS }}>
            נגריית בוטיק · מאז שנות ה־90
          </div>
          <h1 style={display} className="v7-up mt-4 text-5xl md:text-8xl leading-[1.02]">
            אומנות
            <br />
            הנגרות.
          </h1>
          <div className="v7-up mt-7 flex flex-wrap items-center gap-4" style={{ animationDelay: "0.2s" }}>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 text-[15px] font-semibold rounded-full transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: BRASS, color: CHARCOAL }}
            >
              דברו איתנו בוואטסאפ
            </a>
            <a href="#work" className="text-[15px] underline underline-offset-8 decoration-1 opacity-90 hover:opacity-100" style={{ textDecorationColor: BRASS }}>
              לצפייה בעבודות ↓
            </a>
          </div>
        </div>
      </section>

      {/* marquee */}
      <div className="border-y overflow-hidden py-4 md:py-5" style={{ borderColor: "rgba(176,141,87,0.35)" }}>
        <div className="v7-marquee flex w-max gap-0" style={{ direction: "ltr" }}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0">
              {marqueeWords.map((w) => (
                <span key={`${dup}-${w}`} style={serifLight} className="text-lg md:text-2xl px-6 md:px-10 whitespace-nowrap opacity-80">
                  {w} <span style={{ color: BRASS }} className="ps-6 md:ps-10">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* numbered project panels */}
      <section id="work" className="px-5 md:px-12 py-16 md:py-24 space-y-16 md:space-y-28">
        {panels.map((p, i) => (
          <article key={i} className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-end`}>
            <div className={`md:col-span-8 ${i % 2 === 1 ? "md:order-2 md:col-start-5" : ""}`}>
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-[46vh] md:h-[64vh] object-cover rounded-sm"
              />
            </div>
            <div className={`md:col-span-4 ${i % 2 === 1 ? "md:order-1 md:col-start-1 md:text-left" : ""}`}>
              <div style={display} className="text-5xl md:text-7xl leading-none" aria-hidden>
                <span style={{ color: BRASS }}>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h2 style={serifLight} className="mt-4 text-2xl md:text-3xl leading-snug">{p.alt}</h2>
              <p className="mt-3 text-[15px] md:text-base opacity-75 leading-relaxed">{p.line}</p>
              <div className="mt-4 text-[11px] tracking-[0.3em]" style={{ color: BRASS }}>{p.label}</div>
            </div>
          </article>
        ))}
      </section>

      {/* trust line */}
      <section className="px-5 md:px-12 pb-16 md:pb-24 text-center">
        <p style={serifLight} className="text-2xl md:text-4xl leading-relaxed max-w-3xl mx-auto">
          למעלה מ־30 שנות ניסיון. אלפי פרויקטים.
          <br />
          תכנון אישי של דוב גרנות, בוגר <span style={{ color: BRASS }}>בצלאל</span>.
        </p>
      </section>

      {/* contact */}
      <footer className="border-t px-5 md:px-12 py-14 md:py-20" style={{ borderColor: "rgba(176,141,87,0.35)" }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 style={display} className="text-4xl md:text-6xl leading-none">
            הפרויקט הבא —<br />שלכם.
          </h2>
          <div className="flex flex-wrap gap-3">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 text-[15px] font-semibold rounded-full"
              style={{ backgroundColor: BRASS, color: CHARCOAL }}
            >
              וואטסאפ
            </a>
            <a href={CONTACT.phoneHref} className="px-7 py-3.5 text-[15px] rounded-full border" style={{ borderColor: BRASS }}>
              {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="px-7 py-3.5 text-[15px] rounded-full border opacity-80 hover:opacity-100" style={{ borderColor: "rgba(242,237,228,0.35)" }}>
              {CONTACT.email}
            </a>
          </div>
        </div>
        <div className="mt-12 text-[11px] tracking-[0.35em] opacity-50">גרנות עיצובים · מטבחים וריהוט פנים בעיצוב אישי</div>
      </footer>
    </div>
  );
}
