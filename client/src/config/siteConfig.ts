/**
 * Site Configuration File
 * 
 * This file contains all the configurable content for the personal academic homepage.
 * Update this file to modify site content without touching the component code.
 <!-- Cache bust: 2025-11-15 17:06:43 -->
 */

// ===========================
// Personal Information
// ===========================
export const personalInfo = {
  name: "Buqiang Xu",
  chineseName: "徐步强",
  pronouns: "he/him",
  title: "Incoming Master Student",
  university: "University of Zhejiang / Northeastern University",
  location: "Shenyang, China",
  email: "Xubqpanda@gmail.com",
  
  // Hero Section
  heroQuote: "The higher I got, the more amazed I was by the view.",
  heroAttribution: "Flipped",
  
  // About Me
  aboutMe: {
    intro: `I am a senior undergraduate student majoring in Computer Science at Northeastern University (NEU), China. Starting Fall 2026, I will be pursuing my Master's degree at the School of Software Technology, Zhejiang University (ZJU). Currently, I am a research assistant at Zjunlp Lab.`,
  
    researchFocus: `My research is driven by the quest for AGI. I am particularly fascinated by how agents can maintain a coherent "self" and up-to-date world model through time. Currently, my work focuses on developing advanced memory architectures for autonomous agents and exploring efficient ways to update or edit model knowledge without retraining.`,
  
    researchInterests: [
      {
        title: "Long-term & Agentic Memory",
        description: "Building scalable and structured memory systems (e.g., StructMem, LightMem) that enable LLM agents to reason, plan, and learn across infinite horizons."
      },
      {
        title: "Knowledge Editing",
        description: "Developing precise and efficient methods to modify or erase specific knowledge in LLMs, ensuring models remain factual and safe in a dynamic world."
      },
      {
        title: "Continual Learning",
        description: "Investigating how models can learn new tasks and information sequentially without catastrophic forgetting, a fundamental requirement for lifelong evolving AGI."
      }
    ],
    
    goal: `Guided by the ultimate goal of achieving AGI, I aim to build embodied and software agents that possess human-like memory capabilities and the ability to adapt to new knowledge continuously.`,

    lookingFor: "✨ I am always open to discussions on AGI, LLM Memory, and Continual Learning. Feel free to reach out!"
  },
  
  advisors: [
    {
      name: "Prof. Ningyu Zhang",
      url: "https://person.zju.edu.cn/ningyu"
    }
  ]
};

// ===========================
// Images and Assets
// ===========================
export const images = {
  heroBackground: "/assets/tebet3.jpg",
  profileAvatar: "/assets/avatar.jpg",
};

// ===========================
// Social Media Links
// ===========================
export const socialLinks = {
  googleScholar: "https://scholar.google.com/citations?user=ConlL8AAAAAJ",
  github: "https://github.com/Xubqpanda",
  wechat: "Blue18067792208",
  email: "Xubqpanda@gmail.com",
  QQ: "1227972384",
};

// ===========================
// Navigation Menu
// ===========================
export const navigationMenu = [
  { label: "Home", href: "/" },
  { label: "Publications", href: "/#publications" },
  { label: "Awards", href: "/#awards" },
  // { label: "Misc", href: "/#misc" },
  // { label: "Blog", href: "https://yibinleonliu.substack.com", external: true },
  // { label: "CV", href: "/assets/Leon_s_CV-20.pdf", external: true },
];


