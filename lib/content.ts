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
  return `# ${site.name}\n\n${site.positioning}\n\n## Focus\n\n${site.heroLine}\n\n## Selected work\n\n${featured}\n\n## Profiles\n\n- [GitHub](${site.profiles.github})\n- [LinkedIn](${site.profiles.linkedin})\n- [LeetCode](${site.profiles.leetcode})\n\n## Sections\n\n- [About](/#about)\n- [Work](/work.md)\n- [Skills](/#skills)\n- [Journey](/#journey)\n- [Contact](/#contact)\n`;
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
    project.caseStudy?.role ? `## My role\n\n${project.caseStudy.role}` : "",
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
    .filter((project) => !project.pendingDetails)
    .map((project) => `- ${project.title}: ${project.summary}${project.repoUrl ? ` (${project.repoUrl})` : ""}`)
    .join("\n");

  if (!full) {
    return `# ${site.name}\n\n> ${site.positioning}\n\n## Profile\n\n- Education: ${site.education}, ${site.educationPeriod}, CGPA ${site.cgpa}.\n- Focus: software development first; exploring cyber security, cloud, and DevOps.\n- Internship: Software Development Intern at ADRDE (DRDO), Agra, May–June 2026.\n\n## Projects\n\n${projectLines}\n\n## Profiles\n\n- GitHub: ${site.profiles.github}\n- LinkedIn: ${site.profiles.linkedin}\n- LeetCode: ${site.profiles.leetcode}\n\n## Site sections\n\n- Home: /\n- Work: /work\n- Featured case studies: /work/<slug>\n- Skills, journey, off-duty, and contact: /#skills, /#journey, /#off-duty, /#contact\n`;
  }

  const certs = certifications.map((certificate) => `- ${certificate}`).join("\n");
  const skills = [
    "Software: C, C++, Python, Java, JavaScript, TypeScript, HTML, CSS, React, Next.js, Node.js, Express, MongoDB, Prisma, JWT.",
    "Security practice: Kali Linux, Bash, log analysis, Wireshark, Burp Suite, DVWA, Metasploit basics.",
    "Cloud and DevOps: Microsoft Azure Fundamentals (AZ-900), AWS Amplify coursework deployment, Docker, Vercel, Render.",
    "Core CS: DSA, OOP, operating systems, DBMS, and computer networks.",
  ].join("\n\n");
  return `# ${site.name} — Full profile\n\n${site.positioning}\n\n## Education\n\n${site.education}, ${site.educationPeriod}. CGPA ${site.cgpa}.\n\n## Experience\n\nSoftware Development Intern, ADRDE (DRDO), Agra, May–June 2026. Built a working full-stack prototype with modular architecture, JWT authentication, role-based access control, and user, meeting, notification, and reporting modules. It was hosted for review and evaluation as groundwork for a LAN-based internal system.\n\n## Projects\n\n${projectLines}\n\n## Skills\n\n${skills}\n\n## Certifications\n\n${certs}\n\n## Problem solving\n\nLeetCode: ${site.proof.leetcode}. GitHub: ${site.proof.github}. HackerRank: ${site.proof.hackerrank}. Values shown as of ${site.proofAsOf}.\n\n## Profiles\n\n- GitHub: ${site.profiles.github}\n- LinkedIn: ${site.profiles.linkedin}\n- LeetCode: ${site.profiles.leetcode}\n- Instagram: ${site.profiles.instagram}\n`;
}
