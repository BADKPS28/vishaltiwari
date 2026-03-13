import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api.ts";
import type { Post } from "../types.ts";

function readingTime(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).length / 200));
}

export default function Article() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.post(id!)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((data: Post) => {
        setPost(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Article not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="page"><p className="state-msg">Loading...</p></div>;
  if (error || !post) return (
    <div className="page">
      <p className="state-msg error">{error}</p>
      <Link to="/" className="back-link">← Back to articles</Link>
    </div>
  );

  const paragraphs = (post.Body ?? "").split(/\n{2,}/);
  const mins = readingTime(post.Body ?? "");

  return (
    <div className="page">
      <Link to="/" className="back-link">← Back to articles</Link>

      <article>
        <div className="article-meta">
          <span className="article-date">
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric",
            })}
          </span>
          <span className="article-read-time">{mins} min read</span>
        </div>

        <h1 className="article-title">{post.Title ?? "Untitled"}</h1>

        <div className="article-body">
          {paragraphs.map((para, i) => (
            <p key={i}>
              {para.split("\n").map((line, j, arr) => (
                <span key={j}>
                  {line}
                  {j < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
        </div>
      </article>

      {/* Author card */}
      <div className="author-card">
        <img
          src="/profile.jpg"
          alt="Vishal Tiwari"
          className="author-photo"
          onError={(e) => { e.currentTarget.style.display = "none"; }}
        />
        <div className="author-info">
          <p className="author-label">Written by</p>
          <p className="author-name">Vishal Tiwari</p>
          <p className="author-bio">
            Technology professional at Southern Glazer's, writing about AI, Microsoft 365, and digital transformation.
          </p>
          <div className="author-links">
            <Link to="/about" className="author-link">About me →</Link>
            <Link to="/" className="author-link">More articles →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
