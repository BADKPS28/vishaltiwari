import { useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "articles", label: "Articles" },
  { id: "about", label: "About" },
  { id: "reviews", label: "Reviews" },
];

export default function Navbar() {
  const [params, setParams] = useSearchParams();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const isHome = location.pathname === "/";
  const active = params.get("section") ?? "home";

  function goTo(id: string) {
    if (isHome) {
      setParams({ section: id });
    } else {
      window.location.href = `/?section=${id}`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="hamburger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu">
            <span className={menuOpen ? "bar bar-top open" : "bar bar-top"} />
            <span className={menuOpen ? "bar bar-mid open" : "bar bar-mid"} />
            <span className={menuOpen ? "bar bar-bot open" : "bar bar-bot"} />
          </button>
          <button className="navbar-name" onClick={() => goTo("home")}>
            Vishal Tiwari
          </button>
        </div>

        <div className="navbar-links">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`navbar-link${active === id && isHome ? " active" : ""}`}
              onClick={() => goTo(id)}
            >
              {label}
            </button>
          ))}
          <Link to="/write" className="navbar-link navbar-link-write">Write</Link>
        </div>

        <button className="navbar-avatar" onClick={() => goTo("about")}>
          <img
            src="/profile.jpg"
            alt="Vishal Tiwari"
            className="navbar-photo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              (e.currentTarget.nextElementSibling as HTMLElement)?.removeAttribute("style");
            }}
          />
          <span className="navbar-initials" style={{ display: "none" }}>VT</span>
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`mobile-menu-item${active === id && isHome ? " active" : ""}`}
              onClick={() => goTo(id)}
            >
              {label}
            </button>
          ))}
          <Link to="/write" className="mobile-menu-item" onClick={() => setMenuOpen(false)}>
            Write
          </Link>
        </div>
      )}
      {menuOpen && <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />}
    </>
  );
}
