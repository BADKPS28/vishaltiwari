import { Link } from "react-router-dom";

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
