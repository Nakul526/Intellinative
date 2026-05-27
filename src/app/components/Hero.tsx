import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { openDemoModal } from './DemoModal';
import intelliXbomSymbol from '../../assets/IntelliXbom-Symbol.png';


export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      className="relative flex items-start sm:items-center overflow-hidden"
      style={{ background: 'var(--p1)', paddingTop: 0, paddingBottom: 0 }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 900, height: 900, background: 'radial-gradient(circle, rgba(0,177,220,0.10) 0%, transparent 62%)', top: -320, left: -220 }} />
        <div className="absolute rounded-full animate-float-b" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,177,220,0.06) 0%, transparent 62%)', top: '5%', right: -160 }} />
        <div className="absolute inset-0 animate-grid-pan" style={{ backgroundImage: 'linear-gradient(var(--app-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--app-grid-line) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 75% 85% at 40% 50%, black 20%, transparent 75%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-14 pt-5 sm:pt-14 lg:pt-16 pb-6 sm:pb-14 lg:pb-16">
        <div className="grid lg:grid-cols-[1fr_600px] xl:grid-cols-[1fr_700px] gap-8 xl:gap-12 items-center">

          {/* ── LEFT ── */}
          <div ref={ref}>
            {/* Headline */}
            <div className="overflow-hidden mb-1 pb-1">
              <motion.h1
                initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.10, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold leading-[1.08] tracking-[-0.04em]"
                style={{ color: 'var(--ink-700)', fontFamily: 'var(--f-d)', fontSize: 'clamp(30px, 4.2vw, 52px)' }}
              >
                A Digital Trust Platform
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.div
                initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold leading-[1.0] tracking-[-0.04em]"
                style={{ color: 'var(--ink-700)', fontFamily: 'var(--f-d)', fontSize: 'clamp(30px, 4.2vw, 52px)' }}
              >
                for Continuous
              </motion.div>
            </div>
            <div className="overflow-hidden mb-2 sm:mb-3">
              <motion.div
                initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold leading-[1.0] tracking-[-0.04em]"
                style={{ color: '#00B1DC', fontFamily: 'var(--f-d)', fontSize: 'clamp(30px, 4.2vw, 52px)' }}
              >
                SBOM Based Compliance
              </motion.div>
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="text-[13px] sm:text-[15px] leading-[1.6] max-w-[480px] mb-3 sm:mb-6"
              style={{ color: 'var(--ink-600)' }}>
              Complete BOM governance across software, hardware, quantum, and
              cryptography with compliance evidence and CERT-In alignment for
              India's most regulated environments.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42 }}
              className="flex flex-row items-center gap-2 sm:gap-3 mb-3 sm:mb-5">
              <motion.button
                whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={openDemoModal}
                className="flex items-center justify-center gap-2 px-7 text-[15px] font-semibold text-white rounded-lg"
                style={{ background: 'var(--c5)', boxShadow: '0 2px 12px rgba(0,177,220,0.38)', height: '52px' }}>
                Request a Demo
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.div
                whileHover={{ y: -3, scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="#"
                  className="flex items-center justify-center gap-2 px-7 text-[15px] font-semibold rounded-lg"
                  style={{ color: '#ffffff', background: 'var(--ink-700)', height: '52px' }}>
                  Explore Platform
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>

            {/* Compliance badges row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.54 }}
              className="flex flex-wrap gap-1.5 sm:gap-2.5 mb-3 sm:mb-4">
              {['CERT-In v2.0', 'RBI Advisory 11/2024', 'MeitY SBOM Guidelines', '100% Self-Hosted'].map(badge => (
                <div key={badge} className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-[12px] font-semibold"
                  style={{ background: 'var(--gold-1)', border: '1px solid rgba(200,148,31,0.3)', color: 'var(--gold-7)', fontFamily: 'var(--f-m)' }}>
                  <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--gold-5)' }} />
                  {badge}
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.60 }}
              className="flex items-stretch gap-0">
              {[
                { value: '5',    label: 'BOM Types',         unit: '' },
                { value: '100',  label: 'Self-Hosted',       unit: '%' },
                { value: '3',    label: 'Indian frameworks', unit: '' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center px-4 sm:px-8"
                  style={i > 0 ? { borderLeft: '1px solid var(--p3)' } : {}}>
                  <div className="text-[20px] sm:text-[24px] font-bold leading-none mb-0.5 tabular-nums"
                    style={{ color: 'var(--c5)', letterSpacing: '-0.04em' }}>
                    {s.value}<span style={{ color: 'var(--c5)' }}>{s.unit}</span>
                  </div>
                  <div className="text-[11px]" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Pipeline viz ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:flex lg:items-center lg:justify-center self-stretch">
            <PipelineViz />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Horizontal pipeline rows (left → right) ── */
const ROWS = [
  { id: 'r-sbom',  y: 46,  label: 'SBOM ',  color: '#00B1DC', nodeX: 188, dur: '3.0s', pkts: ['0s',   '1.5s'        ] },
  { id: 'r-cbom',  y: 104, label: 'CBOM ',  color: '#5B6CFF', nodeX: 150, dur: '2.7s', pkts: ['0.4s', '1.9s'        ] },
  { id: 'r-qbom',  y: 162, label: 'QBOM ',  color: '#8B5CF6', nodeX: 222, dur: '2.3s', pkts: ['0.2s', '1.2s', '2.3s'] },
  { id: 'r-aibom', y: 220, label: 'AIBOM', color: '#F97316', nodeX: 168, dur: '2.7s', pkts: ['0.7s', '2.1s'        ] },
  { id: 'r-hbom',  y: 278, label: 'HBOM ',  color: '#0d4a52', nodeX: 200, dur: '3.0s', pkts: ['0.9s', '2.3s'        ] },
];
const HLEFT  = 90;   // left rail x
const HRIGHT = 408;  // elbow x before angling into hub
const HUB    = { cx: 467, cy: 162, r: 44 };

// Pre-computed hub-edge contact points from (HRIGHT, row.y) → hub circle
// Formula: t = 1 - r/dist, edge = (HRIGHT + (cx-HRIGHT)*t, y + (cy-y)*t)
const HUB_EDGES = [
  { x: 447, y: 123 },  // SBOM  (y=46)
  { x: 436, y: 131 },  // CBOM  (y=104)
  { x: 423, y: 162 },  // QBOM  (y=162)  straight shot
  { x: 436, y: 193 },  // AIBOM (y=220)
  { x: 447, y: 201 },  // HBOM  (y=278)
];

function PipelineViz() {
  const pvRef    = useRef(null);
  const pvInView = useInView(pvRef, { once: true });

  return (
    <div ref={pvRef} className="relative select-none w-full">
      {/* Ambient glow behind hub */}
      <div className="absolute -inset-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 65% at 88% 50%, rgba(0,177,220,0.15), transparent 70%)', filter: 'blur(24px)' }} />

      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={pvInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg viewBox="0 0 520 332" className="w-full h-full" style={{ overflow: 'visible', minHeight: 340 }} aria-hidden>
          <defs>
            {/* Glow filters */}
            <filter id="pv-glow-hub" x="-55%" y="-55%" width="210%" height="210%">
              <feGaussianBlur stdDeviation="8" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="pv-glow-node" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            {/* userSpaceOnUse filter for QBOM horizontal line  avoids zero-height bounding box bug */}
            <filter id="pv-glow-hline" filterUnits="userSpaceOnUse" x="80" y="154" width="353" height="16">
              <feGaussianBlur stdDeviation="2.5" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>

            {/* Per-row gradient: left transparent → right coloured */}
            {ROWS.map((r, i) => (
              <linearGradient key={`hg-${r.id}`} id={`hg-${r.id}`}
                gradientUnits="userSpaceOnUse"
                x1={HLEFT} y1="0"
                x2={i === 2 ? HUB_EDGES[2].x : HRIGHT} y2="0">
                <stop offset="0%"   stopColor={r.color} stopOpacity="0.08"/>
                <stop offset="100%" stopColor={r.color} stopOpacity="0.55"/>
              </linearGradient>
            ))}

            {/* Angled segment gradient: elbow → hub edge */}
            {ROWS.map((r, i) => i !== 2 && (
              <linearGradient key={`ag-${r.id}`} id={`ag-${r.id}`}
                gradientUnits="userSpaceOnUse"
                x1={HRIGHT} y1={r.y}
                x2={HUB_EDGES[i].x} y2={HUB_EDGES[i].y}>
                <stop offset="0%"   stopColor={r.color} stopOpacity="0.55"/>
                <stop offset="100%" stopColor={r.color} stopOpacity="0.85"/>
              </linearGradient>
            ))}

            {/* Hub image clip */}
            <clipPath id="pv-hub-clip">
              <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r - 6}/>
            </clipPath>
          </defs>

          {/* ════ LEFT VERTICAL RAIL ════ */}
          <motion.path d={`M ${HLEFT} ${ROWS[0].y} L ${HLEFT} ${ROWS[4].y}`}
            fill="none" stroke="var(--p3)" strokeWidth="1.5"
            initial={{ pathLength: 0 }} animate={pvInView ? { pathLength: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}/>

          {/* ════ 5 ROWS  draw-in loops continuously with 1 s gap ════ */}
          {ROWS.map((r, i) => {
            const e = HUB_EDGES[i];
            const hx2 = i === 2 ? e.x : HRIGHT;
            return (
              <g key={`row-${r.id}`}>
                {/* Static gray base track */}
                <line x1={HLEFT} y1={r.y} x2={hx2} y2={r.y}
                  stroke="var(--p3)" strokeWidth="1.5"/>
                {/* Non-QBOM rows: angled segment + animated path (rendered here, below hub) */}
                {i !== 2 && (
                  <>
                    <line x1={HRIGHT} y1={r.y} x2={e.x} y2={e.y}
                      stroke="var(--p3)" strokeWidth="1.5"/>
                    <motion.path
                      d={`M ${HLEFT} ${r.y} L ${HRIGHT} ${r.y} L ${e.x} ${e.y}`}
                      fill="none"
                      stroke={r.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      filter="url(#pv-glow-node)"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={pvInView ? { pathLength: [0, 1], opacity: 0.55 } : {}}
                      transition={{
                        pathLength: {
                          duration: 0.9,
                          delay: 0.2 + i * 0.1,
                          ease: 'easeOut',
                          repeat: Infinity,
                          repeatDelay: 1,
                          repeatType: 'loop',
                        },
                        opacity: { duration: 0.3, delay: 0.2 + i * 0.1 },
                      }}
                    />
                  </>
                )}
              </g>
            );
          })}

          {/* ════ NODE CIRCLES  no pulse rings, clean dots ════ */}
          {ROWS.map((r, i) => (
            <motion.g key={`node-${r.id}`}
              initial={{ opacity: 0 }}
              animate={pvInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.35, delay: 0.5 + i * 0.09 }}>
              <circle cx={r.nodeX} cy={r.y} r="10"
                fill={`${r.color}14`} stroke={r.color} strokeWidth="1" strokeOpacity="0.6"
                filter="url(#pv-glow-node)"/>
              <circle cx={r.nodeX} cy={r.y} r="4.5" fill={r.color} fillOpacity="0.9"/>
            </motion.g>
          ))}

          {/* ════ BOM LABELS  left of left rail ════ */}
          {ROWS.map((r, i) => {
            const w = r.label.length > 4 ? 44 : 36;
            const lx = HLEFT - w - 8;
            return (
              <motion.g key={`lbl-${r.id}`}
                initial={{ opacity: 0, x: -6 }}
                animate={pvInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.38, delay: 0.12 + i * 0.08 }}>
                {/* Base pill */}
                <rect x={lx} y={r.y - 9} width={w} height={17} rx="4"
                  fill="white" stroke={`${r.color}60`} strokeWidth="0.9"
                  style={{ filter: 'drop-shadow(0 1px 4px rgba(14,26,46,0.09))' }}/>
                {/* Pulsing glow border  matches the line animation timing */}
                <rect x={lx} y={r.y - 9} width={w} height={17} rx="4"
                  fill="none" stroke={r.color} strokeWidth="1">
                  <animate attributeName="stroke-opacity"
                    values="0;0.55;0" keyTimes="0;0.3;1"
                    dur={r.dur} begin={`${0.2 + i * 0.1}s`}
                    repeatCount="indefinite"/>
                </rect>
                <text x={lx + w / 2} y={r.y} textAnchor="middle" dominantBaseline="middle"
                  fontSize="8.5" fontWeight="700" fill={r.color} fontFamily="'JetBrains Mono', monospace">
                  {r.label}
                </text>
              </motion.g>
            );
          })}


          {/* ════ HUB  pulse rings ════ */}
          <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r + 18}
            fill="none" stroke="rgba(0,177,220,0.08)" strokeWidth="1">
            <animate attributeName="r" values={`${HUB.r+18};${HUB.r+34};${HUB.r+18}`} dur="3.5s" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" values="0.08;0;0.08" dur="3.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx={HUB.cx} cy={HUB.cy} r={HUB.r + 9}
            fill="none" stroke="rgba(0,177,220,0.14)" strokeWidth="1">
            <animate attributeName="r" values={`${HUB.r+9};${HUB.r+22};${HUB.r+9}`} dur="3.5s" begin="1.1s" repeatCount="indefinite"/>
            <animate attributeName="stroke-opacity" values="0.14;0;0.14" dur="3.5s" begin="1.1s" repeatCount="indefinite"/>
          </circle>

          {/* ════ HUB  circle body ════ */}
          <motion.circle cx={HUB.cx} cy={HUB.cy} r={HUB.r}
            fill="rgba(0,177,220,0.06)" stroke="rgba(0,177,220,0.30)" strokeWidth="1.5"
            filter="url(#pv-glow-hub)"
            initial={{ opacity: 0 }} animate={pvInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.0, duration: 0.6 }}/>
          <motion.circle cx={HUB.cx} cy={HUB.cy} r={HUB.r - 10}
            fill="rgba(0,177,220,0.10)" stroke="rgba(0,177,220,0.25)" strokeWidth="1"
            initial={{ opacity: 0 }} animate={pvInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.08, duration: 0.5 }}/>
          <motion.circle cx={HUB.cx} cy={HUB.cy} r={HUB.r - 22}
            fill="rgba(255,255,255,0.92)" stroke="rgba(0,177,220,0.20)" strokeWidth="0.5"
            initial={{ opacity: 0 }} animate={pvInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.14, duration: 0.4 }}/>

          {/* ════ HUB  IntelliXbom symbol image ════ */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={pvInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.22, duration: 0.5 }}>
            <image
              href={intelliXbomSymbol}
              x={HUB.cx - 18} y={HUB.cy - 18}
              width={36} height={36}
              clipPath="url(#pv-hub-clip)"
              preserveAspectRatio="xMidYMid meet"
            />
          </motion.g>

          {/* ════ IntelliXBOM label + CERT-In badge below hub ════ */}
          <motion.g initial={{ opacity: 0 }} animate={pvInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.3 }}>
            <text x={HUB.cx} y={HUB.cy + HUB.r + 14} textAnchor="middle"
              fontSize="9" fontWeight="500" fill="var(--ink-400)"
              fontFamily="'JetBrains Mono', monospace">IntelliXBOM</text>
            <rect x={HUB.cx - 34} y={HUB.cy + HUB.r + 22} width="68" height="16" rx="4"
              fill="rgba(16,185,129,0.08)" stroke="rgba(16,185,129,0.30)" strokeWidth="0.8"/>
            <text x={HUB.cx} y={HUB.cy + HUB.r + 30} textAnchor="middle" dominantBaseline="middle"
              fontSize="7.5" fontWeight="700" fill="#10B981"
              fontFamily="'JetBrains Mono', monospace">✓ CERT-In</text>
          </motion.g>

          {/* ════ QBOM animated path  rendered ABOVE hub, uses userSpaceOnUse filter ════ */}
          <motion.path
            d={`M ${HLEFT} ${ROWS[2].y} L ${HUB_EDGES[2].x} ${ROWS[2].y}`}
            fill="none"
            stroke={ROWS[2].color}
            strokeWidth="1.5"
            strokeLinecap="round"
            filter="url(#pv-glow-hline)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={pvInView ? { pathLength: [0, 1], opacity: 0.55 } : {}}
            transition={{
              pathLength: {
                duration: 0.9,
                delay: 0.4,
                ease: 'easeOut',
                repeat: Infinity,
                repeatDelay: 1,
                repeatType: 'loop',
              },
              opacity: { duration: 0.3, delay: 0.4 },
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
