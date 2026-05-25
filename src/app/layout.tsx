import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Preloader } from "@/components/ui/Preloader";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Abdul Kareem Sarwar | Premium Portfolio",
  description: "Specialist Full Stack Developer & Automation Engineer. Building next-generation web applications, complex APIs, and high-performance automation platforms.",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Developer Portfolio", "Automation Engineer", "Web Scraping", "API Developer"],
  openGraph: {
    title: "Abdul Kareem Sarwar | Premium Developer Portfolio",
    description: "Futuristic interactive developer experience showing advanced SaaS product builds, APIs, and headless browser automation systems.",
    type: "website",
    locale: "en_US",
    url: "https://abdulkareem.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased dark`}
      // style={{ scrollBehavior: "auto" }}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#050816] text-[#f9fafb] selection:bg-[var(--brand-neon)]/30 selection:text-white">
        <SmoothScroll>
          <Preloader />
          <CustomCursor />
          <ParticleBackground />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}