// ===========================
// Publications
// ===========================
export const publications = [
  {
    id: 1,
    authors: "Xinle Deng, Yida Xue, Yijun Chen, Mingjun Mao, Ruobin Zhong, Buqiang Xu, Jizhan Fang, Haoming Xu, Tingwei Wu, Yajing Xu, Shumin Deng, Haofen Wang, Huajun Chen, Ningyu Zhang†",
    title: "MobileMem: Evaluating Long-Horizon Memory for Language Agents in Real-World Mobile Environments",
    venue: "ICLR 2026 Workshop LLA",
    year: 2026,
  },
  {
    id: 2,
    authors: "Xin Dai*, Buqiang Xu*, Zhenghao Liu†, Yukun Yan, Huiyuan Xie, Xiaoyuan Yi, Shuo Wang, Ge Yu",
    title: "LegalΔ: Enhancing Legal Reasoning in LLMs via Reinforcement Learning with Chain-of-Thought Guided Information Gain",
    venue: "ICASSP 2026 [CCF-B]",
    year: 2026,
    githubStars: "https://img.shields.io/github/stars/NEUIR/LegalDelta?style=flat",
    links: [
      { text: "Paper", url: "https://arxiv.org/abs/2508.12281" },
      { text: "Code", url: "https://github.com/NEUIR/LegalDelta" },
    ],
  },
  {
    id: 3,
    authors: "Buqiang Xu*, Xin Dai*, Zhenghao Liu†, Huiyuan Xie, Xiaoyuan Yi, Shuo Wang, Yukun Yan, Liner Yang, Yu Gu, Ge Yu",
    title: "LegalDuet: Learning Fine-grained Representations for Legal Judgment Prediction via a Dual-View Contrastive Learning",
    venue: "ADMA 2025 [CCF-C] Best Paper Award",
    year: 2025,
    githubStars: "https://img.shields.io/github/stars/NEUIR/LegalDuet?style=flat",
    links: [
      { text: "Paper", url: "https://arxiv.org/abs/2401.15371" },
      { text: "Code", url: "https://github.com/NEUIR/LegalDuet" },
    ],
  },
];

// ===========================
// Research Experiences
// ===========================
export const researchExperiences = [
  {
    id: 1,
    title: "Zhejiang University – Research Assistant (Zjunlp Lab)",
    period: "Advisor: Prof. Ningyu Zhang",
    advisorLinks: [
      { name: "Prof. Ningyu Zhang", url: "https://person.zju.edu.cn/ningyu" }
    ],
    location: "Hangzhou, China",
    duration: "June 2025 – Present"
  },
  {
    id: 2,
    title: "Northeastern University – Research Assistant (NEUIR Lab)",
    period: "Advisor: Prof. Zhenghao Liu",
    advisorLinks: [
      { name: "Prof. Zhenghao Liu", url: "http://faculty.neu.edu.cn/liuzhenghao/zh_CN/index.htm" }
    ],
    location: "Shenyang, China",
    duration: "June 2024 – September 2025"
  },
];

// ===========================
// Industry Experiences
// ===========================
// export const industryExperiences = [
//   {
//     id: 1,
//     title: "Horizon Robotics – Cloud Platform Intern",
//     period: "Mentor: Yusen Qin (VP of Technology, D-Robotics)",
//     mentorLink: "https://www.linkedin.com/in/yusen-qin-5b23345b/?originalSubdomain=cn",
//     location: "Beijing, China",
//     duration: "June 2025 – Present"
//   },
// ];

// ===========================
// Talks
// ===========================
// export const talks = [
//   {
//     id: 1,
//     date: "2024.08",
//     title: "Retrieval-Augmented Generation Modeling",
//     event: "Mingtong Weilai (Beijing) Digital Health Science & Technology Research Institute",
//     location: ""
//   },
// ];

