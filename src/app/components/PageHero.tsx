import { motion } from 'motion/react';

// ─── Props ────────────────────────────────────────────────────────────────────

export interface PageHeroProps {
  badge: string;
  badgeColor?: string;
  headline: string;
  headlineGradient?: string;
  subtext: string;
  variant: 'about' | 'services' | 'pillars' | 'contact';
}

// ─── Variant Config ───────────────────────────────────────────────────────────

const VARIANT_BG: Record<PageHeroProps['variant'], string> = {
  about:
    'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(0,212,255,0.08) 0%, transparent 70%)',
  services:
    'radial-gradient(ellipse 60% 80% at 80% 50%, rgba(123,47,255,0.10) 0%, transparent 70%)',
  pillars:
    'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(0,255,136,0.08) 0%, transparent 70%)',
  contact:
    'radial-gradient(ellipse 70% 70% at 50% 50%, rgba(123,47,255,0.12) 0%, rgba(0,212,255,0.06) 50%, transparent 70%)',
};

// ─── SVG Illustrations ────────────────────────────────────────────────────────

function AboutIllustration() {
  return (
    <svg
      viewBox="0 0 420 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Concentric rings */}
      {[40, 80, 120, 160, 200].map((r, i) => (
        <circle
          key={r}
          cx="210"
          cy="210"
          r={r}
          stroke="#00D4FF"
          strokeWidth="0.8"
          strokeOpacity={0.35 - i * 0.05}
          strokeDasharray={i % 2 === 0 ? '6 8' : 'none'}
        />
      ))}
      {/* Dots on rings */}
      {[
        { r: 80,  angle: 30 },
        { r: 80,  angle: 150 },
        { r: 80,  angle: 270 },
        { r: 120, angle: 60 },
        { r: 120, angle: 180 },
        { r: 120, angle: 300 },
        { r: 160, angle: 20 },
        { r: 160, angle: 110 },
        { r: 160, angle: 230 },
        { r: 160, angle: 330 },
        { r: 200, angle: 75 },
        { r: 200, angle: 165 },
        { r: 200, angle: 255 },
        { r: 200, angle: 345 },
      ].map(({ r, angle }, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 210 + r * Math.cos(rad);
        const cy = 210 + r * Math.sin(rad);
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={4}
            fill="#00D4FF"
            fillOpacity={0.6}
          />
        );
      })}
      {/* Center node */}
      <circle cx="210" cy="210" r="10" fill="#00D4FF" fillOpacity={0.4} />
      <circle cx="210" cy="210" r="5" fill="#00D4FF" fillOpacity={0.8} />
      {/* Connecting spokes */}
      {[0, 60, 120, 180, 240, 300].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1="210"
            y1="210"
            x2={210 + 200 * Math.cos(rad)}
            y2={210 + 200 * Math.sin(rad)}
            stroke="#00D4FF"
            strokeWidth="0.5"
            strokeOpacity={0.18}
          />
        );
      })}
    </svg>
  );
}

function ServicesIllustration() {
  // Connected hexagon grid
  const hexPoints = (cx: number, cy: number, size: number) => {
    return Array.from({ length: 6 }, (_, i) => {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      return `${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`;
    }).join(' ');
  };

  const hexes = [
    { cx: 210, cy: 160, s: 42 },
    { cx: 283, cy: 202, s: 42 },
    { cx: 283, cy: 286, s: 42 },
    { cx: 210, cy: 328, s: 42 },
    { cx: 137, cy: 286, s: 42 },
    { cx: 137, cy: 202, s: 42 },
    { cx: 210, cy: 244, s: 28 },
    { cx: 355, cy: 160, s: 28 },
    { cx: 65,  cy: 328, s: 28 },
  ];

  const colors = ['#7B2FFF', '#00D4FF', '#00FF88'];

  return (
    <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Connection lines between central hexes */}
      {[
        [210,160, 283,202], [283,202, 283,286], [283,286, 210,328],
        [210,328, 137,286], [137,286, 137,202], [137,202, 210,160],
        [210,160, 210,244], [283,202, 210,244], [283,286, 210,244],
        [210,328, 210,244], [137,286, 210,244], [137,202, 210,244],
      ].map(([x1,y1,x2,y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#7B2FFF"
          strokeWidth="0.7"
          strokeOpacity={0.3}
        />
      ))}
      {hexes.map(({ cx, cy, s }, i) => (
        <polygon
          key={i}
          points={hexPoints(cx, cy, s)}
          stroke={colors[i % 3]}
          strokeWidth="1"
          strokeOpacity={0.5}
          fill={`${colors[i % 3]}08`}
        />
      ))}
      {/* Glow dots at intersections */}
      {hexes.slice(0, 6).map(({ cx, cy }, i) => (
        <circle key={i} cx={cx} cy={cy} r={3.5} fill={colors[i % 3]} fillOpacity={0.7} />
      ))}
    </svg>
  );
}

