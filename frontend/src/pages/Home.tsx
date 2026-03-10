import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { PostSummary } from "../types.ts";

export default function Home() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/posts")
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
      <h2 className="section-title">Articles</h2>

      {loading && <p className="state-msg">Loading...</p>}
      {error && <p className="state-msg error">{error}</p>}

      <div className="post-list">
        {posts.map((post) => (
          <Link key={post.id} to={`/article/${post.id}`} className="post-card">
            <div className="post-date">
              {new Date(post.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <h3 className="post-title">{post.Title ?? "Untitled"}</h3>
            <span className="read-more">Read article →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
