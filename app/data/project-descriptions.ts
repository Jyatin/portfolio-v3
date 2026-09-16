/** Long-form project descriptions used by project detail pages. */
export const PROJECT_DESCRIPTIONS: Readonly<Record<string, string>> = {
    askpdf:
        "AskPDF is an AI-powered document Q&A application built around retrieval-augmented generation. It combines PDF ingestion, embeddings, vector search, Gemini-powered responses, and streaming to make document conversations grounded and useful.",
    kiranawala:
        "KiranaWala is a MERN-based local grocery platform focused on connecting customers with stores while providing authentication, product, inventory, and store management workflows.",
    fixmyway:
        "FixMyWay is a full-stack application built around a practical everyday problem, combining a responsive frontend with backend services and a maintainable application structure.",
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
