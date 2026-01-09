export default function AboutSection() {
  return (
    <section
      id="about"
      className="about-section"
      data-testid="section-about"
    >
      <div className="about-container">
        <h2 className="about-heading">אודותינו</h2>

        <div className="about-body">
          <p className="about-quote">
            "עיצוב משפיע" - דוב גרנות, מייסד שותף, ובוגר בצלאל אקדמיה לאמנות ועיצוב פנים.
          </p>

          <p className="about-description">
            גרנות עיצובים הינה נגריית בוטיק עם למעלה משלושים שנות ניסיון, ואלפי פרויקטים שעוצבו אישית, נבנו בקפידה, ונמסרו במרכז הארץ.
          </p>

          <p className="about-description">
            אנו עובדים בשיתוף פעולה כדי לאפשר לתהליך היצירתי להתפתח באופן אורגני, לצד עיצוב קפדני של אלמנטים ברמת המאקרו והמיקרו. האתוס שלנו הוא לספק גישה משולבת וקוהרנטית לנגרות ועיצוב פנים.
          </p>

          <div className="about-signature">
            <p>בברכה,</p>
            <p className="signature-name">רו"ח נורית גרנות</p>
            <p className="signature-title">מנכ"לית ומייסדת שותפה</p>
          </div>
        </div>
      </div>
    </section>
  );
}
