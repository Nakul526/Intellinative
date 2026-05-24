import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import BomDependencyGraph from './BomDependencyGraph';

/* ── dark theme tokens ─────────────────────────────────────────── */
const D = {
  bg:      '#060B14',
  surface: '#0E1A2E',
  border:  '#1A2030',
  head:    '#FFFFFF',
  body:    '#C5CCD8',
  dimmed:  '#4B5570',
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

  // Area fill path
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
  types:  [[0,5],[1,5],[2,5],[3,5],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5]] as [number,number][],
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
      label: 'BOM Types Covered',
      value: 5,
      unit: '',
      color: '#8B5CF6',
      spark: SPARKS.types,
      tags: ['SBOM', 'CBOM', 'QBOM', 'AIBOM', 'HBOM'],
    },
    {
      label: 'Critical Items',
      value: 3,
      unit: '',
      color: '#E53935',
      spark: SPARKS.crit,
      trend: { dir: '▼', text: '2 since last scan', up: false },
    },
  ];

  return (
    <section
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      style={{ background: D.bg, borderTop: `1px solid ${D.border}` }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(ellipse, rgba(61,199,246,0.07), transparent 70%)` }}
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
          {/* Headline  single-line large display */}
          <h2
            className="text-[36px] md:text-[52px] font-black leading-[1.0] mb-5"
            style={{ letterSpacing: '-0.03em', color: D.head }}
          >
            See everything.{' '}
            <span style={{ color: D.accent }}>Miss nothing.</span>
          </h2>

          {/* Subtitle with accent on key phrase */}
          <div
            className="flex items-start gap-2 max-w-[540px]"
            style={{
              borderLeft: `2px solid rgba(61,199,246,0.35)`,
              paddingLeft: 12,
            }}
          >
            <p
              className="text-[14px] leading-[1.75]"
              style={{ color: D.body }}
            >
              A unified command center for BOM governance {' '}
              <em style={{ color: D.accent, fontStyle: 'italic' }}>
                real-time risk scoring, dependency graph, and one-click audit exports.
              </em>
            </p>
          </div>
        </motion.div>

        {/* ── Stat cards ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
        >
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.07 }}
              className="rounded-xl p-4 flex flex-col justify-between"
              style={{
                background: D.surface,
                border: `1px solid ${D.border}`,
                minHeight: 110,
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
                  className="text-[32px] font-bold tabular-nums leading-none"
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
                  style={{
                    color: card.trend.up ? '#10B981' : '#E53935',
                    fontFamily: 'var(--f-m)',
                  }}
                >
                  <span>{card.trend.dir}</span>
                  <span style={{ color: D.dimmed }}>{card.trend.text}</span>
                </div>
              ) : 'tags' in card && card.tags ? (
                <div className="flex flex-wrap gap-1 mt-2">
                  {card.tags.map(t => (
                    <span
                      key={t}
                      className="text-[8px] font-semibold px-1.5 py-0.5 rounded"
                      style={{
                        background: 'rgba(139,92,246,0.12)',
                        color: '#8B5CF6',
                        fontFamily: 'var(--f-m)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </motion.div>
          ))}
        </motion.div>

        {/* ── Dependency Graph section ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Row header */}
          <div className="flex items-baseline justify-between mb-4">
            <h3
              className="text-xl font-bold"
              style={{ color: D.head, letterSpacing: '-0.02em' }}
            >
              Dependency graph
            </h3>
          </div>

          <BomDependencyGraph />
        </motion.div>

      </div>
    </section>
  );
}
