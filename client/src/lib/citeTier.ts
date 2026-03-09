// ============================================================
// citeTier.ts — Citation 等级工具函数
// ============================================================
const CITE_CACHE_TTL = 60 * 60 * 1000;
export type CitationParticleType =
  | "snow" | "drift" | "bubble" | "rain" | "ripple"
  | "orbit" | "crystal" | "spark" | "flame" | "confetti";

export interface CiteTier {
  min: number;
  max: number;
  label: string;
  solid: string | null;
  gradient: [string, string] | null;
  glow: string;
  particleType: CitationParticleType;
  desc: string;
}

export const CITE_TIERS: CiteTier[] = [
  { min: 0,    max: 2,    label: "First Cite",  solid: "#cbd5e1", gradient: null,                     glow: "rgba(203,213,225,0.4)",  particleType: "snow",     desc: "从零出发" },
  { min: 2,    max: 5,    label: "Sprouting",   solid: null,      gradient: ["#86efac", "#34d399"],   glow: "rgba(52,211,153,0.45)",  particleType: "drift",    desc: "有人在读你" },
  { min: 5,    max: 10,   label: "Noticed",     solid: "#4ade80", gradient: null,                     glow: "rgba(74,222,128,0.5)",   particleType: "bubble",   desc: "开始被引用" },
  { min: 10,   max: 20,   label: "Growing",     solid: null,      gradient: ["#4ade80", "#38bdf8"],   glow: "rgba(56,189,248,0.5)",   particleType: "rain",     desc: "稳定增长中" },
  { min: 20,   max: 50,   label: "Established", solid: "#60a5fa", gradient: null,                     glow: "rgba(96,165,250,0.55)",  particleType: "ripple",   desc: "领域内有声量" },
  { min: 50,   max: 100,  label: "Recognized",  solid: null,      gradient: ["#60a5fa", "#c084fc"],   glow: "rgba(192,132,252,0.55)", particleType: "orbit",    desc: "被同行认可" },
  { min: 100,  max: 200,  label: "Influential", solid: "#c084fc", gradient: null,                     glow: "rgba(192,132,252,0.65)", particleType: "crystal",  desc: "有影响力的工作" },
  { min: 200,  max: 500,  label: "Rising Star", solid: null,      gradient: ["#c084fc", "#fb923c"],   glow: "rgba(251,146,60,0.6)",   particleType: "spark",    desc: "新星冉冉升起" },
  { min: 500,  max: 1000, label: "Landmark",    solid: null,      gradient: ["#fb923c", "#f87171"],   glow: "rgba(248,113,113,0.65)", particleType: "flame",    desc: "里程碑式工作" },
  { min: 1000, max: Infinity, label: "Hall of Fame", solid: "#fbbf24", gradient: null,               glow: "rgba(251,191,36,0.8)",   particleType: "confetti", desc: "封神，载入史册" },
];

/** 根据引用数返回对应等级 */
export function getCiteTier(citeCount: number): CiteTier {
  return CITE_TIERS.find((t) => citeCount >= t.min && citeCount < t.max) ?? CITE_TIERS[0];
}

/** 取等级主色（solid 优先，gradient 备用） */
export function primaryColor(tier: CiteTier): string {
  return tier.solid ?? (tier.gradient as [string, string])[0];
}

/** 取等级副色（gradient 第二色，solid 则同主色） */
export function secondaryColor(tier: CiteTier): string {
  return tier.gradient ? tier.gradient[1] : (tier.solid as string);
}

/** 格式化引用数：1234 → "1.2k" */
export function formatCiteCount(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return String(n);
}

/**
 * 通过 Semantic Scholar API 获取引用数
 * 接受 arXiv ID，例如 "2508.12281"
 */
export async function fetchCiteCount(arxivId: string): Promise<number> {
  const cacheKey = `cite_cache_${arxivId}`;
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { count, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CITE_CACHE_TTL) return count;
    }
  } catch {}

  const res = await fetch(
    `https://api.semanticscholar.org/graph/v1/paper/arXiv:${arxivId}?fields=citationCount`,
    { headers: { Accept: "application/json" } }
  );
  if (!res.ok) throw new Error(`Semantic Scholar API ${res.status}`);
  const data = (await res.json()) as { citationCount?: number };
  const count = data.citationCount ?? 0;

  try {
    localStorage.setItem(cacheKey, JSON.stringify({ count, timestamp: Date.now() }));
  } catch {}

  return count;
}

/**
 * 取最终引用数：Semantic Scholar 和 minCiteCount 取较大值
 * minCiteCount 来自 siteConfig，保证不低于 Google Scholar 已知值
 */
export async function resolvedCiteCount(
  arxivId: string | undefined,
  minCiteCount: number = 0
): Promise<number> {
  if (!arxivId) return minCiteCount;
  try {
    const remote = await fetchCiteCount(arxivId);
    return Math.max(remote, minCiteCount);
  } catch {
    // API 失败时降级到手动值
    return minCiteCount;
  }
}