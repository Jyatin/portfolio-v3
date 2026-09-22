import { PROJECT_DESCRIPTIONS } from "./project-descriptions";

export type Project = {
    slug: string;
    title: string;
    role: string;
    description: string;
    highlights: readonly string[];
    tech: readonly string[];
    github: string;
    live: string;
    featured: boolean;
    year: string;
    image: string;
};

type ProjectCore = Omit<Project, "description">;

const projectCoreList: readonly ProjectCore[] = [
    {
        slug: "voxshield",
        title: "VOXSHIELD — Real-Time Voice Deepfake Detection",
        role: "AI / Full-Stack Developer",
        highlights: [
            "Built a real-time voice authenticity analysis workflow around the E4 multi-scale raw-waveform CNN model.",
            "Integrated a FastAPI inference backend with a modern Next.js frontend for live detection and forensic analysis workflows.",
            "Designed the interface for waveform inspection, detection results, and forensic analysis while preserving the existing audio-processing pipeline.",
        ],
        tech: ["Next.js", "React", "TypeScript", "FastAPI", "E4 CNN"],
        github: "https://github.com/Jyatin/VoiceGuard",
        live: "",
        featured: true,
        year: "2026",
        image: "/images/projects/voxshield.svg",
    },
    {
        slug: "jaldrishti",
        title: "JalDrishti 2030 — IoT–AI Digital Twin",
        role: "Research & Full-Stack Developer",
        highlights: [
            "Translated the JalDrishti 2030 research framework into a working prototype for predictive urban water-stress and intervention planning in Bengaluru.",
            "Built workflows around water-stress indicators, scenario exploration, representative hydraulic-network visualisation, and intervention planning.",
            "Kept measured evidence, synthetic demonstration data, simulated outputs, and future EPANET/WNTR and NSGA-II methodology explicitly separated.",
        ],
        tech: ["Next.js", "TypeScript", "Digital Twin", "EPANET / WNTR", "NSGA-II"],
        github: "https://github.com/Jyatin/jaldristi",
        live: "",
        featured: true,
        year: "2026",
        image: "/images/projects/jaldrishti_laptop.svg",
    },
    {
        slug: "askpdf",
        title: "AskPDF — RAG-Powered Document Q&A System",
        role: "Full-Stack Developer",
        highlights: [
            "Built a 5-stage RAG pipeline in Node.js for PDFs up to 20 MB with 768-dimensional embeddings for semantic retrieval.",
            "Engineered Redis BRPOP workers with 202 Accepted asynchronous responses, hash-based job tracking, and stale-job cleanup.",
            "Reduced unsupported answers by enforcing a >0.7 similarity threshold before retrieved context reaches the LLM.",
        ],
        tech: ["Node.js", "RAG", "Redis", "Gemini", "Vector Search"],
        github: "https://github.com/Jyatin/AskPDF",
        live: "https://ask-pdf-vert.vercel.app/",
        featured: true,
        year: "2026",
        image: "/images/projects/askpdf_mockup.jpg",
    },
    {
        slug: "kiranawala",
        title: "KiranaWala — Hyperlocal Smart Grocery Platform",
        role: "Full-Stack Developer",
        highlights: [
            "Architected a MERN platform connecting customers with nearby local stores and supporting hyperlocal ordering workflows.",
            "Developed RESTful authentication, product, cart, checkout, and order-management flows with a MongoDB-backed API.",
            "Built the project around practical local-store discovery and demand-aware grocery ordering use cases.",
        ],
        tech: ["MongoDB", "Express.js", "React", "Node.js", "AI / ML"],
        github: "https://github.com/Jyatin/KiranaWala",
        live: "",
        featured: true,
        year: "2026",
        image: "/images/projects/kiranawala_mockup.jpg",
    },
    {
        slug: "fixmyway",
        title: "FixMyWay — AI-Powered Civic Issue Reporting",
        role: "Full-Stack Developer",
        highlights: [
            "Built a React Native and Firebase civic reporting workflow with GPS tagging, image uploads, issue categories, and duplicate detection.",
            "Integrated Gemini Vision AI with fallback handling for image validation, issue classification, severity estimation, and description generation.",
            "Designed a priority-scoring workflow combining community confirmations and rainfall context for civic-risk analysis.",
        ],
        tech: ["React Native", "Expo", "TypeScript", "Firebase", "Gemini Vision"],
        github: "https://github.com/Jyatin/-fixmyway",
        live: "",
        featured: false,
        year: "2026",
        image: "/images/projects/fixmyway_mockup.jpg",
    },
    {
        slug: "mystring",
        title: "MyString — Custom C++ String",
        role: "C++ Developer",
        highlights: [
            "Implemented a custom String class to understand how string abstractions work internally.",
            "Explored constructors, dynamic memory management, copying, and operator overloading.",
            "Used the project to strengthen object-oriented programming and low-level C++ fundamentals.",
        ],
        tech: ["C++", "OOP", "Memory Management"],
        github: "https://github.com/Jyatin/MyString",
        live: "",
        featured: false,
        year: "2025",
        image: "/images/projects/mystring_mockup.jpg",
    },
    {
        slug: "cropcycle",
        title: "CropCycle — Crop Cycle Analysis",
        role: "Full-Stack Developer",
        highlights: [
            "Built a platform for crop-cycle analysis using multi-temporal NDVI data.",
            "Connected frontend workflows with backend processing and data services for agricultural analysis.",
            "Presented crop-cycle information through a practical web interface focused on interpretable results.",
        ],
        tech: ["React", "Node.js", "Express.js", "MongoDB", "NDVI"],
        github: "https://github.com/Jyatin/Extraction-of-Crop-Cycle-Parameters-from-Multi-Temporal-Data",
        live: "",
        featured: false,
        year: "2025",
        image: "/images/projects/cropcycle_mockup.jpg",
    },
    {
        slug: "portfolio-v3",
        title: "Portfolio v3 — Personal Developer Portfolio",
        role: "Frontend Developer",
        highlights: [
            "Designed and built a personal portfolio focused on typography, grid systems, motion, and project storytelling.",
            "Implemented the site with Next.js and TypeScript with reusable project data and detail-page architecture.",
            "Integrated Supabase-backed visitor messaging with a protected owner inbox for receiving portfolio enquiries.",
        ],
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
        github: "https://github.com/Jyatin/portfolio-v3",
        live: "https://portfolio-v3-coral-five.vercel.app/",
        featured: false,
        year: "2026",
        image: "/images/projects/portfolio_mockup.jpg",
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
