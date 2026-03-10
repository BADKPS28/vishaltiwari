import { Link } from "react-router-dom";

// Replace this URL with your actual photo URL
const PROFILE_PHOTO = "";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-name">Vishal Tiwari</Link>
      <Link to="/" className="navbar-avatar">
        {PROFILE_PHOTO ? (
          <img src={PROFILE_PHOTO} alt="Vishal Tiwari" className="navbar-photo" />
        ) : (
          <span className="navbar-initials">VT</span>
        )}
      </Link>
    </nav>
  );
}
