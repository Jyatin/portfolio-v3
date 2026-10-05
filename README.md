# Jyatin Kumar Singh — Portfolio v3

**Full-Stack Developer · AI/RAG · DSA · Open Source**

A personal engineering portfolio built with Next.js, React, TypeScript, Tailwind CSS, and motion/3D tooling. It includes a portfolio RAG assistant, project case studies, open-source work, and interactive UI.

**[Live Portfolio](https://portfolio-v3-coral-five.vercel.app/) · [GitHub](https://github.com/Jyatin) · [LinkedIn](https://www.linkedin.com/in/jyatinsingh/) · [LeetCode](https://leetcode.com/u/Jyatin_singh/)**

---

## Stack

**Frontend** — Next.js 16, React 19, TypeScript, Tailwind CSS v4

**UI / Motion** — Framer Motion, Motion, GSAP, Anime.js, Lenis, Radix UI, Lucide

**3D** — Three.js, React Three Fiber, Drei, Postprocessing

**Backend / Data** — Node.js, Express, MongoDB, SQL, Supabase, Redis

**AI** — RAG, embeddings, vector retrieval, LLM APIs, streaming

**Tooling** — Git, GitHub, ESLint, Vercel, Docker

---

## What is here

- Personal portfolio and engineering profile
- Interactive RAG assistant grounded in portfolio content
- Project showcases for AskPDF, KiranaWala, JalDrishti 2030, VOXSHIELD, and FixMyWay
- Open-source contribution section
- DSA and competitive-programming profile
- Responsive UI with motion and selected WebGL/3D elements

---

## RAG Assistant

The portfolio assistant retrieves relevant content from the site's structured knowledge base before generating an answer.

```text
Question
   ↓
Embedding
   ↓
Vector Retrieval
   ↓
Relevant Content
   ↓
Context
   ↓
LLM
   ↓
Streamed Response
```

The content is split into semantic records such as projects, experience, skills, and background rather than treated as one large document.

---

## Projects

### AskPDF
Conversational document application using RAG, embeddings, vector search, Gemini, and streaming.

**[Live Demo](https://ask-pdf-vert.vercel.app/) · [Repository](https://github.com/Jyatin/AskPDF)**

### KiranaWala
MERN-based hyperlocal grocery platform with product discovery, inventory, authentication, payments, and AI-assisted demand prediction.

**[Repository](https://github.com/Jyatin/KiranaWala)**

### JalDrishti 2030
IoT–AI digital-twin framework for predictive water-stress assessment and intervention planning in Bengaluru.

### VOXSHIELD
Voice-authenticity and deepfake-detection project combining a modern web interface with ML-based audio analysis.

### FixMyWay
Civic issue reporting application built with React Native, Expo, and Firebase.

---

## Open Source

**500+ GitHub contributions · 8+ merged PRs**

Contributing to real-world open-source codebases, including:

- **OpenStory** — merged contributions to Storybook/MSW and workflow/product improvements
- **Shep AI** — merged dashboard and frontend engineering work
- **OpenDesign** — active contribution
- **OpenFeature JS SDK** — TypeScript/React SDK and test improvements
- **Speech Dispatcher** — Linux/TTS integration
- Other community and developer-tool projects

The portfolio keeps the detailed PR history separate from this README so the repository description stays focused on the engineering work rather than becoming a contribution log.

**[GitHub](https://github.com/Jyatin)**

---

## DSA

- **200+** LeetCode problems
- **100-day** LeetCode streak
- **150+** problems across GFG and Codeforces

**[LeetCode](https://leetcode.com/u/Jyatin_singh/)**

---

## Structure

```text
portfolio-v3/
├── app/          # App Router, UI, pages and API routes
├── content/      # Portfolio and RAG source content
├── public/       # Static assets
├── scripts/      # Build / ingestion utilities
└── next.config.ts
```

---

## Run locally

```bash
git clone https://github.com/Jyatin/portfolio-v3.git
cd portfolio-v3
npm install
npm run dev
```

Open `http://localhost:3000`.

If you are using the portfolio RAG assistant locally, run the ingestion command after configuring the required environment variables:

```bash
npm run rag:ingest
```

---

## Environment

Create a `.env.local` file with the variables required by the services enabled in your local setup. Do not commit real API keys or credentials.

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
RATE_LIMIT_SALT=
```

---

**Build · Learn · Ship · Repeat**
