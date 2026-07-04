import { CONTACT, FACTS, type Project } from "./data";

// V1 "Contra" design language — shared building blocks for the hero-focused
// variants (V5-V8). V1Contra.tsx stays standalone as the approved baseline.

export const serif = { fontFamily: "'Frank Ruhl Libre', 'Playfair Display', serif" };
export const sans = { fontFamily: "'Assistant', 'Inter', sans-serif" };

export const INK = "#26241F";
export const LINEN = "#F0EEE8";
export const SAGE = "#8FA99F";
export const MINT = "#C4D9D2";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")";

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      style={sans}
      className={`text-[11px] md:text-xs font-semibold tracking-[0.2em] text-[#5C6B64] mb-3 ${className}`}
    >
      {children}
    </div>
  );
}

export function Pill({
  href,
  filled,
  external,
  children,
}: {
  href: string;
  filled?: boolean;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`rounded-full px-6 py-3 text-[15px] font-semibold transition-transform hover:scale-[1.03] active:scale-95 ${
        filled ? "text-white" : "border hover:bg-black/5"
      }`}
      style={filled ? { backgroundColor: INK } : { borderColor: "#B9B5AA" }}
    >
      {children}
    </a>
  );
}

export function ContraShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="rtl"
      style={{ ...sans, backgroundColor: LINEN, color: INK }}
      className="min-h-screen relative overflow-x-hidden"
    >
      <style>{`
        @keyframes contraFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .contra-fade { animation: contraFadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        @keyframes contraKenBurns {
          from { transform: scale(1); }
          to { transform: scale(1.09); }
        }
        .contra-kenburns { animation: contraKenBurns 18s ease-in-out infinite alternate; }
        @media (prefers-reduced-motion: reduce) {
          .contra-fade, .contra-kenburns { animation: none; }
        }
      `}</style>
      <div aria-hidden className="fixed inset-0 pointer-events-none z-[1]" style={{ backgroundImage: NOISE }} />
      <div
        aria-hidden
        className="fixed top-0 left-5 md:left-12 z-20 w-10 md:w-14 h-16 md:h-24 flex items-start justify-center pt-3 md:pt-5"
        style={{ backgroundColor: SAGE, clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)" }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
          <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
        </svg>
      </div>
      {children}
    </div>
  );
}

export function ContraHeader({ onDark }: { onDark?: boolean }) {
  return (
    <header className={`relative z-10 flex items-center gap-6 px-5 md:px-12 pt-6 md:pt-8 ${onDark ? "text-white" : ""}`}>
      <a href="#" style={serif} className="text-xl md:text-2xl font-bold">
        גרנות <span className="font-light">עיצובים</span>
      </a>
      <nav className={`hidden md:flex items-center gap-6 text-sm me-6 ${onDark ? "text-white/85" : "text-[#4A4A44]"}`}>
        <a href="#projects" className={onDark ? "hover:text-white" : "hover:text-black"}>תיק עבודות</a>
        <a href="#about" className={onDark ? "hover:text-white" : "hover:text-black"}>אודות</a>
        <a href="#contact" className={onDark ? "hover:text-white" : "hover:text-black"}>צור קשר</a>
      </nav>
    </header>
  );
}

export function StatsTiles() {
  return (
    <section id="about" className="relative z-10 px-5 md:px-12 pb-16 md:pb-24">
      <Eyebrow>נגריית בוטיק משפחתית</Eyebrow>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-5">
        {FACTS.map((f) => (
          <div
            key={f.label}
            className="rounded-2xl p-6 md:p-8 min-h-[120px] md:min-h-[170px] flex flex-col justify-between"
            style={{ backgroundColor: MINT }}
          >
            <div style={serif} className="text-4xl md:text-5xl font-medium">{f.value}</div>
            <div className="text-sm md:text-base text-[#3E4A45] mt-4">{f.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectsSection({ projects, title = "עבודות אמיתיות, מבתים אמיתיים" }: { projects: Project[]; title?: string }) {
  return (
    <section id="projects" className="relative z-10 px-5 md:px-12 pb-16 md:pb-24">
      <Eyebrow>תיק עבודות</Eyebrow>
      <h2 style={serif} className="text-3xl md:text-5xl font-medium mb-8 md:mb-12">{title}</h2>
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
              <span style={serif} className="text-lg md:text-xl">{p.alt}</span>
              <span className="shrink-0 text-[11px] font-semibold tracking-[0.15em] text-[#5C6B64]">{p.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function QuoteBand() {
  return (
    <section className="relative z-10 py-16 md:py-24" style={{ backgroundColor: MINT }}>
      <div className="px-5 md:px-12 max-w-4xl">
        <div style={serif} className="text-3xl md:text-5xl leading-snug font-medium">״עיצוב משפיע.״</div>
        <div className="mt-5 text-[15px] md:text-base text-[#3E4A45]">
          דוב גרנות · מייסד שותף · בוגר בצלאל, האקדמיה לאמנות ועיצוב
        </div>
      </div>
    </section>
  );
}

export function ContraFooter() {
  return (
    <footer id="contact" className="relative z-10 px-5 md:px-12 pb-14 pt-8 md:pt-14">
      <div className="border-t pt-12 md:pt-16" style={{ borderColor: "#D8D4C8" }}>
        <h2 style={serif} className="text-4xl md:text-6xl font-medium">בואו נדבר.</h2>
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <Pill href={CONTACT.whatsapp} filled external>וואטסאפ</Pill>
          <Pill href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</Pill>
          <Pill href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Pill>
        </div>
        <div className="mt-12 text-xs text-[#8A867B]">
          גרנות עיצובים · מטבחים וריהוט פנים בעיצוב אישי
        </div>
      </div>
    </footer>
  );
}
