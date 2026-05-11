# Crates

A purist's tool for beat discovery and writing. Describe a vibe, dig through matching beats DDR-style, lock into one, write for hours.

## Status

In active development. v0.1 is a personal MVP.

## Stack

- **Frontend:** Next.js, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Drizzle ORM
- **Database:** PostgreSQL (Docker locally, managed cloud in production)
- **Storage:** Cloudflare R2 (S3-compatible)
- **AI:** Anthropic API

See [PRD](./Crates-MVP-PRD.md) for the full spec and [DECISIONS.md](./DECISIONS.md) for architecture decisions.

## Local Setup

Prerequisites: Node 20+, Docker Desktop, FFmpeg.

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/crates.git
cd crates

# Install dependencies
npm install

# Start Postgres
docker compose up -d

# Set up the API
cd apps/api
cp .env.example .env
npm run db:migrate
npm run db:seed
npm run dev
# Runs on http://localhost:4000

# In another terminal, start the frontend
cd apps/web
cp .env.example .env.local
npm run dev
# Runs on http://localhost:3000
```

## Repo Structure

```
crates/
├── apps/
│   ├── api/    # Express backend
│   └── web/    # Next.js frontend
├── docker-compose.yml
└── package.json    # Monorepo root with workspaces
```
