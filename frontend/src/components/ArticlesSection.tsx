import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.ts";
import type { PostSummary } from "../types.ts";

function readingTime(title: string) {
  return Math.max(1, Math.round((title.split(" ").length * 15) / 200));
}

export default function ArticlesSection() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.posts()
      .then((r) => r.json())
      .then((data: unknown) => { setPosts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => { setError("Could not load posts."); setLoading(false); });
  }, []);

  return (
    <section id="articles" className="sp-section">
      <div className="page">
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
  );
}
