import { useSearchParams } from "react-router-dom";
import HeroSection from "../components/HeroSection.tsx";
import ArticlesSection from "../components/ArticlesSection.tsx";
import AboutSection from "../components/AboutSection.tsx";
import ReviewsSection from "../components/ReviewsSection.tsx";

export default function SinglePage() {
  const [params] = useSearchParams();
  const section = params.get("section") ?? "home";

  return (
    <div className="single-page">
      {section === "home" && <HeroSection />}
      {section === "articles" && <ArticlesSection />}
      {section === "about" && <AboutSection />}
      {section === "reviews" && <ReviewsSection />}
    </div>
  );
}
