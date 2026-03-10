import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Article from "./pages/Article.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article/:id" element={<Article />} />
    </Routes>
  );
}
