import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { WorkExplorer } from "@/components/projects/WorkExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { publicProjects, site } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";
import styles from "./work.module.scss";

const siteUrl = getSiteUrl();
export const metadata: Metadata = {
  title: "Selected Work",
  description: "Selected software development, cyber security, cloud, and DevOps projects by Abhijeet Kumar.",
  alternates: { ...(siteUrl ? { canonical: `${siteUrl}/work` } : {}), types: { "text/markdown": "/work.md" } },
  openGraph: { title: "Selected Work — Abhijeet Kumar", description: "Software, systems, and experiments built with curiosity.", ...(siteUrl ? { images: ["/work/og"] } : {}) },
  twitter: { card: "summary_large_image", ...(siteUrl ? { images: ["/work/og"] } : {}) },
};

export default function WorkPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Selected Work — Abhijeet Kumar", description: "A curated set of software development, security, cloud, and DevOps projects.", mainEntity: publicProjects.map((project) => ({ "@type": "SoftwareSourceCode", name: project.title, description: project.summary, ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}) })) }} />
      <section className={`pageShell ${styles.intro}`} aria-labelledby="work-heading">
        <p className="sectionEyebrow">Selected work / 2024—2026</p>
        <div className={styles.introRow}><h1 id="work-heading">A growing body<br /><em>of work.</em></h1><p>Projects are grouped by what they taught me: building useful software, learning how systems fail, and getting ideas into a running environment.</p></div>
        <Link className={styles.jumpLink} href="#project-list">Browse the projects <ArrowDownRight aria-hidden="true" size={16} /></Link>
      </section>
      <section className={`pageShell ${styles.list}`} id="project-list" aria-label="Project list">
        <WorkExplorer />
        <aside className={styles.pendingNote}><span className="monoLabel">A NOTE</span><p><strong>Optiv — Project BlindSpot</strong> is included as a contribution entry. The public repository link could not be verified, so further description and links are pending.</p></aside>
      </section>
      <section className={`pageShell ${styles.workEnd}`}><p>Most of these are learning projects. Each page sticks to what I can point back to in a repository or verified résumé detail.</p><a href={site.profiles.github} target="_blank" rel="noopener noreferrer">More on GitHub <ArrowDownRight aria-hidden="true" size={16} /></a></section>
    </>
  );
}
