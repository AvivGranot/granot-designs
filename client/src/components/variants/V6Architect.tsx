import { CONTACT, heroImages, newProjects, useVariantPage, type Project } from "./data";

// V6 — architecture-studio index in the spirit of Zaha Hadid Architects / BIG:
// stark monochrome, edge-to-edge imagery, ultra-bold condensed type, a dense
// project matrix with catalog codes, grayscale-to-color hovers.

const heavy = { fontFamily: "'Heebo', sans-serif", fontWeight: 800 as const };
const mono = { fontFamily: "'Heebo', 'Inter', sans-serif" };

const index: Project[] = [
  ...newProjects,
  { src: heroImages.oakCounterCloseup.src, alt: heroImages.oakCounterCloseup.alt, label: "משטחים" },
  { src: heroImages.navyOakNiche.src, alt: heroImages.navyOakNiche.alt, label: "נגרות אומן" },
  { src: heroImages.wardrobeOakShelves.src, alt: heroImages.wardrobeOakShelves.alt, label: "חדרי ארונות" },
];

export default function V6Architect() {
  useVariantPage();

  return (
    <div dir="rtl" style={{ ...mono, backgroundColor: "#FFFFFF", color: "#0A0A0A" }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes v6Reveal { from { opacity: 0; } to { opacity: 1; } }
        .v6-reveal { animation: v6Reveal 1.4s ease both; }
      `}</style>

      {/* top strip */}
      <header className="flex items-center justify-between px-4 md:px-8 h-12 md:h-14 border-b border-black text-[11px] md:text-xs tracking-[0.25em] font-medium">
        <span style={heavy} className="text-sm md:text-base tracking-normal">גרנות עיצובים</span>
        <span className="hidden md:block">נגרייה · תכנון · ייצור · התקנה</span>
        <a href={CONTACT.phoneHref} className="hover:bg-black hover:text-white px-2 py-1 transition-colors">
          {CONTACT.phoneDisplay}
        </a>
      </header>

      {/* hero — full-bleed, title bar burned into the bottom */}
      <section className="relative v6-reveal">
        <img
          src={heroImages.penthouseKitchen.src}
          alt={heroImages.penthouseKitchen.alt}
          loading="eager"
          decoding="async"
          className="w-full h-[62vh] md:h-[80vh] object-cover"
          style={{ objectPosition: "65% 55%" }}
        />
        <div className="absolute inset-x-0 bottom-0 bg-black text-white">
          <div className="px-4 md:px-8 py-4 md:py-6 flex flex-wrap items-end justify-between gap-3">
            <h1 style={heavy} className="text-3xl md:text-6xl leading-none">
              נגרות בעיצוב אישי
            </h1>
            <div className="text-[10px] md:text-xs tracking-[0.3em] opacity-80 text-left" style={{ direction: "ltr" }}>
              GRANOT DESIGNS
              <br />
              CUSTOM CARPENTRY — ISRAEL
            </div>
          </div>
        </div>
      </section>

      {/* data band */}
      <section className="grid grid-cols-3 border-b border-black text-center">
        {[
          { v: "30+", k: "שנות ניסיון" },
          { v: "1,000s", k: "פרויקטים שנמסרו" },
          { v: "בצלאל", k: "הכשרת המייסד" },
        ].map((d, i) => (
          <div key={d.k} className={`py-6 md:py-10 ${i < 2 ? "border-e border-black" : ""}`}>
            <div style={heavy} className="text-2xl md:text-5xl">{d.v}</div>
            <div className="mt-1 text-[10px] md:text-xs tracking-[0.25em] text-[#555]">{d.k}</div>
          </div>
        ))}
      </section>

      {/* project matrix */}
      <section id="projects">
        <div className="px-4 md:px-8 py-4 md:py-5 flex items-baseline justify-between border-b border-black">
          <h2 style={heavy} className="text-xl md:text-3xl">אינדקס פרויקטים</h2>
          <span className="text-[10px] md:text-xs tracking-[0.3em] text-[#555]">
            {String(index.length).padStart(2, "0")} עבודות נבחרות
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5">
          {index.map((p, i) => (
            <figure key={i} className="group relative border-b border-e border-black/20 overflow-hidden">
              <img
                src={p.src}
                alt={p.alt}
                loading={i < 5 ? "eager" : "lazy"}
                decoding="async"
                className="w-full aspect-square object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-500"
              />
              <figcaption className="absolute inset-0 flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/60 text-white">
                <span className="text-[10px] tracking-[0.3em]" style={{ direction: "ltr" }}>
                  GD—{String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs md:text-sm leading-snug">{p.alt}</span>
              </figcaption>
              <span className="absolute top-2 end-2 text-[9px] md:text-[10px] tracking-[0.2em] bg-white/85 px-1.5 py-0.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                {p.label}
              </span>
            </figure>
          ))}
        </div>
      </section>

      {/* statement */}
      <section className="px-4 md:px-8 py-14 md:py-24 border-b border-black">
        <p style={heavy} className="text-2xl md:text-5xl leading-[1.25] max-w-4xl">
          ״עיצוב משפיע.״ כל פרויקט מתוכנן ברמת המילימטר,
          מיוצר בנגרייה שלנו, ומותקן אצלכם — כבר יותר משלושים שנה.
        </p>
        <div className="mt-6 text-xs md:text-sm text-[#555]">
          דוב גרנות · מייסד שותף · בוגר בצלאל &nbsp;|&nbsp; רו״ח נורית גרנות · מנכ״לית
        </div>
      </section>

      {/* footer */}
      <footer id="contact" className="bg-black text-white">
        <div className="px-4 md:px-8 py-10 md:py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div style={heavy} className="text-3xl md:text-5xl leading-none">
            בואו נבנה
            <br />
            משהו מדויק.
          </div>
          <div className="text-sm space-y-2 md:justify-self-center">
            <div className="text-[10px] tracking-[0.3em] opacity-60 mb-3">יצירת קשר</div>
            <a href={CONTACT.phoneHref} className="block hover:underline">{CONTACT.phoneDisplay}</a>
            <a href={`mailto:${CONTACT.email}`} className="block hover:underline" style={{ direction: "ltr" }}>{CONTACT.email}</a>
          </div>
          <div className="md:justify-self-end">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-white px-8 py-4 text-sm tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
            >
              וואטסאפ ←
            </a>
          </div>
        </div>
        <div className="px-4 md:px-8 py-4 border-t border-white/20 text-[10px] tracking-[0.3em] opacity-60 flex justify-between">
          <span>גרנות עיצובים</span>
          <span style={{ direction: "ltr" }}>GRANOT DESIGNS — CUSTOM CARPENTRY</span>
        </div>
      </footer>
    </div>
  );
}