function PillarsIllustration() {
  return (
    <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Base line */}
      <line x1="60" y1="360" x2="360" y2="360" stroke="#8A9BB5" strokeWidth="1" strokeOpacity={0.3} />

      {/* Pillar 1 – Security (cyan) */}
      <rect x="85" y="160" width="60" height="200" rx="4"
        fill="url(#pillar1grad)"
        stroke="#00D4FF" strokeWidth="1" strokeOpacity={0.5} />
      <rect x="75" y="152" width="80" height="16" rx="4"
        fill="#00D4FF" fillOpacity={0.15}
        stroke="#00D4FF" strokeWidth="1" strokeOpacity={0.6} />
      {/* glow top */}
      <ellipse cx="115" cy="154" rx="30" ry="10" fill="#00D4FF" fillOpacity={0.25} />
      <circle cx="115" cy="154" r="5" fill="#00D4FF" fillOpacity={0.9} />

      {/* Pillar 2 – Compliance (violet) — tallest */}
      <rect x="180" y="100" width="60" height="260" rx="4"
        fill="url(#pillar2grad)"
        stroke="#7B2FFF" strokeWidth="1" strokeOpacity={0.5} />
      <rect x="170" y="92" width="80" height="16" rx="4"
        fill="#7B2FFF" fillOpacity={0.15}
        stroke="#7B2FFF" strokeWidth="1" strokeOpacity={0.6} />
      <ellipse cx="210" cy="94" rx="30" ry="10" fill="#7B2FFF" fillOpacity={0.25} />
      <circle cx="210" cy="94" r="5" fill="#7B2FFF" fillOpacity={0.9} />

      {/* Pillar 3 – Observability (emerald) */}
      <rect x="275" y="200" width="60" height="160" rx="4"
        fill="url(#pillar3grad)"
        stroke="#00FF88" strokeWidth="1" strokeOpacity={0.5} />
      <rect x="265" y="192" width="80" height="16" rx="4"
        fill="#00FF88" fillOpacity={0.15}
        stroke="#00FF88" strokeWidth="1" strokeOpacity={0.6} />
      <ellipse cx="305" cy="194" rx="30" ry="10" fill="#00FF88" fillOpacity={0.25} />
      <circle cx="305" cy="194" r="5" fill="#00FF88" fillOpacity={0.9} />

      {/* Subtle grid lines on pillars */}
      {[200, 240, 280, 320].map(y => (
        <line key={y} x1="85" y1={y} x2="145" y2={y}
          stroke="#00D4FF" strokeWidth="0.4" strokeOpacity={y < 160 ? 0 : 0.2} />
      ))}
      {[140, 180, 220, 260, 300, 340].map(y => (
        <line key={y} x1="180" y1={y} x2="240" y2={y}
          stroke="#7B2FFF" strokeWidth="0.4" strokeOpacity={y < 100 ? 0 : 0.2} />
      ))}
      {[240, 280, 320].map(y => (
        <line key={y} x1="275" y1={y} x2="335" y2={y}
          stroke="#00FF88" strokeWidth="0.4" strokeOpacity={y < 200 ? 0 : 0.2} />
      ))}

      <defs>
        <linearGradient id="pillar1grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="pillar2grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7B2FFF" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7B2FFF" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="pillar3grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FF88" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#00FF88" stopOpacity="0.04" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function ContactIllustration() {
  // Signal broadcast rings from center
  return (
    <svg viewBox="0 0 420 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Signal rings */}
      {[30, 65, 105, 150, 200].map((r, i) => (
        <circle
          key={r}
          cx="210"
          cy="210"
          r={r}
          stroke={i % 2 === 0 ? '#7B2FFF' : '#00D4FF'}
          strokeWidth={1 - i * 0.12}
          strokeOpacity={0.5 - i * 0.07}
          strokeDasharray={i > 1 ? '4 6' : 'none'}
        />
      ))}
      {/* Broadcast arcs — top quadrant */}
      {[50, 90, 135].map((r, i) => (
        <path
          key={r}
          d={`M ${210 - r * Math.cos(Math.PI * 0.25)} ${210 - r * Math.sin(Math.PI * 0.75)}
              A ${r} ${r} 0 0 1
              ${210 + r * Math.cos(Math.PI * 0.25)} ${210 - r * Math.sin(Math.PI * 0.75)}`}
          stroke="#00D4FF"
          strokeWidth={1.2 - i * 0.2}
          strokeOpacity={0.55 - i * 0.1}
          strokeLinecap="round"
        />
      ))}
      {/* Directional dots */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const r = 155;
        return (
          <circle
            key={i}
            cx={210 + r * Math.cos(rad)}
            cy={210 + r * Math.sin(rad)}
            r={3}
            fill={i % 2 === 0 ? '#7B2FFF' : '#00D4FF'}
            fillOpacity={0.65}
          />
        );
      })}
      {/* Center node */}
      <circle cx="210" cy="210" r="14" fill="#7B2FFF" fillOpacity={0.12} stroke="#7B2FFF" strokeWidth="1" strokeOpacity={0.5} />
      <circle cx="210" cy="210" r="7" fill="#7B2FFF" fillOpacity={0.5} />
      <circle cx="210" cy="210" r="3.5" fill="#00D4FF" fillOpacity={0.9} />
      {/* Signal lines */}
      {[30, 90, 150, 210, 270, 330].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={angle}
            x1={210 + 14 * Math.cos(rad)}
            y1={210 + 14 * Math.sin(rad)}
            x2={210 + 155 * Math.cos(rad)}
            y2={210 + 155 * Math.sin(rad)}
            stroke="#7B2FFF"
            strokeWidth="0.6"
            strokeOpacity={0.2}
          />
        );
      })}
    </svg>
  );
}

