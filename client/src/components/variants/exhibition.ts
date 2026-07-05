import {
  heroImages,
  july5Projects,
  newProjects,
  tallProjects,
  wideProjects,
} from "./data";
import type { Project } from "./data";

// The full collection, deduped and grouped into wings — Aviv's hand curation
// (2026-07-05). Shared by the live homepage grid and the /v9 museum page so
// the catalog order stays identical in both.

const heroAsProject = (img: { src: string; alt: string }, label: string): Project => ({
  src: img.src,
  alt: img.alt,
  label,
});

function dedupe(list: Project[]): Project[] {
  const seen = new Set<string>();
  return list.filter((p) => !seen.has(p.src) && seen.add(p.src));
}

const KITCHENS = new Set(["מטבחים", "נתניה"]);
const STORAGE = new Set(["ארונות", "חדרי שינה", "נגרות אומן", "חדרי ילדים", "משרד", "הוד השרון"]);

// Hand-curated placement (Aviv, 2026-07-05) — keyed by alt, wins over label sets
const MOVES: Record<string, string> = {
  "חדר משפחה עם קיר מדיה וחיפוי עץ": "storage",
  "נישת מדיה עם חיפוי מחורץ בסלון": "storage",
  "קיר טלוויזיה כפרי עם קמין ונישות עצי הסקה": "storage",
  "חדר שינה מינימליסטי עם ארונות לבנים מובנים": "living",
};
const FEATURED: Record<string, string> = {
  kitchens: "מטבח כפרי ירוק בשלבי התקנה",
  storage: "ארון הזזה בחדר ילדים",
  living: "חדר רחצה מעוצב ומינימליסטי",
};
const PINNED: Record<string, string[]> = {
  storage: ["ארון חדר שינה לבן עם יחידת מגירות", "ספריית תצוגה בגוון מנטה למשרד"],
};
// Pairs that trade display positions within their wing (Aviv, 2026-07-05) — keyed by alt
const SWAPS: [string, string][] = [
  ["ארון בגדים לבן מובנה עם נישת אחסון ותאורת LED", "ארונות משרד"],
];
// Pushed to the lower rows of their wing (Aviv, 2026-07-05) — keyed by alt
const DEMOTED = new Set([
  "מטבח שחור עם משטח עץ אלון וויטרינות",
  "מטבח מודרני עם אי כחול ומשטח עץ טבעי",
  "מטבח לבן עם אקסנטים צבעוניים ושטיח גיאומטרי",
]);

function wingOf(p: Project): string {
  return (
    MOVES[p.alt] ??
    (KITCHENS.has(p.label) ? "kitchens" : STORAGE.has(p.label) ? "storage" : "living")
  );
}

const ALL = dedupe([
  heroAsProject(heroImages.penthouseKitchen, "מטבחים"),
  heroAsProject(heroImages.oakCounterCloseup, "מטבחים"),
  heroAsProject(heroImages.navyOakNiche, "ארונות"),
  heroAsProject(heroImages.wardrobeOakShelves, "ארונות"),
  ...newProjects,
  ...july5Projects,
  ...wideProjects,
  ...tallProjects,
]).filter(
  (p) =>
    // removed from the exhibition per Aviv
    p.alt !== "ארונות גובה מפורניר אלון" &&
    p.alt !== "מטבח בשלבי בנייה - ארונות ירוקים מעוצבים" &&
    p.alt !== "ארון פינתי עם עמודת תצוגה מאלון" &&
    p.alt !== "ארון קיר לבן עם עמודת מדפי אלון" &&
    p.alt !== "מטבח יוקרתי עם אי שיש כהה ותאורה תלויה" &&
    p.alt !== "חדר משפחה עם קיר מדיה וחיפוי עץ" &&
    p.alt !== "ספריית תצוגה בגוון מנטה למשרד",
);

