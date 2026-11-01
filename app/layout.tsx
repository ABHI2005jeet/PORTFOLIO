import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { MotionOrchestrator } from "@/components/motion/MotionOrchestrator";
import "./globals.scss";

const body = localFont({ src: "../node_modules/next/dist/next-devtools/server/font/geist-latin.woff2", display: "swap", variable: "--font-hanken", weight: "100 900", fallback: ["Arial", "sans-serif"] });
const mono = localFont({ src: "../node_modules/next/dist/next-devtools/server/font/geist-mono-latin.woff2", display: "swap", variable: "--font-geist-mono", weight: "100 900", fallback: ["Consolas", "monospace"] });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: "Abhijeet Kumar — Software Developer", template: "%s — Abhijeet Kumar" },
  description: "Abhijeet Kumar is a pre-final-year engineering student building full-stack software and exploring security, cloud, and DevOps.",
  applicationName: "Abhijeet Kumar — Portfolio",
  alternates: siteUrl ? { canonical: siteUrl, types: { "text/markdown": "/index.md" } } : { types: { "text/markdown": "/index.md" } },
  openGraph: {
    type: "website", locale: "en_IN", siteName: site.name,
    title: "Abhijeet Kumar — Software Developer",
    description: "Practical software, thoughtful systems, and learning in public.",
    ...(siteUrl ? { images: [{ url: "/og", width: 1200, height: 630, alt: "Abhijeet Kumar portfolio" }] } : {}),
  },
  twitter: { card: "summary_large_image", title: "Abhijeet Kumar — Software Developer", description: "Full-stack software development, with security, cloud, and DevOps in exploration.", ...(siteUrl ? { images: ["/og"] } : {}) },
  robots: { index: true, follow: true },
  other: { "color-scheme": "dark", "format-detection": "telephone=no" },
};

export const viewport: Viewport = { themeColor: "#090A0F", colorScheme: "dark", width: "device-width", initialScale: 1 };

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: siteUrl,
  description: site.positioning,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Vellore Institute of Technology" },
  sameAs: [site.profiles.github, site.profiles.linkedin, site.profiles.leetcode, site.profiles.hackerrank],
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  return (
    <html lang="en-IN" className={[body.variable, mono.variable].join(" ")} style={{ background: "#090a0f" }}>
      <body>
        <MotionProvider>
          <a className="skipLink" href="#main-content">Skip to content</a>
          <SiteHeader />
          <MotionOrchestrator><main id="main-content" tabIndex={-1}>{children}</main></MotionOrchestrator>
          <SiteFooter />
        </MotionProvider>
        <script type="application/ld+json" nonce={nonce} dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
