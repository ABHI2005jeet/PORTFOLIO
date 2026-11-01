import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "adrde-agra-dashboard",
    title: "ADRDE Agra Dashboard Portal",
    summary:
      "A working full-stack prototype for user, meeting, notification, and reporting workflows — groundwork for a LAN-based internal system.",
    problem:
      "Explore how a modular portal could support internal user and workflow needs across a set of connected dashboard modules.",
    track: "sde",
    visibility: "featured",
    repoUrl: "https://github.com/ABHI2005jeet/ADRDE_CR",
    liveUrl: "https://adrde-cr.vercel.app/app",
    stack: ["React", "Vite", "Node.js", "Express", "MongoDB", "JWT", "Socket.io"],
    illustration: "portal",
    role: "Software Development Intern; built the prototype during May–June 2026.",
    caseStudy: {
      role: "Built a working prototype during a Software Development Internship at ADRDE (DRDO), Agra.",
      approach:
        "Organized user management, meetings, notifications, and reports as modules, with JWT authentication and role-based access control.",
      architecture:
        "React and Vite frontend with a Node.js and Express backend, MongoDB, and Socket.io. The frontend and backend were hosted separately for review.",
      decisions: [
        "Used role-based access control to distinguish portal permissions.",
        "Kept the modules and architecture documented for review and future planning.",
      ],
      outcome:
        "A working prototype built during the internship; groundwork for a LAN-based internal system. It was hosted for review and evaluation, not deployed for internal use.",
    },
  },
  {
    slug: "vibecode-editor",
    title: "VibeCode Editor",
    summary:
      "An AI-integrated browser IDE that combines WebContainers, Monaco, OAuth, and local Ollama models.",
    problem:
      "Bring a code editor, in-browser runtime, project starters, and local AI assistance into one browser workspace.",
    track: "sde",
    visibility: "featured",
    repoUrl: "https://github.com/ABHI2005jeet/Ai-Vibecode-Editor",
    stack: ["Next.js", "TypeScript", "WebContainers", "Monaco", "Ollama", "Prisma"],
    illustration: "ide",
    role: "Built an AI-integrated in-browser IDE and expanded an attributed course baseline.",
    caseStudy: {
      role: "Built the editor project and added features documented in its public README.",
      approach:
        "Combined Monaco editing, WebContainers execution, OAuth sign-in, project starters, an embedded terminal, and local model selection through Ollama.",
      architecture:
        "Next.js App Router with TypeScript, Auth.js, MongoDB through Prisma, Monaco, and the WebContainers browser runtime.",
      decisions: [
        "Used Monacopilot for inline ghost-text completion inside Monaco.",
        "Added a multi-model selector and specialized assistant modes for review, bug fixing, and optimization.",
        "Documented the upstream course baseline and the extensions made in this repository.",
      ],
      outcome:
        "The repository documents six project starters, an interactive file explorer, a browser preview, and a terminal. No live demo URL was provided.",
    },
  },
  {
    slug: "lms-backend-engine",
    title: "LMS Backend Engine",
    summary:
      "A REST API for learning platforms with role-based access and verified Razorpay payment signatures.",
    problem:
      "Provide a backend foundation for course, user, media, and payment flows across student, instructor, and admin roles.",
    track: "sde",
    visibility: "featured",
    repoUrl: "https://github.com/ABHI2005jeet/LMS-PAYMENT-GATEWAY",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Razorpay", "Cloudinary"],
    illustration: "api",
    role: "Developed the LMS backend API described in the résumé and repository README.",
    caseStudy: {
      role: "Developed a backend API for a Learning Management System.",
      approach:
        "Implemented JWT authentication, role-based access for students, instructors, and admins, plus course lifecycle and media-upload flows.",
      architecture:
        "A frontend-agnostic REST API built with Node.js, Express, and MongoDB.",
      decisions: [
        "Verified Razorpay payment signatures with HMAC-SHA256 before enrollment actions.",
        "Used separate access roles for student, instructor, and admin capabilities.",
      ],
      outcome: "The source and setup notes are available in the public repository.",
    },
  },
  {
    slug: "fastify-auth-media-engine",
    title: "Fastify Auth & Media Engine",
    summary:
      "A Fastify backend for authentication and media handling, built around plugins and schema-based validation.",
    problem:
      "Explore how an authentication and upload service changes when built around Fastify’s plugin-first lifecycle.",
    track: "sde",
    visibility: "featured",
    repoUrl: "https://github.com/ABHI2005jeet/FASTIFY-AUTH-BACKEND",
    stack: ["Node.js", "Fastify", "MongoDB", "JWT", "bcrypt"],
    illustration: "fastify",
    role: "Built a backend project exploring Fastify in place of Express.",
    caseStudy: {
      role: "Built the authentication and media backend described in the public README.",
      approach:
        "Used a custom plugin structure, schema-based environment validation, JWT authentication, and multipart media handling.",
      architecture:
        "A Node.js service using Fastify with MongoDB, password hashing, static file serving, and upload handling.",
      decisions: [
        "Used schema validation for inputs and environment configuration.",
        "Separated backend features through Fastify plugins.",
      ],
      outcome: "The implementation and setup instructions are available in the public repository.",
    },
  },
  {
    slug: "3d-dogstudio",
    title: "React 3D DogStudio",
    summary:
      "A scroll-driven 3D web experience with an animated dog model, shader transitions, and GSAP choreography.",
    problem:
      "Translate an expressive agency-site reference into a browser-rendered 3D experience.",
    track: "sde",
    visibility: "featured",
    repoUrl: "https://github.com/ABHI2005jeet/3D-DogStudio",
    liveUrl: "https://dogstudio-navy.vercel.app/",
    stack: ["React", "Three.js", "React Three Fiber", "GSAP", "GLSL", "Vite"],
    illustration: "three",
    role: "Built a React 3D web experience; the README describes it as a Dogstudio-inspired clone.",
    caseStudy: {
      role: "Built the 3D web experience and its scroll and hover interactions.",
      approach:
        "Combined a live 3D model with full-bleed imagery, scroll-driven motion, hover responses, and matcap shader transitions.",
      architecture:
        "React with React Three Fiber and Three.js for WebGL, GSAP and ScrollTrigger for coordinated motion, and Vite for the build.",
      decisions: [
        "Used GSAP ScrollTrigger to tie the scene to scroll progress.",
        "Used a custom shader transition to change the model’s surface treatment.",
      ],
      outcome: "A live demo is available alongside the public source repository.",
    },
  },
  {
    slug: "algoviz-studio",
    title: "AlgoViz Studio",
    summary:
      "An interactive visualizer for sorting, pathfinding, dynamic programming, and recursion, with step-by-step playback.",
    track: "sde",
    visibility: "listed",
    repoUrl: "https://github.com/ABHI2005jeet/AlgoViz-Studio",
    stack: ["React", "JavaScript", "Generator functions", "useReducer"],
  },
  {
    slug: "bank-ledger",
    title: "Bank Ledger Backend API",
    summary:
      "A double-entry ledger API with MongoDB transactions, idempotency keys, account-level checks, and email notifications.",
    track: "sde",
    visibility: "featured",
    repoUrl: "https://github.com/ABHI2005jeet/Bank-Ledger",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Nodemailer", "Google OAuth"],
    illustration: "ledger",
    role: "Built the backend ledger project described in the public README.",
    caseStudy: {
      role: "Built a backend banking ledger to study transaction consistency and API authorization.",
      approach:
        "Used double-entry records, MongoDB transactions, idempotency keys, account-level authorization checks, and token revocation.",
      architecture:
        "A Node.js and Express API backed by MongoDB sessions and indexes, with Nodemailer using Google OAuth for transaction email.",
      decisions: [
        "Wrapped transfers in MongoDB transactions so the debit and credit entries are committed together.",
        "Used idempotency keys to make repeated transfer requests safe to retry.",
        "Checked account ownership before an authenticated user could access an account.",
      ],
      outcome: "The implementation and setup notes are available in the public repository.",
    },
  },
  {
    slug: "chess-game",
    title: "Chess",
    summary:
      "A real-time two-player chess game with server-side move validation, timers, chat, and spectators.",
    track: "sde",
    visibility: "listed",
    repoUrl: "https://github.com/ABHI2005jeet/ChessGame",
    stack: ["Node.js", "Socket.IO", "chess.js"],
  },
  {
    slug: "splitease",
    title: "SplitEase",
    summary:
      "A shared-expense app for students and roommates, with group balances, flexible splits, and settlement tracking.",
    track: "cloud-devops",
    visibility: "listed",
    repoUrl:
      "https://github.com/OG-Shrish/SplitEase-Smart-Shared-Expense-Management-System-for-Students",
    role: "Team project with Shrish; backend, database, authentication, Docker, and testing contributions.",
    stack: ["Next.js", "Express", "MongoDB", "JWT", "Docker", "Docker Compose"],
  },
  {
    slug: "aegis-federated-learning",
    title: "AegisFL — Early Heart Disease Detection",
    summary:
      "A federated-learning prototype that trains across simulated hospital nodes for early heart-disease detection.",
    track: "cloud-devops",
    visibility: "featured",
    repoUrl: "https://github.com/ABHI2005jeet/FL-EARLY-DISEASE-DETECTION",
    liveUrl: "https://main.d27bxeyf5b5sth.amplifyapp.com/",
    stack: ["Next.js", "Python", "FedAvg", "AWS Lambda", "Amazon S3", "DynamoDB", "API Gateway", "AWS Amplify"],
    illustration: "federated",
    role: "Co-decided the project and feature set; designed the architecture and wrote the code. Gitanjali handled AWS services and deployment.",
    caseStudy: {
      role: "We decided the project and features together. I designed the architecture and wrote the code; Gitanjali handled AWS services and deployment.",
      approach:
        "The repository describes a FedAvg prototype across simulated hospital nodes, with raw records kept at the simulated nodes during training.",
      architecture:
        "A Next.js dashboard on AWS Amplify connects to a serverless backend using API Gateway, Lambda, DynamoDB, and S3, as described in the repository.",
      decisions: [
        "Used simulated nodes to explore federated training without building the project around one pooled dataset.",
        "The Amplify frontend runs in a region separate from backend services because the selected backend region did not offer Amplify hosting.",
      ],
      outcome: "The course prototype is deployed on AWS Amplify. Gitanjali handled the AWS services and deployment.",
    },
  },
  {
    slug: "cloudinary-media-saas",
    title: "Cloudinary Showcase",
    summary:
      "A media SaaS project for image and video compression, format conversion, and social-platform resizing.",
    track: "sde",
    visibility: "listed",
    repoUrl: "https://github.com/ABHI2005jeet/CLOUDINARY-SAAS",
    stack: ["Next.js", "Cloudinary", "Clerk", "Neon", "Prisma"],
  },
  {
    slug: "sentinel-ai",
    title: "Sentinel AI — Phishing Detection",
    summary:
      "A hybrid email and URL phishing-detection project combining machine learning, rules, and threat-intelligence signals.",
    track: "security",
    visibility: "listed",
    repoUrl: "https://github.com/ABHI2005jeet/AI-Phishing-Detection-System",
    stack: ["Python", "Machine learning", "Rule-based detection", "PhishTank"],
  },
  {
    slug: "phishing-dashboard",
    title: "Phishing Simulation & Detection Dashboard",
    summary:
      "A Python pattern scanner that explains suspicious text and generates an HTML report.",
    track: "security",
    visibility: "listed",
    repoUrl: "https://github.com/ABHI2005jeet/phishing-dashboard",
    stack: ["Python", "HTML", "CSS", "Log and text analysis"],
  },
  {
    slug: "project-blindspot",
    title: "Optiv — Project BlindSpot",
    summary: "A contribution to Optiv's Project BlindSpot.",
    track: "security",
    visibility: "listed",
    repoUrl: "https://github.com/Hareekshith/BlindSpot",
    stack: [],
    role: "Contributor (as confirmed by Abhijeet).",
    pendingDetails: true,
  },
  {
    slug: "paperwall-quantumshield",
    title: "PAPERWALL (QuantumShield)",
    summary:
      "A VIT cryptography and network-security project exploring post-quantum examination-paper governance.",
    track: "security",
    visibility: "listed",
    repoUrl: "https://github.com/ArpitShah03/Quantum-shield",
    stack: ["Cryptography", "Post-quantum security", "Zero-trust governance"],
    role: "Team project; the repository credits Abhijeet as a contributor.",
  },
  {
    slug: "incident-report-generator",
    title: "Incident Report Generator",
    summary:
      "A Python utility that parses system logs and exports selected events to CSV and HTML reports.",
    track: "security",
    visibility: "hidden",
    repoUrl: "https://github.com/ABHI2005jeet/incident-report-generator",
    stack: ["Python", "Log parsing", "CSV", "HTML"],
  },
  {
    slug: "network-protocol-visualizer",
    title: "CN Protocol Visualizer",
    summary:
      "Interactive explanations and simulations for polling, voting, and reservation access protocols.",
    track: "security",
    visibility: "hidden",
    repoUrl: "https://github.com/ABHI2005jeet/CN-protocol-visualizer",
    stack: ["HTML", "CSS", "JavaScript", "Computer networks"],
  },
  {
    slug: "os-dashboard",
    title: "OS Dashboard",
    summary:
      "A system-monitoring dashboard represented by three overlapping repository iterations.",
    track: "sde",
    visibility: "hidden",
    repoUrl: "https://github.com/ABHI2005jeet/OS--DASHBOARD",
    stack: ["Node.js", "Express", "JavaScript"],
  },
  {
    slug: "intelliplace",
    title: "IntelliPlace",
    summary:
      "A placement evaluation and analytics project with skill matching and a dashboard.",
    track: "sde",
    visibility: "hidden",
    repoUrl: "https://github.com/ABHI2005jeet/INTELLIPLACE",
    stack: ["Flask", "SQLite", "Bootstrap", "Chart.js"],
  },
  {
    slug: "amazon-clone",
    title: "Amazon Homepage Clone",
    summary: "A responsive HTML and CSS recreation of an e-commerce homepage.",
    track: "sde",
    visibility: "hidden",
    repoUrl: "https://github.com/ABHI2005jeet/amazon-clone-html-css",
    stack: ["HTML", "CSS"],
  },
];

export const featuredProjects = projects.filter((project) => project.visibility === "featured");
export const listedProjects = projects.filter((project) => project.visibility === "listed");
export const publicProjects = projects.filter((project) => project.visibility !== "hidden");

export function getProjectBySlug(slug: string) {
  return publicProjects.find((project) => project.slug === slug);
}
