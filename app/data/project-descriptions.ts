/** Long-form project descriptions used by project detail pages. */
export const PROJECT_DESCRIPTIONS: Readonly<Record<string, string>> = {
    kiranawala:
        "KiranaWala is an AI-powered hyperlocal grocery marketplace. Built a MERN-stack grocery marketplace featuring 80+ products, incorporating feedback from five local store owners to validate real-world requirements. Secured payment processing with Razorpay signature verification and HMAC-SHA256 webhook validation to authenticate payment events and prevent duplicate processing. Integrated an AI-powered basket builder that converts natural-language grocery lists into structured carts, alongside demand prediction for inventory planning.",
    "beyond-the-rumour-mill":
        "Beyond the Rumour Mill is an evidence-driven information analysis platform. Built a full-stack information platform using Next.js, TypeScript, and PostgreSQL to help users examine claims and organize supporting evidence. Implemented a relational database layer with Drizzle ORM, database migrations, and persistent storage to support maintainable server-side application workflows. Integrated Vitest and GitHub Actions CI to automate testing, TypeScript checks, ESLint validation, and production-build verification.",
    askpdf:
        "AskPDF is an AI-powered conversational document assistant. Built a PDF question-answering application using retrieval-augmented generation (RAG), supporting documents up to 20 MB with page-level citations linked directly to the in-app PDF viewer. Engineered asynchronous document ingestion with Redis-backed workers, HTTP 202 responses, job tracking, and stale-job cleanup to separate long-running processing from API requests. Tuned semantic retrieval with a 0.7 cosine-similarity threshold to filter low-relevance passages before generation and improve the grounding of document-based answers.",
    voxshield:
        "VoxShield is an AI voice deepfake detection and audio forensics platform. Developed a full-stack audio-forensics platform supporting uploaded-audio analysis through REST APIs and real-time microphone inference over WebSockets. Designed a multi-scale convolutional neural network with parallel branches using kernel sizes of 5, 11, and 21 to capture audio patterns at different temporal scales from 16 kHz raw-waveform input. Reported 96.42% accuracy and 0.9892 AUC across 4,850 samples, with a forensic dashboard featuring waveform visualization, 64-band log-Mel spectrograms, and five acoustic descriptors.",
    jaldrishti:
        "JalDrishti 2030 is an AI-IoT digital twin research initiative for predictive water-stress planning. Authored a research paper on applying AI-driven digital twins to urban water-stress prediction and intervention planning for Bengaluru. Investigated predictive analytics, IoT-based water monitoring, and digital-twin modeling for sustainable urban resource management. Reached the international semi-finalist stage of the SMART CITY 2030 student and young researcher competition.",
    mystring:
        "MyString is a custom string implementation in C++. Implemented a custom C++ string class to manage character sequences and provide string-handling functionality beyond a basic application-level wrapper. Extended the class with dynamic memory management, constructors, destructor, and overloaded operators for string manipulation and stream I/O. Built to strengthen object-oriented programming fundamentals and low-level resource management.",
    fixmyway:
        "FixMyWay is a mobile civic issue reporting application. Built a React Native application with Expo and Firebase to let citizens report local infrastructure problems through a mobile interface. Implemented photo uploads, GPS geotagging, and status tracking for community-reported infrastructure issues. Won 2nd place at the TRINETRA Hackathon 2025, in an event with 600+ student registrations.",
    cropcycle:
        "CropCycle is a web platform for crop-cycle analysis using multi-temporal NDVI data, connecting data processing with a practical interface for agricultural analysis.",
    "portfolio-v3":
        "Personal developer portfolio built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and GSAP to present projects, skills, and open-source work through an immersive interface.",
};

export function getProjectDescription(slug: string): string | undefined {
    return PROJECT_DESCRIPTIONS[slug];
}
