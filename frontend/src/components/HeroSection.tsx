import { useNavigate } from "react-router-dom";

const TOPICS = ["AI & Automation", "Microsoft 365", "Azure", "DevOps", "Digital Transformation", "Enterprise Tech"];

export default function HeroSection() {
  const navigate = useNavigate();
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
                <button className="hero-btn" onClick={() => navigate("/?section=about")}>About me</button>
                <button className="hero-btn-ghost" onClick={() => navigate("/?section=articles")}>Read articles</button>
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
