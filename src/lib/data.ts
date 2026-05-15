// SafeHand content data layer
// Each export is a typed constant — replace with fetch('/api/safehand/...') when Hermes backend connects

export type Feature = {
  id: string;
  name: string;
  description: string;
  triggerPhrases: string[];
  icon: string; // icon key mapped in components
};

export type CoverageElement = {
  number: number;
  name: string;
  primaryFeatures: string;
  status: "active" | "building" | "required";
  coverage: number; // 0–100
};

export type Competitor = {
  name: string;
  type: string;
  weakness: string;
  safHandEdge: string;
};

export type ProblemStat = {
  value: string;
  label: string;
  sub: string;
  accent: "red" | "amber" | "green" | "blue";
};

export type UserType = {
  role: string;
  description: string;
  howHermesHelps: string;
  icon: string;
};

export type DemoStep = {
  step: number;
  action: string;
  output: string;
};

// ─────────────────────────────────────────────
// Features (PRD §4)
// ─────────────────────────────────────────────
export const features: Feature[] = [
  {
    id: "hazard-capture",
    name: "Conversational Hazard Capture",
    description:
      "Report hazards, near-misses, or incidents by voice or text. Hermes transcribes, classifies, and logs to your hazard register automatically.",
    triggerPhrases: ["near miss", "close call", "unsafe condition"],
    icon: "hazard",
  },
  {
    id: "incident-investigation",
    name: "Incident & Accident Investigation",
    description:
      "Structured investigation triggered the moment an incident is reported. Collects facts, identifies root causes, generates a jurisdiction-ready report.",
    triggerPhrases: ["worker was hurt", "accident today", "injury"],
    icon: "incident",
  },
  {
    id: "sop-generator",
    name: "Automatic SOP Generation",
    description:
      "Mention equipment or a task and Hermes drafts an ISO 45001-structured SOP — purpose, scope, responsibilities, hazards, and controls.",
    triggerPhrases: ["new equipment", "make a procedure", "SOP for"],
    icon: "document",
  },
  {
    id: "worker-onboarding",
    name: "Worker Onboarding via Conversation",
    description:
      "New hire starts Monday? Tell Hermes. It runs the orientation sequence, records completion in the training matrix, and flags any gaps.",
    triggerPhrases: ["new worker", "hired someone", "onboard"],
    icon: "people",
  },
  {
    id: "training-matrix",
    name: "Training Matrix Management",
    description:
      "Tracks certifications, training completion, and expiry dates per worker. Sends renewal reminders before expiries slip through.",
    triggerPhrases: ["training expired", "who needs training", "got certified"],
    icon: "training",
  },
  {
    id: "toolbox-talk",
    name: "Toolbox Talk Generator",
    description:
      "Weekly safety briefings generated from your actual hazard log — contextually relevant, not generic. Ready to read aloud or hand out.",
    triggerPhrases: ["toolbox talk", "safety briefing", "what should we cover"],
    icon: "calendar",
  },
  {
    id: "inspection",
    name: "Inspection Scheduler & Logger",
    description:
      "Scheduled equipment and site inspections based on industry norms. Complete the checklist by voice. Deficiencies are flagged and tracked.",
    triggerPhrases: ["inspection due", "equipment check", "checked today"],
    icon: "inspection",
  },
  {
    id: "weekly-summary",
    name: "Weekly Compliance Summary",
    description:
      "Every Friday, an automated summary of the week's safety activity — hazards logged, inspections done, open actions, upcoming deadlines.",
    triggerPhrases: ["weekly summary", "what happened this week"],
    icon: "chart",
  },
  {
    id: "client-package",
    name: "On-Demand Client Documentation",
    description:
      "Audit tomorrow? Client wants proof? In under five minutes, Hermes compiles your policy statement, hazard register, training matrix, and inspection records.",
    triggerPhrases: ["client wants proof", "audit tomorrow", "safety submission"],
    icon: "upload",
  },
];

// ─────────────────────────────────────────────
// ISO 45001 Coverage Elements (PRD §5)
// ─────────────────────────────────────────────
export const coverageElements: CoverageElement[] = [
  {
    number: 1,
    name: "Management Commitment",
    primaryFeatures: "Soul file + Owner onboarding",
    status: "building",
    coverage: 60,
  },
  {
    number: 2,
    name: "Policy and Procedures",
    primaryFeatures: "SOP Generator",
    status: "required",
    coverage: 20,
  },
  {
    number: 3,
    name: "Training, Education, Certification",
    primaryFeatures: "Worker Onboarding + Training Matrix",
    status: "building",
    coverage: 55,
  },
  {
    number: 4,
    name: "Hazard Identification & Risk Control",
    primaryFeatures: "Hazard Capture",
    status: "active",
    coverage: 85,
  },
  {
    number: 5,
    name: "Inspections",
    primaryFeatures: "Inspection Scheduler",
    status: "required",
    coverage: 15,
  },
  {
    number: 6,
    name: "Incident Investigation",
    primaryFeatures: "Incident Investigation",
    status: "active",
    coverage: 80,
  },
  {
    number: 7,
    name: "Program Administration",
    primaryFeatures: "Weekly Summary + GitHub backup",
    status: "building",
    coverage: 50,
  },
  {
    number: 8,
    name: "Action Plan",
    primaryFeatures: "All features — actions tracked centrally",
    status: "active",
    coverage: 75,
  },
  {
    number: 9,
    name: "Contract Systems",
    primaryFeatures: "Client Documentation Package",
    status: "required",
    coverage: 10,
  },
];

