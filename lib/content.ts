import { certifications, experience } from "@/content/experience";
import { offDuty } from "@/content/offduty";
import { featuredProjects, listedProjects, publicProjects, projects } from "@/content/projects";
import { site } from "@/content/site";

export { certifications, experience, featuredProjects, listedProjects, offDuty, projects, publicProjects, site };

export function projectBySlug(slug: string) {
  return publicProjects.find((project) => project.slug === slug);
}

export function markdownForHome() {
  const featured = featuredProjects.map((project) => `- [${project.title}](/work/${project.slug}.md): ${project.summary}`).join("\n");
  return [
    `# ${site.name}`,
    site.positioning,
    "## Focus",
    site.heroLine,
    "## Selected work",
    featured,
    "## Profiles",
    `- [GitHub](${site.profiles.github})`,
    `- [LinkedIn](${site.profiles.linkedin})`,
    `- [LeetCode](${site.profiles.leetcode})`,
    `- [HackerRank](${site.profiles.hackerrank})`,
    "## Sections",
    "- [About](/#about)",
    "- [Work](/work.md)",
    "- [Skills](/#skills)",
    "- [Journey](/#journey)",
    "- [Contact](/#contact)",
  ].join("\n\n") + "\n";
}

export function markdownForWork() {
  const rows = publicProjects.map((project) => {
    const repo = project.repoUrl ? ` [Repository](${project.repoUrl})` : "";
    const live = project.liveUrl ? ` [Live demo](${project.liveUrl})` : "";
    return `- **${project.title}** — ${project.summary}${repo}${live}`;
  }).join("\n");
  return `# Work\n\nProjects are shown by the tracks they explore: software development, security, and cloud and DevOps.\n\n${rows}\n`;
}

export function markdownForProject(slug: string) {
  const project = projectBySlug(slug);
  if (!project) return undefined;
  const sections = [
    `# ${project.title}`,
    project.summary,
    project.problem ? `## Problem\n\n${project.problem}` : "",
    project.caseStudy?.role || project.role ? `## My role\n\n${project.caseStudy?.role ?? project.role}` : "",
    project.caseStudy?.approach ? `## Approach\n\n${project.caseStudy.approach}` : "",
    project.caseStudy?.architecture ? `## Architecture\n\n${project.caseStudy.architecture}` : "",
    project.caseStudy?.decisions?.length ? `## Decisions\n\n${project.caseStudy.decisions.map((item) => `- ${item}`).join("\n")}` : "",
    project.caseStudy?.outcome ? `## Outcome\n\n${project.caseStudy.outcome}` : "",
    project.stack.length ? `## Stack\n\n${project.stack.join(", ")}` : "",
    `## Links\n\n${project.repoUrl ? `- [Repository](${project.repoUrl})\n` : ""}${project.liveUrl ? `- [Live demo](${project.liveUrl})\n` : ""}`,
  ].filter(Boolean);
  return `${sections.join("\n\n")}\n`;
}

export function llmsText(full = false) {
  const projectLines = publicProjects
    .map((project) => {
      const repository = project.repoUrl ? ` (${project.repoUrl})` : "";
      const role = project.caseStudy?.role ?? project.role;
      return `- ${project.title}: ${project.summary}${repository}${role ? ` Role: ${role}` : ""}`;
    })
    .join("\n");

  if (!full) {
    return [
      `# ${site.name}`,
      `> ${site.positioning}`,
      "## Profile",
      `- Education: ${site.education}, ${site.educationPeriod}, CGPA ${site.cgpa}.`,
      "- Focus: software development first; exploring cyber security, cloud, and DevOps.",
      "- Internship: Software Development Intern at ADRDE (DRDO), Agra, May–June 2026.",
      "## Projects",
      projectLines,
      "## Profiles",
      `- GitHub: ${site.profiles.github}`,
      `- LinkedIn: ${site.profiles.linkedin}`,
      `- LeetCode: ${site.profiles.leetcode}`,
      `- HackerRank: ${site.profiles.hackerrank}`,
      "## Site sections",
      "- Home: /",
      "- Work: /work",
      "- Featured case studies: /work/<slug>",
      "- Skills, journey, off-duty, and contact: /#skills, /#journey, /#off-duty, /#contact",
    ].join("\n\n") + "\n";
  }

  const certs = certifications.map((certificate) => `- ${certificate}`).join("\n");
  const skills = [
    "Software: C, C++, Python, Java, JavaScript, TypeScript, HTML, CSS, React, Next.js, Node.js, Express, MongoDB, Prisma, JWT.",
    "Security practice: Kali Linux, Bash, log analysis, Wireshark, Burp Suite, DVWA, Metasploit basics.",
    "Cloud and DevOps: Microsoft Azure Fundamentals (AZ-900), Vercel and Render deployments, Docker, and the AegisFL team project (AWS services and deployment handled by Gitanjali).",
    "Core CS: DSA, OOP, operating systems, DBMS, and computer networks.",
  ].join("\n\n");
  return [
    `# ${site.name} — Full profile`,
    site.positioning,
    "## Education",
    `${site.education}, ${site.educationPeriod}. CGPA ${site.cgpa}.`,
    "## Experience",
    "Software Development Intern, ADRDE (DRDO), Agra, May–June 2026. Built a working full-stack prototype with modular architecture, JWT authentication, role-based access control, and user, meeting, notification, and reporting modules. It was hosted for review and evaluation as groundwork for a LAN-based internal system.",
    "## Projects",
    projectLines,
    "## Skills",
    skills,
    "## Certifications",
    certs,
    "## Problem solving",
    `LeetCode: ${site.proof.leetcode}. GitHub: ${site.proof.github}. HackerRank: ${site.proof.hackerrank}. Values shown as of ${site.proofAsOf}.`,
    "## Profiles",
    `- GitHub: ${site.profiles.github}`,
    `- LinkedIn: ${site.profiles.linkedin}`,
    `- LeetCode: ${site.profiles.leetcode}`,
    `- HackerRank: ${site.profiles.hackerrank}`,
    `- Instagram: ${site.profiles.instagram}`,
  ].join("\n\n") + "\n";
}
