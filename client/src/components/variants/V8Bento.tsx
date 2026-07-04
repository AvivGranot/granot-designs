import { CONTACT, FACTS, heroImages, heroVideo, newProjects, useVariantPage } from "./data";

// V8 — free style: modern bento-grid portfolio. Everything that builds trust
// lives in one composed hero board — live video, real photos, the numbers,
// the founder line, and a WhatsApp cell — then a clean project strip below.

const heading = { fontFamily: "'Heebo', sans-serif", fontWeight: 800 as const };
const serif = { fontFamily: "'Frank Ruhl Libre', serif" };
const body = { fontFamily: "'Assistant', sans-serif" };

const BG = "#F5F3EE";
const INK = "#201D18";
const OLIVE = "#6B7A5E";

function Cell({ className = "", children, style }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div className={`rounded-2xl overflow-hidden ${className}`} style={style}>
      {children}
    </div>
  );
}

export default function V8Bento() {
  useVariantPage();

  return (
    <div dir="rtl" style={{ ...body, backgroundColor: BG, color: INK }} className="min-h-screen overflow-x-hidden">
      <style>{`
        @keyframes v8Pop { from { opacity: 0; transform: translateY(14px) scale(0.98); } to { opacity: 1; transform: none; } }
        .v8-pop { animation: v8Pop 0.7s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* header */}
      <header className="flex items-center justify-between px-4 md:px-10 py-5">
        <div style={heading} className="text-xl md:text-2xl">גרנות עיצובים</div>
        <a
          href={CONTACT.phoneHref}
          className="text-sm font-bold px-4 py-2 rounded-full text-white"
          style={{ backgroundColor: INK }}
        >
          {CONTACT.phoneDisplay}
        </a>
      </header>

      {/* bento hero */}
      <section className="px-4 md:px-10 pb-10 md:pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[170px] gap-3 md:gap-4">
          {/* title cell */}
          <Cell className="v8-pop col-span-2 row-span-2 p-6 md:p-8 flex flex-col justify-between bg-white shadow-sm">
            <div>
              <div className="text-[11px] font-bold tracking-[0.25em]" style={{ color: OLIVE }}>
                נגריית בוטיק משפחתית
              </div>
              <h1 style={heading} className="mt-3 text-3xl md:text-5xl leading-[1.08]">
                נגרות בעיצוב
                <br />
                אישי, לבית שלכם.
              </h1>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full text-sm font-bold text-white transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: "#25D366" }}
              >
                וואטסאפ
              </a>
              <a
                href="#work"
                className="px-5 py-2.5 rounded-full text-sm font-bold border border-black/15 hover:bg-black/5"
              >
                לעבודות ↓
              </a>
            </div>
          </Cell>

          {/* video cell */}
          <Cell className="v8-pop col-span-1 row-span-2 relative" style={{ animationDelay: "0.05s" }}>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={heroVideo.src}
              poster={heroVideo.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-label={heroVideo.alt}
            />
            <span className="absolute bottom-2.5 right-2.5 text-[10px] font-bold text-white bg-black/55 rounded-full px-2.5 py-1 backdrop-blur-sm">
              ● מהתקנה אמיתית
            </span>
          </Cell>

          {/* tall photo cell */}
          <Cell className="v8-pop col-span-1 row-span-2" style={{ animationDelay: "0.1s" }}>
            <img
              src={heroImages.oakCounterCloseup.src}
              alt={heroImages.oakCounterCloseup.alt}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </Cell>

          {/* wide photo cell */}
          <Cell className="v8-pop col-span-2 row-span-2 relative group" style={{ animationDelay: "0.15s" }}>
            <img
              src={heroImages.penthouseKitchen.src}
              alt={heroImages.penthouseKitchen.alt}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute bottom-3 right-3 text-xs font-bold text-white bg-black/50 rounded-full px-3 py-1.5 backdrop-blur-sm">
              מטבח פנטהאוז · נוף לים
            </span>
          </Cell>

          {/* stat cells */}
          <Cell className="v8-pop p-5 flex flex-col justify-between text-white" style={{ backgroundColor: OLIVE, animationDelay: "0.2s" }}>
            <div style={heading} className="text-3xl md:text-4xl">{FACTS[0].value}</div>
            <div className="text-xs opacity-90">{FACTS[0].label}</div>
          </Cell>
          <Cell className="v8-pop p-5 flex flex-col justify-between bg-white shadow-sm" style={{ animationDelay: "0.25s" }}>
            <div style={heading} className="text-2xl md:text-3xl">{FACTS[1].value}</div>
            <div className="text-xs text-[#6b675f]">{FACTS[1].label}</div>
          </Cell>

          {/* founder quote cell */}
          <Cell className="v8-pop col-span-2 p-5 md:p-6 flex items-center justify-between gap-4 text-white" style={{ backgroundColor: INK, animationDelay: "0.3s" }}>
            <div>
              <div style={serif} className="text-xl md:text-2xl">״עיצוב משפיע.״</div>
              <div className="mt-1.5 text-xs opacity-75">דוב גרנות · מייסד שותף · בוגר בצלאל</div>
            </div>
            <div style={serif} className="hidden md:block text-4xl opacity-30" aria-hidden>✎</div>
          </Cell>
        </div>
      </section>

      {/* project strip */}
      <section id="work" className="px-4 md:px-10 pb-12 md:pb-16">
        <div className="flex items-baseline justify-between mb-5 md:mb-8">
          <h2 style={heading} className="text-2xl md:text-4xl">העבודות שלנו</h2>
          <span className="text-xs md:text-sm text-[#6b675f]">כל התמונות — פרויקטים אמיתיים</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {newProjects.slice(0, 6).map((p, i) => (
            <figure key={i} className="group">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="flex items-baseline justify-between gap-2 mt-2 px-1">
                <span className="text-[13px] md:text-sm font-semibold leading-snug">{p.alt}</span>
                <span className="shrink-0 text-[10px] font-bold tracking-wide" style={{ color: OLIVE }}>{p.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* contact band */}
      <footer className="px-4 md:px-10 pb-10">
        <div className="rounded-2xl p-7 md:p-12 text-white flex flex-col md:flex-row md:items-center justify-between gap-6" style={{ backgroundColor: INK }}>
          <div>
            <h2 style={heading} className="text-2xl md:text-4xl">מתחילים בשיחה.</h2>
            <p className="mt-2 text-sm md:text-base opacity-80">
              פגישת ייעוץ, תכנון אישי, ייצור בנגרייה שלנו — והתקנה אצלכם.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-bold"
              style={{ backgroundColor: "#25D366" }}
            >
              וואטסאפ
            </a>
            <a href={CONTACT.phoneHref} className="px-6 py-3 rounded-full text-sm font-bold bg-white" style={{ color: INK }}>
              {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
        <div className="text-center text-[11px] text-[#8d887e] py-6">
          גרנות עיצובים · {CONTACT.email}
        </div>
      </footer>
    </div>
  );
}
