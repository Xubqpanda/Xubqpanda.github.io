/**
 * Blog Configuration File
 * 
 * This file contains all the blog posts data.
 * Update this file to add new blog posts or modify existing ones.
 */

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  slug?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "My Journey into Embodied AI Research",
    excerpt: "Exploring the intersection of language grounding, multimodal reasoning, and robotics. This post discusses my research journey and the challenges I've encountered in building foundation models for embodied agents.",
    date: "2025-01-15",
    readTime: "5 min read",
    tags: ["Embodied AI", "Robotics"],
    slug: "journey-into-embodied-ai",
  },
  {
    id: 2,
    title: "Building Scalable Data Pipelines for Robotics",
    excerpt: "Lessons learned from developing real-time edge-to-cloud data pipelines at Horizon Robotics. This post covers the technical challenges and solutions for building scalable data infrastructure for autonomous vehicles.",
    date: "2024-12-20",
    readTime: "8 min read",
    tags: ["Data Engineering", "Robotics", "Cloud Computing"],
    slug: "scalable-data-pipelines-robotics",
  },
];

export const blogConfig = {
  title: "📝 Blog",
  description: "Thoughts, insights, and stories from my research and development journey.",
  comingSoonMessage: "More blog posts coming soon...",
};
