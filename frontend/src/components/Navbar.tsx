import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  function scrollTo(id: string) {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = `/#${id}`;
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-name">Vishal Tiwari</Link>
      </div>

      <div className="navbar-links">
        <button className="navbar-link" onClick={() => scrollTo("home")}>Home</button>
        <button className="navbar-link" onClick={() => scrollTo("articles")}>Articles</button>
        <button className="navbar-link" onClick={() => scrollTo("about")}>About</button>
        <button className="navbar-link" onClick={() => scrollTo("reviews")}>Reviews</button>
        <Link to="/write" className="navbar-link">Write</Link>
      </div>

      <Link to="/about" className="navbar-avatar">
        <img src="/profile.jpg" alt="Vishal Tiwari" className="navbar-photo"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextElementSibling?.removeAttribute("style");
          }}
        />
        <span className="navbar-initials" style={{ display: "none" }}>VT</span>
      </Link>
    </nav>
  );
}
