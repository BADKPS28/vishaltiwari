import "dotenv/config";
import express from "express";
import cors from "cors";
import { postsRouter } from "./routes/posts.js";

// Allow BigInt to serialize in JSON responses
(BigInt.prototype as unknown as { toJSON: () => string }).toJSON = function () {
  return this.toString();
};

const app = express();
const PORT = process.env["PORT"] ?? 3001;

app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRouter);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
