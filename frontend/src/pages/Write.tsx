import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api.ts";

export default function Write() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    // Verify password against backend
    api.createPost("__auth_check__", "__auth_check__", password).then((res) => {
      if (res.status === 401) {
        setAuthError(true);
      } else {
        setAuthenticated(true);
        setAuthError(false);
      }
    }).catch(() => setAuthError(true));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await api.createPost(title, body, password);

      if (res.status === 401) {
        setAuthenticated(false);
        setError("Session expired. Please re-enter your password.");
        setSaving(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to save");
      const post = await res.json() as { id: string };
      navigate(`/article/${post.id}`);
    } catch {
      setError("Could not save the article. Try again.");
      setSaving(false);
    }
  }

  if (!authenticated) {
    return (
      <div className="page">
        <div className="container article-container">
          <Link to="/" className="back-link">← Back to articles</Link>
          <h1 className="article-title" style={{ borderBottom: "none", marginBottom: "2rem" }}>
            Enter Password
          </h1>
          <form onSubmit={handleAuth} className="write-form">
            <input
              className="write-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
            {authError && <p className="state-msg error">Wrong password.</p>}
            <button className="write-btn" type="submit">Continue</button>
          </form>
        </div>
      </div>
    );
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
