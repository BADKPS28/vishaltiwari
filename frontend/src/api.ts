const API_BASE = import.meta.env.VITE_API_URL ?? "";

export const api = {
  posts: () => fetch(`${API_BASE}/api/posts`),
  post: (id: string) => fetch(`${API_BASE}/api/posts/${id}`),
  checkAuth: (password: string) =>
    fetch(`${API_BASE}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-write-password": password,
      },
      body: JSON.stringify({ authOnly: true }),
    }),
  createPost: (title: string, body: string, password: string) =>
    fetch(`${API_BASE}/api/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-write-password": password,
      },
      body: JSON.stringify({ Title: title, Body: body }),
    }),
  reviews: () => fetch(`${API_BASE}/api/reviews`),
  submitReview: (name: string, rating: number, body: string) =>
    fetch(`${API_BASE}/api/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, rating, body }),
    }),
};
