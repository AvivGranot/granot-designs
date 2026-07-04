import { CONTACT, wideProjects, tallProjects, sketchImage, useVariantPage } from "./data";

const serif = { fontFamily: "'Frank Ruhl Libre', 'Playfair Display', serif" };
const sans = { fontFamily: "'Assistant', 'Inter', sans-serif" };

const PAPER = "#FBF8F2";
const WALNUT = "#4E331D";
const CARAMEL = "#96682F";
const CREAM = "#F3EBDD";

export default function V2Craftsman() {
  useVariantPage();
  const rows = [wideProjects[1], wideProjects[2], wideProjects[3]]; // הוד השרון, נתניה, חדר שינה
  const heroImage = tallProjects[6]; // דפנה — עיצוב אישי

  return (
    <div
      dir="rtl"
      style={{ ...sans, backgroundColor: PAPER, color: "#2B2118" }}
      className="min-h-screen overflow-x-hidden"
    >
      <style>{`
        @keyframes v2Rise { from { opacity:0; transform: translateY(20px); } to { opacity:1; transform:none; } }
        .v2-rise { animation: v2Rise 0.9s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      {/* header */}
      <header className="flex items-center justify-between px-5 md:px-12 py-6">
        <div style={serif} className="text-xl md:text-2xl font-bold" >
          גרנות <span className="font-light">עיצובים</span>
        </div>
        <a
          href={CONTACT.phoneHref}
          className="text-sm md:text-base font-semibold px-4 py-2 rounded-md text-white"
          style={{ backgroundColor: WALNUT }}
        >
          {CONTACT.phoneDisplay}
        </a>
      </header>

      {/* hero */}
      <section className="px-5 md:px-12 pt-8 md:pt-16 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div className="v2-rise">
            <div className="text-[11px] md:text-xs font-bold tracking-[0.25em]" style={{ color: CARAMEL }}>
              נגריית בוטיק משפחתית · למעלה מ־30 שנה
            </div>
            <h1 style={serif} className="text-4xl leading-[1.15] md:text-6xl md:leading-[1.1] font-medium mt-4">
              האנשים שמאחורי
              <br />
              העץ.
            </h1>
            <p className="mt-6 text-base md:text-lg leading-relaxed text-[#5A4B3C] max-w-md">
              דיברתם עם נורית בטלפון? נעים מאוד. אנחנו משפחת גרנות —
              נגרייה משפחתית שמעצבת, בונה ומתקינה מטבחים וריהוט מובנה
              כבר יותר משלושים שנה.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-md text-[15px] font-bold text-white transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: WALNUT }}
              >
                שלחו לנו וואטסאפ
              </a>
              <a
                href="#work"
                className="px-6 py-3 rounded-md text-[15px] font-bold border-2 transition-colors hover:bg-black/5"
                style={{ borderColor: WALNUT, color: WALNUT }}
              >
                לעבודות שלנו
              </a>
            </div>
          </div>

          <div className="v2-rise relative" style={{ animationDelay: "0.15s" }}>
            <div
              aria-hidden
              className="absolute -top-3 -right-3 md:-top-5 md:-right-5 w-full h-full rounded-lg border-2"
              style={{ borderColor: CARAMEL }}
            />
            <img
              src={heroImage.src}
              alt={heroImage.alt}
              loading="eager"
              decoding="async"
              className="relative w-full max-h-[420px] md:max-h-[560px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* personal letter */}
      <section className="px-5 md:px-12 pb-16 md:pb-24">
        <div
          className="max-w-3xl mx-auto rounded-lg p-7 md:p-12 shadow-sm"
          style={{ backgroundColor: CREAM }}
        >
          <div className="text-[11px] font-bold tracking-[0.25em] mb-5" style={{ color: CARAMEL }}>
            מכתב אישי
          </div>
          <div style={serif} className="text-xl md:text-2xl leading-relaxed">
            <p>שלום,</p>
            <p className="mt-4">
              גרנות עיצובים היא נגריית בוטיק עם למעלה משלושים שנות ניסיון,
              ואלפי פרויקטים שעוצבו אישית, נבנו בקפידה ונמסרו במרכז הארץ.
            </p>
            <p className="mt-4">
              אנחנו עובדים איתכם בשיתוף פעולה — נותנים לתהליך היצירתי להתפתח,
              לצד תכנון קפדני של כל פרט, גדול כקטן. ״עיצוב משפיע״ — ואנחנו
              מאמינים שבית שמתוכנן נכון פשוט מרגיש אחרת.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "#E0D5C2" }}>
            <div style={serif} className="text-lg font-medium">משפחת גרנות</div>
            <div className="text-sm text-[#7A6A55] mt-1">
              דוב גרנות · מייסד שותף, בוגר בצלאל &nbsp;·&nbsp; רו״ח נורית גרנות · מנכ״לית ומייסדת שותפה
            </div>
          </div>
        </div>
      </section>

      {/* the way we work */}
      <section className="px-5 md:px-12 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <img
            src={sketchImage.src}
            alt={sketchImage.alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-lg object-cover order-2 md:order-1"
          />
          <div className="order-1 md:order-2">
            <h2 style={serif} className="text-3xl md:text-4xl font-medium leading-snug">
              מהסקיצה הראשונה
              <br />
              ועד הברגה האחרונה.
            </h2>
            <ul className="mt-6 space-y-4 text-base md:text-lg text-[#5A4B3C]">
              <li className="flex gap-3">
                <span aria-hidden style={{ color: CARAMEL }}>—</span>
                עיצוב אישי שמתחיל בהקשבה: הבית שלכם, הצרכים שלכם.
              </li>
              <li className="flex gap-3">
                <span aria-hidden style={{ color: CARAMEL }}>—</span>
                תכנון מדויק ברמת המאקרו והמיקרו, לפני שנוגעים בעץ.
              </li>
              <li className="flex gap-3">
                <span aria-hidden style={{ color: CARAMEL }}>—</span>
                ייצור בנגרייה שלנו, ומסירה מסודרת אצלכם בבית.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* selected projects — editorial rows */}
      <section id="work" className="px-5 md:px-12 pb-16 md:pb-24">
        <h2 style={serif} className="text-3xl md:text-4xl font-medium mb-10">
          פרויקטים נבחרים
        </h2>
        <div className="space-y-12 md:space-y-16">
          {rows.map((p, i) => (
            <figure
              key={i}
              className={`grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-10 items-end`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                decoding="async"
                className={`w-full aspect-[16/10] object-cover rounded-lg md:col-span-4 ${i % 2 === 1 ? "md:order-2" : ""}`}
              />
              <figcaption className="md:col-span-1">
                <div className="text-[11px] font-bold tracking-[0.2em]" style={{ color: CARAMEL }}>
                  {p.label}
                </div>
                <div style={serif} className="text-lg md:text-xl mt-2 leading-snug">
                  {p.alt}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* contact */}
      <footer
        className="px-5 md:px-12 py-14 md:py-20 text-center"
        style={{ backgroundColor: WALNUT, color: "#F5EFE6" }}
      >
        <div style={serif} className="text-3xl md:text-5xl font-medium">
          נמשיך את השיחה?
        </div>
        <p className="mt-4 text-base md:text-lg opacity-90">
          התקשרו, או שלחו הודעה — נורית עונה אישית.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-md text-[15px] font-bold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: "#F5EFE6", color: WALNUT }}
          >
            וואטסאפ
          </a>
          <a
            href={CONTACT.phoneHref}
            className="px-6 py-3 rounded-md text-[15px] font-bold border"
            style={{ borderColor: "#C7B9A5" }}
          >
            {CONTACT.phoneDisplay}
          </a>
        </div>
        <div className="mt-10 text-xs opacity-70">
          גרנות עיצובים · {CONTACT.email}
        </div>
      </footer>
    </div>
  );
}
