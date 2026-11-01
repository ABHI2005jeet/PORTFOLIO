import Link from "next/link";
import { ArrowUpRight, MoveUpRight } from "lucide-react";
import type { Project } from "@/content/types";
import styles from "./ProjectCard.module.scss";

const trackLabels = { sde: "SOFTWARE DEVELOPMENT", security: "CYBER SECURITY", "cloud-devops": "CLOUD / DEVOPS" } as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className={styles.card}>
      <Link className={styles.caseLink} href={`/work/${project.slug}`}>
        <div className={`${styles.art} ${styles[project.illustration ?? "generic"]}`} aria-hidden="true">
          <div className={styles.artGrid} />
          <span className={styles.artOrb} />
          <span className={styles.artWire} />
          <div className={styles.window}>
            <div className={styles.windowBar}><i /><i /><i /><span>PROJECT / {String(index).padStart(2, "0")}</span></div>
            <div className={styles.windowBody}><span /><span /><span /><b>{project.illustration === "federated" ? "NODE → MODEL" : project.illustration === "three" ? "SCENE / 01" : project.illustration === "ledger" ? "TRANSFER OK" : project.illustration === "portal" ? "DASHBOARD" : project.illustration === "ide" ? "APP.TSX" : project.illustration === "fastify" ? "AUTH / MEDIA" : "API / READY"}</b></div>
          </div>
          <span className={styles.artStamp}>{String(index).padStart(2, "0")} — 07</span>
        </div>
        <div className={styles.cardMeta}><span>{trackLabels[project.track]}</span><span>{String(index).padStart(2, "0")}</span></div>
        <h3>{project.title}<MoveUpRight aria-hidden="true" size={17} /></h3>
        <p className={styles.summary}>{project.summary}</p>
      </Link>
      <div className={styles.cardBottom}>
        <ul aria-label="Technology stack">{project.stack.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul>
        <div className={styles.cardLinks}>
          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Repo for ${project.title}`}><ArrowUpRight aria-hidden="true" size={15} /> Repo</a>}
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Live demo for ${project.title}`}><ArrowUpRight aria-hidden="true" size={15} /> Live</a>}
        </div>
      </div>
    </article>
  );
}
