import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Article from "./pages/Article.tsx";
import Write from "./pages/Write.tsx";
import Navbar from "./components/Navbar.tsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </>
  );
}
