import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/posts — list all posts (no body for performance)
router.get("/", async (_req, res) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { created_at: "desc" },
      select: { id: true, Title: true, created_at: true },
    });
    res.json(posts);
  } catch (err) {
    console.error("GET /api/posts error:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// GET /api/posts/:id — single post with full body
router.get("/:id", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: BigInt(req.params["id"]!) },
    });
    if (!post) {
      res.status(404).json({ error: "Post not found" });
      return;
    }
    res.json(post);
  } catch {
    res.status(400).json({ error: "Invalid post ID" });
  }
});

// POST /api/posts — create a new post (password protected)
router.post("/", async (req, res) => {
  const provided = req.headers["x-write-password"];
  const expected = process.env["WRITE_PASSWORD"];
  if (!expected || provided !== expected) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const { Title, Body, authOnly } = req.body as { Title?: string; Body?: string; authOnly?: boolean };
  if (authOnly) { res.json({ ok: true }); return; }

  if (!Title || !Body) {
    res.status(400).json({ error: "Title and Body are required" });
    return;
  }
  try {
    const post = await prisma.post.create({
      data: { Title, Body },
    });
    res.status(201).json(post);
  } catch {
    res.status(500).json({ error: "Failed to create post" });
  }
});

export { router as postsRouter };