// True pixel dimensions of every exhibition asset (ffprobe, 2026-07-05).
// Keyed by asset basename — hashed build URLs still contain it.
const DIMS: Record<string, [number, number]> = {
  hero_penthouse_kitchen: [1920, 1440],
  oak_counter_closeup: [1400, 1867],
  navy_oak_niche: [1600, 893],
  wardrobe_oak_shelves: [1200, 1600],
  kitchen_oak_island: [1600, 1463],
  sage_kitchen_black_unit: [1920, 1071],
  wardrobe_tv_wall: [1448, 1086],
  wardrobe_white_gray: [1400, 1050],
  understairs_storage: [1200, 1600],
  fluted_island_kitchen: [864, 1152],
  chandelier_kitchen: [900, 1600],
  classic_brass_kitchen: [1600, 1200],
  graygreen_wood_niche_kitchen: [1600, 720],
  black_butcherblock_kitchen: [1200, 1600],
  farmhouse_white_kitchen: [750, 758],
  navy_coffee_niche: [1024, 768],
  navy_glass_hutch: [864, 1152],
  oak_slatted_wardrobe: [900, 1600],
  tv_wardrobe_oak_niche: [1600, 892],
  bath_stone_oak_vanity: [1600, 892],
  walnut_fluted_vanity: [1600, 1200],
  walnut_floating_vanity: [1064, 1600],
  slatted_media_niche: [1280, 720],
  den_media_wall: [1600, 720],
  office_mint_library: [1024, 768],
  Mobile_Carousel_1_1758782507060: [1600, 1064],
  Mobile_Carousel_2_1758782507061: [1080, 1920],
  Mobile_Carousel_4_1758782507064: [1080, 1920],
  Mobile_Carousel_5_1758782511117: [1080, 1920],
  Mobile_Carousel_6_1758784141892: [1080, 1920],
  Mobile_Carousel_7_1758782511118: [1080, 1920],
  Mobile_Carousel_8_1758782511119: [1080, 1920],
  Mobile_Carousel_9_1758782511120: [576, 1024],
  Mobile_Carousel_10_1758782511121: [1080, 1920],
  Mobile_About_1_1758798578200: [768, 1344],
  dafna: [3840, 5120],
  PC_Carousel_1_1758790862081: [1600, 1064],
  PC_Carousel_2_1758790862081: [1366, 768],
  PC_Carousel_3_1758790862082: [1366, 768],
  PC_Carousel_4_1758790862082: [1600, 1200],
  PC_Carousel_5_1758790862083: [1344, 768],
  PC_Carousel_6_1758790862083: [1344, 768],
  PC_Carousel_8_1758790862084: [1366, 768],
  PC_Carousel_8_1758796224264: [1366, 768],
  Hod_Hasharon: [1920, 1080],
  natanya: [2336, 1760],
  // Legacy duplicate files — Vite dedupes identical content to one URL and may
  // pick these older names, so they must resolve too (same pixels as
  // Mobile_Carousel_1 / Mobile_Carousel_9 respectively)
  portfolio1_1758398100598: [1600, 1064],
  portfolio4_1758398446612: [576, 1024],
  closet_pc: [1200, 1600],
  closet_mobile: [1200, 1600],
  PC_Carousel_wa2_1776068488860: [1600, 1200],
};

// Width/height ratio of an image by its src URL; <1 means portrait
export function ratioOf(src: string): number {
  for (const name in DIMS) {
    if (src.includes(name)) {
      const [w, h] = DIMS[name];
      return w / h;
    }
  }
  return 4 / 3;
}

export interface Wing {
  id: string;
  letter: string;
  title: string;
  pieces: Project[];
}

function orderWing(id: string): Project[] {
  const rank = (p: Project) => {
    if (p.alt === FEATURED[id]) return 0;
    const pin = PINNED[id]?.indexOf(p.alt) ?? -1;
    if (pin >= 0) return 1 + pin;
    return DEMOTED.has(p.alt) ? 200 : 100;
  };
  const sorted = ALL.filter((p) => wingOf(p) === id).sort((a, b) => rank(a) - rank(b));
  for (const [a, b] of SWAPS) {
    const ia = sorted.findIndex((p) => p.alt === a);
    const ib = sorted.findIndex((p) => p.alt === b);
    if (ia >= 0 && ib >= 0) [sorted[ia], sorted[ib]] = [sorted[ib], sorted[ia]];
  }
  return sorted;
}

export const WINGS: Wing[] = [
  { id: "kitchens", letter: "א", title: "מטבחים", pieces: orderWing("kitchens") },
  { id: "storage", letter: "ב", title: "ארונות וקירות טלוויזיה", pieces: orderWing("storage") },
  { id: "living", letter: "ג", title: "חדרי שינה ורחצה", pieces: orderWing("living") },
];

// Running catalog number across the whole exhibition
let counter = 0;
export const numbered = new Map<string, string>();
for (const w of WINGS) {
  for (const p of w.pieces) {
    counter += 1;
    numbered.set(p.src, String(counter).padStart(2, "0"));
  }
}

// The whole exhibition flattened in catalog order — what the homepage grid shows
export const exhibitionPieces: Project[] = WINGS.flatMap((w) => w.pieces);
