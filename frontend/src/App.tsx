import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Article from "./pages/Article.tsx";
import Write from "./pages/Write.tsx";
import About from "./pages/About.tsx";
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";

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
          </Routes>
        </main>
      </div>
    </div>
  );
}
