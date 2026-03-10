import "dotenv/config";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { postsRouter } from "./routes/posts.js";

// Allow BigInt to serialize in JSON responses
(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env["PORT"] ?? 3001;

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/posts", postsRouter);

// Serve React frontend
const frontendDist = join(__dirname, "../frontend/dist");
app.use(express.static(frontendDist));
app.get("*", (_req, res) => {
  res.sendFile(join(frontendDist, "index.html"));
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`Server running at http://0.0.0.0:${PORT}`);
  const dbUrl = process.env["DATABASE_URL"] ?? "NOT SET";
  console.log(`DB host: ${dbUrl.split("@")[1]?.split("/")[0] ?? "unknown"}`);
});
