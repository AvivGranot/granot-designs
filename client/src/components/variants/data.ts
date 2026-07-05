import { useEffect, useState } from "react";

// Real project photos — same assets the live homepage uses
import mobilePortfolio1 from "@assets/Mobile_Carousel_1_1758782507060.webp";
import mobilePortfolio2 from "@assets/Mobile_Carousel_2_1758782507061.webp";
import mobilePortfolio4 from "@assets/Mobile_Carousel_4_1758782507064.webp";
import mobilePortfolio5 from "@assets/Mobile_Carousel_5_1758782511117.webp";
import mobilePortfolio6 from "@assets/Mobile_Carousel_6_1758784141892.webp";
import mobilePortfolio7 from "@assets/Mobile_Carousel_7_1758782511118.webp";
import mobilePortfolio8 from "@assets/Mobile_Carousel_9_1758782511120.webp";
import mobilePortfolio9 from "@assets/Mobile_Carousel_8_1758782511119.webp";
import mobilePortfolio10 from "@assets/Mobile_Carousel_10_1758782511121.webp";
import mobilePortfolio11 from "@assets/Mobile_About_1_1758798578200.webp";
import dafna from "@assets/dafna.webp";
import pcPortfolio1 from "@assets/PC_Carousel_1_1758790862081.webp";
import pcPortfolio2 from "@assets/PC_Carousel_2_1758790862081.webp";
import pcPortfolio3 from "@assets/PC_Carousel_3_1758790862082.webp";
import pcPortfolio4 from "@assets/PC_Carousel_4_1758790862082.webp";
import pcPortfolio5 from "@assets/PC_Carousel_5_1758790862083.webp";
import pcPortfolio6 from "@assets/PC_Carousel_6_1758790862083.webp";
import pcPortfolio8 from "@assets/PC_Carousel_8_1758790862084.webp";
import pcAbout1 from "@assets/PC_About_1_1758790964412.webp";
import newPcPortfolio8 from "@assets/PC_Carousel_8_1758796224264.webp";
import newPcPortfolio10 from "@assets/PC_Carousel_10_1758796936936.webp";
import hodHasharon from "@assets/Hod_Hasharon.webp";
import natanya from "@assets/natanya.webp";
import closetPc from "@assets/closet_pc.webp";
import closetMobile from "@assets/closet_mobile.webp";
import waPc2 from "@assets/PC_Carousel_wa2_1776068488860.webp";
import waMobile2 from "@assets/Mobile_Carousel_wa2_1776068488860.webp";

// New photos (2026-07-04 batch from Aviv)
import heroPenthouseKitchen from "@assets/hero_penthouse_kitchen.webp";
import oakCounterCloseup from "@assets/oak_counter_closeup.webp";
import sageKitchenBlackUnit from "@assets/sage_kitchen_black_unit.webp";
import wardrobeWhiteGray from "@assets/wardrobe_white_gray.webp";
import navyOakNiche from "@assets/navy_oak_niche.webp";
import wardrobeTvWall from "@assets/wardrobe_tv_wall.webp";
import kitchenOakIsland from "@assets/kitchen_oak_island.webp";
import understairsStorage from "@assets/understairs_storage.webp";
import wardrobeOakShelves from "@assets/wardrobe_oak_shelves.webp";
import heroWardrobePan from "@assets/hero_wardrobe_pan.mp4";
import heroWardrobePoster from "@assets/hero_wardrobe_poster.webp";

export const CONTACT = {
  phoneDisplay: "054-327-3719",
  phoneHref: "tel:054-327-3719",
  whatsapp: "https://wa.me/972543273719",
  email: "dngranot@gmail.com",
} as const;

export interface Project {
  src: string;
  alt: string;
  label: string; // short category/place tag
  portrait?: boolean;
}

// Landscape (PC) shots — best for wide cards and rows
export const wideProjects: Project[] = [
  { src: pcPortfolio2, alt: "מטבח מודרני עם אי מעוצב ותאורה מעלית", label: "מטבחים" },
  { src: hodHasharon, alt: "פרוייקט הוד השרון - קיר טלוויזיה עם ספריה מובנית", label: "הוד השרון" },
  { src: natanya, alt: "פרוייקט נתניה - מטבח מעוצב", label: "נתניה" },
  { src: pcPortfolio1, alt: "חדר שינה מינימליסטי עם ארונות לבנים מובנים", label: "חדרי שינה" },
  { src: pcPortfolio4, alt: "מטבח פתוח עם אי כחול ושולחן עגול מעץ", label: "מטבחים" },
  { src: pcPortfolio3, alt: "מטבח שחור עם ארונות עליונים וגופי תאורה", label: "מטבחים" },
  { src: pcPortfolio8, alt: "מטבח כחול עם אי לבן וכסאות בר מעץ", label: "מטבחים" },
  { src: newPcPortfolio8, alt: "מטבח מודרני עם אי זהב וכסאות צהובים", label: "מטבחים" },
  { src: pcPortfolio6, alt: "מטבח מודרני עם אי כחול ומשטח עץ טבעי", label: "מטבחים" },
  { src: pcPortfolio5, alt: "מטבח לבן עם אקסנטים צבעוניים ושטיח גיאומטרי", label: "מטבחים" },
  { src: closetPc, alt: "ארון בגדים לבן מובנה עם נישת אחסון ותאורת LED", label: "ארונות" },
  { src: newPcPortfolio10, alt: "מטבח בשלבי בנייה - ארונות ירוקים מעוצבים", label: "מאחורי הקלעים" },
  { src: waPc2, alt: "עבודת נגרות מקצועית", label: "נגרות" },
];

