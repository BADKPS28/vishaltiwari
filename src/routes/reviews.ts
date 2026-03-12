import { Router } from "express";
import { PrismaClient } from "../../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/reviews — list all reviews newest first
router.get("/", async (_req, res) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { created_at: "desc" },
    });
    res.json(reviews);
  } catch (err) {
    console.error("GET /api/reviews error:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// POST /api/reviews — submit a review (public)
router.post("/", async (req, res) => {
  const { name, rating, body } = req.body as { name?: string; rating?: number; body?: string };

  if (!name || !body || typeof rating !== "number" || rating < 1 || rating > 5) {
    res.status(400).json({ error: "Name, rating (1-5), and review text are required" });
    return;
  }

  try {
    const review = await prisma.review.create({
      data: { name: name.trim(), rating, body: body.trim() },
    });
    res.status(201).json(review);
  } catch {
    res.status(500).json({ error: "Failed to save review" });
  }
});

export { router as reviewsRouter };
