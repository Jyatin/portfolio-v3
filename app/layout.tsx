import { ThemeProvider } from "./components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppNavbar from "./components/navbar/app-navbar";
import SmoothScroll from "./components/smooth-scroll";
import PageTransition from "./components/page-transition";
import FloatingShootToggleHost from "./components/floating-shoot-toggle-host";
import CollaborativeCursors from "./components/collaborative-cursors";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-v3.vercel.app";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: "Jyatin Kumar Singh | Full-Stack Developer",
    description: "Portfolio of Jyatin Kumar Singh — full-stack developer, DSA problem solver, AI/RAG explorer, and open-source contributor.",
    openGraph: {
        title: "Jyatin Kumar Singh | Full-Stack Developer",
        description: "Full-stack development, DSA, AI/RAG projects, and open-source work by Jyatin Kumar Singh.",
    },
    twitter: {
        card: "summary",
        title: "Jyatin Kumar Singh | Full-Stack Developer",
        description: "Full-stack development, DSA, AI/RAG projects, and open-source work by Jyatin Kumar Singh.",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
                    <AppNavbar />
                    <CollaborativeCursors />
                    <FloatingShootToggleHost />
                    <SmoothScroll>
                        <PageTransition>{children}</PageTransition>
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
