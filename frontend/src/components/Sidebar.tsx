import { NavLink, useNavigate } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();

  function handleLink(to: string) {
    onClose();
    navigate(to);
  }

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
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
          <NavLink to="/" end onClick={() => handleLink("/")}
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <span>🏠</span> Home
          </NavLink>
          <NavLink to="/about" onClick={() => handleLink("/about")}
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <span>👤</span> About Me
          </NavLink>
          <NavLink to="/reviews" onClick={() => handleLink("/reviews")}
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <span>⭐</span> Reviews
          </NavLink>
          <NavLink to="/write" onClick={() => handleLink("/write")}
            className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
            <span>✏️</span> Write Post
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
