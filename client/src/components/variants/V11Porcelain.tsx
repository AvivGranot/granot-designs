import { useEffect } from "react";
import { CONTACT, FACTS, heroImages, newProjects, wideProjects, useVariantPage } from "./data";

// V11 — "חרסינה": the only cool-toned variant. Porcelain, graphite, one slate-blue
// thread. Heebo-led, type-as-structure: a numbered project index with hairlines
// that draw themselves in on scroll.
const heebo = { fontFamily: "'Heebo', sans-serif" };

const PORCELAIN = "#F7F8F8";
const GRAPHITE = "#22262A";
const SLATE = "#4E6470";
const MUTED = "#4E545B";

function useRuleReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-rule]");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("v11-in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.3 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Rule() {
  return (
    <div
      data-rule
      className="v11-rule h-px w-full"
      style={{ backgroundColor: SLATE, opacity: 0.35 }}
    />
  );
}

export default function V11Porcelain() {
  useVariantPage();
  useRuleReveal();

  const index = [newProjects[0], newProjects[1], wideProjects[1], newProjects[2], wideProjects[2], newProjects[5]];

  return (
    <div
      dir="rtl"
      style={{ ...heebo, backgroundColor: PORCELAIN, color: GRAPHITE }}
      className="min-h-screen font-light"
    >
      <style>{`
        .v11-rule { transform: scaleX(0); transform-origin: right center; transition: transform 1.2s cubic-bezier(0.22,1,0.36,1); }
        .v11-in { transform: scaleX(1); }
      `}</style>

      {/* header */}
      <header className="flex items-center justify-between px-6 md:px-16 py-6">
        <span className="text-lg font-medium tracking-tight">גרנות עיצובים</span>
        <a
          href={CONTACT.phoneHref}
          className="text-sm hover:opacity-60 transition-opacity"
          style={{ color: SLATE }}
        >
          {CONTACT.phoneDisplay}
        </a>
      </header>

      {/* hero — thin oversized type, then one full-width photo */}
      <section className="px-6 md:px-16 pt-16 md:pt-28 pb-12 md:pb-20">
        <div
          className="text-[11px] font-medium tracking-[0.35em] mb-6"
          style={{ color: SLATE }}
        >
          נגרייה משפחתית · שלושים שנה
        </div>
        <h1 className="text-[2.7rem] leading-[1.1] md:text-7xl md:leading-[1.05] font-thin tracking-tight max-w-4xl">
          נגרות מדויקת,
          <br />
          <span className="font-medium">בהתאמה אישית מלאה.</span>
        </h1>
        <p className="mt-7 max-w-md text-[15px] md:text-lg leading-relaxed" style={{ color: MUTED }}>
          מטבחים, ארונות וריהוט פנים — מתוכננים, מיוצרים ומותקנים על ידינו,
          מהמילימטר הראשון ועד האחרון.
        </p>
      </section>

      <div className="px-6 md:px-16">
        <img
          src={heroImages.navyOakNiche.src}
          alt={heroImages.navyOakNiche.alt}
          loading="eager"
          decoding="async"
          className="w-full max-h-[46vh] md:max-h-[70vh] object-cover"
        />
      </div>

      {/* project index — numbered rows, hairline-divided */}
      <section className="px-6 md:px-16 pt-20 md:pt-32">
        <div
          className="text-[11px] font-medium tracking-[0.35em] mb-10"
          style={{ color: SLATE }}
        >
          אינדקס עבודות
        </div>
        {index.map((p, i) => (
          <article key={i} className="mb-14 md:mb-20">
            <Rule />
            <div className="flex items-baseline gap-5 md:gap-8 pt-4 pb-5">
              <span
                className="text-sm md:text-base font-medium tabular-nums"
                style={{ color: SLATE }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-lg md:text-2xl font-normal leading-snug">
                {p.alt}
              </h2>
              <span
                className="ms-auto shrink-0 text-[11px] tracking-[0.2em]"
                style={{ color: MUTED }}
              >
                {p.label}
              </span>
            </div>
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              decoding="async"
              className="w-full h-[280px] md:h-[440px] object-cover"
            />
          </article>
        ))}
        <Rule />
      </section>

      {/* facts — three thin columns */}
      <section className="px-6 md:px-16 py-16 md:py-24 grid grid-cols-3 gap-4">
        {FACTS.map((f) => (
          <div key={f.label}>
            <div className="text-2xl md:text-5xl font-thin tracking-tight">
              {f.value}
            </div>
            <div className="text-[11px] md:text-sm mt-2" style={{ color: MUTED }}>
              {f.label}
            </div>
          </div>
        ))}
      </section>

      {/* contact — one slate action */}
      <footer className="px-6 md:px-16 pb-16 md:pb-24">
        <Rule />
        <div className="pt-12 md:pt-16">
          <h2 className="text-3xl md:text-6xl font-thin tracking-tight">
            בואו נתכנן <span className="font-medium">יחד.</span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 mt-9">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 text-[15px] font-medium text-white transition-opacity hover:opacity-85"
              style={{ backgroundColor: SLATE }}
            >
              דברו איתנו בוואטסאפ
            </a>
            <a
              href={CONTACT.phoneHref}
              className="text-[15px] hover:opacity-60 transition-opacity"
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-[15px] hover:opacity-60 transition-opacity"
            >
              {CONTACT.email}
            </a>
          </div>
          <div className="mt-14 text-[11px] tracking-[0.2em]" style={{ color: MUTED }}>
            דוב גרנות · מייסד שותף · בוגר בצלאל — גרנות עיצובים
          </div>
        </div>
      </footer>
    </div>
  );
}
