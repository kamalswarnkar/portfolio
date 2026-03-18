export const resumeFile = {
  label: "Download CV",
  href: "/assets/Kamal_Swarnkar_CV.pdf",
};

export const resumePreview = {
  badge: "Resume Archive",
  title: "Curriculum Vitae",
  quickStats: ["Full Stack", "ML Systems", "Django", "Python", "AI"],
};

export const introData = {
  badge: "Omnitrix Signal Online",
  title: "Builder energy wired for software, ML, and recruiter-ready product execution.",
  summary:
    "Computer science talent shaped through full stack development, machine learning systems, analytics-driven products, and polished experiences that feel production ready from the first interaction.",
  hiddenText:
    "Locked-in mode stays permanent here. Clean builds, sharp logic, zero side-quest chaos, and straight-up hero timeline energy for squads that need impact fast.",
  highlights: [
    "Full stack delivery",
    "Machine learning pipelines",
    "Production-minded APIs",
    "Recruiter-friendly UX",
  ],
};

export const activationBanner = {
  eyebrow: "Transformation Complete",
  title: "Hero Interface Activated",
  description:
    "A cinematic landing moment that leads straight into the work archive or the latest CV.",
};

export const trainings = [
  {
    id: "TRN-025-01",
    title: "FLAMES '25 MERN with Gen AI",
    provider: "W3grads",
    alien: "XLR8",
    period: "July 2025",
    credential: "Certificate earned",
    certificateImage: "/assets/certificates/training-flames-25.jpg",
    summary:
      "Handled AI workflow inconsistencies, database lag, deployment friction, and team execution bottlenecks across a MERN plus GenAI setup.",
    outcomes: [
      "Streamlined development workflows for faster delivery and steadier deployments.",
      "Established disciplined Git practices and daily SCRUM routines to reduce merge friction.",
    ],
    accent: "from-emerald-300/26 via-lime-300/10 to-transparent",
  },
  {
    id: "TRN-025-02",
    title: "Youth Research Program",
    provider: "Resolute Lab",
    alien: "Jetray",
    period: "March 2025",
    credential: "Certificate earned",
    certificateImage: "/assets/certificates/training-youth-research.jpg",
    summary:
      "Applied aerospace engineering concepts to rocket simulation and design using OpenRocket and SolidWorks inside a multidisciplinary research environment.",
    outcomes: [
      "Performed propulsion analysis, payload integration studies, and structural feasibility simulations.",
      "Optimized design parameters through iterative testing and maintained technical documentation.",
    ],
    accent: "from-cyan-300/26 via-emerald-300/10 to-transparent",
  },
];

export const education = [
  {
    institution: "Lovely Professional University",
    location: "Phagwara, Punjab",
    degree: "Bachelor of Technology in Computer Science and Engineering",
    score: "CGPA: 8.87",
    period: "August 2023 - Present",
  },
  {
    institution: "Central Academy Senior Secondary School",
    location: "Bhilwara, Rajasthan",
    degree: "Intermediate",
    score: "91%",
    period: "April 2021 - March 2022",
  },
  {
    institution: "Central Academy Senior Secondary School",
    location: "Bhilwara, Rajasthan",
    degree: "Matriculation",
    score: "89%",
    period: "April 2019 - March 2020",
  },
];

export const skillWatches = [
  {
    category: "Languages",
    style: "Prime Dial",
    accent: "from-lime-300/30 via-accent/15 to-transparent",
    ringClass: "border-accent/35 shadow-[0_0_36px_rgba(57,255,20,0.18)]",
    skills: ["Python", "C"],
  },
  {
    category: "Tools",
    style: "Field Dial",
    accent: "from-emerald-300/28 via-cyan-300/12 to-transparent",
    ringClass: "border-cyan-300/35 shadow-[0_0_36px_rgba(34,211,238,0.18)]",
    skills: ["Git", "Linux", "Docker", "SolidWorks", "OpenRocket", "VSCode", "PostgreSQL", "MongoDB"],
  },
  {
    category: "Libraries",
    style: "Analyzer Dial",
    accent: "from-yellow-300/30 via-accent/10 to-transparent",
    ringClass: "border-yellow-300/35 shadow-[0_0_36px_rgba(253,224,71,0.18)]",
    skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "XGBoost"],
  },
  {
    category: "Frameworks",
    style: "Fusion Dial",
    accent: "from-emerald-300/24 via-lime-300/8 to-transparent",
    ringClass: "border-emerald-300/35 shadow-[0_0_36px_rgba(52,211,153,0.18)]",
    skills: ["Django", "Express.js", "React"],
  },
  {
    category: "Soft Skills",
    style: "Signal Dial",
    accent: "from-white/18 via-accent/8 to-transparent",
    ringClass: "border-white/20 shadow-[0_0_36px_rgba(255,255,255,0.08)]",
    skills: ["Self-motivated", "Articulate", "Organized", "Analytical", "Leadership"],
  },
];

