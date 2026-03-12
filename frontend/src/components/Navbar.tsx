import { Link, NavLink } from "react-router-dom";

interface NavbarProps {
  onMenuToggle: () => void;
}

export default function Navbar({ onMenuToggle }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="hamburger" onClick={onMenuToggle} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
        <Link to="/" className="navbar-name">Vishal Tiwari</Link>
      </div>

      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Home</NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>About</NavLink>
        <NavLink to="/reviews" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Reviews</NavLink>
        <NavLink to="/write" className={({ isActive }) => isActive ? "navbar-link active" : "navbar-link"}>Write</NavLink>
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
