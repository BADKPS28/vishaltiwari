export interface PostSummary {
  id: string;
  Title: string | null;
  created_at: string;
}

export interface Post extends PostSummary {
  Body: string | null;
}
