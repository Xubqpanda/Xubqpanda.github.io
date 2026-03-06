import { useState, useEffect, useCallback, CSSProperties } from "react";
import {
  extractRepoFromShieldsUrl,
  fetchStarCount,
  getStarTier,
  formatStarCount,
  ParticleType,
  StarTier,
} from "@/lib/starTier";

// ─────────────────────────────────────────
// Keyframe CSS（全局注入一次）
// ─────────────────────────────────────────
const KEYFRAMES = `
  @keyframes sb-snow    { 0%{opacity:.7;transform:translate(0,0) rotate(0deg)} 100%{opacity:0;transform:translate(var(--dx),-36px) rotate(180deg)} }
  @keyframes sb-bubble  { 0%{opacity:.8;transform:translateY(0) scaleX(1)} 50%{transform:translateY(-18px) scaleX(1.15)} 100%{opacity:0;transform:translateY(-40px) scaleX(.8)} }
  @keyframes sb-rain    { 0%{opacity:.9;transform:translateY(-8px)} 100%{opacity:0;transform:translateY(50px) scaleY(.4)} }
  @keyframes sb-orbit   { 0%{opacity:.85;transform:rotate(var(--start-deg)) translateX(var(--r)) scale(1)} 50%{opacity:1} 100%{opacity:0;transform:rotate(calc(var(--start-deg) + 360deg)) translateX(var(--r)) scale(.3)} }
  @keyframes sb-spark   { 0%{opacity:1;transform:translate(0,0) scale(1.2)} 100%{opacity:0;transform:translate(var(--sx),var(--sy)) scale(0)} }
  @keyframes sb-flame   { 0%{opacity:.9;transform:translate(0,0) scaleX(1)} 30%{transform:translate(var(--fx),-14px) scaleX(1.3)} 60%{transform:translate(calc(var(--fx)*-0.6),-26px) scaleX(.8)} 100%{opacity:0;transform:translate(0,-46px) scaleX(.4)} }
  @keyframes sb-confetti{ 0%{opacity:1;transform:translate(0,0) rotate(0deg) scale(1)} 100%{opacity:0;transform:translate(var(--cx),var(--cy)) rotate(var(--cr)) scale(.2)} }
  @keyframes sb-shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
`;

function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById("star-badge-kf")) return;
  const el = document.createElement("style");
  el.id = "star-badge-kf";
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

// ─────────────────────────────────────────
// Particle data types
// ─────────────────────────────────────────
interface BaseParticle {
  id: number;
  delay: string;
  dur: string;
  size: number;
  color?: string;
}
interface SnowParticle    extends BaseParticle { dx: string; x: number; y: number }
interface BubbleParticle  extends BaseParticle { x: number; y: number }
interface RainParticle    extends BaseParticle { h: number; x: number; y: number }
interface OrbitParticle   extends BaseParticle { sd: string; r: string }
interface SparkParticle   extends BaseParticle { sx: string; sy: string }
interface FlameParticle   extends BaseParticle { fx: string; x: number; y: number }
interface ConfettiParticle extends BaseParticle { cx: string; cy: string; cr: string }

type AnyParticle =
  | SnowParticle | BubbleParticle | RainParticle | OrbitParticle
  | SparkParticle | FlameParticle | ConfettiParticle;

// ─────────────────────────────────────────
// Particle generator
// ─────────────────────────────────────────
function rnd(a: number, b: number): number { return Math.random() * (b - a) + a; }