// ===========================
// Academic Service
// ===========================
// export const academicService = [
//   {
//     id: 1,
//     role: "Co-Founder of VapourX",
//     description: "an open community for embodied AI beginners, enthusiasts, and researchers.",
//     descriptionLink: "https://vapour-x.cn",
//     linkText: "VapourX"
//   },
//   {
//     id: 2,
//     role: "Student Committee",
//     description: "of TriFusion Workshop @ SIGGRAPH Asia 2025 — Towards Embodied Intelligence Across Humans, Avatars, and Humanoid Robotics (responsible for workshop email communications).",
//     descriptionLink: "https://sa2025.siggraph.org/"
//   },
//   {
//     id: 3,
//     role: "Contributor",
//     description: "of Embodied-AI-Guide GitHub repo.",
//     descriptionLink: "https://github.com/TianxingChen/Embodied-AI-Guide",
//     githubBadge: "https://img.shields.io/github/stars/TianxingChen/Embodied-AI-Guide",
//     linkText: "Embodied-AI-Guide"
//   },
//   {
//     id: 4,
//     role: "Reviewer",
//     description: "for CHI 2025, Chinese CHI 2024."
//   },
// ];

// ===========================
// Awards
// ===========================
export const awards = [
  {
    id: 1,
    year: "2025.10",
    title: "Best Paper Award at ADMA 2025, Kyoto, Japan"
  },
  {
    id: 2,
    year: "2024.04",
    title: "Second Prize, National College Students' Mathematics Competition Finals"
  },
];

// ===========================
// Projects
// ===========================
export const projects = [
  {
    id: 1,
    title: "LightMem: Lightweight and Efficient Memory-Augmented Generation",
    description: "Our core framework for long-term memory in LLMs. It focuses on efficient memory construction and integration, enabling agents to handle long-horizon tasks with minimal overhead. (Accepted to ICLR 2026)",
    githubStars: "https://img.shields.io/github/stars/zjunlp/LightMem?style=flat",
    link: "https://github.com/zjunlp/LightMem"
  },
  {
    id: 2,
    title: "EasyEdit: An Easy-to-use Knowledge Editing Framework for LLMs",
    description: "A comprehensive and modular framework for editing knowledge in Large Language Models. It supports various state-of-the-art editing algorithms, helping models stay up-to-date and factual.",
    githubStars: "https://img.shields.io/github/stars/zjunlp/EasyEdit?style=flat",
    link: "https://github.com/zjunlp/EasyEdit"
  },
  {
    id: 3,
    title: "LegalΔ: Enhancing Legal Reasoning in LLMs via Reinforcement Learning with Chain-of-Thought Guided Information Gain",
    description: "Enhancing the reasoning capabilities of LLMs in specialized domains using Reinforcement Learning with Chain-of-Thought guided information gain. (ICASSP 2026)",
    githubStars: "https://img.shields.io/github/stars/NEUIR/LegalDelta?style=flat",
    link: "https://github.com/NEUIR/LegalDelta"
  },
  {
    id: 4,
    title: "LegalDuet: Learning Fine-grained Representations for Legal Judgment Prediction via a Dual-View Contrastive Learning",
    description: "A representation learning method for Legal Judgment Prediction. This work was recognized with the Best Paper Award at ADMA 2025.",
    githubStars: "https://img.shields.io/github/stars/NEUIR/LegalDuet?style=flat",
    link: "https://github.com/NEUIR/LegalDuet"
  }
];

// ===========================
// Technologies / Skills
// ===========================
export const technologies = {
  languages: "Python, C++, C, HTML/CSS, JavaScript, Swift, SQL, MATLAB/Simulink, LaTeX",
  technologies: "PyTorch, Hugging Face, scikit-learn, NumPy, Git, Linux, Docker, VSCode, Jupyter, MATLAB, SolidWorks",
};

// ===========================
// Theme Configuration
// ===========================
export const themeConfig = {
  colors: {
    primary: "blue-900",
    secondary: "blue-800",
    accent: "blue-700",
    text: "gray-900",
    textLight: "gray-700",
    background: "gray-50",
    backgroundDark: "gray-900",
  },
  fonts: {
    sans: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    mono: "'Courier New', Courier, monospace",
  },
};

// ===========================
// Site Metadata
// ===========================
export const siteMetadata = {
  lastUpdated: "2026-02-01", // 网站最后更新日期，格式：YYYY-MM-DD
};
