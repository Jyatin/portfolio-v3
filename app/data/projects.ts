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
        title: "AskPDF — AI Document Q&A",
        role: "Full-Stack Developer",
        highlights: [
            "Built an AI-powered document Q&A workflow using retrieval-augmented generation.",
            "Implemented PDF ingestion, chunking, embeddings, and vector search.",
            "Integrated Gemini for grounded answers and streaming responses.",
            "Designed the application around practical document retrieval rather than generic chat.",
        ],
        tech: ["TypeScript", "AI", "RAG", "Gemini", "Vector Search"],
        github: "https://github.com/Jyatin/AskPDF",
        live: "#",
        featured: true,
        year: "2026",
        image: "/images/projects/attendance-monitoring.webp",
    },
    {
        slug: "kiranawala",
        title: "KiranaWala — Local Store Platform",
        role: "Full-Stack Developer",
        highlights: [
            "Built a MERN-based platform connecting customers with local grocery stores.",
            "Implemented authentication and role-aware store workflows.",
            "Added product, inventory, and store management capabilities.",
            "Focused on a practical marketplace experience for local businesses.",
        ],
        tech: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript"],
        github: "https://github.com/Jyatin/KiranaWala",
        live: "#",
        featured: true,
        year: "2025",
        image: "/images/projects/outfithaven.webp",
    },
    {
        slug: "fixmyway",
        title: "FixMyWay — Full-Stack Application",
        role: "Full-Stack Developer",
        highlights: [
            "Designed and implemented a full-stack solution around an everyday problem.",
            "Connected a responsive frontend with backend application logic.",
            "Structured the project for maintainable feature development.",
            "Used the project to strengthen practical product-building skills.",
        ],
        tech: ["React", "Node.js", "Express.js", "MongoDB"],
        github: "https://github.com/Jyatin/-fixmyway",
        live: "#",
        featured: true,
        year: "2025",
        image: "/images/projects/burger-ka-samen.webp",
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
        image: "/images/projects/omnichannel-analytics.webp",
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