function makeParticles(type: ParticleType, _color: string): AnyParticle[] {
  const CONFETTI_COLORS = ["#fbbf24","#f87171","#c084fc","#60a5fa","#4ade80","#fb923c"];
  const n = type === "confetti" ? 16 : type === "orbit" ? 8 : 12;

  return Array.from({ length: n }, (_, i): AnyParticle => {
    const base = {
      id: i,
      delay: `${rnd(0, 0.45).toFixed(2)}s`,
      dur: `${rnd(0.6, 1.4).toFixed(2)}s`,
      size: 0,
    };
    if (type === "snow")
      return { ...base, size: rnd(2,4), dx: `${rnd(-20,20).toFixed(1)}px`, x: rnd(10,90), y: rnd(55,85) } as SnowParticle;
    if (type === "bubble")
      return { ...base, size: rnd(3,7), x: rnd(15,85), y: rnd(50,82) } as BubbleParticle;
    if (type === "rain")
      return { ...base, size: rnd(1.5,2.5), h: rnd(8,16), x: rnd(10,90), y: rnd(5,30) } as RainParticle;
    if (type === "orbit") {
      const deg = (360 / n) * i;
      return { ...base, size: rnd(2.5,4.5), sd: `${deg}deg`, r: `${rnd(24,38).toFixed(1)}px` } as OrbitParticle;
    }
    if (type === "spark") {
      const a = rnd(0,360) * (Math.PI/180), d = rnd(25,52);
      return { ...base, size: rnd(2,4), sx: `${(Math.cos(a)*d).toFixed(1)}px`, sy: `${(Math.sin(a)*d).toFixed(1)}px` } as SparkParticle;
    }
    if (type === "flame")
      return { ...base, size: rnd(3,7), fx: `${rnd(-10,10).toFixed(1)}px`, x: rnd(20,80), y: rnd(55,82) } as FlameParticle;
    // confetti
    const a = rnd(0,360)*(Math.PI/180), d = rnd(28,58);
    return {
      ...base, size: rnd(3,6),
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      cx: `${(Math.cos(a)*d).toFixed(1)}px`,
      cy: `${(Math.sin(a)*d).toFixed(1)}px`,
      cr: `${rnd(-270,270).toFixed(0)}deg`,
    } as ConfettiParticle;
  });
}

// ─────────────────────────────────────────
// Particle renderer
// ─────────────────────────────────────────
interface ParticleProps { type: ParticleType; p: AnyParticle; color: string }

function Particle({ type, p, color }: ParticleProps) {
  const c = p.color ?? color;
  const base: CSSProperties = {
    position: "absolute",
    borderRadius: type === "rain" ? "2px" : "50%",
    pointerEvents: "none",
    background: c,
    boxShadow: type === "confetti" ? "none" : `0 0 ${p.size * 2}px ${c}`,
    animationFillMode: "forwards",
    width: p.size,
    height: p.size,
    opacity: 0,
  };

  if (type === "snow") {
    const sp = p as SnowParticle;
    return <div style={{ ...base, left: `${sp.x}%`, top: `${sp.y}%`, "--dx": sp.dx, animation: `sb-snow ${p.dur} ease-out ${p.delay} forwards` } as CSSProperties} />;
  }
  if (type === "bubble") {
    const bp = p as BubbleParticle;
    return <div style={{ ...base, left: `${bp.x}%`, top: `${bp.y}%`, animation: `sb-bubble ${p.dur} ease-out ${p.delay} forwards` }} />;
  }
  if (type === "rain") {
    const rp = p as RainParticle;
    return <div style={{ ...base, height: rp.h, borderRadius: "1px", left: `${rp.x}%`, top: `${rp.y}%`, animation: `sb-rain ${p.dur} linear ${p.delay} forwards` }} />;
  }
  if (type === "orbit") {
    const op = p as OrbitParticle;
    return <div style={{ ...base, left: "50%", top: "50%", marginLeft: -p.size/2, marginTop: -p.size/2, "--start-deg": op.sd, "--r": op.r, animation: `sb-orbit ${p.dur} linear ${p.delay} forwards`, transformOrigin: "0 0" } as CSSProperties} />;
  }
  if (type === "spark") {
    const sp = p as SparkParticle;
    return <div style={{ ...base, left: "50%", top: "50%", "--sx": sp.sx, "--sy": sp.sy, animation: `sb-spark ${p.dur} ease-out ${p.delay} forwards` } as CSSProperties} />;
  }
  if (type === "flame") {
    const fp = p as FlameParticle;
    return <div style={{ ...base, height: p.size*1.4, borderRadius: "50% 50% 40% 40%", left: `${fp.x}%`, top: `${fp.y}%`, "--fx": fp.fx, animation: `sb-flame ${p.dur} ease-out ${p.delay} forwards` } as CSSProperties} />;
  }
  // confetti
  const cp = p as ConfettiParticle;
  return <div style={{ ...base, borderRadius: "2px", left: "50%", top: "50%", "--cx": cp.cx, "--cy": cp.cy, "--cr": cp.cr, animation: `sb-confetti ${p.dur} ease-out ${p.delay} forwards` } as CSSProperties} />;
}

