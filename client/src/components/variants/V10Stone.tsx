import type { ReactNode } from "react";
import { CONTACT, FACTS, tallProjects, wideProjects, newProjects, useVariantPage } from "./data";

// V10 — "אבן": Japandi serenity. Warm greige, espresso ink, a whisper of clay.
// Square corners, asymmetric rhythm, no pills, no texture.
const serif = { fontFamily: "'Frank Ruhl Libre', serif" };
const sans = { fontFamily: "'Assistant', sans-serif" };

const STONE = "#E9E6E0";
const ESPRESSO = "#33302B";
const CLAY = "#A97B5F";
const MUTED = "#5A564E";

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div
      className="text-[11px] font-semibold tracking-[0.3em] mb-4"
      style={{ color: CLAY }}
    >
      {children}
    </div>
  );
}

export default function V10Stone() {
  useVariantPage();

  const heroTall = tallProjects[3]; // country kitchen, portrait
  const grid = [newProjects[0], newProjects[1], wideProjects[1], newProjects[3], wideProjects[2], newProjects[2]];

  return (
    <div
      dir="rtl"
      style={{ ...sans, backgroundColor: STONE, color: ESPRESSO }}
      className="min-h-screen"
    >
      {/* header */}
      <header className="flex items-center justify-between px-6 md:px-14 py-7">
        <span style={serif} className="text-xl font-medium">
          גרנות עיצובים
        </span>
        <a
          href={CONTACT.phoneHref}
          className="text-sm pb-0.5 border-b hover:opacity-70 transition-opacity"
          style={{ borderColor: CLAY }}
        >
          {CONTACT.phoneDisplay}
        </a>
      </header>

      {/* hero — asymmetric split: words breathe, one tall photo anchors */}
      <section className="px-6 md:px-14 pt-10 md:pt-20 pb-16 md:pb-28 grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-14 items-center">
        <div className="md:col-span-3">
          <Eyebrow>נגרייה משפחתית · מרכז הארץ</Eyebrow>
          <h1
            style={serif}
            className="text-[2.5rem] leading-[1.18] md:text-6xl md:leading-[1.14] font-medium"
          >
            נגרות שקטה,
            <br />
            בהתאמה מלאה לבית.
          </h1>
          <p className="mt-6 max-w-md text-[15px] md:text-lg leading-relaxed" style={{ color: MUTED }}>
            שלושים שנה אנחנו מתכננים ומייצרים מטבחים, ארונות וריהוט פנים —
            עבודה אחת בכל פעם, בקצב של עבודת יד.
          </p>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-9 text-[15px] font-semibold pb-1 border-b-2 hover:opacity-70 transition-opacity"
            style={{ borderColor: CLAY }}
          >
            דברו איתנו בוואטסאפ ←
          </a>
        </div>
        <div className="md:col-span-2">
          <img
            src={heroTall.src}
            alt={heroTall.alt}
            loading="eager"
            decoding="async"
            className="w-full max-h-[52vh] md:max-h-[70vh] object-cover rounded-sm"
          />
        </div>
      </section>

      {/* projects — alternating offset rhythm */}
      <section className="px-6 md:px-14 pb-10 md:pb-16">
        <Eyebrow>עבודות</Eyebrow>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12 md:gap-y-16">
          {grid.map((p, i) => (
            <figure key={i} className={i % 2 === 1 ? "md:mt-24" : ""}>
              <div className="overflow-hidden rounded-sm">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover transition-opacity duration-500 hover:opacity-90"
                />
              </div>
              <figcaption className="flex items-baseline justify-between gap-4 mt-3">
                <span style={serif} className="text-base md:text-lg">
                  {p.alt}
                </span>
                <span
                  className="shrink-0 text-[10px] font-semibold tracking-[0.25em]"
                  style={{ color: CLAY }}
                >
                  {p.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* founder centerpiece */}
      <section className="px-6 md:px-14 py-20 md:py-28 text-center">
        <div className="mx-auto w-10 border-t-2 mb-8" style={{ borderColor: CLAY }} />
        <div style={serif} className="text-2xl md:text-4xl font-medium leading-snug max-w-2xl mx-auto">
          ״כל פרויקט מתחיל בנייר, ונגמר בבית שלכם.״
        </div>
        <div className="mt-5 text-sm md:text-base" style={{ color: MUTED }}>
          דוב גרנות · מייסד שותף · בוגר בצלאל, האקדמיה לאמנות ועיצוב
        </div>
      </section>

      {/* facts */}
      <section
        className="px-6 md:px-14 py-12 md:py-16 grid grid-cols-3 gap-4 border-y"
        style={{ borderColor: "#D6D2C9" }}
      >
        {FACTS.map((f) => (
          <div key={f.label} className="text-center">
            <div style={serif} className="text-2xl md:text-4xl font-medium">
              {f.value}
            </div>
            <div className="text-[11px] md:text-sm mt-2" style={{ color: MUTED }}>
              {f.label}
            </div>
          </div>
        ))}
      </section>

      {/* contact */}
      <footer className="px-6 md:px-14 py-16 md:py-24">
        <Eyebrow>צרו קשר</Eyebrow>
        <h2 style={serif} className="text-3xl md:text-5xl font-medium">
          נתחיל בשיחה.
        </h2>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8 text-[15px]">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold pb-1 border-b-2 hover:opacity-70 transition-opacity"
            style={{ borderColor: CLAY }}
          >
            וואטסאפ
          </a>
          <a
            href={CONTACT.phoneHref}
            className="pb-1 border-b hover:opacity-70 transition-opacity"
            style={{ borderColor: "#C9C4BA" }}
          >
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="pb-1 border-b hover:opacity-70 transition-opacity"
            style={{ borderColor: "#C9C4BA" }}
          >
            {CONTACT.email}
          </a>
        </div>
        <div className="mt-14 text-xs" style={{ color: "#8A857A" }}>
          גרנות עיצובים · מטבחים וריהוט פנים בעיצוב אישי
        </div>
      </footer>
    </div>
  );
}
