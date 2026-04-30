import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Shield } from 'lucide-react';
import { openDemoModal } from './DemoModal';

function useCounter(target: number, duration = 1400, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

/* ─── Network graph data ─────────────────────────────────────────────── */
const NODES = [
  { id: 'hub',   x: 288, y: 228, r: 28, color: '#4361EE', label: 'IntelliXBOM', sub: 'CERT-In',  type: 'hub'    },
  { id: 'sbom',  x: 110, y:  85, r: 22, color: '#4361EE', label: 'SBOM',        sub: 'PASS',     type: 'bom'    },
  { id: 'cbom',  x: 288, y:  40, r: 22, color: '#00D4AA', label: 'CBOM',        sub: 'PASS',     type: 'bom'    },
  { id: 'qbom',  x: 468, y:  85, r: 22, color: '#8B5CF6', label: 'QBOM',        sub: 'WARN',     type: 'bom'    },
  { id: 'aibom', x: 510, y: 278, r: 22, color: '#F59E0B', label: 'AIBOM',       sub: 'SCAN',     type: 'bom'    },
  { id: 'hbom',  x:  68, y: 278, r: 22, color: '#EF4444', label: 'HBOM',        sub: 'FAIL',     type: 'bom'    },
  { id: 'va',    x:  36, y: 168, r:  9, color: '#3D4A5C', label: 'Vendor A',    sub: '',         type: 'vendor' },
  { id: 'vb',    x: 180, y:  18, r:  9, color: '#3D4A5C', label: 'Vendor B',    sub: '',         type: 'vendor' },
  { id: 'vc',    x: 414, y:  18, r:  9, color: '#3D4A5C', label: 'Vendor C',    sub: '',         type: 'vendor' },
  { id: 'vd',    x: 548, y: 168, r:  9, color: '#3D4A5C', label: 'PSU',         sub: '',         type: 'vendor' },
  { id: 've',    x: 130, y: 410, r:  9, color: '#3D4A5C', label: 'Bank',        sub: '',         type: 'vendor' },
  { id: 'vf',    x: 448, y: 410, r:  9, color: '#3D4A5C', label: 'Gov IT',      sub: '',         type: 'vendor' },
];

const EDGES = [
  { from: 'sbom',  to: 'hub',   dur: '2.4s', begin: '0s',    color: '#4361EE', w: 1.4 },
  { from: 'cbom',  to: 'hub',   dur: '2.8s', begin: '0.5s',  color: '#00D4AA', w: 1.4 },
  { from: 'qbom',  to: 'hub',   dur: '2.2s', begin: '0.9s',  color: '#8B5CF6', w: 1.4 },
  { from: 'aibom', to: 'hub',   dur: '3.0s', begin: '0.3s',  color: '#F59E0B', w: 1.4 },
  { from: 'hbom',  to: 'hub',   dur: '2.6s', begin: '0.7s',  color: '#EF4444', w: 1.4 },
  { from: 'va',    to: 'sbom',  dur: '3.4s', begin: '1.0s',  color: '#3D4A5C', w: 0.7 },
  { from: 'vb',    to: 'cbom',  dur: '3.2s', begin: '1.6s',  color: '#3D4A5C', w: 0.7 },
  { from: 'vc',    to: 'qbom',  dur: '3.8s', begin: '0.4s',  color: '#3D4A5C', w: 0.7 },
  { from: 'vd',    to: 'aibom', dur: '3.5s', begin: '0.8s',  color: '#3D4A5C', w: 0.7 },
  { from: 've',    to: 'hbom',  dur: '3.6s', begin: '1.3s',  color: '#3D4A5C', w: 0.7 },
  { from: 'vf',    to: 'aibom', dur: '3.3s', begin: '0.6s',  color: '#3D4A5C', w: 0.7 },
];

function getNode(id: string) { return NODES.find(n => n.id === id)!; }

/* ─── Component ─────────────────────────────────────────────────────── */
export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const s5  = useCounter(5,  1400, inView);
  const s21 = useCounter(21, 1400, inView);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--app-bg)', paddingTop: '4rem' }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full animate-float"
          style={{
            width: 900, height: 900,
            background: 'radial-gradient(circle, rgba(67,97,238,0.17) 0%, transparent 62%)',
            top: -320, left: -220, filter: 'blur(2px)'
          }}
        />
        <div
          className="absolute rounded-full animate-float-b"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(0,212,170,0.11) 0%, transparent 62%)',
            top: '5%', right: -160
          }}
        />
        <div
          className="absolute inset-0 animate-grid-pan"
          style={{
            backgroundImage: `linear-gradient(var(--app-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--app-grid-line) 1px, transparent 1px)`,
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(ellipse 75% 85% at 40% 50%, black 20%, transparent 75%)'
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-14 py-10">
        <div className="grid lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_560px] gap-10 xl:gap-16 items-center">

          {/* ── LEFT: Copy ── */}
          <div ref={ref}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.28)' }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA] animate-pulse" />
              <span className="text-[12px] font-semibold tracking-wide" style={{ color: 'var(--app-text-muted)' }}>
                India's BOM Compliance & Digital Trust Platform
              </span>
              <Shield className="w-3.5 h-3.5 text-[#4361EE] opacity-70" />
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.10, ease: [0.16, 1, 0.3, 1] }}
                className="text-[52px] md:text-[64px] xl:text-[78px] font-black leading-[1.0] tracking-[-0.04em]"
                style={{ color: 'var(--app-text-primary)' }}
              >
                BOM Compliance,
              </motion.div>
            </div>
            <div className="overflow-hidden mb-2">
              <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="text-[52px] md:text-[64px] xl:text-[78px] font-black leading-[1.0] tracking-[-0.04em]"
                style={{
                  background: 'linear-gradient(90deg, #4361EE 0%, #00D4AA 55%, #8B5CF6 100%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  animation: 'gradientShift 5s ease infinite'
                }}
              >
                Field by Field.
              </motion.div>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.div
                initial={{ y: 70, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="text-[52px] md:text-[64px] xl:text-[78px] font-black leading-[1.0] tracking-[-0.04em]"
                style={{ color: 'var(--app-text-primary)' }}
              >
                Proven.
              </motion.div>
            </div>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="text-[17px] leading-[1.75] max-w-[520px] mb-8"
              style={{ color: 'var(--app-text-dim)' }}
            >
              Verify every SBOM, CBOM, QBOM, AIBOM, and HBOM your vendors deliver —
              against CERT-In's 21 mandatory fields, automatically, at every software update.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.46 }}
              className="flex flex-col sm:flex-row items-start gap-4 mb-10"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={openDemoModal}
                className="group relative flex items-center gap-2 px-8 py-4 text-base font-black text-white rounded-2xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)',
                  boxShadow: '0 0 32px rgba(67,97,238,0.42)'
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 52px rgba(67,97,238,0.68)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(67,97,238,0.42)')}
              >
                <span className="relative z-10">Get a Free Demo</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <Link
                to="/platform"
                className="flex items-center gap-2 px-8 py-4 text-base font-semibold rounded-2xl transition-all duration-200"
                style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border-dim)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)';
                  (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border)';
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)';
                }}
              >
                Explore Platform
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.58 }}
              className="flex items-stretch gap-0"
              style={{ borderLeft: '0', borderRight: '0' }}
            >
              {[
                { value: String(s5),   label: 'Regulated sectors' },
                { value: String(s21),  label: 'CERT-In fields' },
                { value: '100%',       label: 'Field traceability' },
              ].map((s, i) => (
                <div
                  key={i}
                  className={i === 0 ? 'pr-8' : i === 2 ? 'pl-8' : 'px-8'}
                  style={i > 0 ? { borderLeft: '1px solid var(--app-border)' } : {}}
                >
                  <div className="text-[28px] font-black leading-none mb-1" style={{ color: 'var(--app-text-primary)' }}>{s.value}</div>
                  <div className="text-[11px]" style={{ color: 'var(--app-text-dimmer)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Network Visualization ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <NetworkViz />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Network SVG ────────────────────────────────────────────────────── */
function NetworkViz() {
  return (
    <div className="relative select-none">
      {/* Dark card wrapper so the viz always looks good */}
      <div
        className="absolute inset-0 rounded-3xl -z-10"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(67,97,238,0.12), transparent 65%)' }}
      />

      <svg
        viewBox="0 0 578 456"
        className="w-full"
        style={{ overflow: 'visible' }}
        aria-hidden="true"
      >
        <defs>
          <filter id="glow-sm">
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="glow-lg">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          {NODES.filter(n => n.type !== 'vendor').map(n => (
            <radialGradient key={n.id} id={`rg-${n.id}`} cx="35%" cy="30%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.45" />
            </radialGradient>
          ))}
        </defs>

        {EDGES.map((e, i) => {
          const f = getNode(e.from), t = getNode(e.to);
          return (
            <line key={i}
              x1={f.x} y1={f.y} x2={t.x} y2={t.y}
              stroke={e.color} strokeWidth={e.w} strokeOpacity={0.2}
            />
          );
        })}

        {EDGES.map((e, i) => {
          const f = getNode(e.from), t = getNode(e.to);
          const pid = `p${i}`;
          return (
            <g key={`pkt-${i}`}>
              <path id={pid} d={`M ${f.x} ${f.y} L ${t.x} ${t.y}`} fill="none" />
              <circle r={e.w > 1 ? 3.5 : 2} fill={e.color} opacity={0.9} filter="url(#glow-sm)">
                <animateMotion dur={e.dur} repeatCount="indefinite" begin={e.begin}>
                  <mpath href={`#${pid}`} />
                </animateMotion>
              </circle>
            </g>
          );
        })}

        {NODES.map(n => (
          <g key={n.id}>
            {n.type !== 'vendor' && (
              <>
                <circle cx={n.x} cy={n.y} r={n.r + 4}
                  fill="none" stroke={n.color} strokeWidth={1} strokeOpacity={0.35}
                >
                  <animate attributeName="r" values={`${n.r + 4};${n.r + 14};${n.r + 4}`}
                    dur={n.type === 'hub' ? '2s' : '2.8s'} repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.35;0;0.35"
                    dur={n.type === 'hub' ? '2s' : '2.8s'} repeatCount="indefinite" />
                </circle>
                <circle cx={n.x} cy={n.y} r={n.r + 7}
                  fill={n.color} fillOpacity={0.06}
                  stroke={n.color} strokeWidth={0.7} strokeOpacity={0.22} />
              </>
            )}

            <circle
              cx={n.x} cy={n.y} r={n.r}
              fill={n.type === 'vendor' ? 'rgba(30,36,50,0.8)' : `url(#rg-${n.id})`}
              stroke={n.color}
              strokeWidth={n.type === 'hub' ? 2 : n.type === 'bom' ? 1.5 : 0.8}
              strokeOpacity={n.type === 'vendor' ? 0.35 : 0.65}
              filter={n.type === 'hub' ? 'url(#glow-lg)' : n.type === 'bom' ? 'url(#glow-sm)' : 'none'}
            />

            {n.type !== 'vendor' && (
              <>
                <text x={n.x} y={n.y - 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={n.type === 'hub' ? 8.5 : 8}
                  fontWeight="900" fill="white" fontFamily="Inter, system-ui"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  {n.label}
                </text>
                <text x={n.x} y={n.y + 9}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={5.5} fontWeight="700"
                  fill={n.color} fontFamily="Inter, system-ui" opacity={0.85}
                >
                  {n.sub}
                </text>
              </>
            )}

            {n.type === 'vendor' && (
              <text
                x={n.x + (n.x > 290 ? 14 : -14)}
                y={n.y}
                textAnchor={n.x > 290 ? 'start' : 'end'}
                dominantBaseline="middle"
                fontSize={7.5} fontWeight="600"
                fill="#3D4A5C" fontFamily="Inter, system-ui"
              >
                {n.label}
              </text>
            )}
          </g>
        ))}

        <rect x={262} y={260} width={52} height={14} rx={4}
          fill="rgba(67,97,238,0.18)" stroke="rgba(67,97,238,0.45)" strokeWidth={0.7} />
        <text x={288} y={267}
          textAnchor="middle" dominantBaseline="middle"
          fontSize={5.5} fontWeight="700" fill="#6B8FFF" fontFamily="Inter">
          CERT-In Verified ✓
        </text>
      </svg>

      {/* Floating stat badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.4 }}
        className="absolute top-2 right-2 px-3.5 py-2.5 rounded-xl text-center"
        style={{ background: 'rgba(0,212,170,0.1)', border: '1px solid rgba(0,212,170,0.22)' }}
      >
        <div className="text-xl font-black text-[#00D4AA] leading-none">94%</div>
        <div className="text-[9px] uppercase tracking-wide mt-0.5" style={{ color: '#4B5563' }}>Compliance</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
        className="absolute bottom-6 left-0 px-3 py-2 rounded-xl"
        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.22)' }}
      >
        <div className="text-xs font-black text-[#EF4444]">7 Violations</div>
        <div className="text-[9px]" style={{ color: '#4B5563' }}>HBOM · Action Required</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.4 }}
        className="absolute top-[42%] -left-2 px-3 py-2 rounded-xl"
        style={{ background: 'rgba(67,97,238,0.1)', border: '1px solid rgba(67,97,238,0.22)' }}
      >
        <div className="text-[10px] font-black text-[#6B8FFF]">1,247</div>
        <div className="text-[9px]" style={{ color: '#4B5563' }}>Active scans</div>
      </motion.div>
    </div>
  );
}
