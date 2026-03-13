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
  const isHome = location.pathname === "/";
  const active = params.get("section") ?? "home";

  function goTo(id: string) {
    if (isHome) {
      setParams({ section: id });
    } else {
      window.location.href = `/?section=${id}`;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <nav className="navbar">
      <div className="navbar-left">
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
        <Link to="/write" className="navbar-link">Write</Link>
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
  );
}
