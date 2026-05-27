import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import BomDependencyGraph from './BomDependencyGraph';

/* ── dark theme tokens ─────────────────────────────────────────── */
const D = {
  bg:      'var(--dash-dark, var(--ink-700))',
  surface: 'var(--dash-dark, var(--ink-700))',
  border:  'var(--ink-800)',
  head:    '#FFFFFF',
  body:    '#C5CCD8',
  dimmed:  '#c5ccd8',
  accent:  '#3DC7F6',
};

/* ── animated counter hook ─────────────────────────────────────── */
function useCounter(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return val;
}

/* ── tiny sparkline SVG ─────────────────────────────────────────── */
function Sparkline({ points, color, width = 80, height = 28 }: {
  points: [number, number][];
  color: string;
  width?: number;
  height?: number;
}) {
  const minY = Math.min(...points.map(p => p[1]));
  const maxY = Math.max(...points.map(p => p[1]));
  const rangeY = maxY - minY || 1;
  const minX = Math.min(...points.map(p => p[0]));
  const maxX = Math.max(...points.map(p => p[0]));
  const rangeX = maxX - minX || 1;

  const norm = points.map(([x, y]) => [
    ((x - minX) / rangeX) * width,
    height - ((y - minY) / rangeY) * height,
  ]);

  const d = norm.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const areaD = `${d} L ${norm[norm.length - 1][0].toFixed(1)} ${height} L ${norm[0][0].toFixed(1)} ${height} Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <defs>
        <linearGradient id={`sg-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sg-${color.replace('#', '')})`} />
      <path d={d} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── sparkline data sets ─────────────────────────────────────────── */
const SPARKS = {
  cert:   [[0,82],[1,85],[2,83],[3,88],[4,90],[5,91],[6,93],[7,95],[8,96],[9,98]] as [number,number][],
  valid:  [[0,900],[1,980],[2,1010],[3,1050],[4,1090],[5,1140],[6,1180],[7,1210],[8,1230],[9,1247]] as [number,number][],
  types:  [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]] as [number,number][],
  crit:   [[0,9],[1,8],[2,7],[3,6],[4,7],[5,5],[6,5],[7,4],[8,3],[9,3]] as [number,number][],
};

export default function Dashboard() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const score       = useCounter(98,   1400, inView);
  const validations = useCounter(1247, 1600, inView);

  const cards = [
    {
      label: 'Cert-In Coverage',
      value: score,
      unit: '%',
      color: '#10B981',
      spark: SPARKS.cert,
      trend: { dir: '▲', text: '-0.4 pts · 364', up: true },
    },
    {
      label: 'Active Validations',
      value: validations,
      unit: '',
      color: D.accent,
      spark: SPARKS.valid,
      trend: { dir: '▲', text: '18 today', up: true },
    },
    {
      label: 'Critical Items',
      value: 3,
      unit: '',
      color: '#E53935',
      spark: SPARKS.crit,
      trend: { dir: '▼', text: '2 since last scan', up: false },
    },
    {
      label: 'BOM Types Covered',
      value: 5,
      unit: '',
      color: '#8B5CF6',
      spark: SPARKS.types,
      tags: ['SBOM', 'CBOM', 'QBOM', 'AIBOM', 'HBOM'],
    },
  ];

  return (
    <section
      className="relative py-10 md:py-14 px-4 sm:px-6 overflow-hidden"
      style={{ background: 'var(--p0)', borderTop: '1px solid var(--p3)' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,177,220,0.05), transparent 70%)' }}
      />

      <div className="relative max-w-[1440px] mx-auto">

        {/* ── Section header ── */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          {/* Headline */}
          <h2
            className="text-[26px] sm:text-[36px] md:text-[52px] font-black leading-[1.0] mb-4 sm:mb-5"
            style={{ letterSpacing: '-0.03em', color: 'var(--ink-700)' }}
          >
            See everything.{' '}
            <span style={{ color: '#00B1DC' }}>Miss nothing.</span>
          </h2>

          {/* Subtitle */}
          <div
            className="flex items-start gap-2 max-w-[840px]"
            style={{ borderLeft: '3px solid var(--c5)', paddingLeft: 12 }}
          >
            <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--ink-600)' }}>
              A unified command center for BOM governance{' '}
              <em style={{ color: 'var(--c5)', fontStyle: 'italic' }}>
                real-time risk scoring, dependency graph, and one-click audit exports.
              </em>
            </p>
          </div>
        </motion.div>

        {/* ── Monitor frame wrapping stat cards + dependency graph ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--dash-dark, var(--ink-700))',
            border: `1px solid ${D.border}`,
            boxShadow: '0 48px 120px rgba(0,0,0,0.38), 0 0 80px rgba(61,199,246,0.06)',
          }}
        >
          {/* ── Browser chrome bar ── */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: D.bg, borderBottom: `1px solid ${D.border}` }}
          >
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: '#E53935' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#F59E0B' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#10B981' }} />
            </div>
            <div
              className="flex-1 mx-4 px-3 flex items-center"
              style={{
                background: 'var(--dash-dark, var(--ink-700))',
                border: `1px solid ${D.border}`,
                borderRadius: 6,
                height: 26,
              }}
            >
              <span style={{ fontSize: 11, color: '#c5ccd8', fontFamily: 'var(--f-m)' }}>
                app.intellixbom.com/dashboard
              </span>
            </div>
          </div>

          {/* ── Content inside monitor ── */}
          <div className="p-3 sm:p-5">
            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-5">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                  className="rounded-xl p-3 sm:p-4 flex flex-col justify-between"
                  style={{
                    background: D.bg,
                    border: `1px solid ${D.border}`,
                    minHeight: 90,
                  }}
                >
                  {/* Label */}
                  <div
                    className="text-[9px] uppercase tracking-[0.12em] font-semibold mb-2 select-none"
                    style={{ color: D.dimmed, fontFamily: 'var(--f-m)' }}
                  >
                    {card.label}
                  </div>

                  {/* Value row with sparkline */}
                  <div className="flex items-end justify-between gap-2">
                    <div
                      className="text-[22px] sm:text-[32px] font-bold tabular-nums leading-none"
                      style={{ color: card.color, letterSpacing: '-0.04em', fontFamily: 'var(--f-d)' }}
                    >
                      {typeof card.value === 'number' ? card.value.toLocaleString() : card.value}
                      {card.unit && (
                        <span className="text-[20px] ml-0.5">{card.unit}</span>
                      )}
                    </div>
                    <div className="flex-shrink-0 opacity-80">
                      <Sparkline points={card.spark} color={card.color} />
                    </div>
                  </div>

                  {/* Trend or tags */}
                  {'trend' in card && card.trend ? (
                    <div
                      className="flex items-center gap-1 mt-2 text-[10px] font-medium"
                      style={{ color: card.trend.up ? '#10B981' : '#E53935', fontFamily: 'var(--f-m)' }}
                    >
                      <span>{card.trend.dir}</span>
                      <span style={{ color: D.dimmed }}>{card.trend.text}</span>
                    </div>
                  ) : 'tags' in card && card.tags ? (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {card.tags.map(t => (
                        <span
                          key={t}
                          className="text-[12px] font-semibold px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(139,92,246,0.12)', color: '#8B5CF6', fontFamily: 'var(--f-m)' }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </motion.div>
              ))}
            </div>

            {/* Divider */}
            <div className="mb-4" style={{ borderTop: `1px solid ${D.border}` }} />

            {/* Dependency Graph */}
            <div className="flex items-baseline justify-between mb-3">
              <h3
                className="text-[13px] font-semibold uppercase tracking-[0.08em]"
                style={{ color: '#c5ccd8', fontFamily: 'var(--f-m)' }}
              >
                Dependency graph
              </h3>
            </div>
            <BomDependencyGraph />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
