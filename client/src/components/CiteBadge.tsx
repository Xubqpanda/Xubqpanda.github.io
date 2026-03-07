import { useState, useEffect, useCallback, CSSProperties } from "react";
import {
  resolvedCiteCount,
  getCiteTier,
  formatCiteCount,
  primaryColor,
  secondaryColor,
  CiteTier,
  CitationParticleType,
} from "@/lib/citeTier";

// ─────────────────────────────────────────
// Keyframes（全局注入一次）
// ─────────────────────────────────────────
const KEYFRAMES = `
  @keyframes cb-snow     { 0%{opacity:.7;transform:translate(0,0) rotate(0deg)} 100%{opacity:0;transform:translate(var(--dx),-36px) rotate(180deg)} }
  @keyframes cb-drift    { 0%{opacity:.6;transform:translate(0,0) scale(1)} 50%{transform:translate(var(--mx),calc(var(--my)*0.5)) scale(1.2)} 100%{opacity:0;transform:translate(calc(var(--mx)*1.6),var(--my)) scale(0.3)} }
  @keyframes cb-bubble   { 0%{opacity:.8;transform:translateY(0) scaleX(1)} 50%{transform:translateY(-18px) scaleX(1.15)} 100%{opacity:0;transform:translateY(-40px) scaleX(.8)} }
  @keyframes cb-rain     { 0%{opacity:.9;transform:translateY(-8px)} 100%{opacity:0;transform:translateY(50px) scaleY(.4)} }
  @keyframes cb-ripple   { 0%{opacity:.8;transform:translate(var(--rx),var(--ry)) scale(0.4)} 100%{opacity:0;transform:translate(var(--rx),var(--ry)) scale(2.5)} }
  @keyframes cb-orbit    { 0%{opacity:.85;transform:rotate(var(--sd)) translateX(var(--r)) scale(1)} 50%{opacity:1} 100%{opacity:0;transform:rotate(calc(var(--sd) + 360deg)) translateX(var(--r)) scale(.3)} }
  @keyframes cb-crystal  { 0%{opacity:.9;transform:translate(0,0) rotate(0deg) scale(1)} 100%{opacity:0;transform:translate(var(--cx),var(--cy)) rotate(var(--cr)) scale(0)} }
  @keyframes cb-spark    { 0%{opacity:1;transform:translate(0,0) scale(1.2)} 100%{opacity:0;transform:translate(var(--sx),var(--sy)) scale(0)} }
  @keyframes cb-flame    { 0%{opacity:.9;transform:translate(0,0) scaleX(1)} 30%{transform:translate(var(--fx),-14px) scaleX(1.3)} 60%{transform:translate(calc(var(--fx)*-.6),-26px) scaleX(.8)} 100%{opacity:0;transform:translate(0,-46px) scaleX(.4)} }
  @keyframes cb-confetti { 0%{opacity:1;transform:translate(0,0) rotate(0deg) scale(1)} 100%{opacity:0;transform:translate(var(--gx),var(--gy)) rotate(var(--gr)) scale(.2)} }
  @keyframes cb-shimmer  { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
  @keyframes cb-idle-pulse { 0%,100%{opacity:1} 50%{box-shadow:0 0 5px var(--tier-glow)} }
`;

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("cite-badge-kf")) return;
  const el = document.createElement("style");
  el.id = "cite-badge-kf";
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

// ─────────────────────────────────────────
// Particle types
// ─────────────────────────────────────────
interface BaseParticle { id: number; delay: string; dur: string; size: number; color?: string }
interface SnowParticle     extends BaseParticle { dx: string; x: number; y: number }
interface DriftParticle    extends BaseParticle { mx: string; my: string; x: number; y: number }
interface BubbleParticle   extends BaseParticle { x: number; y: number }
interface RainParticle     extends BaseParticle { h: number; x: number; y: number }
interface RippleParticle   extends BaseParticle { rx: string; ry: string }
interface OrbitParticle    extends BaseParticle { sd: string; r: string }
interface CrystalParticle  extends BaseParticle { cx: string; cy: string; cr: string }
interface SparkParticle    extends BaseParticle { sx: string; sy: string }
interface FlameParticle    extends BaseParticle { fx: string; x: number; y: number }
interface ConfettiParticle extends BaseParticle { gx: string; gy: string; gr: string }