// ─────────────────────────────────────────────
// Competitive Comparison (PRD §13)
// ─────────────────────────────────────────────
export const competitors: Competitor[] = [
  {
    name: "Alcumus / SafetySync",
    type: "Form-based SaaS",
    weakness: "Owner still builds the program manually — adds work, doesn't remove it",
    safHandEdge: "Program builds from real conversations, no forms required",
  },
  {
    name: "Workhub",
    type: "Form-based SaaS",
    weakness: "Designed for companies with a dedicated safety person",
    safHandEdge: "Works for owners wearing every hat, zero safety expertise needed",
  },
  {
    name: "Safesite",
    type: "Mobile-first SaaS",
    weakness: "Incident-focused only — not a full management system",
    safHandEdge: "Covers all 9 ISO 45001 elements, not just incident logging",
  },
  {
    name: "OH&S Consultant",
    type: "Human service",
    weakness: "$10K–$20K upfront, no ongoing execution, no memory",
    safHandEdge: "Fraction of the cost, runs continuously, remembers everything",
  },
  {
    name: "Generic LLM / ChatGPT",
    type: "Stateless chatbot",
    weakness: "Resets every session, no crons, no persistent memory of your business",
    safHandEdge: "Full memory, scheduled crons, Telegram-native — always on",
  },
];

// ─────────────────────────────────────────────
// Problem Stats
// ─────────────────────────────────────────────
export const problemStats: ProblemStat[] = [
  {
    value: "$10K–$20K",
    label: "Consultant-led safety programs",
    sub: "6–12 month timeline. No ongoing execution.",
    accent: "red",
  },
  {
    value: "Identical",
    label: "Legal liability vs. large corporations",
    sub: "Same fines. Same regulatory exposure. Same personal risk.",
    accent: "amber",
  },
  {
    value: "0 forms",
    label: "Required to build your program",
    sub: "Voice notes and real conversations are enough.",
    accent: "green",
  },
];

// ─────────────────────────────────────────────
// Who It's For (PRD §3)
// ─────────────────────────────────────────────
export const userTypes: UserType[] = [
  {
    role: "The Owner / GM",
    description:
      "On a job site, in a truck, or on the shop floor — not at a desk. Communicates by voice. Motivated by winning contracts, avoiding fines, and protecting the crew.",
    howHermesHelps:
      "Telegram voice notes, immediate responses, no login portals. Outputs they can forward directly to clients or inspectors.",
    icon: "owner",
  },
  {
    role: "Workers",
    description:
      "Mix of seasonal, foreign, and long-term workers. Varying English literacy. High turnover means onboarding must be fast, repeatable, and language-flexible.",
    howHermesHelps:
      "Toolbox talks in plain language via Telegram. Five-minute onboarding conversation. Training records maintained automatically regardless of who leaves.",
    icon: "people",
  },
  {
    role: "Clients, Inspectors & Insurers",
    description:
      "Require documented proof of OH&S program. Audit hazard registers, training matrices, incident logs, and SOPs. Only care that documentation exists and is current.",
    howHermesHelps:
      "Submission-ready documents generated on demand. Audit trail maintained automatically. Client package compiled in under five minutes.",
    icon: "upload",
  },
];

// ─────────────────────────────────────────────
// Demo loop steps (PRD §14)
// ─────────────────────────────────────────────
export const demoSteps: DemoStep[] = [
  {
    step: 1,
    action: 'Owner sends voice note: "One of my guys almost got hit by a forklift in the loading bay."',
    output: "Classified as near-miss → logged to hazard register",
  },
  {
    step: 2,
    action: "Hermes generates corrective actions",
    output: "Spotter required · exclusion zone · signage recommendation",
  },
  {
    step: 3,
    action: "Follow-up inspection cron scheduled",
    output: "Loading bay inspection booked — no calendar needed",
  },
  {
    step: 4,
    action: "Toolbox talk generated",
    output: '"Loading Bay Safety — Forklift Exclusion Zones"',
  },
  {
    step: 5,
    action: "Training matrix updated",
    output: "Workers without forklift awareness training flagged",
  },
];
