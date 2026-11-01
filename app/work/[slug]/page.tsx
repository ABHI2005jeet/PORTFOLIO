import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, MoveUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { publicProjects, projectBySlug, site } from "@/lib/content";
import { getSiteUrl } from "@/lib/site-url";
import styles from "./case.module.scss";

type Props = { params: Promise<{ slug: string }> };
const siteUrl = getSiteUrl();

export function generateStaticParams() {
  return publicProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return { title: "Project not found" };
  const url = `${siteUrl ?? ""}/work/${slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { ...(siteUrl ? { canonical: url } : {}), types: { "text/markdown": `/work/${slug}.md` } },
    openGraph: { title: `${project.title} — Abhijeet Kumar`, description: project.summary, ...(siteUrl ? { images: [`/work/${slug}/og`] } : {}) },
    twitter: { card: "summary_large_image", ...(siteUrl ? { images: [`/work/${slug}/og`] } : {}) },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const caseStudy = project.caseStudy;
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": project.repoUrl ? "SoftwareSourceCode" : "CreativeWork",
    name: project.title,
    description: project.summary,
    ...(project.repoUrl ? { codeRepository: project.repoUrl } : {}),
    ...(project.stack.length ? { programmingLanguage: project.stack } : {}),
    author: { "@type": "Person", name: site.name },
  };
  return (
    <>
      <JsonLd data={projectSchema} />
      <article className={`pageShell ${styles.casePage}`}>
        <Link className={styles.backLink} href="/work"><ArrowLeft aria-hidden="true" size={15} /> All selected work</Link>
        <header className={styles.caseHeader}>
          <p className="sectionEyebrow">{project.track === "sde" ? "Software development" : project.track === "security" ? "Cyber security" : "Cloud / DevOps"} / Project note</p>
          <h1>{project.title}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.links}>
            {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">Source repository <ArrowUpRight aria-hidden="true" size={14} /></a>}
            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">Open live demo <MoveUpRight aria-hidden="true" size={15} /></a>}
          </div>
        </header>
        <div className={styles.caseBody}>
          <aside className={styles.projectFacts}>
            {project.role && <div><span className="monoLabel">MY ROLE</span><p>{project.role}</p></div>}
            {project.stack.length > 0 && <div><span className="monoLabel">TECHNOLOGY</span><ul>{project.stack.map((technology) => <li key={technology}>{technology}</li>)}</ul></div>}
            {project.pendingDetails && <div className={styles.pending}><span className="monoLabel">DETAILS PENDING</span><p>Abhijeet confirms contributing to this project. The supplied public repository URL could not be verified, so the scope and technical details are intentionally left blank.</p></div>}
          </aside>
          <div className={styles.narrative}>
            {project.problem && <section><span className="monoLabel">01 / CONTEXT</span><h2>What I was exploring</h2><p>{project.problem}</p></section>}
            {caseStudy?.approach && <section><span className="monoLabel">02 / APPROACH</span><h2>How it came together</h2><p>{caseStudy.approach}</p></section>}
            {caseStudy?.architecture && <section><span className="monoLabel">03 / SYSTEM</span><h2>Under the surface</h2><p>{caseStudy.architecture}</p></section>}
            {caseStudy?.decisions && caseStudy.decisions.length > 0 && <section><span className="monoLabel">04 / DECISIONS</span><h2>Things I chose</h2><ul>{caseStudy.decisions.map((decision) => <li key={decision}>{decision}</li>)}</ul></section>}
            {caseStudy?.outcome && <section><span className="monoLabel">05 / RESULT</span><h2>Where it stands</h2><p>{caseStudy.outcome}</p></section>}
            {!caseStudy && !project.pendingDetails && <section><span className="monoLabel">PROJECT NOTE</span><h2>Built to learn by doing</h2><p>{project.summary} The repository has the source and setup notes; this page keeps to the details confirmed there.</p></section>}
          </div>
        </div>
        <footer className={styles.caseFooter}><span>Want to see another?</span><Link href="/work">Browse the project list <MoveUpRight aria-hidden="true" size={15} /></Link></footer>
      </article>
    </>
  );
}