const ILLUSTRATIONS: Record<PageHeroProps['variant'], React.ComponentType> = {
  about: AboutIllustration,
  services: ServicesIllustration,
  pillars: PillarsIllustration,
  contact: ContactIllustration,
};

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function PageHero({
  badge,
  badgeColor = '#00D4FF',
  headline,
  headlineGradient,
  subtext,
  variant,
}: PageHeroProps) {
  const IllustrationComponent = ILLUSTRATIONS[variant];

  // Resolve badge color rgb for transparency
  const badgeRgb =
    badgeColor === '#00D4FF'
      ? '0,212,255'
      : badgeColor === '#7B2FFF'
      ? '123,47,255'
      : badgeColor === '#00FF88'
      ? '0,255,136'
      : '0,212,255';

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: '520px',
        background: 'var(--bg-primary, #050810)',
        paddingTop: '128px',
        paddingBottom: '64px',
      }}
    >
      {/* Variant radial bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: VARIANT_BG[variant] }}
      />

      {/* Subtle hex grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='69' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolygon points='30,1 59,16.5 59,52.5 30,68 1,52.5 1,16.5' fill='none' stroke='%2300D4FF' stroke-width='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 69px',
        }}
      />

      <div
        className="relative mx-auto"
        style={{
          maxWidth: '1200px',
          paddingLeft: '48px',
          paddingRight: '48px',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
      >
        {/* ── Left content (55%) ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          style={{ flex: '0 0 55%', maxWidth: '55%' }}
        >
          {/* Badge */}
          <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '0.72rem',
                letterSpacing: '0.12em',
                fontFamily: 'var(--font-mono, monospace)',
                background: `rgba(${badgeRgb},0.08)`,
                border: `1px solid rgba(${badgeRgb},0.25)`,
                color: badgeColor,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: badgeColor,
                  boxShadow: `0 0 6px 2px rgba(${badgeRgb},0.5)`,
                }}
              />
              {badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-display, Space Grotesk)',
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontWeight: 700,
              lineHeight: 1.05,
              marginBottom: '20px',
              color: 'var(--text-primary, #F0F4FF)',
            }}
          >
            {headline}{' '}
            {headlineGradient && (
              <span
                style={{
                  background: 'linear-gradient(130deg, #7B2FFF 0%, #00D4FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {headlineGradient}
              </span>
            )}
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            style={{
              color: 'var(--text-secondary, #8A9BB5)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              maxWidth: '520px',
              fontFamily: 'var(--font-body, Inter)',
            }}
          >
            {subtext}
          </motion.p>
        </motion.div>

        {/* ── Right illustration (45%) ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            flex: '0 0 45%',
            maxWidth: '45%',
            height: '340px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <IllustrationComponent />
        </motion.div>
      </div>
    </section>
  );
}
