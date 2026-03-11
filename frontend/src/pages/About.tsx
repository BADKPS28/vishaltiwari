export default function About() {
  return (
    <div className="page">
      <div className="about-header">
        <img
          src="/profile.jpg"
          alt="Vishal Tiwari"
          className="about-photo"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div>
          <h1 className="about-name">Vishal Tiwari</h1>
          <p className="about-location">📍 Fort Lauderdale, Florida, United States</p>
          <div className="about-contact">
            <a href="tel:6784278436" className="about-contact-item">
              <span>📱</span> <strong>678-427-8436</strong>
            </a>
            <a
              href="https://www.linkedin.com/in/vishal-tiwari-9b164b22/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-contact-item"
            >
              <span>💼</span> LinkedIn Profile
            </a>
          </div>
        </div>
      </div>

      <section className="about-section">
        <h2 className="about-section-title">About Me</h2>
        <p>
          I am a technology professional based in Fort Lauderdale, Florida, with deep expertise in
          enterprise collaboration platforms and digital transformation. I work at{" "}
          <strong>Southern Glazer's Wine & Spirits</strong>, one of the largest wine and spirits
          distributors in the US, where I drive technology initiatives across the organisation.
        </p>
        <p>
          With over two decades of experience in enterprise technology, I am passionate about the
          intersection of AI and business — exploring how tools like Microsoft Copilot, Azure, and
          intelligent automation can transform the way teams work.
        </p>
      </section>

      <section className="about-section">
        <h2 className="about-section-title">Expertise</h2>
        <div className="about-skills">
          {[
            "Microsoft 365",
            "Azure",
            "AWS",
            "Azure IoT",
            "SharePoint",
            "Office 365",
            "Microsoft Copilot",
            "AI & Automation",
            "Digital Transformation",
            "Enterprise Collaboration",
          ].map((skill) => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-title">Experience</h2>
        <div className="about-timeline">
          <div className="timeline-item">
            <div className="timeline-role">Technology Professional</div>
            <div className="timeline-company">Southern Glazer's Wine & Spirits</div>
            <div className="timeline-desc">
              Leading enterprise collaboration and digital transformation initiatives.
            </div>
          </div>
          <div className="timeline-item">
            <div className="timeline-role">SharePoint & Office 365 Developer</div>
            <div className="timeline-company">Fujitsu</div>
            <div className="timeline-desc">
              Built and delivered enterprise Office 365 and SharePoint solutions. Recognised for
              strong technical foundation and problem-solving.
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-title">Education</h2>
        <div className="timeline-item">
          <div className="timeline-role">IIMS</div>
          <div className="timeline-company">2001 – 2004</div>
        </div>
      </section>

      <section className="about-section">
        <h2 className="about-section-title">Writing</h2>
        <p>
          I write about AI, automation, enterprise technology, and the human side of digital
          transformation. Topics include AI code generation, intelligent agents, human-AI
          collaboration, and productivity in the modern workplace.
        </p>
      </section>
    </div>
  );
}
