import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { beats } from "../schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client);

async function seed() {
  console.log("Reading seed data...");
  const raw = readFileSync(join(__dirname, "beats.json"), "utf-8");
  const seedBeats = JSON.parse(raw);

  console.log(`Inserting ${seedBeats.length} beats...`);

  // Clear existing beats first to make seeding idempotent
  await db.delete(beats);
  console.log("Cleared existing beats.");

  // Insert all seed beats in one query
  const inserted = await db.insert(beats).values(seedBeats).returning();
  console.log(`Inserted ${inserted.length} beats successfully.`);

  await client.end();
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});