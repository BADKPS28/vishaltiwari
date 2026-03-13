import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import SinglePage from "./pages/SinglePage.tsx";
import Article from "./pages/Article.tsx";
import Write from "./pages/Write.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/Footer.tsx";

function FloatingReviewBtn() {
  const location = useLocation();
  const navigate = useNavigate();
  if (location.pathname !== "/") return null;
  return (
    <button
      className="fab-review"
      title="Leave a Review"
      onClick={() => { navigate("/?section=reviews"); window.scrollTo({ top: 0 }); }}
    >
      <span className="fab-star">★</span>
      <span className="fab-label">Review</span>
    </button>
  );
}

export default function App() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<SinglePage />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/write" element={<Write />} />
        </Routes>
      </main>
      <FloatingReviewBtn />
      <Footer />
    </div>
  );
}
