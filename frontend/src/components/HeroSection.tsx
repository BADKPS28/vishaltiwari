const TOPICS = ["AI & Automation", "Microsoft 365", "Azure", "DevOps", "Digital Transformation", "Enterprise Tech"];

export default function HeroSection() {
  return (
    <section id="home" className="sp-section">
      <div className="page">
        <div className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-greeting">Welcome</p>
              <h1 className="hero-name">Vishal Tiwari</h1>
              <p className="hero-tagline">
                Writing about AI, enterprise collaboration, and the human side of digital transformation.
              </p>
              <div className="hero-actions">
                <a href="#about" className="hero-btn">About me</a>
                <a href="#articles" className="hero-btn-ghost">Read articles</a>
              </div>
            </div>
            <div className="hero-photo-wrap">
              <img
                src="/profile.jpg"
                alt="Vishal Tiwari"
                className="hero-photo"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </div>
          </div>
        </div>

        <div className="topics-wrap">
          <span className="topics-label">Topics</span>
          <div className="topics-list">
            {TOPICS.map((t) => <span key={t} className="topic-tag">{t}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
