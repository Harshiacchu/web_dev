// data.js — single source of truth for site content, consumed by ES6 modules.
// Keeping content here keeps markup clean and lets the terminal + pages share data.

export const profile = {
  name: "Harshitha Seetharaman",
  role: "Data & Software Engineer",
  tagline: "I work with data until it starts making sense.",
  location: "Boston, Massachusetts",
  email: "seetharaman.ha@northeastern.edu",
  status: "Seeking Fall 2026 internships in data, analytics & product.",
};

export const links = {
  linkedin: "https://www.linkedin.com/in/harshitha-seetharaman-97098a213/",
  portfolio: "https://harshitha-seetharaman-portfolio.vercel.app/",
  email: "mailto:seetharaman.ha@northeastern.edu",
};

export const roles = [
  "Data Engineer",
  "Software Developer",
  "ML & NLP Tinkerer",
  "Analytics Storyteller",
];

export const skills = [
  { group: "Languages", items: ["Python", "SQL", "JavaScript", "HTML5", "CSS3"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "BigQuery", "Databricks"] },
  {
    group: "Data & Pipelines",
    items: ["Apache Airflow", "dbt", "Apache Spark", "Power BI"],
  },
  { group: "ML / NLP", items: ["scikit-learn", "PyTorch", "spaCy", "Streamlit"] },
  { group: "Engineering", items: ["Git", "Docker", "REST APIs"] },
];

export const projects = [
  {
    id: "hormuzpulse",
    name: "HormuzPulse",
    blurb:
      "Shipping, port, and trade-lane analytics platform that consolidates public maritime data for same-day reporting.",
    stack: ["Python", "SQL", "BigQuery", "Apache Airflow"],
    highlight: "End-to-end pipeline: ingest → model → dashboard.",
  },
  {
    id: "accessmap",
    name: "AccessMap+",
    blurb:
      "A relational database that organizes accessibility information so people can find step-free, inclusive routes and places.",
    stack: ["MySQL", "SQL", "Schema Design"],
    highlight: "Entity modeling with composite indexing for fast lookups.",
  },
  {
    id: "braincost",
    name: "BrainCost",
    blurb:
      "Clinical-note analysis that estimates healthcare resource cost, comparing classic baselines against transformer models.",
    stack: ["PyTorch", "scikit-learn", "spaCy"],
    highlight: "Baseline vs. transformer benchmark on real clinical text.",
  },
];

export const education = [
  {
    school: "Northeastern University — Khoury College",
    degree: "M.S. in Computer Science",
    period: "Sep 2025 – May 2027",
    note: "Focus: data systems, software development, analytics, applied computing.",
  },
  {
    school: "St. Joseph's College of Engineering",
    degree: "B.E. in Computer Science & Engineering",
    period: "2021 – 2025",
    note: "Joint Secretary, CSI Chennai Chapter.",
  },
];

export const experience = [
  {
    title: "Event Manager — Cryptrix'24",
    period: "2024",
    note: "Led 20+ volunteers to run a national symposium with 500+ participants.",
  },
  {
    title: "Web Development Intern — ANJUSOFT",
    period: "2023",
    note: "Built internal and client-facing web features.",
  },
];

export const achievements = [
  "Co-authored an IoT research paper, presented at ICSTSDG 2024.",
  "Smart India Hackathon Finalist (2022 & 2024).",
];

export const interests = [
  "Crime thrillers",
  "K-dramas",
  "Horror films",
  "Fiction",
  "Animal volunteering",
  "Cooking",
];
