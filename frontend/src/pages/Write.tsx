import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Write() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Title: title, Body: body }),
      });

      if (!res.ok) throw new Error("Failed to save");
      const post = await res.json() as { id: string };
      navigate(`/article/${post.id}`);
    } catch {
      setError("Could not save the article. Try again.");
      setSaving(false);
    }
  }

  return (
    <div className="page">
      <div className="container article-container">
        <Link to="/" className="back-link">← Back to articles</Link>

        <h1 className="article-title" style={{ borderBottom: "none", marginBottom: "2rem" }}>
          New Article
        </h1>

        {error && <p className="state-msg error">{error}</p>}

        <form onSubmit={handleSubmit} className="write-form">
          <input
            className="write-input"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            className="write-textarea"
            placeholder="Write your article here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
          <button className="write-btn" type="submit" disabled={saving}>
            {saving ? "Publishing..." : "Publish Article"}
          </button>
        </form>
      </div>
    </div>
  );
}
