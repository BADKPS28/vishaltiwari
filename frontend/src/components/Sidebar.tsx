import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-profile">
        <img
          src="/profile.jpg"
          alt="Vishal Tiwari"
          className="sidebar-photo"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="sidebar-name">Vishal Tiwari</div>
        <div className="sidebar-tagline">Software Engineer · AI &amp; Tech Writer</div>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <span>🏠</span> Home
        </NavLink>
        <NavLink to="/" className="sidebar-link">
          <span>📄</span> Articles
        </NavLink>
        <NavLink to="/write" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
          <span>✏️</span> Write Post
        </NavLink>
      </nav>
    </aside>
  );
}
