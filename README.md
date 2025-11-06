
# English Game MVP (Tech/Business)

Family-friendly English learning game with **timed vocab quiz** and **voice practice**.

## Stack
- Next.js (App Router, TypeScript)
- Prisma + Vercel Postgres
- Cookie-based auth (JWT)
- Minimal UI (no Tailwind)

## Features
- Signup/Login
- Quiz: Hebrew term → English translation
- Levels control **time limit** and **points**
- Leaderboard (top scores)
- Voice practice stub (plug OpenAI Whisper + GPT for feedback)

## Getting Started

1. Install deps
```bash
pnpm i   # or npm i / yarn
```

2. Configure env
```
cp .env.example .env
# fill JWT_SECRET and Vercel Postgres variables
```

3. Setup database
```bash
pnpm prisma migrate dev --name init
pnpm ts-node scripts/seed.ts
```

4. Dev server
```bash
pnpm dev
```

### Deploy on Vercel
- Create a new Vercel project, add **Vercel Postgres**.
- Set environment variables (POSTGRES_* from Vercel, JWT_SECRET, OPENAI_API_KEY optional).
- `pnpm build` & `pnpm start` handled by Vercel.

### Notes
- `app/api/voice` currently returns a stub unless `OPENAI_API_KEY` is set.
- For real STT/feedback, uncomment the OpenAI code and provide a key.

Enjoy! 🎉
