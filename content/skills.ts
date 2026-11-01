export type SkillDepth = "Building" | "Practising" | "Exploring";
export type SkillTrackId = "software" | "security" | "cloud" | "devops";

export const skillTracks: {
  id: SkillTrackId;
  label: string;
  intro: string;
  groups: { depth: SkillDepth; items: string[]; evidence: string[] }[];
}[] = [
  {
    id: "software",
    label: "Software (SDE)",
    intro: "Full-stack development is the main thread in my work so far.",
    groups: [
      {
        depth: "Building",
        items: ["React and Next.js", "Node.js and Express", "MongoDB", "REST APIs", "JWT and RBAC", "TypeScript"],
        evidence: ["ADRDE Agra Dashboard Portal", "VibeCode Editor", "LMS Backend Engine", "Fastify Auth & Media Engine"],
      },
      {
        depth: "Practising",
        items: ["C", "C++", "Java", "Python", "DSA", "OOP", "Operating systems", "DBMS", "Computer networks"],
        evidence: ["Coursework and LeetCode practice"],
      },
      {
        depth: "Exploring",
        items: ["Browser-based development runtimes", "Interactive 3D interfaces", "AI-assisted coding workflows"],
        evidence: ["VibeCode Editor", "React 3D DogStudio"],
      },
    ],
  },
  {
    id: "security",
    label: "Cyber Security",
    intro: "Security is a lens I apply to software while continuing hands-on practice.",
    groups: [
      {
        depth: "Building",
        items: ["JWT authentication", "Role-based access control", "HMAC-SHA256 payment verification", "Idempotent transfers"],
        evidence: ["ADRDE Agra Dashboard Portal", "LMS Backend Engine", "Bank Ledger Backend API"],
      },
      {
        depth: "Practising",
        items: ["Kali Linux", "Bash", "Wireshark", "Burp Suite", "DVWA", "Metasploit basics", "Log analysis"],
        evidence: ["Ethical hacking coursework and security labs"],
      },
      {
        depth: "Exploring",
        items: ["Post-quantum security concepts", "Zero-trust governance patterns"],
        evidence: ["PAPERWALL (QuantumShield), team project"],
      },
    ],
  },
  {
    id: "cloud",
    label: "Cloud",
    intro: "Cloud work is currently grounded in coursework and project deployments.",
    groups: [
      {
        depth: "Building",
        items: ["AWS Amplify project deployment", "Vercel and Render project deployments"],
        evidence: ["AegisFL — Early Heart Disease Detection", "ADRDE Agra Dashboard Portal"],
      },
      {
        depth: "Practising",
        items: ["Microsoft Azure Fundamentals (AZ-900)", "Cloud deployment coursework"],
        evidence: ["AZ-900 certification", "AWS Amplify coursework project"],
      },
      {
        depth: "Exploring",
        items: ["Cloud architecture and operational trade-offs"],
        evidence: ["Coursework and project deployments"],
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps",
    intro: "I am learning deployment and container workflows through project work.",
    groups: [
      {
        depth: "Building",
        items: ["Docker", "Docker Compose", "Vercel and Render deployment"],
        evidence: ["SplitEase", "ADRDE Agra Dashboard Portal"],
      },
      {
        depth: "Practising",
        items: ["Git", "GitHub", "VirtualBox", "VS Code"],
        evidence: ["Project development and coursework"],
      },
      {
        depth: "Exploring",
        items: ["Deployment workflows", "Container-based development"],
        evidence: ["SplitEase and hosted project prototypes"],
      },
    ],
  },
];
