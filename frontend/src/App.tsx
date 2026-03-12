import { useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Article from "./pages/Article.tsx";
import Write from "./pages/Write.tsx";
import About from "./pages/About.tsx";
import Reviews from "./pages/Reviews.tsx";
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";

function FloatingReviewBtn() {
  const location = useLocation();
  if (location.pathname === "/reviews") return null;
  return (
    <Link to="/reviews" className="fab-review" title="Leave a Review">
      <span className="fab-star">★</span>
      <span className="fab-label">Review</span>
    </Link>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Navbar onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <div className="app-body">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/write" element={<Write />} />
            <Route path="/reviews" element={<Reviews />} />
          </Routes>
        </main>
      </div>
      <FloatingReviewBtn />
    </div>
  );
}
