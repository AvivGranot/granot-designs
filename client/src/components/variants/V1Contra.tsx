import { CONTACT, FACTS, wideProjects, sketchImage, useVariantPage } from "./data";

const serif = { fontFamily: "'Frank Ruhl Libre', 'Playfair Display', serif" };
const sans = { fontFamily: "'Assistant', 'Inter', sans-serif" };

const INK = "#26241F";
const LINEN = "#F0EEE8";
const SAGE = "#8FA99F";
const MINT = "#C4D9D2";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={sans}
      className="text-[11px] md:text-xs font-semibold tracking-[0.2em] text-[#5C6B64] mb-3"
    >
      {children}
    </div>
  );
}

export default function V1Contra() {
  useVariantPage();
  const projects = wideProjects.slice(0, 6);

  return (
    <div
      dir="rtl"
      style={{ ...sans, backgroundColor: LINEN, color: INK }}
      className="min-h-screen relative overflow-x-hidden"
    >
      <style>{`
        @keyframes v1FadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .v1-fade { animation: v1FadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* paper grain */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{ backgroundImage: NOISE }}
      />

      {/* bookmark ribbon — physical left, clear of RTL text which starts on the right */}
      <div
        aria-hidden
        className="fixed top-0 left-5 md:left-12 z-20 w-10 md:w-14 h-16 md:h-24 flex items-start justify-center pt-3 md:pt-5"
        style={{
          backgroundColor: SAGE,
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
        </svg>
      </div>

      {/* header */}
      <header className="relative z-10 flex items-center gap-6 px-5 md:px-12 pt-6 md:pt-8">
        <a href="#" style={serif} className="text-xl md:text-2xl font-700 font-bold">
          גרנות <span className="font-light">עיצובים</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#4A4A44] me-6">
          <a href="#projects" className="hover:text-black transition-colors">תיק עבודות</a>
          <a href="#about" className="hover:text-black transition-colors">אודות</a>
          <a href="#contact" className="hover:text-black transition-colors">צור קשר</a>
        </nav>
      </header>

      {/* hero */}
      <section className="relative z-10 px-5 md:px-12 pt-14 md:pt-24 pb-16 md:pb-28">
        <h1
          style={serif}
          className="v1-fade text-[2.6rem] leading-[1.12] md:text-7xl md:leading-[1.08] font-medium max-w-4xl"
        >
          נגרות בעיצוב אישי.
          <br />
          <span className="font-light">שלושים שנה של דיוק,</span>
          <br />
          <span className="font-light">אלפי בתים במרכז הארץ.</span>
        </h1>

        <div className="v1-fade flex flex-wrap items-center gap-3 mt-9 md:mt-12" style={{ animationDelay: "0.15s" }}>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-[1.03] active:scale-95"
            style={{ backgroundColor: INK }}
          >
            דברו איתנו בוואטסאפ
          </a>
          <a
            href="#projects"
            className="rounded-full px-6 py-3 text-[15px] font-semibold border transition-colors hover:bg-black/5"
            style={{ borderColor: "#B9B5AA" }}
          >
            לתיק העבודות
          </a>
        </div>
      </section>

      {/* stats tiles */}
      <section id="about" className="relative z-10 px-5 md:px-12 pb-16 md:pb-24">
        <Eyebrow>נגריית בוטיק משפחתית</Eyebrow>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="rounded-2xl p-6 md:p-8 min-h-[120px] md:min-h-[170px] flex flex-col justify-between"
              style={{ backgroundColor: MINT }}
            >
              <div style={serif} className="text-4xl md:text-5xl font-medium">
                {f.value}
              </div>
              <div className="text-sm md:text-base text-[#3E4A45] mt-4">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* projects */}
      <section id="projects" className="relative z-10 px-5 md:px-12 pb-16 md:pb-24">
        <Eyebrow>תיק עבודות</Eyebrow>
        <h2 style={serif} className="text-3xl md:text-5xl font-medium mb-8 md:mb-12">
          עבודות אמיתיות, מבתים אמיתיים
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {projects.map((p, i) => (
            <figure key={i} className="group">
              <div className="overflow-hidden rounded-xl">
                <img
                  src={p.src}
                  alt={p.alt}
                  loading={i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </div>
              <figcaption className="flex items-baseline justify-between gap-4 mt-3">
                <span style={serif} className="text-lg md:text-xl">
                  {p.alt}
                </span>
                <span className="shrink-0 text-[11px] font-semibold tracking-[0.15em] text-[#5C6B64]">
                  {p.label}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* quote band */}
      <section className="relative z-10 py-16 md:py-24" style={{ backgroundColor: MINT }}>
        <div className="px-5 md:px-12 max-w-4xl">
          <div style={serif} className="text-3xl md:text-5xl leading-snug font-medium">
            ״עיצוב משפיע.״
          </div>
          <div className="mt-5 text-[15px] md:text-base text-[#3E4A45]">
            דוב גרנות · מייסד שותף · בוגר בצלאל, האקדמיה לאמנות ועיצוב
          </div>
        </div>
      </section>

      {/* planning strip */}
      <section className="relative z-10 px-5 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div>
            <Eyebrow>מהסקיצה ועד ההתקנה</Eyebrow>
            <h2 style={serif} className="text-3xl md:text-4xl font-medium leading-snug">
              כל פרויקט מתחיל בנייר,
              <br />
              ונגמר בבית שלכם.
            </h2>
            <p className="mt-5 text-[15px] md:text-lg text-[#4A4A44] leading-relaxed max-w-md">
              תכנון קפדני ברמת המאקרו והמיקרו, עבודה בשיתוף פעולה מלא איתכם,
              וייצור בנגרייה שלנו — כמו שעושים כבר למעלה משלושים שנה.
            </p>
          </div>
          <div className="overflow-hidden rounded-xl">
            <img
              src={sketchImage.src}
              alt={sketchImage.alt}
              loading="lazy"
              decoding="async"
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* contact */}
      <footer id="contact" className="relative z-10 px-5 md:px-12 pb-14 pt-8 md:pt-14">
        <div className="border-t pt-12 md:pt-16" style={{ borderColor: "#D8D4C8" }}>
          <h2 style={serif} className="text-4xl md:text-6xl font-medium">
            בואו נדבר.
          </h2>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-6 py-3 text-[15px] font-semibold text-white transition-transform hover:scale-[1.03]"
              style={{ backgroundColor: INK }}
            >
              וואטסאפ
            </a>
            <a
              href={CONTACT.phoneHref}
              className="rounded-full px-6 py-3 text-[15px] font-semibold border hover:bg-black/5 transition-colors"
              style={{ borderColor: "#B9B5AA" }}
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="rounded-full px-6 py-3 text-[15px] font-semibold border hover:bg-black/5 transition-colors"
              style={{ borderColor: "#B9B5AA" }}
            >
              {CONTACT.email}
            </a>
          </div>
          <div className="mt-12 text-xs text-[#8A867B]">
            גרנות עיצובים · מטבחים וריהוט פנים בעיצוב אישי
          </div>
        </div>
      </footer>
    </div>
  );
}
