export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-background" data-testid="section-about">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6" data-testid="text-about-title">
              אודות
            </h2>
            <h3 className="text-2xl font-serif text-secondary mb-6" data-testid="text-about-subtitle">
              בית מלאכה משפחתי עם מסורת של שלושה דורות
            </h3>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-about-description-1">
              גרנות עיצובים היא עסק משפחתי המתמחה בנגרות איכות ויצירת רהיטים מותאמים אישית. אנו משלבים טכניקות מסורתיות עם עיצוב מודרני כדי ליצור פתרונות ייחודיים לכל בית.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed" data-testid="text-about-description-2">
              מהמטבח הביתי ועד לפרוייקטים מסחריים מורכבים - אנו מביאים לכל עבודה את הניסיון, הידע והתשוקה שלנו ליצירת פרטים מושלמים. כל פרוייקט מתוכנן ומבוצע בהתאמה מלאה לצרכים ולחזון של הלקוח.
            </p>
            <div className="flex items-center space-x-reverse space-x-4 text-accent font-semibold" data-testid="text-about-highlights">
              <span>•</span>
              <span>מסורת של 3 דורות</span>
              <span>•</span>
              <span>חומרים איכותיים</span>
              <span>•</span>
              <span>עיצוב מותאם אישית</span>
            </div>
          </div>
          <div>
            <img 
              src="https://pixabay.com/get/ge0f7b9e75e453a008194ec0928edad55401d288ad2cba1f1f3ba441c9669a86d28f7e7ac4dea470056cf62b53b912a97312a0e6273769ee6f8c41bd721d669c8_1280.jpg" 
              alt="אמן נגר עובד על גימור עץ מפורט בבית מלאכה מסורתי" 
              className="w-full rounded-lg shadow-lg"
              data-testid="img-about"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
