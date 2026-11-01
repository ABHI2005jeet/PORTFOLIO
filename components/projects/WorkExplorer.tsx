"use client";

import { useMemo, useState } from "react";
import { publicProjects } from "@/content/projects";
import type { ProjectTrack } from "@/content/types";
import { ProjectCard } from "./ProjectCard";
import styles from "./WorkExplorer.module.scss";

const filters: { label: string; value: ProjectTrack | "all" }[] = [
  { label: "All selected work", value: "all" },
  { label: "Software development", value: "sde" },
  { label: "Cyber security", value: "security" },
  { label: "Cloud & DevOps", value: "cloud-devops" },
];

export function WorkExplorer() {
  const [filter, setFilter] = useState<ProjectTrack | "all">("all");
  const shown = useMemo(() => publicProjects.filter((project) => filter === "all" || project.track === filter), [filter]);
  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter projects by track">
        {filters.map((item) => <button type="button" key={item.value} aria-pressed={filter === item.value} onClick={() => setFilter(item.value)}>{item.label}<span>{item.value === "all" ? publicProjects.length : publicProjects.filter((project) => project.track === item.value).length}</span></button>)}
      </div>
      <p className={styles.resultCount} aria-live="polite">Showing {shown.length} {shown.length === 1 ? "project" : "projects"}</p>
      <div className={styles.grid}>
        {shown.map((project, index) => <ProjectCard key={project.slug} project={project} index={publicProjects.indexOf(project) + 1 || index + 1} />)}
      </div>
    </>
  );
}
