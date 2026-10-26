import { PROJECT_DESCRIPTIONS } from "./project-descriptions";

export type Project = {
    slug: string;
    title: string;
    subtitle: string;
    role: string;
    description: string;
    highlights: readonly string[];
    tech: readonly string[];
    github: string;
    live: string;
    featured: boolean;
    year: string;
    image: string;
    isResearch?: boolean;
};

type ProjectCore = Omit<Project, "description">;

const projectCoreList: readonly ProjectCore[] = [
    {
        slug: "kiranawala",
        title: "KiranaWala",
        subtitle: "AI-Powered Hyperlocal Grocery Marketplace",
        role: "Full-Stack Developer",
        highlights: [
            "Built a MERN-stack grocery marketplace featuring 80+ products, incorporating feedback from five local store owners to validate real-world requirements.",
            "Secured payment processing with Razorpay signature verification and HMAC-SHA256 webhook validation to authenticate payment events and prevent duplicate processing.",
            "Integrated an AI-powered basket builder that converts natural-language grocery lists into structured carts, alongside demand prediction for inventory planning.",
        ],
        tech: ["React", "Node.js", "Express", "MongoDB", "Razorpay", "Jest"],
        github: "https://github.com/Jyatin/KiranaWala",
        live: "https://kirana-wala-1nhp.vercel.app",
        featured: true,
        year: "2026",
        image: "/images/projects/kiranawala_mockup.jpg",
    },
    {
        slug: "beyond-the-rumour-mill",
        title: "Beyond the Rumour Mill",
        subtitle: "Evidence-Driven Information Analysis Platform",
        role: "Full-Stack Engineer",
        highlights: [
            "Built a full-stack information platform using Next.js, TypeScript, and PostgreSQL to help users examine claims and organize supporting evidence.",
            "Implemented a relational database layer with Drizzle ORM, database migrations, and persistent storage to support maintainable server-side application workflows.",
            "Integrated Vitest and GitHub Actions CI to automate testing, TypeScript checks, ESLint validation, and production-build verification.",
        ],
        tech: ["Next.js", "React", "TypeScript", "PostgreSQL", "Drizzle ORM", "Vitest", "Docker"],
        github: "https://github.com/Jyatin/beyond-the-rumour-mill",
        live: "",
        featured: true,
        year: "2026",
        image: "/images/projects/beyond_the_rumour_mill_mockup.jpg",
    },
    {
        slug: "askpdf",
        title: "AskPDF",
        subtitle: "AI-Powered Conversational Document Assistant",
        role: "Full-Stack Developer",
        highlights: [
            "Built a PDF question-answering application using retrieval-augmented generation (RAG), supporting documents up to 20 MB with page-level citations linked directly to the in-app PDF viewer.",
            "Engineered asynchronous document ingestion with Redis-backed workers, HTTP 202 responses, job tracking, and stale-job cleanup to separate long-running processing from API requests.",
            "Tuned semantic retrieval with a 0.7 cosine-similarity threshold to filter low-relevance passages before generation and improve the grounding of document-based answers.",
        ],
        tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Redis", "Gemini API"],
        github: "https://github.com/Jyatin/AskPDF",
        live: "https://ask-pdf-vert.vercel.app/",
        featured: true,
        year: "2026",
        image: "/images/projects/askpdf_mockup.jpg",
    },
    {
        slug: "voxshield",
        title: "VoxShield",
        subtitle: "AI Voice Deepfake Detection & Audio Forensics",
        role: "AI & Full-Stack Developer",
        highlights: [
            "Developed a full-stack audio-forensics platform supporting uploaded-audio analysis through REST APIs and real-time microphone inference over WebSockets.",
            "Designed a multi-scale convolutional neural network with parallel branches using kernel sizes of 5, 11, and 21 to capture audio patterns at different temporal scales from 16 kHz raw-waveform input.",
            "Reported 96.42% accuracy and 0.9892 AUC across 4,850 samples, with a forensic dashboard featuring waveform visualization, 64-band log-Mel spectrograms, and five acoustic descriptors.",
        ],
        tech: ["PyTorch", "FastAPI", "React", "TypeScript", "WebSockets"],
        github: "https://github.com/Jyatin/VoiceGuard",
        live: "https://voiceguard-seven.vercel.app",
        featured: true,
        year: "2026",
        image: "/images/projects/voxshield_mockup.jpg",
    },
    {
        slug: "jaldrishti",
        title: "JalDrishti 2030",
        subtitle: "AI-IoT Digital Twin for Predictive Water-Stress Planning",
        role: "Researcher & Lead Author",
        highlights: [
            "Authored a research paper on applying AI-driven digital twins to urban water-stress prediction and intervention planning for Bengaluru.",
            "Investigated predictive analytics, IoT-based water monitoring, and digital-twin modeling for sustainable urban resource management.",
            "Reached the international semi-finalist stage of the SMART CITY 2030 student and young researcher competition.",
        ],
        tech: ["AI/ML", "IoT", "Digital Twins", "Urban Sustainability"],
        github: "https://github.com/Jyatin/Repository-name-JalDrishti-2030",
        live: "https://repository-name-jal-drishti-2030-9o.vercel.app/stress",
        featured: true,
        isResearch: true,
        year: "2025",
        image: "/images/projects/jaldrishti_mockup.jpg",
    },
    {
        slug: "mystring",
        title: "MyString",
        subtitle: "Custom String Implementation in C++",
        role: "C++ Developer",
        highlights: [
            "Implemented a custom C++ string class to manage character sequences and provide string-handling functionality beyond a basic application-level wrapper.",
            "Extended the class with dynamic memory management, constructors, destructor, and overloaded operators for string manipulation and stream I/O.",
            "Built to strengthen object-oriented programming fundamentals and low-level resource management.",
        ],
        tech: ["C++", "OOP", "Dynamic Memory Management"],
        github: "https://github.com/Jyatin/MyString",
        live: "",
        featured: false,
        year: "2025",
        image: "/images/projects/mystring_mockup.jpg",
    },
    {
        slug: "fixmyway",
        title: "FixMyWay",
        subtitle: "Mobile Civic Issue Reporting Application",
        role: "Mobile & Full-Stack Developer",
        highlights: [
            "Built a React Native application with Expo and Firebase to let citizens report local infrastructure problems through a mobile interface.",
            "Implemented photo uploads, GPS geotagging, and status tracking for community-reported infrastructure issues.",
            "Won 2nd place at the TRINETRA Hackathon 2025, in an event with 600+ student registrations.",
        ],
        tech: ["React Native", "Expo", "Firebase"],
        github: "https://github.com/Jyatin/-fixmyway",
        live: "https://drive.google.com/file/d/1eSrn9lZ8enuumJOUGZusc0HzzNvaWKAk/view?usp=sharing",
        featured: false,
        year: "2025",
        image: "/images/projects/fixmyway_mockup.jpg",
    },
];

function attachDescription(core: ProjectCore): Project {
    const description = PROJECT_DESCRIPTIONS[core.slug];
    if (description === undefined) {
        throw new Error(`Missing PROJECT_DESCRIPTIONS entry for slug: ${core.slug}`);
    }
    return { ...core, description };
}

export const projects: readonly Project[] = projectCoreList.map(attachDescription);

export const getProjectBySlug = (slug: string): Project | null => {
    return projects.find((project) => project.slug === slug) ?? null;
};
