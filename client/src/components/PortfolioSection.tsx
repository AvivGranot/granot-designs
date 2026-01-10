import { useState, useEffect } from 'react';

// Import actual portfolio images
import portfolio1 from "@assets/portfolio1_1758397235379.jpg";
import portfolio4 from "@assets/portfolio4_1758397244209.jpg";
import portfolio5 from "@assets/portfolio5_1758397244200.png";
import portfolio11 from "@assets/portfolio11_1758397235381.png";
import portfolio13 from "@assets/portfolio13_1758397244206.png";
import contact1 from "@assets/contact1_1758397217008.jpg";
import services1 from "@assets/services1_1758397244207.jpg";
import services2 from "@assets/services2_1758397235378.jpg";

const portfolioItems = [
  {
    image: portfolio1,
    alt: "חדר שינה מינימליסטי עם ארונות קיר לבנים מובנים"
  },
  {
    image: portfolio13,
    alt: "מטבח מודרני עם אי מרכזי ותאורה תלויה אלגנטית"
  },
  {
    image: portfolio5,
    alt: "חדר רחצה יוקרתי עם חיפוי משושים שחור ועיצוב מינימליסטי"
  },
  {
    image: contact1,
    alt: "ספרייה מובנית עם תאי אחסון ואלמנטי עץ"
  },
  {
    image: portfolio4,
    alt: "פינת אוכל עם קיר אחסון מובנה ותאורה דקורטיבית"
  },
  {
    image: services1,
    alt: "מטבח כהה עם ארונות מעוצבים ופרטי זהב"
  },
  {
    image: portfolio11,
    alt: "חלל פנימי עם קירות מחופים בפסי עץ אנכיים"
  },
  {
    image: services2,
    alt: "כיור אמבטיה צף עם משטח שיש ועיצוב מודרני"
  }
];

export default function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % portfolioItems.length);
    }, 3000); // 3 seconds per slide

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-black text-white" data-testid="section-portfolio">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6" data-testid="text-portfolio-title">
            תיק עבודות
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto" data-testid="text-portfolio-subtitle">
            מבחר מפרוייקטים שביצענו - מהמטבח הביתי ועד לפרוייקטים מסחריים מורכבים
          </p>
        </div>

        <div className="portfolio-carousel-container relative" style={{ height: '70vh', maxWidth: '1200px', margin: '0 auto' }}>
          <div className="relative w-full h-full rounded-lg overflow-hidden" data-testid="carousel-portfolio">
            {portfolioItems.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-opacity ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
                data-testid={`slide-portfolio-${index}`}
                style={{
                  transitionDuration: '2000ms',
                  zIndex: index === currentIndex ? 1 : 0,
                  pointerEvents: index === currentIndex ? 'auto' : 'none'
                }}
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover rounded-lg"
                  data-testid={`img-portfolio-${index}`}
                  loading="eager"
                  draggable={false}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                  <p className="text-white text-center text-lg font-medium" data-testid={`text-portfolio-alt-${index}`}>
                    {item.alt}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
