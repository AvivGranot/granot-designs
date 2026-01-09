export default function ContactSection() {
  return (
    <section
      id="contact"
      className="contact-section"
      data-testid="section-contact"
    >
      <div className="contact-container">
        <h2 className="contact-heading">צור קשר</h2>

        <div className="contact-info">
          <div className="contact-item">
            <span className="contact-label">טלפון:</span>
            <a href="tel:054-327-3719" className="contact-link">054-327-3719</a>
          </div>

          <div className="contact-item">
            <span className="contact-label">אימייל:</span>
            <a href="mailto:dngranot@gmail.com" className="contact-link">dngranot@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
