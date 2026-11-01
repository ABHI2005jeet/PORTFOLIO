export type ProjectTrack = "sde" | "security" | "cloud-devops";
export type ProjectVisibility = "featured" | "listed" | "hidden";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  problem?: string;
  track: ProjectTrack;
  visibility: ProjectVisibility;
  repoUrl?: string;
  liveUrl?: string;
  stack: string[];
  illustration?: "portal" | "ide" | "api" | "fastify" | "three" | "ledger" | "federated";
  role?: string;
  pendingDetails?: boolean;
  caseStudy?: {
    role?: string;
    approach?: string;
    architecture?: string;
    decisions?: string[];
    outcome?: string;
  };
};
