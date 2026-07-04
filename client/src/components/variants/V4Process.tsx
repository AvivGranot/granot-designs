import PortfolioCarousel from "../PortfolioCarousel";
import FloatingContactButton from "../FloatingContactButton";
import { CONTACT, FACTS, wideProjects, tallProjects, useIsMobile, useVariantPage } from "./data";

const heading = { fontFamily: "'Heebo', 'Assistant', sans-serif" };
const body = { fontFamily: "'Assistant', 'Heebo', sans-serif" };

const BROWN = "#55300C";
const GOLD = "#C9A24B";
const LIGHT = "#F7F5F1";

const STEPS = [
  {
    num: "01",
    title: "פגישת ייעוץ",
    text: "נפגשים, מקשיבים ומודדים. אתם מספרים מה חשוב לכם — אנחנו מתרגמים את זה לכיוון תכנוני.",
  },
  {
    num: "02",
    title: "תכנון ועיצוב",
    text: "סקיצות ותכנון מדויק של כל פרט — חומרים, גימורים ומידות — בשיתוף פעולה מלא איתכם.",
  },
  {
    num: "03",
    title: "ייצור בנגרייה",
    text: "העבודה נבנית בקפידה בנגרייה שלנו, כמו שנבנו כאן אלפי פרויקטים בשלושים השנים האחרונות.",
  },
  {
    num: "04",
    title: "התקנה ומסירה",
    text: "מתקינים אצלכם בבית, עוברים איתכם על הכל, ומוסרים רק כשזה מדויק.",
  },
];

const FAQ = [
  {
    q: "כמה זמן לוקח פרויקט?",
    a: "תלוי בהיקף העבודה. כבר בפגישת הייעוץ תקבלו לוח זמנים מסודר, כך שתדעו בדיוק למה לצפות לפני שמתחילים.",
  },
  {
    q: "איך נקבע המחיר?",
    a: "אחרי פגישת הייעוץ והתכנון הראשוני תקבלו הצעת מחיר מפורטת שמבוססת על המידות, החומרים והגימורים שנבחרו — הכל שקוף וכתוב.",
  },
  {
    q: "אתם גם מתקינים?",
    a: "כן. הייצור נעשה בנגרייה שלנו וההתקנה מתבצעת על ידינו — מהמדידה הראשונה ועד המסירה.",
  },
  {
    q: "באיזה אזורים אתם עובדים?",
    a: "עיקר הפעילות שלנו במרכז הארץ, שם נמסרו אלפי הפרויקטים שלנו לאורך השנים.",
  },
];