type AnyParticle =
  | SnowParticle | DriftParticle | BubbleParticle | RainParticle
  | RippleParticle | OrbitParticle | CrystalParticle | SparkParticle
  | FlameParticle | ConfettiParticle;

function rnd(a: number, b: number) { return Math.random() * (b - a) + a; }

function makeParticles(tier: CiteTier): AnyParticle[] {
  const CC = ["#fbbf24","#f87171","#c084fc","#60a5fa","#4ade80","#fb923c"];
  const c1 = primaryColor(tier);
  const type = tier.particleType;
  const n = type === "confetti" ? 16 : type === "orbit" || type === "crystal" ? 8 : 12;

  return Array.from({ length: n }, (_, i): AnyParticle => {
    const base = { id: i, delay: `${rnd(0,.45).toFixed(2)}s`, dur: `${rnd(.6,1.4).toFixed(2)}s`, size: 0, color: c1 };
    if (type === "snow")    return { ...base, size: rnd(2,4),    dx:`${rnd(-20,20).toFixed(1)}px`, x:rnd(10,90), y:rnd(55,85) } as SnowParticle;
    if (type === "drift")   return { ...base, size: rnd(2,5),    mx:`${rnd(-24,24).toFixed(1)}px`, my:`${rnd(-30,-10).toFixed(1)}px`, x:rnd(15,85), y:rnd(50,80) } as DriftParticle;
    if (type === "bubble")  return { ...base, size: rnd(3,7),    x:rnd(15,85), y:rnd(50,82) } as BubbleParticle;
    if (type === "rain")    return { ...base, size: rnd(1.5,2.5),h:rnd(8,16), x:rnd(10,90), y:rnd(5,30) } as RainParticle;
    if (type === "ripple")  return { ...base, size: rnd(6,14),   rx:`${rnd(-30,30).toFixed(1)}px`, ry:`${rnd(-25,25).toFixed(1)}px` } as RippleParticle;
    if (type === "orbit")   { const deg=(360/n)*i; return { ...base, size:rnd(2.5,4.5), sd:`${deg}deg`, r:`${rnd(24,38).toFixed(1)}px` } as OrbitParticle; }
    if (type === "crystal") { const a=(360/n)*i*(Math.PI/180),d=rnd(20,38); return { ...base, size:rnd(3,6), cx:`${(Math.cos(a)*d).toFixed(1)}px`, cy:`${(Math.sin(a)*d).toFixed(1)}px`, cr:`${rnd(-180,180).toFixed(0)}deg` } as CrystalParticle; }
    if (type === "spark")   { const a=rnd(0,360)*(Math.PI/180),d=rnd(25,52); return { ...base, size:rnd(2,4), sx:`${(Math.cos(a)*d).toFixed(1)}px`, sy:`${(Math.sin(a)*d).toFixed(1)}px` } as SparkParticle; }
    if (type === "flame")   return { ...base, size: rnd(3,7),    fx:`${rnd(-10,10).toFixed(1)}px`, x:rnd(20,80), y:rnd(55,82) } as FlameParticle;
    const a=rnd(0,360)*(Math.PI/180),d=rnd(28,58);
    return { ...base, size:rnd(3,6), color:CC[i%CC.length], gx:`${(Math.cos(a)*d).toFixed(1)}px`, gy:`${(Math.sin(a)*d).toFixed(1)}px`, gr:`${rnd(-270,270).toFixed(0)}deg` } as ConfettiParticle;
  });
}