// ─────────────────────────────────────────
// Main component
// ─────────────────────────────────────────
interface StarBadgeProps {
  shieldsUrl: string;
  repoLink?: string;
  githubToken?: string;
}

export default function StarBadge({ shieldsUrl, repoLink, githubToken }: StarBadgeProps) {
  const [starCount, setStarCount] = useState<number | null>(null);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);
  const [hovered, setHovered]     = useState(false);
  const [particles, setParticles] = useState<AnyParticle[]>([]);

  useEffect(() => { injectKeyframes(); }, []);

  useEffect(() => {
    const repo = extractRepoFromShieldsUrl(shieldsUrl);
    if (!repo) { setError(true); setLoading(false); return; }
    fetchStarCount(repo, githubToken)
      .then((n) => { setStarCount(n); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [shieldsUrl, githubToken]);

  const tier: StarTier | null = starCount !== null ? getStarTier(starCount) : null;

  const handleEnter = useCallback(() => {
    if (!tier) return;
    setHovered(true);
    setParticles(makeParticles(tier.particleType, tier.color));
  }, [tier]);

  const handleLeave = useCallback(() => {
    setHovered(false);
    setParticles([]);
  }, []);

  // ── Loading state
  if (loading) {
    return (
      <span className="inline-flex items-center gap-1 opacity-40 text-xs text-gray-400">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        <span>...</span>
      </span>
    );
  }

  // ── Error / fallback to shields.io img
  if (error || starCount === null || !tier) {
    return (
      <img src={shieldsUrl} alt="GitHub stars" className="h-5 align-middle" />
    );
  }

  const isGold = tier.particleType === "confetti";
  const Wrapper = repoLink ? "a" : "span";
  const linkProps = repoLink
    ? { href: repoLink, target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  const wrapperStyle: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    gap: 5,
    padding: "3px 10px",
    borderRadius: 999,
    background: hovered ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.06)",
    border: `1px solid ${hovered ? tier.color : "rgba(255,255,255,0.15)"}`,
    boxShadow: hovered ? `0 0 10px ${tier.glow}, 0 0 20px ${tier.glow}` : "none",
    cursor: repoLink ? "pointer" : "default",
    textDecoration: "none",
    transition: "all 0.28s cubic-bezier(0.34,1.56,0.64,1)",
    transform: hovered ? "scale(1.08)" : "scale(1)",
    overflow: "visible",
    userSelect: "none",
  };

  return (
    <Wrapper {...linkProps} onMouseEnter={handleEnter} onMouseLeave={handleLeave} style={wrapperStyle}>
      {/* gold shimmer */}
      {isGold && hovered && (
        <div style={{
          position: "absolute", inset: 0, borderRadius: 999, pointerEvents: "none",
          background: "linear-gradient(90deg,transparent 0%,rgba(251,191,36,0.35) 50%,transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "sb-shimmer 1.1s linear infinite",
        }} />
      )}

      {/* particles */}
      {hovered && particles.map((p) => (
        <Particle key={p.id} type={tier.particleType} p={p} color={tier.color} />
      ))}

      {/* star icon */}
      <svg
        width="12" height="12" viewBox="0 0 24 24"
        fill={hovered ? tier.color : "rgba(150,150,150,0.8)"}
        style={{
          transition: "fill 0.25s",
          filter: hovered ? `drop-shadow(0 0 3px ${tier.color})` : "none",
          flexShrink: 0,
        }}
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>

      {/* count */}
      <span style={{
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "'Courier New', monospace",
        color: hovered ? tier.color : "rgba(150,150,150,0.9)",
        transition: "color 0.25s",
        letterSpacing: "0.03em",
        lineHeight: 1,
      }}>
        {formatStarCount(starCount)}
      </span>
    </Wrapper>
  );
}