export const projects = [
  {
    id: "RSX-026",
    name: "Resumix",
    period: "February 2026",
    status: "Production Oriented",
    description:
      "Resume analysis and role prediction platform built with Django and DRF for authentication, document ingestion, parsing, scoring, and recruiter-facing insights.",
    details: [
      "Built JWT-authenticated flows for PDF and DOCX resume uploads with a unified web UI and REST APIs.",
      "Engineered a weighted scoring pipeline using TF-IDF similarity, skill match, experience relevance, and ATS compliance.",
      "Benchmarked six multi-class role classification models and deployed the best persisted inference setup.",
      "Added role-based access control plus admin analytics for user, resume, and analysis monitoring.",
    ],
    stack: ["Python", "Django", "PostgreSQL", "JWT", "Scikit-learn", "XGBoost", "spaCy", "NLTK", "Celery", "Redis"],
    github: "https://github.com/kamalswarnkar/Resumix",
    demo: "https://resumix-ygb9.onrender.com/",
    alienVibe: "Grey Matter",
    accent: "from-lime-300/28 via-accent/10 to-transparent",
  },
  {
    id: "AIC-025",
    name: "AI Career Lab",
    period: "March 2026",
    status: "Live + Model Ready",
    description:
      "ML-based career guidance platform using TF-IDF and multi-class classification for career prediction and skill-gap analysis.",
    details: [
      "Architected and evaluated RF, SVM, and LR models, achieving 86.58% test accuracy with a 1.23% overfitting gap.",
      "Benchmarked precision, recall, and F1 across models; the best setup reached ~86.6% on unseen data.",
      "Built a robust training pipeline with explicit train-test gap analysis to maintain strong generalization.",
      "Developed a modular Django app supporting real-time inference for career prediction and skill-gap analysis.",
    ],
    stack: ["Python", "Scikit-learn", "XGBoost", "Pandas", "NumPy"],
    github: "https://github.com/kamalswarnkar/AI-Career-Lab",
    demo: "https://ai-career-lab.onrender.com/",
    alienVibe: "Brainstorm",
    accent: "from-cyan-300/26 via-emerald-300/10 to-transparent",
  },
  {
    id: "FTA-025",
    name: "FinTrackAI",
    period: "July 2025",
    status: "Live Concept",
    description:
      "AI-enhanced finance tracker focused on automated expense categorization, budget visibility, and monthly financial health analytics.",
    details: [
      "Used Generative AI to reduce manual transaction logging and improve categorization accuracy.",
      "Designed analytics views for budgets, savings trends, and monthly financial awareness.",
    ],
    stack: ["MongoDB", "Express.js", "Node.js", "React.js"],
    github: "https://github.com/kamalswarnkar/FinTrackAI",
    demo: "https://fintrackai-six.vercel.app/",
    alienVibe: "Upgrade",
    accent: "from-amber-300/24 via-orange-300/10 to-transparent",
  },
];

export const certificates = [
  {
    title: "Master Generative AI & Generative AI Tools",
    issuer: "Infosys",
    period: "August 2025",
    highlight: "GenAI workflow foundations and tooling confidence.",
    previewLabel: "Infosys GenAI",
    image: "/assets/certificates/certificate-infosys-genai.jpg",
  },
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    period: "September 2024",
    highlight: "Networking fundamentals with systems-level clarity.",
    previewLabel: "Google Networking",
    image: "/assets/certificates/certificate-google-networking.jpg",
  },
  {
    title: "Computer Communications",
    issuer: "University of Colorado",
    period: "September 2024",
    highlight: "Communication systems concepts and protocol understanding.",
    previewLabel: "Colorado Comms",
    image: "/assets/certificates/certificate-colorado-communications.jpg",
  },
];

export const contacts = {
  email: "swarnkar889@gmail.com",
  phone: "+91 9588940609",
  social: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/kamal-swarnkar-93x/",
      detail: "Recruiter transmission channel",
    },
    {
      label: "GitHub",
      href: "https://github.com/kamalswarnkar",
      detail: "Project source archive",
    },
  ],
};