// Portrait (mobile) shots — best for masonry and single-column
export const tallProjects: Project[] = [
  { src: mobilePortfolio1, alt: "ארונות מטבח מודרניים", label: "מטבחים", portrait: true },
  { src: mobilePortfolio2, alt: "מטבח יוקרתי עם אי שיש כהה ותאורה תלויה", label: "מטבחים", portrait: true },
  { src: mobilePortfolio6, alt: "מטבח כפרי ירוק בשלבי התקנה", label: "מטבחים", portrait: true },
  { src: mobilePortfolio7, alt: "קיר טלוויזיה כפרי עם קמין ונישות עצי הסקה", label: "סלון", portrait: true },
  { src: mobilePortfolio8, alt: "ארון הזזה בחדר ילדים", label: "חדרי ילדים", portrait: true },
  { src: mobilePortfolio9, alt: "ארונות משרד", label: "משרד", portrait: true },
  { src: dafna, alt: "עיצוב נגרות מותאם אישית", label: "עיצוב אישי", portrait: true },
  { src: mobilePortfolio4, alt: "מטבח שחור כפרי עם נישת תצוגה מעץ", label: "מטבחים", portrait: true },
  { src: mobilePortfolio5, alt: "מטבח לבן עם אקסנטים צבעוניים ושטיח גיאומטרי", label: "מטבחים", portrait: true },
  { src: closetMobile, alt: "ארון בגדים לבן מובנה עם ידיות ארוכות", label: "ארונות", portrait: true },
  { src: mobilePortfolio10, alt: "חדר רחצה עם ארון אמבטיה תלוי כפול", label: "אמבטיה", portrait: true },
  { src: mobilePortfolio11, alt: "חדר רחצה מעוצב ומינימליסטי", label: "אמבטיה", portrait: true },
  { src: waMobile2, alt: "עבודת נגרות מקצועית", label: "נגרות", portrait: true },
];

// The design sketch — great for "process/planning" storytelling
export const sketchImage: Project = {
  src: pcAbout1,
  alt: "סקיצת עיצוב נגרות - תכנון מקצועי ויצירתי",
  label: "תכנון",
};

// 2026-07-04 batch — fresh installs, no people in frame
export const newProjects: Project[] = [
  { src: kitchenOakIsland, alt: "מטבח לבן עם אי וחזיתות אלון טבעי", label: "מטבחים" },
  { src: sageKitchenBlackUnit, alt: "מטבח ירוק־אפור עם משטח אלון וקיר נגרות שחור", label: "מטבחים" },
  { src: wardrobeTvWall, alt: "קיר ארונות לבן עם נישת טלוויזיה", label: "ארונות" },
  { src: wardrobeWhiteGray, alt: "ארון חדר שינה לבן עם יחידת מגירות", label: "חדרי שינה" },
  { src: understairsStorage, alt: "אחסון בהתאמה מלאה מתחת למדרגות", label: "נגרות אומן", portrait: true },
];

export const heroImages = {
  penthouseKitchen: {
    src: heroPenthouseKitchen,
    alt: "מטבח פנטהאוז עם משטח אלון ונוף עירוני",
  },
  oakCounterCloseup: {
    src: oakCounterCloseup,
    alt: "משטח אלון בעבודת יד במטבח קלאסי",
  },
  navyOakNiche: {
    src: navyOakNiche,
    alt: "ארון כחול־כהה עם נישת מדפי אלון",
  },
  understairsStorage: {
    src: understairsStorage,
    alt: "ארונות בהתאמה אישית מתחת למדרגות עם נישת אלון",
  },
  wardrobeOakShelves: {
    src: wardrobeOakShelves,
    alt: "חדר ארונות לבן עם מדפי אלון",
  },
} as const;

export const heroVideo = {
  src: heroWardrobePan,
  poster: heroWardrobePoster,
  alt: "סיור וידאו בארון קיר בהתקנה אמיתית",
} as const;

// Only true, verifiable facts — no invented claims
export const FACTS = [
  { value: "30+", label: "שנות ניסיון" },
  { value: "אלפי", label: "פרויקטים שנמסרו" },
  { value: "בצלאל", label: "האקדמיה לאמנות ועיצוב" },
] as const;

export function useVariantPage() {
  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    document.documentElement.setAttribute("lang", "he");
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex";
    document.head.appendChild(meta);
    window.scrollTo(0, 0);
    return () => {
      document.head.removeChild(meta);
    };
  }, []);
}

export function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}
