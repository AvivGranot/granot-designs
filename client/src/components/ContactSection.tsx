const contactInfo = [
  {
    icon: (
      <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
      </svg>
    ),
    title: "טלפון",
    info: "052-1234567"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    title: "אימייל",
    info: "info@granot-design.co.il"
  },
  {
    icon: (
      <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    title: "כתובת",
    info: "רחוב הנגרים 15\nתל אביב, ישראל"
  }
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-primary text-white" data-testid="section-contact">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6" data-testid="text-contact-title">
            צרו קשר
          </h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto" data-testid="text-contact-subtitle">
            נשמח לשמוע על הפרוייקט שלכם ולהציע פתרונות מותאמים במיוחד עבורכם
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 text-center">
          {contactInfo.map((item, index) => (
            <div key={index} className="space-y-4" data-testid={`card-contact-${index}`}>
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-serif font-semibold" data-testid={`text-contact-title-${index}`}>
                {item.title}
              </h3>
              <p className="text-lg opacity-90 whitespace-pre-line" data-testid={`text-contact-info-${index}`}>
                {item.info}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-xl opacity-75 mb-8" data-testid="text-contact-availability">
            זמינים לייעוץ ופגישה ללא התחייבות
          </p>
          <p className="text-lg opacity-90" data-testid="text-contact-hours">
            שעות פעילות: ראשון-חמישי 8:00-17:00, שישי 8:00-13:00
          </p>
        </div>
      </div>
    </section>
  );
}
