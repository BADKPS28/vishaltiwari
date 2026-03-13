import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.ts";
import type { PostSummary } from "../types.ts";

const TOPICS = ["AI & Automation", "Microsoft 365", "Azure", "DevOps", "Digital Transformation", "Enterprise Tech"];
const SKILLS = ["Microsoft 365", "Azure", "AWS", "Azure IoT", "SharePoint", "Office 365", "Microsoft Copilot", "AI & Automation", "Digital Transformation", "Enterprise Collaboration"];

function readingTime(title: string) {
  return Math.max(1, Math.round((title.split(" ").length * 15) / 200));
}

interface Review {
  id: string;
  name: string;
  rating: number;
  body: string;
  created_at: string;
}

function Stars({ rating, interactive = false, onRate }: { rating: number; interactive?: boolean; onRate?: (r: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={`star ${s <= (interactive ? (hovered || rating) : rating) ? "star-filled" : ""}`}
          onClick={() => interactive && onRate?.(s)}
          onMouseEnter={() => interactive && setHovered(s)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{ cursor: interactive ? "pointer" : "default" }}
        >★</span>
      ))}
    </div>
  );
}

export default function SinglePage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState<string | null>(null);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  useEffect(() => {
    api.posts()
      .then((r) => r.json())
      .then((data: unknown) => { setPosts(Array.isArray(data) ? data : []); setPostsLoading(false); })
      .catch(() => { setPostsError("Could not load posts."); setPostsLoading(false); });

    api.reviews()
      .then((r) => r.json())
      .then((data: unknown) => { setReviews(Array.isArray(data) ? data : []); setReviewsLoading(false); })
      .catch(() => setReviewsLoading(false));
  }, []);

  async function handleReviewSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setReviewError("Please select a star rating."); return; }
    setSubmitting(true);
    setReviewError(null);
    try {
      const res = await api.submitReview(name, rating, body);
      if (!res.ok) throw new Error("Failed");
      const newReview = await res.json() as Review;
      setReviews((prev) => [newReview, ...prev]);
      setName(""); setBody(""); setRating(0);
      setSubmitted(true);
    } catch {
      setReviewError("Could not submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
    pct: reviews.length ? Math.round((reviews.filter((r) => r.rating === star).length / reviews.length) * 100) : 0,
  }));

  return (
    <div className="single-page">

      {/* ── HERO ── */}
      <section id="home" className="sp-section sp-hero">
        <div className="page">
          <div className="hero">
            <div className="hero-content">
              <div className="hero-text">
                <p className="hero-greeting">Welcome</p>
                <h1 className="hero-name">Vishal Tiwari</h1>
                <p className="hero-tagline">
                  Writing about AI, enterprise collaboration, and the human side of digital transformation.
                </p>
                <div className="hero-actions">
                  <a href="#about" className="hero-btn">About me</a>
                  <a href="#articles" className="hero-btn-ghost">Read articles</a>
                </div>
              </div>
              <div className="hero-photo-wrap">
                <img src="/profile.jpg" alt="Vishal Tiwari" className="hero-photo"
                  onError={(e) => { e.currentTarget.style.display = "none"; }} />
              </div>
            </div>
          </div>

          {/* Topics */}
          <div className="topics-wrap">
            <span className="topics-label">Topics</span>
            <div className="topics-list">
              {TOPICS.map((t) => <span key={t} className="topic-tag">{t}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES ── */}
      <section id="articles" className="sp-section">
        <div className="page">
          <div className="section-header">
            <h2 className="section-title">Latest Articles</h2>
            {!postsLoading && !postsError && <span className="section-count">{posts.length} posts</span>}
          </div>
          {postsLoading && <p className="state-msg">Loading...</p>}
          {postsError && <p className="state-msg error">{postsError}</p>}
          {!postsLoading && !postsError && posts.length === 0 && (
            <p className="state-msg">No articles yet. Check back soon.</p>
          )}
          <div className="post-list">
            {posts.map((post) => (
              <Link key={post.id} to={`/article/${post.id}`} className="post-card">
                <div className="post-card-meta">
                  <span className="post-date">
                    {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </span>
                  <span className="post-reading-time">{readingTime(post.Title ?? "")} min read</span>
                </div>
                <h3 className="post-title">{post.Title ?? "Untitled"}</h3>
                <span className="read-more">Read article →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="sp-section sp-about-section">
        <div className="page">
          <div className="about-header">
            <img src="/profile.jpg" alt="Vishal Tiwari" className="about-photo"
              onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <div>
              <h1 className="about-name">Vishal Tiwari</h1>
              <p className="about-location">📍 Fort Lauderdale, Florida, United States</p>
              <div className="about-contact">
                <a href="tel:6784278436" className="about-contact-item"><span>📱</span> <strong>678-427-8436</strong></a>
                <a href="https://www.linkedin.com/in/vishal-tiwari-9b164b22/" target="_blank" rel="noopener noreferrer" className="about-contact-item"><span>💼</span> LinkedIn Profile</a>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2 className="about-section-title">About Me</h2>
            <p>I am a technology professional based in Fort Lauderdale, Florida, with deep expertise in enterprise collaboration platforms and digital transformation. I work at <strong>Southern Glazer's Wine & Spirits</strong>, one of the largest wine and spirits distributors in the US, where I drive technology initiatives across the organisation.</p>
            <p>With over two decades of experience in enterprise technology, I am passionate about the intersection of AI and business — exploring how tools like Microsoft Copilot, Azure, and intelligent automation can transform the way teams work.</p>
            <p>I've built a strong foundation in .NET development and IT project management, and I'm now channeling that experience into the world of AI, cloud, and DevOps. Lately, my focus has been on expanding my expertise in Azure Data Factory, Synapse, and Flux, approaching each new skill with a methodical, growth‑driven mindset. Beyond tech, I'm passionate about learning new languages and maintaining balance through consistent wellness routines — keeping both my mind and my work sharp.</p>
          </div>

          <div className="about-section">
            <h2 className="about-section-title">Expertise</h2>
            <div className="about-skills">
              {SKILLS.map((skill) => <span key={skill} className="skill-tag">{skill}</span>)}
            </div>
          </div>

          <div className="about-section">
            <h2 className="about-section-title">Experience</h2>
            <div className="about-timeline">
              <div className="timeline-item">
                <div className="timeline-role">Technology Professional</div>
                <div className="timeline-company">Southern Glazer's Wine & Spirits</div>
                <div className="timeline-desc">Leading enterprise collaboration and digital transformation initiatives.</div>
              </div>
              <div className="timeline-item">
                <div className="timeline-role">SharePoint & Office 365 Developer</div>
                <div className="timeline-company">Fujitsu</div>
                <div className="timeline-desc">Built and delivered enterprise Office 365 and SharePoint solutions.</div>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2 className="about-section-title">Education</h2>
            <div className="timeline-item">
              <div className="timeline-role">IIMS</div>
              <div className="timeline-company">2001 – 2004</div>
            </div>
          </div>

          <div className="about-section">
            <h2 className="about-section-title">Writing</h2>
            <p>I write about AI, automation, enterprise technology, and the human side of digital transformation. Topics include AI code generation, intelligent agents, human-AI collaboration, and productivity in the modern workplace.</p>
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="sp-section">
        <div className="page">
          <div className="reviews-header">
            <div className="reviews-header-top">
              <div>
                <h1 className="reviews-title">Reviews</h1>
                <p className="reviews-subtitle">Worked with me or read my writing? I'd love to hear your thoughts.</p>
              </div>
              {avgRating && (
                <div className="reviews-avg">
                  <span className="reviews-avg-score">{avgRating}</span>
                  <Stars rating={Math.round(Number(avgRating))} />
                  <span className="reviews-avg-count">{reviews.length} review{reviews.length !== 1 ? "s" : ""}</span>
                </div>
              )}
            </div>
            {reviews.length > 0 && (
              <div className="rating-distribution">
                {distribution.map(({ star, count, pct }) => (
                  <div key={star} className="rating-bar-row">
                    <span className="rating-bar-label">{star}★</span>
                    <div className="rating-bar-track"><div className="rating-bar-fill" style={{ width: `${pct}%` }} /></div>
                    <span className="rating-bar-count">{count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {!submitted ? (
            <div className="review-form-wrap">
              <h2 className="review-form-title">Leave a Review</h2>
              <form onSubmit={handleReviewSubmit} className="review-form">
                <input className="write-input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
                <div className="rating-wrap">
                  <span className="rating-label">Your rating</span>
                  <Stars rating={rating} interactive onRate={setRating} />
                </div>
                <textarea className="write-textarea" placeholder="Share your experience..." value={body} onChange={(e) => setBody(e.target.value)} required style={{ minHeight: "140px" }} />
                {reviewError && <p className="state-msg error">{reviewError}</p>}
                <button className="write-btn" type="submit" disabled={submitting}>{submitting ? "Submitting..." : "Submit Review"}</button>
              </form>
            </div>
          ) : (
            <div className="review-thanks">
              <span className="review-thanks-icon">★</span>
              <p>Thank you for your review!</p>
              <button className="write-btn" onClick={() => setSubmitted(false)} style={{ marginTop: "1rem" }}>Write another</button>
            </div>
          )}

          <div className="reviews-list">
            {reviews.length > 0 && <h2 className="review-form-title">What people say</h2>}
            {reviewsLoading && <p className="state-msg">Loading reviews...</p>}
            {!reviewsLoading && reviews.length === 0 && <p className="state-msg">No reviews yet — be the first!</p>}
            {reviews.map((r) => (
              <div key={r.id} className="review-card">
                <div className="review-card-top">
                  <div className="review-avatar">{r.name.charAt(0).toUpperCase()}</div>
                  <div>
                    <div className="review-name">{r.name}</div>
                    <div className="review-date">{new Date(r.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                  </div>
                  <Stars rating={r.rating} />
                </div>
                <p className="review-body">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
