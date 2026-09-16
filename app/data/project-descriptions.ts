/** Long-form project descriptions used by project detail pages. */
export const PROJECT_DESCRIPTIONS: Readonly<Record<string, string>> = {
    askpdf:
        "AskPDF is a RAG-powered document Q&A system with a 5-stage Node.js pipeline for PDFs up to 20 MB. It generates 768-dimensional embeddings for semantic vector search, uses Redis BRPOP workers for asynchronous processing, and applies a >0.7 similarity threshold before retrieved context reaches the LLM.",
    kiranawala:
        "KiranaWala is a MERN platform connecting customers with local stores within an 8 km radius. It provides RESTful authentication and order-management APIs, automated Jest/React Testing Library coverage, and end-to-end ordering validation across 80+ products and 3+ stores.",
    fixmyway:
        "FixMyWay is an AI-powered civic issue reporting mobile app handling five issue categories with GPS tagging, image uploads, and duplicate detection. Gemini Vision AI validates images with a 2-model fallback, while a 5-factor priority score combines community confirmations with 30-day rainfall data.",
    mystring:
        "MyString is a custom C++ String implementation created to understand object-oriented programming, dynamic memory management, constructors, and operator overloading at a lower level.",
    cropcycle:
        "CropCycle is a web platform for crop-cycle analysis using multi-temporal NDVI data, connecting data processing with a practical interface for agricultural analysis.",
    "portfolio-v3":
        "Jyatin's personal developer portfolio, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP to present projects, skills, problem-solving work, and open-source contributions through an immersive interface.",
};

export function getProjectDescription(slug: string): string | undefined {
    return PROJECT_DESCRIPTIONS[slug];
}