export default function V4Process() {
  useVariantPage();
  const isMobile = useIsMobile();
  const carouselImages = isMobile ? tallProjects : wideProjects;

  return (
    <div dir="rtl" style={{ ...body, backgroundColor: "#FFFFFF", color: "#211A12" }} className="min-h-screen overflow-x-hidden">
      {/* header */}
      <header className="flex items-center justify-between px-5 md:px-12 py-5 border-b" style={{ borderColor: "#EDE9E2" }}>
        <div style={heading} className="text-lg md:text-xl font-bold">
          גרנות עיצובים
        </div>
        <a
          href={CONTACT.phoneHref}
          className="text-sm font-bold px-4 py-2 rounded-lg text-white"
          style={{ backgroundColor: BROWN }}
        >
          {CONTACT.phoneDisplay}
        </a>
      </header>

      {/* hero */}
      <section className="px-5 md:px-12 pt-12 md:pt-20 pb-12 md:pb-16 max-w-4xl">
        <div className="text-xs font-bold tracking-[0.2em]" style={{ color: GOLD }}>
          מטבחים וריהוט פנים בעיצוב אישי
        </div>
        <h1 style={heading} className="text-4xl md:text-6xl font-extrabold leading-[1.12] mt-4">
          מה קורה אחרי
          <br />
          שיחת הטלפון?
        </h1>
        <p className="mt-5 text-base md:text-xl leading-relaxed text-[#5F564A] max-w-xl">
          תהליך מסודר, שקוף ואישי — מהפגישה הראשונה ועד ההתקנה.
          ככה זה עובד אצלנו כבר למעלה משלושים שנה.
        </p>
      </section>

      {/* steps */}
      <section className="px-5 md:px-12 pb-14 md:pb-20">
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {STEPS.map((s, i) => (
            <li
              key={s.num}
              className="relative rounded-xl p-6 md:p-7"
              style={{ backgroundColor: LIGHT }}
            >
              <div className="flex items-center gap-3">
                <span
                  style={heading}
                  className="text-2xl md:text-3xl font-extrabold"
                  aria-hidden
                >
                  <span style={{ color: GOLD }}>{s.num}</span>
                </span>
                {i < STEPS.length - 1 && (
                  <span aria-hidden className="hidden md:block flex-1 h-px" style={{ backgroundColor: "#DDD5C8" }} />
                )}
              </div>
              <h2 style={heading} className="text-xl md:text-2xl font-bold mt-3">
                {s.title}
              </h2>
              <p className="mt-2.5 text-[15px] leading-relaxed text-[#5F564A]">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* numbers band */}
      <section className="py-12 md:py-16" style={{ backgroundColor: BROWN }}>
        <div className="px-5 md:px-12 grid grid-cols-3 gap-4 md:gap-8 text-center text-white">
          {FACTS.map((f) => (
            <div key={f.label}>
              <div style={heading} className="text-3xl md:text-5xl font-extrabold" >
                <span style={{ color: GOLD }}>{f.value}</span>
              </div>
              <div className="mt-2 text-xs md:text-base opacity-90">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* portfolio */}
      <section className="pt-14 md:pt-20">
        <div className="px-5 md:px-12 mb-6 md:mb-8">
          <h2 style={heading} className="text-3xl md:text-4xl font-extrabold">
            העבודות מדברות בעד עצמן
          </h2>
          <p className="mt-3 text-base md:text-lg text-[#5F564A]">
            כל התמונות — פרויקטים אמיתיים שתכננו, בנינו והתקנו.
          </p>
        </div>
        <PortfolioCarousel images={carouselImages} />
      </section>

      {/* FAQ */}
      <section className="px-5 md:px-12 py-14 md:py-20 max-w-3xl">
        <h2 style={heading} className="text-3xl md:text-4xl font-extrabold mb-8">
          שאלות ששואלים אותנו
        </h2>
        <div className="divide-y" style={{ borderColor: "#EDE9E2" }}>
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary
                style={heading}
                className="flex items-center justify-between cursor-pointer list-none text-lg md:text-xl font-bold [&::-webkit-details-marker]:hidden"
              >
                {item.q}
                <span
                  aria-hidden
                  className="ms-4 shrink-0 transition-transform duration-300 group-open:rotate-45 text-2xl font-light"
                  style={{ color: GOLD }}
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-[15px] md:text-base leading-relaxed text-[#5F564A]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* contact footer */}
      <footer className="px-5 md:px-12 py-14 md:py-20" style={{ backgroundColor: LIGHT }}>
        <div className="max-w-3xl">
          <h2 style={heading} className="text-3xl md:text-4xl font-extrabold">
            השלב הבא? פגישת ייעוץ.
          </h2>
          <p className="mt-4 text-base md:text-lg text-[#5F564A]">
            שלחו הודעה או התקשרו — ונקבע זמן שנוח לכם.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg text-[15px] font-bold text-white transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: "#25D366" }}
            >
              וואטסאפ
            </a>
            <a
              href={CONTACT.phoneHref}
              className="px-6 py-3 rounded-lg text-[15px] font-bold text-white"
              style={{ backgroundColor: BROWN }}
            >
              {CONTACT.phoneDisplay}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="px-6 py-3 rounded-lg text-[15px] font-bold border bg-white"
              style={{ borderColor: "#D8D0C2", color: BROWN }}
            >
              {CONTACT.email}
            </a>
          </div>
          <div className="mt-10 text-xs text-[#8A8272]">
            גרנות עיצובים · נגריית בוטיק · למעלה מ־30 שנות ניסיון
          </div>
        </div>
      </footer>

      <FloatingContactButton />
    </div>
  );
}
