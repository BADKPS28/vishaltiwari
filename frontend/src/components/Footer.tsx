import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-name">Vishal Tiwari</span>
          <span className="footer-copy">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <nav className="footer-links">
          <Link to="/?section=home" className="footer-link">Home</Link>
          <Link to="/?section=about" className="footer-link">About</Link>
          <Link to="/?section=reviews" className="footer-link">Reviews</Link>
          <a href="https://www.linkedin.com/in/vishal-tiwari-9b164b22/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn</a>
        </nav>
      </div>
    </footer>
  );
}
