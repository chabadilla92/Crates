import "dotenv/config";
import express from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { logger } from "./lib/logger.js";
import { db } from "./db/index.js";
import { beats } from "./db/schema.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

// Routes
app.get("/healthz", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/beats", async (_req, res, next) => {
  try {
    const allBeats = await db.select().from(beats);
    res.json({ beats: allBeats });
  } catch (err) {
    next(err);
  }
});

// Error handler (must be last)
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    logger.error(err);
    res.status(500).json({ error: "Internal server error" });
  },
);

app.listen(PORT, () => {
  logger.info(`Crates API listening on port ${PORT}`);
});