// ─────────────────────────────────────────
// Particle renderer
// ─────────────────────────────────────────
function Particle({ type, p }: { type: CitationParticleType; p: AnyParticle }) {
  const c = p.color ?? "#aaa";
  const sh = type === "confetti" ? "none" : `0 0 ${p.size * 2}px ${c}`;
  const base: CSSProperties = { position:"absolute", borderRadius:type==="rain"?"1px":"50%", pointerEvents:"none", background:c, boxShadow:sh, animationFillMode:"forwards", width:p.size, height:p.size, opacity:0 };

  if (type === "snow")    { const sp = p as SnowParticle;    return <div style={{...base,left:`${sp.x}%`,top:`${sp.y}%`,"--dx":sp.dx,animation:`cb-snow ${p.dur} ease-out ${p.delay} forwards`} as CSSProperties}/>; }
  if (type === "drift")   { const dp = p as DriftParticle;   return <div style={{...base,left:`${dp.x}%`,top:`${dp.y}%`,"--mx":dp.mx,"--my":dp.my,animation:`cb-drift ${p.dur} ease-out ${p.delay} forwards`} as CSSProperties}/>; }
  if (type === "bubble")  { const bp = p as BubbleParticle;  return <div style={{...base,left:`${bp.x}%`,top:`${bp.y}%`,animation:`cb-bubble ${p.dur} ease-out ${p.delay} forwards`}}/>; }
  if (type === "rain")    { const rp = p as RainParticle;    return <div style={{...base,height:rp.h,borderRadius:"1px",left:`${rp.x}%`,top:`${rp.y}%`,animation:`cb-rain ${p.dur} linear ${p.delay} forwards`}}/>; }
  if (type === "ripple")  { const rp = p as RippleParticle;  return <div style={{...base,borderRadius:"50%",left:"50%",top:"50%",marginLeft:-p.size/2,marginTop:-p.size/2,"--rx":rp.rx,"--ry":rp.ry,background:"transparent",border:`1.5px solid ${c}`,boxShadow:`0 0 6px ${c}`,animation:`cb-ripple ${p.dur} ease-out ${p.delay} forwards`} as CSSProperties}/>; }
  if (type === "orbit")   { const op = p as OrbitParticle;   return <div style={{...base,left:"50%",top:"50%",marginLeft:-p.size/2,marginTop:-p.size/2,"--sd":op.sd,"--r":op.r,animation:`cb-orbit ${p.dur} linear ${p.delay} forwards`,transformOrigin:"0 0"} as CSSProperties}/>; }
  if (type === "crystal") { const cp = p as CrystalParticle; return <div style={{...base,borderRadius:"2px",left:"50%",top:"50%","--cx":cp.cx,"--cy":cp.cy,"--cr":cp.cr,animation:`cb-crystal ${p.dur} ease-out ${p.delay} forwards`,clipPath:"polygon(50% 0%,100% 50%,50% 100%,0% 50%)"} as CSSProperties}/>; }
  if (type === "spark")   { const sp = p as SparkParticle;   return <div style={{...base,left:"50%",top:"50%","--sx":sp.sx,"--sy":sp.sy,animation:`cb-spark ${p.dur} ease-out ${p.delay} forwards`} as CSSProperties}/>; }
  if (type === "flame")   { const fp = p as FlameParticle;   return <div style={{...base,height:p.size*1.4,borderRadius:"50% 50% 40% 40%",left:`${fp.x}%`,top:`${fp.y}%`,"--fx":fp.fx,animation:`cb-flame ${p.dur} ease-out ${p.delay} forwards`} as CSSProperties}/>; }
  const cp = p as ConfettiParticle;
  return <div style={{...base,borderRadius:"2px",left:"50%",top:"50%","--gx":cp.gx,"--gy":cp.gy,"--gr":cp.gr,animation:`cb-confetti ${p.dur} ease-out ${p.delay} forwards`} as CSSProperties}/>;
}

// ─────────────────────────────────────────
// Main component
// ─────────────────────────────────────────
interface CiteBadgeProps {
  /** siteConfig 里的 arxivId，例如 "2508.12281"，没有则传 undefined */
  arxivId?: string;
  /** Google Scholar 上已知的引用数，作为下限保证不低于实际值 */
  minCiteCount?: number;
  /** 点击跳转的论文链接（可选） */
  paperLink?: string;
}

