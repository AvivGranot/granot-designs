import { useEffect, useState } from "react";
import {
  CONTACT,
  FACTS,
  sketchDrawing,
  sketchDrawing2,
  sketchImage,
  useVariantPage,
} from "./data";
import type { Project } from "./data";
import { WINGS, numbered } from "./exhibition";

// V9 — "מוזיאון": the complete collection as a museum. Every image on the site,
// organized into wings, each wing opening with a featured wall and continuing
// as a salon-style grid. No accent color; the photos are the color.
const serif = { fontFamily: "'Frank Ruhl Libre', serif" };
const sans = { fontFamily: "'Assistant', sans-serif" };

const PAPER = "#FBFAF8";
const INK = "#1F1D1A";
const HAIRLINE = "#E3E0DA";
const MUTED = "#57544D";
const FAINT = "#847F74";

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
      { threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Plaque({ p }: { p: Project }) {
  return (
    <figcaption className="mt-6 text-center">
      <div className="text-[10px] tracking-[0.4em]" style={{ color: FAINT }}>
        {numbered.get(p.src)}
      </div>
      <div style={serif} className="text-base md:text-lg font-normal mt-2">
        {p.alt}
      </div>
      <div className="text-[11px] tracking-[0.25em] mt-1.5" style={{ color: MUTED }}>
        {p.label}
      </div>
    </figcaption>
  );
}

export default function V9Museum() {
  useVariantPage();
  useReveal();

  // Click-to-zoom: any piece opens full-screen; Escape / tap closes
  const [zoom, setZoom] = useState<Project | null>(null);
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  return (
    <div
      dir="rtl"
      style={{ ...sans, backgroundColor: PAPER, color: INK }}
      className="min-h-screen"
    >
      <style>{`
        [data-reveal] { opacity: 0; transform: translateY(14px); transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.22,1,0.36,1); }
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

      {/* hero — the wall text at the entrance */}
      <section className="px-6 md:px-16 pt-16 md:pt-28 pb-12 md:pb-16 text-center">
        <div data-reveal className="text-[11px] tracking-[0.35em] mb-8" style={{ color: MUTED }}>
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
          style={{ transitionDelay: "0.2s", color: MUTED }}
          className="mx-auto max-w-md mt-6 text-[15px] md:text-base leading-relaxed"
        >
          כולן תוכננו, יוצרו, והותקנו על ידינו.
        </p>

        {/* floor map */}
        <nav
          data-reveal
          style={{ transitionDelay: "0.3s" }}
          className="flex flex-wrap items-baseline justify-center gap-x-7 gap-y-3 mt-10 text-[13px]"
        >
          {WINGS.map((w) => (
            <a
              key={w.id}
              href={`#${w.id}`}
              className="hover:opacity-60 transition-opacity"
            >
              <span className="text-[10px] tracking-[0.3em] me-2" style={{ color: FAINT }}>
                אגף {w.letter}׳
              </span>
              <span className="underline underline-offset-4 decoration-[0.5px]">{w.title}</span>
            </a>
          ))}
        </nav>
      </section>

      {/* wings */}
      <main>
        {WINGS.map((wing) => {
          const [featured, ...rest] = wing.pieces;
          return (
            <section key={wing.id} id={wing.id} className="pt-10 md:pt-16">
              {/* wing header */}
              <div
                data-reveal
                className="mx-6 md:mx-16 border-t pt-6 md:pt-8 flex items-baseline justify-between"
                style={{ borderColor: HAIRLINE }}
              >
                <h2>
                  <span className="text-[10px] tracking-[0.4em] block mb-2" style={{ color: FAINT }}>
                    אגף {wing.letter}׳
                  </span>
                  <span style={serif} className="text-2xl md:text-4xl font-light">
                    {wing.title}
                  </span>
                </h2>
                <span className="text-[11px] tracking-[0.2em]" style={{ color: MUTED }}>
                  {wing.pieces.length} עבודות
                </span>
              </div>

              {/* featured wall */}
              <figure
                data-reveal
                className="px-6 md:px-16 pt-10 md:pt-14 pb-4 flex flex-col items-center"
              >
                <img
                  src={featured.src}
                  alt={featured.alt}
                  loading={wing.id === "kitchens" ? "eager" : "lazy"}
                  decoding="async"
                  onClick={() => setZoom(featured)}
                  className={
                    featured.portrait
                      ? "w-full max-w-sm md:max-w-md object-cover border cursor-zoom-in"
                      : "w-full max-w-3xl object-cover border cursor-zoom-in"
                  }
                  style={{ borderColor: HAIRLINE }}
                />
                <Plaque p={featured} />
              </figure>

              {/* salon wall — aligned 2-col grid on mobile, natural-aspect masonry on desktop */}
              <div className="px-6 md:px-16 pt-8 md:pt-12 pb-4">
                <div className="grid grid-cols-2 gap-x-3 md:block md:columns-3 md:gap-5">
                  {rest.map((p) => (
                    <figure
                      key={p.src}
                      data-reveal
                      className="mb-5 md:mb-8 md:break-inside-avoid"
                    >
                      <img
                        src={p.src}
                        alt={p.alt}
                        title={p.alt}
                        loading="lazy"
                        decoding="async"
                        onClick={() => setZoom(p)}
                        className="w-full aspect-[4/5] object-cover md:aspect-auto border cursor-zoom-in"
                        style={{ borderColor: HAIRLINE }}
                      />
                      <figcaption
                        className="mt-2 text-[10px] tracking-[0.25em] text-center"
                        style={{ color: MUTED }}
                      >
                        <span dir="ltr">{numbered.get(p.src)}</span> · {p.label}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>

      {/* the studio — where it all starts */}
      <section className="px-6 md:px-16 pt-16 md:pt-24">
        <div
          data-reveal
          className="border-t pt-6 md:pt-8"
          style={{ borderColor: HAIRLINE }}
        >
          <span className="text-[10px] tracking-[0.4em] block mb-2" style={{ color: FAINT }}>
            הסטודיו
          </span>
          <span style={serif} className="text-2xl md:text-4xl font-light">
            כל עבודה מתחילה בנייר
          </span>
        </div>
        <div className="pt-10 md:pt-14 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto items-start">
          {[sketchDrawing, sketchDrawing2, sketchImage].map((s) => (
            <figure data-reveal key={s.src}>
              <img
                src={s.src}
                alt={s.alt}
                loading="lazy"
                decoding="async"
                onClick={() => setZoom(s)}
                className="w-full border cursor-zoom-in"
                style={{ borderColor: HAIRLINE }}
              />
            </figure>
          ))}
        </div>
        <div data-reveal className="mt-8 text-center">
          <div style={serif} className="text-base md:text-lg mx-auto max-w-md">
            תכנון קפדני ברמת המאקרו והמיקרו — ואז ייצור בנגרייה שלנו.
          </div>
        </div>
      </section>

      {/* facts — one hairline row */}
      <section
        data-reveal
        className="mx-6 md:mx-16 mt-16 md:mt-24 border-y grid grid-cols-3"
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
            <div className="text-[11px] md:text-xs mt-2 px-2" style={{ color: MUTED }}>
              {f.label}
            </div>
          </div>
        ))}
      </section>

      <div data-reveal className="text-center mt-12 md:mt-16 text-sm" style={{ color: MUTED }}>
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
        <div className="mt-16 text-[11px] tracking-[0.25em]" style={{ color: FAINT }}>
          גרנות עיצובים · מטבחים וריהוט פנים בעיצוב אישי
        </div>
      </footer>

      {/* zoom overlay */}
      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt}
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 md:p-10 cursor-zoom-out"
          style={{ backgroundColor: "rgba(31, 29, 26, 0.94)" }}
        >
          <button
            aria-label="סגירה"
            onClick={() => setZoom(null)}
            className="absolute top-4 end-6 text-2xl leading-none hover:opacity-60 transition-opacity"
            style={{ color: PAPER }}
          >
            ✕
          </button>
          <img
            src={zoom.src}
            alt={zoom.alt}
            className="max-w-full max-h-[85vh] object-contain"
          />
          <div
            className="mt-4 text-[13px] text-center px-4"
            style={{ ...serif, color: PAPER }}
          >
            {zoom.alt}
          </div>
        </div>
      )}
    </div>
  );
}
