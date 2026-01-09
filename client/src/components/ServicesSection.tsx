const services = [
  {
    title: "מטבחים מותאמים אישית",
    description: "עיצוב ובנייה של מטבחים יוקרתיים עם דגש על פונקציונליות, אסתטיקה ושימוש בחומרים איכותיים. כל מטבח מותאם במיוחד לצרכים ולסגנון החיים שלכם.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    title: "ריהוט מובנה",
    description: "פתרונות אחסון חכמים וריהוט מובנה המיועד להתאים בדיוק לחלל שלכם. ארונות קיר, ספריות, יחידות טלוויזיה ועוד - הכל בעבודת יד מקצועית.",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    title: "רהיטים מותאמים אישית",
    description: "יצירת רהיטים ייחודיים בעבודת יד - שולחנות אוכל, ארונות, מיטות ועוד. כל פריט נוצר עם תשומת לב לפרטים ובהתאם לדרישות הספציפיות שלכם.",
    image: "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  }
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-background" data-testid="section-services">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6" data-testid="text-services-title">
            שירותים
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-subtitle">
            אנו מתמחים ביצירת פתרונות נגרות מותאמים אישית עם דגש על איכות, פרטים ועיצוב מושלם
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-card p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow" data-testid={`card-service-${index}`}>
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-48 object-cover rounded-md mb-6"
                data-testid={`img-service-${index}`}
              />
              <h3 className="text-2xl font-serif font-semibold text-primary mb-4" data-testid={`text-service-title-${index}`}>
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid={`text-service-description-${index}`}>
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
