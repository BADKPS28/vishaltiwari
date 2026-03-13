import { useEffect, useState } from "react";
import { api } from "../api.ts";

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

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.reviews()
      .then((r) => r.json())
      .then((data: unknown) => { setReviews(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("Please select a star rating."); return; }
    setSubmitting(true);
    setError(null);
    try {
      const res = await api.submitReview(name, rating, body);
      if (!res.ok) throw new Error("Failed");
      const newReview = await res.json() as Review;
      setReviews((prev) => [newReview, ...prev]);
      setName(""); setBody(""); setRating(0);
      setSubmitted(true);
    } catch {
      setError("Could not submit review. Please try again.");
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
            <form onSubmit={handleSubmit} className="review-form">
              <input className="write-input" type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} required />
              <div className="rating-wrap">
                <span className="rating-label">Your rating</span>
                <Stars rating={rating} interactive onRate={setRating} />
              </div>
              <textarea className="write-textarea" placeholder="Share your experience..." value={body} onChange={(e) => setBody(e.target.value)} required style={{ minHeight: "140px" }} />
              {error && <p className="state-msg error">{error}</p>}
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
          {loading && <p className="state-msg">Loading reviews...</p>}
          {!loading && reviews.length === 0 && <p className="state-msg">No reviews yet — be the first!</p>}
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
  );
}
