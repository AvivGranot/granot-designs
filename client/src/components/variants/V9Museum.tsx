import { useEffect } from "react";
import { CONTACT, FACTS, newProjects, wideProjects, useVariantPage } from "./data";

// V9 — "מוזיאון": radical-whitespace gallery. No accent color; the photos are the color.
const serif = { fontFamily: "'Frank Ruhl Libre', serif" };
const sans = { fontFamily: "'Assistant', sans-serif" };

const PAPER = "#FBFAF8";
const INK = "#1F1D1A";
const HAIRLINE = "#E3E0DA";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("v9-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function V9Museum() {
  useVariantPage();
  useReveal();

  // The "exhibition": the freshest installs, plus two named-city projects
  const walls = [...newProjects, wideProjects[1], wideProjects[2]];

  return (
    <div
      dir="rtl"
      style={{ ...sans, backgroundColor: PAPER, color: INK }}
      className="min-h-screen"
    >
      <style>{`
        [data-reveal] { opacity: 0; transform: translateY(14px); transition: opacity 1.1s ease, transform 1.1s cubic-bezier(0.22,1,0.36,1); }
        .v9-in { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* header — a single quiet line */}
      <header
        className="flex items-baseline justify-between px-6 md:px-16 py-6 border-b"
        style={{ borderColor: HAIRLINE }}
      >
        <span style={serif} className="text-lg md:text-xl font-medium tracking-wide">
          גרנות עיצובים
        </span>
        <a
          href={CONTACT.phoneHref}
          className="text-sm underline underline-offset-4 decoration-[0.5px] hover:opacity-60 transition-opacity"
        >
          {CONTACT.phoneDisplay}
        </a>
      </header>

      {/* hero — a museum wall text */}
      <section className="px-6 md:px-16 pt-20 md:pt-32 pb-16 md:pb-24 text-center">
        <div
          data-reveal
          className="text-[11px] tracking-[0.35em] text-[#57544D] mb-8"
        >
          נגרייה משפחתית · שלושים שנות עבודת יד
        </div>
        <h1
          data-reveal
          style={{ ...serif, transitionDelay: "0.1s" }}
          className="mx-auto max-w-3xl text-[2.5rem] leading-[1.15] md:text-6xl md:leading-[1.12] font-light"
        >
          תערוכה של בתים אמיתיים.
        </h1>
        <p
          data-reveal
          style={{ transitionDelay: "0.2s" }}
          className="mx-auto max-w-md mt-6 text-[15px] md:text-base leading-relaxed text-[#57544D]"
        >
          כל עבודה כאן תוכננה, יוצרה והותקנה על ידינו — מהסקיצה ועד הבית.
        </p>
      </section>

      {/* the walls — one work per viewport, plaque underneath */}
      <main>
        {walls.map((p, i) => (
          <figure
            key={i}
            data-reveal
            className="px-6 md:px-16 py-12 md:py-20 flex flex-col items-center"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading={i < 1 ? "eager" : "lazy"}
              decoding="async"
              className={
                p.portrait
                  ? "w-full max-w-sm md:max-w-md object-cover"
                  : "w-full max-w-3xl object-cover"
              }
            />
            <figcaption className="mt-6 text-center">
              <div className="text-[10px] tracking-[0.4em] text-[#847F74] mb-2">
                {ROMAN[i]}
              </div>
              <div style={serif} className="text-base md:text-lg font-normal">
                {p.alt}
              </div>
              <div className="text-[11px] tracking-[0.25em] text-[#57544D] mt-1.5">
                {p.label}
              </div>
            </figcaption>
          </figure>
        ))}
      </main>

      {/* facts — one hairline row */}
      <section
        data-reveal
        className="mx-6 md:mx-16 mt-8 md:mt-16 border-y grid grid-cols-3"
        style={{ borderColor: HAIRLINE }}
      >
        {FACTS.map((f, i) => (
          <div
            key={f.label}
            className="py-10 md:py-14 text-center"
            style={i > 0 ? { borderRight: `1px solid ${HAIRLINE}` } : undefined}
          >
            <div style={serif} className="text-2xl md:text-4xl font-light">
              {f.value}
            </div>
            <div className="text-[11px] md:text-xs text-[#57544D] mt-2 px-2">
              {f.label}
            </div>
          </div>
        ))}
      </section>

      <div data-reveal className="text-center mt-12 md:mt-16 text-sm text-[#57544D]">
        דוב גרנות · מייסד שותף · בוגר בצלאל, האקדמיה לאמנות ועיצוב
      </div>

      {/* contact — text only */}
      <footer className="px-6 md:px-16 pt-20 md:pt-28 pb-16 text-center">
        <h2 data-reveal style={serif} className="text-3xl md:text-5xl font-light">
          בואו לראות מקרוב.
        </h2>
        <div
          data-reveal
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-8 text-[15px]"
        >
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-8 decoration-[0.5px] hover:opacity-60 transition-opacity"
          >
            וואטסאפ
          </a>
          <a
            href={CONTACT.phoneHref}
            className="underline underline-offset-8 decoration-[0.5px] hover:opacity-60 transition-opacity"
          >
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="underline underline-offset-8 decoration-[0.5px] hover:opacity-60 transition-opacity"
          >
            {CONTACT.email}
          </a>
        </div>
        <div className="mt-16 text-[11px] tracking-[0.25em] text-[#847F74]">
          גרנות עיצובים · מטבחים וריהוט פנים בעיצוב אישי
        </div>
      </footer>
    </div>
  );
}
