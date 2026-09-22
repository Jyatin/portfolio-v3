# Jyatin Kumar Singh — Portfolio v3

<div align="center">

### Full-Stack Developer · DSA · AI/RAG · Open Source

**Next.js · React · TypeScript · Tailwind CSS · Motion · Three.js · GSAP**

A dark, editorial developer portfolio built to showcase projects, technical work, open source, and engineering skills.

[Live Portfolio](https://portfolio-v3-coral-five.vercel.app/) · [GitHub](https://github.com/Jyatin) · [LinkedIn](https://www.linkedin.com/in/jyatinsingh/) · [LeetCode](https://leetcode.com/u/Jyatin_singh/)

</div>

---

## ✦ Tech Stack

### Frontend
`Next.js 16` `React 19` `TypeScript` `Tailwind CSS v4` `HTML5` `CSS`

### UI / Motion
`Radix UI` `Lucide React` `Framer Motion` `Motion` `GSAP` `Anime.js` `Lenis`

### 3D / Visuals
`Three.js` `React Three Fiber` `Drei` `Postprocessing`

### Platform
`Supabase` `Vercel Analytics` `Vercel Speed Insights`

### Engineering
`ESLint` `Git` `GitHub` `Vercel` `RAG` `Embeddings`

---

## ✦ UI / UX

The design follows a **dark editorial, developer-focused aesthetic** instead of a generic portfolio template.

- High-contrast monochrome visual system
- Typography-driven layouts and structured grids
- Numbered sections and technical metadata
- Responsive desktop/mobile design
- Smooth scrolling and controlled motion
- GSAP / Motion micro-interactions
- Three.js visual layers where useful
- Minimal, performance-conscious interface

---

## ✦ Architecture

```text
User
 ↓
Next.js App Router
 ↓
Pages + Components
 ↓
Tailwind + Motion + GSAP + Three.js
 ↓
APIs / Supabase / RAG
 ↓
Vercel
```

### RAG Assistant

```text
Question → Embedding → Retrieval → Top-K Chunks
                         ↓
                  Similarity Threshold
                         ↓
                  Grounded Context
                         ↓
                  LLM → Streamed Answer
```

The RAG corpus is organized into semantic units such as projects, experience, skills, and background rather than one large document.

---

## ✦ Featured Projects

### AskPDF
Conversational document intelligence using **RAG, embeddings, vector search, Gemini, and streaming**.

[Live Demo](https://ask-pdf-vert.vercel.app/) · [Repository](https://github.com/Jyatin/AskPDF)

### KiranaWala
**MERN-based hyperlocal grocery platform** with product discovery, inventory, authentication, and AI-assisted demand prediction.

[Repository](https://github.com/Jyatin/KiranaWala)

### JalDrishti 2030
**IoT–AI digital twin** for predictive water-stress and intervention planning in Bengaluru.

### VOXSHIELD
Voice authenticity / deepfake detection application using a modern web frontend and ML-based audio analysis.

### FixMyWay
Civic issue reporting application built with **React Native, Expo, and Firebase**.

---

## ✦ Engineering Focus

- **Frontend:** Next.js, React, TypeScript, Tailwind, animation, 3D/WebGL
- **Backend:** Node.js, Express, REST APIs, MongoDB, SQL, Redis, Supabase
- **AI:** RAG, embeddings, vector search, LLM integrations, streaming
- **Languages:** C++, Java, Python, JavaScript, TypeScript
- **Tools:** Git, GitHub, Docker, VS Code, Vercel

---

## ✦ Open Source & DSA

- 200+ LeetCode problems
- 100-day LeetCode streak
- 150+ problems across GFG and Codeforces
- Contributions and merged PRs across open-source projects including OpenStory and OpenFeature JS SDK

[GitHub →](https://github.com/Jyatin) · [LeetCode →](https://leetcode.com/u/Jyatin_singh/)

---

## ✦ Project Structure

```text
portfolio-v3/
├── app/          # App Router, pages, components, APIs
├── content/      # Portfolio + RAG content
├── public/       # Images and static assets
├── scripts/      # Build-time utilities
└── next.config.ts
```

---

## ✦ Run Locally

```bash
git clone https://github.com/Jyatin/portfolio-v3.git
cd portfolio-v3
npm install
npm run dev
```

Open `http://localhost:3000`.

For the RAG assistant:

```bash
npm run rag:ingest
```

---

## ✦ Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
RATE_LIMIT_SALT=
```

Never commit real secrets to GitHub.

---

<div align="center">

### Build · Learn · Ship · Repeat

</div>