export default function CiteBadge({ arxivId, minCiteCount = 0, paperLink }: CiteBadgeProps) {
  const [citeCount, setCiteCount] = useState<number | null>(null);
  const [loading, setLoading]     = useState(true);
  const [hovered, setHovered]     = useState(false);
  const [particles, setParticles] = useState<AnyParticle[]>([]);

  useEffect(() => { injectKeyframes(); }, []);

  useEffect(() => {
    resolvedCiteCount(arxivId, minCiteCount)
      .then((n) => { setCiteCount(n); setLoading(false); })
      .catch(() => { setCiteCount(minCiteCount); setLoading(false); });
  }, [arxivId, minCiteCount]);

  const tier: CiteTier | null = citeCount !== null ? getCiteTier(citeCount) : null;

  const handleEnter = useCallback(() => {
    if (!tier) return;
    setHovered(true);
    setParticles(makeParticles(tier));
  }, [tier]);
  const handleLeave = useCallback(() => { setHovered(false); setParticles([]); }, []);

  // ── Loading
  if (loading) {
    return (
      <span className="inline-flex items-center gap-1 opacity-40 text-xs text-gray-400">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
        </svg>
        <span>...</span>
      </span>
    );
  }

  if (citeCount === null || !tier) return null;

  const isGold = tier.particleType === "confetti";
  const isGradient = tier.gradient !== null;
  const c1 = primaryColor(tier);
  const c2 = secondaryColor(tier);

  const Wrapper = paperLink ? "a" : "span";
  const linkProps = paperLink
    ? { href: paperLink, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  // ── shared inner content
  const inner = (
    <>
      {isGold && hovered && (
        <div style={{ position:"absolute", inset:0, borderRadius:999, pointerEvents:"none",
          background:"linear-gradient(90deg,transparent,rgba(251,191,36,0.3),transparent)",
          backgroundSize:"200% 100%", animation:"cb-shimmer 1.1s linear infinite" }}/>
      )}
      {hovered && particles.map((p) => (
        <Particle key={p.id} type={tier.particleType} p={p} />
      ))}

      {/* quote icon */}
      <svg width="11" height="11" viewBox="0 0 24 24"
        fill={hovered ? c1 : `${c1}99`}
        style={{ transition:"fill 0.25s", filter:hovered?`drop-shadow(0 0 3px ${c1})`:"none", flexShrink:0 }}
      >
        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
      </svg>

      {/* count */}
      <span style={{
        fontSize: 12, fontWeight: 700,
        fontFamily: "'Courier New', monospace",
        color: hovered ? c1 : `${c1}aa`,
        transition: "color 0.25s",
        letterSpacing: "0.03em", lineHeight: 1,
      }}>
        {formatCiteCount(citeCount)}
      </span>
    </>
  );

  // ── gradient tier：外层 div 做渐变边框
  if (isGradient) {
    const [g1, g2] = tier.gradient as [string, string];
    return (
      <Wrapper
        {...linkProps}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        style={{
          display: "inline-flex",
          padding: 1,
          borderRadius: 999,
          background: hovered
            ? `linear-gradient(90deg, ${g1}, ${g2})`
            : `linear-gradient(90deg, ${g1}55, ${g2}55)`,
          boxShadow: hovered ? `0 0 8px ${tier.glow}, 0 0 16px ${tier.glow}` : "none",
          cursor: paperLink ? "pointer" : "default",
          textDecoration: "none",
          transition: "background 0.28s, box-shadow 0.28s, transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          userSelect: "none",
        } as CSSProperties}
      >
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 10px", borderRadius: 999,
          background: hovered ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.95)",
          position: "relative", overflow: "visible",
        }}>
          {inner}
        </span>
      </Wrapper>
    );
  }

  // ── solid tier
  return (
    <Wrapper
      {...linkProps}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 999,
        background: hovered ? "rgba(0,0,0,0.5)" : `${c1}10`,
        border: `1px solid ${hovered ? c1 : `${c1}55`}`,
        boxShadow: hovered ? `0 0 8px ${tier.glow}, 0 0 16px ${tier.glow}` : "none",
        cursor: paperLink ? "pointer" : "default",
        textDecoration: "none",
        transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "scale(1.08)" : "scale(1)",
        overflow: "visible",
        userSelect: "none",
        "--tier-glow": tier.glow,
      } as CSSProperties}
    >
      {inner}
    </Wrapper>
  );
}

/*
──────────────────────────────────────────────────────
使用方式（在 MainContent.tsx 里替换原来 githubStars img）：

import CiteBadge from "@/components/CiteBadge";

{'arxivId' in pub && (
  <CiteBadge
    arxivId={pub.arxivId}
    minCiteCount={pub.minCiteCount ?? 0}
    paperLink={pub.links?.find(l => l.text === "Paper")?.url}
  />
)}

siteConfig.ts 里每篇论文加：
  arxivId: "2508.12281",      // arXiv URL 里的 ID
  minCiteCount: 3,            // Google Scholar 上看到的数，作为下限
──────────────────────────────────────────────────────
*/