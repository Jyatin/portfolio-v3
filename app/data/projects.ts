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
        slug: "askpdf",
        title: "AskPDF — RAG-Powered Document Q&A System",
        role: "Full-Stack Developer",
        highlights: [
            "Built a 5-stage RAG pipeline in Node.js for PDFs up to 20 MB, generating 768-dimensional embeddings for semantic vector search.",
            "Engineered Redis BRPOP workers with 202 Accepted async responses, hash-based job tracking, and stale-job cleanup.",
            "Reduced hallucination risk by enforcing a >0.7 similarity threshold before passing retrieved context to the LLM.",
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
        title: "KiranaWala — Local Store Connectivity Platform",
        role: "Full-Stack Developer",
        highlights: [
            "Architected a MERN platform connecting customers with local stores within an 8 km radius.",
            "Developed RESTful APIs for authentication and order management with automated Jest/React Testing Library coverage.",
            "Validated ordering workflows end-to-end across 80+ products and 3+ stores, including cart, checkout, and order-status flows.",
        ],
        tech: ["MongoDB", "Express.js", "React", "Node.js", "Jest"],
        github: "https://github.com/Jyatin/KiranaWala",
        live: "#",
        featured: true,
        year: "2026",
        image: "/images/projects/kiranawala_mockup.jpg",
    },
    {
        slug: "fixmyway",
        title: "FixMyWay — AI-Powered Civic Issue Reporting Mobile App",
        role: "Full-Stack Developer",
        highlights: [
            "Engineered a civic reporting pipeline handling 5 issue categories with GPS tagging, image uploads, and duplicate detection.",
            "Integrated Gemini Vision AI with a 2-model fallback for image validation, issue classification, severity estimation, and description generation.",
            "Designed a 5-factor priority-scoring algorithm combining community confirmations and 30-day rainfall data for pothole risk analysis.",
        ],
        tech: ["React Native", "Expo", "TypeScript", "Firebase", "Gemini Vision AI"],
        github: "https://github.com/Jyatin/-fixmyway",
        live: "#",
        featured: true,
        year: "2026",
        image: "/images/projects/fixmyway_mockup.jpg",
    },
    {
        slug: "mystring",
        title: "MyString — Custom C++ String",
        role: "C++ Developer",
        highlights: [
            "Implemented a custom String class to understand how string abstractions work internally.",
            "Explored constructors, memory management, and operator overloading.",
            "Used the project to strengthen object-oriented programming fundamentals.",
        ],
        tech: ["C++", "OOP", "Memory Management"],
        github: "https://github.com/Jyatin/MyString",
        live: "#",
        featured: true,
        year: "2025",
        image: "/images/projects/mystring_mockup.jpg",
    },
    {
        slug: "cropcycle",
        title: "CropCycle — Crop Cycle Analysis",
        role: "Full-Stack Developer",
        highlights: [
            "Built a platform for crop-cycle analysis from multi-temporal NDVI data.",
            "Connected frontend workflows with backend processing and data services.",
            "Presented agricultural data through a practical web interface.",
        ],
        tech: ["React", "Node.js", "Express.js", "MongoDB", "NDVI"],
        github: "https://github.com/Jyatin/Extraction-of-Crop-Cycle-Parameters-from-Multi-Temporal-Data",
        live: "#",
        featured: false,
        year: "2025",
        image: "/images/projects/askpdf.svg",
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
        live: "#",
        featured: false,
        year: "2026",
        image: "/images/projects/kiranawala.svg",
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
