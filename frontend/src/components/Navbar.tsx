import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-name">Vishal Tiwari</Link>
      <Link to="/" className="navbar-avatar">
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
