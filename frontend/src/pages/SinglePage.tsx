import HeroSection from "../components/HeroSection.tsx";
import ArticlesSection from "../components/ArticlesSection.tsx";
import AboutSection from "../components/AboutSection.tsx";
import ReviewsSection from "../components/ReviewsSection.tsx";

export default function SinglePage() {
  return (
    <div className="single-page">
      <HeroSection />
      <ArticlesSection />
      <AboutSection />
      <ReviewsSection />
    </div>
  );
}
