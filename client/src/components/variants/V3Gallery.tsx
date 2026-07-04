import { useCallback, useEffect, useState } from "react";
import { CONTACT, wideProjects, tallProjects, useVariantPage, type Project } from "./data";

const display = { fontFamily: "'Playfair Display', 'Frank Ruhl Libre', serif" };
const serifHe = { fontFamily: "'Frank Ruhl Libre', serif" };
const sans = { fontFamily: "'Heebo', 'Assistant', sans-serif" };

const CHARCOAL = "#131210";
const GOLD = "#C9A24B";

// Interleave portrait and landscape shots so the masonry breathes
const galleryImages: Project[] = [
  tallProjects[0], wideProjects[1], tallProjects[3], wideProjects[5],
  tallProjects[7], wideProjects[2], tallProjects[9], wideProjects[7],
  tallProjects[2], wideProjects[10], tallProjects[10], wideProjects[8],
];

export default function V3Gallery() {
  useVariantPage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const open = useCallback((i: number) => {
    setLightboxIndex(i);
    document.body.style.overflow = "hidden";
  }, []);

  // Same settled RTL convention as the live carousel: ‹ (physical left) = next, › (physical right) = prev
  const next = useCallback(
    () => setLightboxIndex((p) => (p === null ? p : (p + 1) % galleryImages.length)),
    []
  );
  const prev = useCallback(
    () => setLightboxIndex((p) => (p === null ? p : (p - 1 + galleryImages.length) % galleryImages.length)),
    []
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") next();
      if (e.key === "ArrowRight") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, next, prev]);

  return (
    <div
      dir="rtl"
      style={{ ...sans, backgroundColor: CHARCOAL, color: "#EDE8DE" }}
      className="min-h-screen overflow-x-hidden"
    >
      <style>{`
        @keyframes v3Fade { from { opacity:0; } to { opacity:1; } }
        .v3-fade { animation: v3Fade 1.2s ease both; }
      `}</style>

      {/* masthead */}
      <header className="v3-fade text-center pt-14 md:pt-20 px-5">
        <div className="text-[11px] tracking-[0.45em] font-light" style={{ color: GOLD }}>
          נגריית בוטיק · מאז שנות ה־90
        </div>
        <h1 style={serifHe} className="text-4xl md:text-6xl font-medium mt-5">
          גרנות עיצובים
        </h1>
        <div style={display} className="italic text-sm md:text-base tracking-[0.25em] mt-3 text-[#B4AC9C]">
          GRANOT DESIGNS
        </div>
        <div className="mx-auto mt-8 h-px w-24" style={{ backgroundColor: GOLD }} />
        <p className="mt-8 max-w-xl mx-auto text-[15px] md:text-lg font-light leading-relaxed text-[#C9C2B4]">
          מטבחים וריהוט מובנה בעבודת יד. למעלה משלושים שנות ניסיון,
          אלפי פרויקטים, ותכנון אישי של דוב גרנות — בוגר בצלאל.
        </p>
      </header>

      {/* gallery */}
      <main className="px-3 md:px-10 pt-12 md:pt-16 pb-36">
        <div className="columns-2 lg:columns-3 gap-3 md:gap-5 [column-fill:_balance]">
          {galleryImages.map((p, i) => (
            <button
              key={i}
              onClick={() => open(i)}
              className="group relative block w-full mb-3 md:mb-5 break-inside-avoid overflow-hidden focus:outline-none focus-visible:ring-2"
              aria-label={`הצג ${p.alt} במסך מלא`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading={i < 4 ? "eager" : "lazy"}
                decoding="async"
                className="w-full object-cover transition duration-700 group-hover:scale-[1.03] group-hover:opacity-80"
              />
              <span
                className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 md:p-4 text-right opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "linear-gradient(to top, rgba(10,9,8,0.85), transparent)" }}
              >
                <span style={serifHe} className="text-sm md:text-base leading-snug">{p.alt}</span>
                <span className="text-[10px] tracking-[0.2em] shrink-0" style={{ color: GOLD }}>
                  {p.label}
                </span>
              </span>
            </button>
          ))}
        </div>
      </main>

      {/* fixed contact bar */}
      <div
        className="fixed bottom-0 inset-x-0 z-30 border-t"
        style={{ backgroundColor: "rgba(19,18,16,0.88)", backdropFilter: "blur(10px)", borderColor: "rgba(201,162,75,0.35)" }}
      >
        <div className="flex items-center justify-between gap-3 px-4 md:px-10 py-3.5">
          <div style={serifHe} className="hidden sm:block text-sm md:text-base text-[#C9C2B4]">
            נשמח לתכנן גם את הבית שלכם.
          </div>
          <div className="flex items-center gap-2.5 md:gap-3 mx-auto sm:mx-0">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 md:px-5 py-2 text-sm font-medium rounded-sm transition-colors"
              style={{ backgroundColor: GOLD, color: CHARCOAL }}
            >
              וואטסאפ
            </a>
            <a
              href={CONTACT.phoneHref}
              className="px-4 md:px-5 py-2 text-sm font-medium border rounded-sm hover:bg-white/5 transition-colors"
              style={{ borderColor: GOLD, color: GOLD }}
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="hidden md:inline-block px-4 py-2 text-sm text-[#C9C2B4] hover:text-white transition-colors"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>

      {/* lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(10,9,8,0.94)" }}
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="סגור"
            className="absolute top-4 right-4 text-3xl leading-none w-11 h-11 rounded-full hover:bg-white/10"
            style={{ color: GOLD }}
          >
            ×
          </button>
          <div style={{ direction: "ltr" }} className="absolute inset-y-0 left-2 flex items-center">
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="תמונה הבאה"
              className="text-5xl w-12 h-16 hover:bg-white/10 rounded"
              style={{ color: GOLD }}
            >
              ‹
            </button>
          </div>
          <div style={{ direction: "ltr" }} className="absolute inset-y-0 right-2 flex items-center">
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="תמונה קודמת"
              className="text-5xl w-12 h-16 hover:bg-white/10 rounded"
              style={{ color: GOLD }}
            >
              ›
            </button>
          </div>
          <figure className="max-w-5xl max-h-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightboxIndex].src}
              alt={galleryImages[lightboxIndex].alt}
              className="max-h-[80vh] w-auto mx-auto object-contain"
            />
            <figcaption style={serifHe} className="text-center mt-4 text-sm md:text-base text-[#C9C2B4]">
              {galleryImages[lightboxIndex].alt}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
