// ============================================================
// starTier.ts — GitHub Star 等级工具函数（TypeScript 版）
// ============================================================
const CACHE_TTL = 60 * 60 * 1000; // 1小时

export type ParticleType =
  | "snow"
  | "bubble"
  | "rain"
  | "orbit"
  | "spark"
  | "flame"
  | "confetti";

export interface StarTier {
  min: number;
  max: number;
  label: string;
  color: string;
  glow: string;
  bg: string;
  border: string;
  particleType: ParticleType;
}

export const STAR_TIERS: StarTier[] = [
  {
    min: 0, max: 10,
    label: "Newcomer",
    color: "#e2e8f0", glow: "rgba(226,232,240,0.4)",
    bg: "rgba(226,232,240,0.07)", border: "rgba(226,232,240,0.25)",
    particleType: "snow",
  },
  {
    min: 10, max: 100,
    label: "Growing",
    color: "#4ade80", glow: "rgba(74,222,128,0.5)",
    bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.35)",
    particleType: "bubble",
  },
  {
    min: 100, max: 1000,
    label: "Notable",
    color: "#60a5fa", glow: "rgba(96,165,250,0.5)",
    bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.35)",
    particleType: "rain",
  },
  {
    min: 1000, max: 10000,
    label: "Popular",
    color: "#c084fc", glow: "rgba(192,132,252,0.6)",
    bg: "rgba(192,132,252,0.08)", border: "rgba(192,132,252,0.4)",
    particleType: "orbit",
  },
  {
    min: 10000, max: 100000,
    label: "Trending",
    color: "#fb923c", glow: "rgba(251,146,60,0.65)",
    bg: "rgba(251,146,60,0.08)", border: "rgba(251,146,60,0.4)",
    particleType: "spark",
  },
  {
    min: 100000, max: 1000000,
    label: "Legendary",
    color: "#f87171", glow: "rgba(248,113,113,0.7)",
    bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.45)",
    particleType: "flame",
  },
  {
    min: 1000000, max: Infinity,
    label: "Hall of Fame",
    color: "#fbbf24", glow: "rgba(251,191,36,0.8)",
    bg: "rgba(251,191,36,0.10)", border: "rgba(251,191,36,0.5)",
    particleType: "confetti",
  },
];

/** 从 shields.io URL 提取 owner/repo */
export function extractRepoFromShieldsUrl(shieldsUrl: string): string | null {
  const match = shieldsUrl.match(/img\.shields\.io\/github\/stars\/([^?#]+)/);
  return match?.[1] ?? null;
}

/** 调用 GitHub API 获取 star 数 */
export async function fetchStarCount(repo: string, token?: string): Promise<number> {
  const cacheKey = `star_cache_${repo}`;

  // 1. 读新鲜缓存
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { count, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) return count;
    }
  } catch {}

  // 2. 调 API
  try {
    const headers: HeadersInit = { Accept: "application/vnd.github+json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`https://api.github.com/repos/${repo}`, { headers });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = (await res.json()) as { stargazers_count?: number };
    const count = data.stargazers_count ?? 0;
    localStorage.setItem(cacheKey, JSON.stringify({ count, timestamp: Date.now() }));
    return count;
  } catch {
    // 3. API 失败 → 回退到过期的旧缓存
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { count } = JSON.parse(cached);
        return count;
      }
    } catch {}
    throw new Error("no data");
  }
}

/** 根据 star 数返回对应等级 */
export function getStarTier(starCount: number): StarTier {
  return (
    STAR_TIERS.find((t) => starCount >= t.min && starCount < t.max) ??
    STAR_TIERS[0]
  );
}

/** 格式化显示：1234 → "1.2k"，1200000 → "1.2M" */
export function formatStarCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "k";
  return String(n);
}