import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.ts";
import type { PostSummary } from "../types.ts";

const TOPICS = ["AI & Automation", "Microsoft 365", "Azure", "DevOps", "Digital Transformation", "Enterprise Tech"];

function readingTime(title: string) {
  const words = title.split(" ").length * 15; // estimate full article ~15x title length
  return Math.max(1, Math.round(words / 200));
}

export default function Home() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.posts()
      .then((r) => {
        if (!r.ok) throw new Error("API error");
        return r.json();
      })
      .then((data: unknown) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load posts.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Welcome</p>
            <h1 className="hero-name">Vishal Tiwari</h1>
            <p className="hero-tagline">
              Writing about AI, enterprise collaboration, and the human side of digital transformation.
            </p>
            <Link to="/about" className="hero-btn">About me →</Link>
          </div>
          <div className="hero-photo-wrap">
            <img
              src="/profile.jpg"
              alt="Vishal Tiwari"
              className="hero-photo"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
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

      {/* Articles */}
      <div className="section-header">
        <h2 className="section-title">Latest Articles</h2>
        {!loading && !error && <span className="section-count">{posts.length} posts</span>}
      </div>

      {loading && <p className="state-msg">Loading...</p>}
      {error && <p className="state-msg error">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="state-msg">No articles yet. Check back soon.</p>
      )}

      <div className="post-list">
        {posts.map((post) => (
          <Link key={post.id} to={`/article/${post.id}`} className="post-card">
            <div className="post-card-meta">
              <span className="post-date">
                {new Date(post.created_at).toLocaleDateString("en-US", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </span>
              <span className="post-reading-time">{readingTime(post.Title ?? "")} min read</span>
            </div>
            <h3 className="post-title">{post.Title ?? "Untitled"}</h3>
            <span className="read-more">Read article →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
