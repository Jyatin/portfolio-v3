/** Long-form project descriptions used by project detail pages. */
export const PROJECT_DESCRIPTIONS: Readonly<Record<string, string>> = {
    voxshield:
        "VOXSHIELD is a voice deepfake detection and forensic analysis platform built around the E4 multi-scale raw-waveform CNN model. The project combines a FastAPI inference backend with a Next.js interface for real-time detection, waveform inspection, and forensic analysis while preserving the core audio-processing pipeline.",
    jaldrishti:
        "JalDrishti 2030 is the software implementation of the research paper, “JalDrishti 2030: An IoT–AI Digital Twin for Predictive Water-Stress and Intervention Planning in Bengaluru.” It translates the proposed research framework into a research-facing prototype for water-stress analysis, forecasting, digital-twin simulation, scenario exploration, and intervention planning while keeping synthetic, simulated, and measured evidence explicitly separated.",
    askpdf:
        "AskPDF is a RAG-powered document Q&A system with a 5-stage Node.js pipeline for PDFs up to 20 MB. It generates 768-dimensional embeddings for semantic vector search, uses Redis BRPOP workers for asynchronous processing, and applies a >0.7 similarity threshold before retrieved context reaches the LLM.",
    kiranawala:
        "KiranaWala is a MERN-based hyperlocal smart grocery platform connecting customers with nearby local stores. It provides authentication, product, cart, checkout, and order-management workflows and explores AI-assisted demand prediction for local inventory planning.",
    fixmyway:
        "FixMyWay is an AI-powered civic issue reporting mobile app built with React Native, Expo, and Firebase. It supports GPS-tagged issue reporting, image uploads, duplicate detection, Gemini Vision validation, and priority analysis for civic infrastructure problems.",
    mystring:
        "MyString is a custom C++ String implementation created to understand object-oriented programming, dynamic memory management, constructors, copying, and operator overloading at a lower level.",
    cropcycle:
        "Crop Analysis is a web platform for extracting and analysing crop-cycle parameters from multi-temporal NDVI data, connecting data processing with a practical interface for agricultural analysis and interpretation.",
    "portfolio-v3":
        "Jyatin's personal developer portfolio, built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP. It presents projects, skills, problem-solving work, and open-source contributions through an immersive interface and includes Supabase-backed visitor messaging with a protected owner inbox.",
};

export function getProjectDescription(slug: string): string | undefined {
    return PROJECT_DESCRIPTIONS[slug];
}
