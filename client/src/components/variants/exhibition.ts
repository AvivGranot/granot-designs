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
    p.alt !== "מטבח בשלבי בנייה - ארונות ירוקים מעוצבים",
);

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
