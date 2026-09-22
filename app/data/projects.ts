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
            "Integrated a FastAPI inference backend with a Next.js frontend for live detection and forensic analysis workflows.",
            "Designed waveform inspection, detection-result, and forensic-analysis interfaces while preserving the core audio-processing pipeline.",
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
            "Developed a research prototype for predictive urban water-stress and intervention planning in Bengaluru.",
            "Built workflows around water-stress indicators, scenario exploration, hydraulic-network visualisation, and intervention planning.",
            "Separated measured evidence, synthetic demonstration data, simulated outputs, and proposed EPANET/WNTR and NSGA-II methodology.",
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
            "Engineered Redis BRPOP workers with asynchronous job tracking and stale-job cleanup.",
            "Applied a >0.7 similarity threshold before retrieved context reaches the LLM to reduce unsupported answers.",
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
            "Developed authentication, product, cart, checkout, and order-management flows with a MongoDB-backed API.",
            "Explored AI-assisted demand prediction for local inventory planning and grocery ordering.",
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
            "Integrated Gemini Vision for image validation, issue classification, severity estimation, and description generation.",
            "Designed priority analysis combining community confirmations and rainfall context for civic-risk assessment.",
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
            "Implemented a custom String class to understand string abstractions internally.",
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
        title: "Crop Analysis — Multi-Temporal NDVI Crop Cycle",
        role: "Full-Stack Developer",
        highlights: [
            "Built a web platform for extracting and analysing crop-cycle parameters from multi-temporal NDVI data.",
            "Connected frontend workflows with backend processing and data services for agricultural analysis.",
            "Presented crop-cycle information through a practical interface focused on interpretable results.",
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
        title: "Portfolio v3",
        role: "Frontend Developer",
        highlights: [
            "Personal developer portfolio focused on immersive interaction and motion.",
            "Built with a modern Next.js and TypeScript stack.",
            "Customized the visual system and content around Jyatin's development profile.",
        ],
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"],
        github: "https://github.com/Jyatin/portfolio-v3",
        live: "",
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
