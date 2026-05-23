import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Shield, CheckCircle2 } from 'lucide-react';
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

/* ─── Live scan card data ────────────────────────────────────── */
const SCAN_ROWS = [
  { component: 'spring-boot-starter', version: '3.2.1', vulns: 0,  status: 'PASS',  statusColor: 'var(--sem-success)',  statusBg: 'var(--sem-success-bg)'  },
  { component: 'log4j-core',          version: '2.14.0', vulns: 1,  status: 'CRIT',  statusColor: 'var(--sem-critical)', statusBg: 'var(--sem-critical-bg)' },
  { component: 'openssl',             version: '3.0.8',  vulns: 0,  status: 'PASS',  statusColor: 'var(--sem-success)',  statusBg: 'var(--sem-success-bg)'  },
  { component: 'CRYSTALS-Kyber',      version: 'NIST r3', vulns: 0, status: 'SAFE',  statusColor: 'var(--c6)',           statusBg: 'var(--c1)'              },
];

/* ─── BOM node positions for mini network ───────────────────── */
const NODES = [
  { id: 'hub',   x: 288, y: 228, r: 28, color: '#00B1DC', label: 'IntelliXBOM', sub: 'CERT-In', type: 'hub'    },
  { id: 'sbom',  x: 110, y:  85, r: 22, color: '#00B1DC', label: 'SBOM',        sub: 'PASS',    type: 'bom'    },
  { id: 'cbom',  x: 288, y:  40, r: 22, color: '#5B6CFF', label: 'CBOM',        sub: 'PASS',    type: 'bom'    },
  { id: 'qbom',  x: 468, y:  85, r: 22, color: '#8B5CF6', label: 'QBOM',        sub: 'WARN',    type: 'bom'    },
  { id: 'aibom', x: 510, y: 278, r: 22, color: '#C8941F', label: 'AIBOM',       sub: 'SCAN',    type: 'bom'    },
  { id: 'hbom',  x:  68, y: 278, r: 22, color: '#4A5570', label: 'HBOM',        sub: 'PASS',    type: 'bom'    },
  { id: 'va',    x:  36, y: 168, r:  9, color: '#9CA8BB', label: 'Vendor A',    sub: '',        type: 'vendor' },
  { id: 'vb',    x: 180, y:  18, r:  9, color: '#9CA8BB', label: 'Vendor B',    sub: '',        type: 'vendor' },
  { id: 'vc',    x: 414, y:  18, r:  9, color: '#9CA8BB', label: 'Vendor C',    sub: '',        type: 'vendor' },
  { id: 'vd',    x: 548, y: 168, r:  9, color: '#9CA8BB', label: 'PSU',         sub: '',        type: 'vendor' },
  { id: 've',    x: 130, y: 410, r:  9, color: '#9CA8BB', label: 'Bank',        sub: '',        type: 'vendor' },
  { id: 'vf',    x: 448, y: 410, r:  9, color: '#9CA8BB', label: 'Gov IT',      sub: '',        type: 'vendor' },
];
const EDGES = [
  { from: 'sbom',  to: 'hub',   dur: '2.4s', begin: '0s',   color: '#00B1DC', w: 1.4 },
  { from: 'cbom',  to: 'hub',   dur: '2.8s', begin: '0.5s', color: '#5B6CFF', w: 1.4 },
  { from: 'qbom',  to: 'hub',   dur: '2.2s', begin: '0.9s', color: '#8B5CF6', w: 1.4 },
  { from: 'aibom', to: 'hub',   dur: '3.0s', begin: '0.3s', color: '#C8941F', w: 1.4 },
  { from: 'hbom',  to: 'hub',   dur: '2.6s', begin: '0.7s', color: '#4A5570', w: 1.4 },
  { from: 'va',    to: 'sbom',  dur: '3.4s', begin: '1.0s', color: '#C5CCD8', w: 0.7 },
  { from: 'vb',    to: 'cbom',  dur: '3.2s', begin: '1.6s', color: '#C5CCD8', w: 0.7 },
  { from: 'vc',    to: 'qbom',  dur: '3.8s', begin: '0.4s', color: '#C5CCD8', w: 0.7 },
  { from: 'vd',    to: 'aibom', dur: '3.5s', begin: '0.8s', color: '#C5CCD8', w: 0.7 },
  { from: 've',    to: 'hbom',  dur: '3.6s', begin: '1.3s', color: '#C5CCD8', w: 0.7 },
  { from: 'vf',    to: 'aibom', dur: '3.3s', begin: '0.6s', color: '#C5CCD8', w: 0.7 },
];
function getNode(id: string) { return NODES.find(n => n.id === id)!; }

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{ background: 'var(--p1)', paddingTop: '4rem', minHeight: 'calc(100vh - 4rem)', paddingBottom: '0' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ width: 900, height: 900, background: 'radial-gradient(circle, rgba(0,177,220,0.10) 0%, transparent 62%)', top: -320, left: -220 }} />
        <div className="absolute rounded-full animate-float-b" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,177,220,0.06) 0%, transparent 62%)', top: '5%', right: -160 }} />
        <div className="absolute inset-0 animate-grid-pan" style={{ backgroundImage: 'linear-gradient(var(--app-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--app-grid-line) 1px, transparent 1px)', backgroundSize: '72px 72px', maskImage: 'radial-gradient(ellipse 75% 85% at 40% 50%, black 20%, transparent 75%)' }} />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-14 pt-6 pb-2">
        <div className="grid lg:grid-cols-[1fr_500px] xl:grid-cols-[1fr_540px] gap-10 xl:gap-16 items-center">

          {/* ── LEFT ── */}
          <div ref={ref}>
            {/* Eyebrow */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-4"
              style={{ background: 'var(--c1)', border: '1px solid var(--c2)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c5)', animation: 'pulse-dot 2s infinite' }} />
              <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: 'var(--c6)', fontFamily: 'var(--f-m)' }}>
                A Digital Trust Platform
              </span>
              <Shield className="w-3.5 h-3.5" style={{ color: 'var(--c6)' }} />
            </motion.div>

            {/* Headline */}
            <div className="overflow-hidden mb-1">
              <motion.h1
                initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.10, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold leading-[1.0] tracking-[-0.04em]"
                style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-d)', fontSize: 'clamp(30px, 4.2vw, 52px)' }}
              >
                A Digital Trust Platform
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-1">
              <motion.div
                initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold leading-[1.0] tracking-[-0.04em]"
                style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-d)', fontSize: 'clamp(30px, 4.2vw, 52px)' }}
              >
                for Continuous
              </motion.div>
            </div>
            <div className="overflow-hidden mb-3">
              <motion.div
                initial={{ y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.72, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold leading-[1.0] tracking-[-0.04em]"
                style={{ color: 'var(--c5)', fontFamily: 'var(--f-d)', fontSize: 'clamp(30px, 4.2vw, 52px)' }}
              >
                SBOM Based Compliance
              </motion.div>
            </div>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="text-[15px] leading-[1.65] max-w-[480px] mb-6"
              style={{ color: 'var(--ink-600)' }}>
              Complete BOM governance across software, hardware, quantum, and
              cryptography with compliance evidence and CERT-In alignment for
              India's most regulated environments.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.42 }}
              className="flex flex-col sm:flex-row items-stretch gap-3 mb-5">
              <motion.button
                whileHover={{ scale: 1.03, translateY: -1 }} whileTap={{ scale: 0.97 }}
                onClick={openDemoModal}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-semibold text-white rounded-lg overflow-hidden relative"
                style={{ background: 'var(--c5)', boxShadow: '0 2px 12px rgba(0,177,220,0.38)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(0,177,220,0.55)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,177,220,0.38)')}>
                <span className="relative z-10">Request a Demo</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
                <div className="animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <Link
                to="/platform"
                className="flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-medium rounded-lg transition-all duration-200"
                style={{ color: 'var(--ink-700)', border: '1px solid var(--p4)', background: 'transparent' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--c5)'; (e.currentTarget as HTMLElement).style.background = 'var(--c1)'; (e.currentTarget as HTMLElement).style.color = 'var(--c6)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--p4)'; (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--ink-700)'; }}>
                Explore Platform
              </Link>
            </motion.div>

            {/* Compliance badges row */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.54 }}
              className="flex flex-wrap gap-2 mb-4">
              {['CERT-In v2.0', 'RBI Advisory 11/2024', 'MeitY SBOM Guidelines', '100% Self-Hosted'].map(badge => (
                <div key={badge} className="flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-semibold"
                  style={{ background: 'var(--gold-1)', border: '1px solid rgba(200,148,31,0.3)', color: 'var(--gold-7)', fontFamily: 'var(--f-m)' }}>
                  <CheckCircle2 className="w-3 h-3" style={{ color: 'var(--gold-5)' }} />
                  {badge}
                </div>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.60 }}
              className="flex items-stretch gap-0">
              {[
                { value: '5',    label: 'BOM Types',          unit: '' },
                { value: '100',  label: 'Self-Hosted',         unit: '%' },
                { value: '3',    label: 'Indian frameworks',   unit: '' },
              ].map((s, i) => (
                <div key={i}
                  className={i === 0 ? 'pr-8' : i === 2 ? 'pl-8' : 'px-8'}
                  style={i > 0 ? { borderLeft: '1px solid var(--p3)' } : {}}>
                  <div className="text-[24px] font-bold leading-none mb-0.5 tabular-nums"
                    style={{ color: 'var(--ink-950)', letterSpacing: '-0.04em' }}>
                    {s.value}<span style={{ color: 'var(--c5)' }}>{s.unit}</span>
                  </div>
                  <div className="text-[11px]" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: Network viz ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block">
            <NetworkViz scanRows={SCAN_ROWS} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function NetworkViz({ scanRows }: { scanRows: typeof SCAN_ROWS }) {
  return (
    <div className="relative select-none">
      <div className="absolute inset-0 rounded-3xl -z-10"
        style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,177,220,0.09), transparent 65%)' }} />

      <svg viewBox="0 0 578 456" className="w-full" style={{ overflow: 'visible' }} aria-hidden="true">
        <defs>
          <filter id="glow-sm"><feGaussianBlur stdDeviation="2.5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          <filter id="glow-lg"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
          {NODES.filter(n => n.type !== 'vendor').map(n => (
            <radialGradient key={n.id} id={`rg-${n.id}`} cx="35%" cy="30%">
              <stop offset="0%" stopColor={n.color} stopOpacity="0.95" />
              <stop offset="100%" stopColor={n.color} stopOpacity="0.45" />
            </radialGradient>
          ))}
        </defs>

        {EDGES.map((e, i) => {
          const f = getNode(e.from), t = getNode(e.to);
          return <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke={e.color} strokeWidth={e.w} strokeOpacity={0.2} />;
        })}
        {EDGES.map((e, i) => {
          const f = getNode(e.from), t = getNode(e.to);
          const pid = `p${i}`;
          return (
            <g key={`pkt-${i}`}>
              <path id={pid} d={`M ${f.x} ${f.y} L ${t.x} ${t.y}`} fill="none" />
              <circle r={e.w > 1 ? 3.5 : 2} fill={e.color} opacity={0.9} filter="url(#glow-sm)">
                <animateMotion dur={e.dur} repeatCount="indefinite" begin={e.begin}><mpath href={`#${pid}`} /></animateMotion>
              </circle>
            </g>
          );
        })}
        {NODES.map(n => (
          <g key={n.id}>
            {n.type !== 'vendor' && (
              <>
                <circle cx={n.x} cy={n.y} r={n.r + 4} fill="none" stroke={n.color} strokeWidth={1} strokeOpacity={0.35}>
                  <animate attributeName="r" values={`${n.r+4};${n.r+14};${n.r+4}`} dur={n.type==='hub'?'2s':'2.8s'} repeatCount="indefinite" />
                  <animate attributeName="stroke-opacity" values="0.35;0;0.35" dur={n.type==='hub'?'2s':'2.8s'} repeatCount="indefinite" />
                </circle>
                <circle cx={n.x} cy={n.y} r={n.r+7} fill={n.color} fillOpacity={0.06} stroke={n.color} strokeWidth={0.7} strokeOpacity={0.22} />
              </>
            )}
            <circle cx={n.x} cy={n.y} r={n.r}
              fill={n.type==='vendor'?'rgba(230,232,238,0.9)':`url(#rg-${n.id})`}
              stroke={n.color} strokeWidth={n.type==='hub'?2:n.type==='bom'?1.5:0.8}
              strokeOpacity={n.type==='vendor'?0.4:0.7}
              filter={n.type==='hub'?'url(#glow-lg)':n.type==='bom'?'url(#glow-sm)':'none'} />
            {n.type !== 'vendor' && (
              <>
                <text x={n.x} y={n.y-2} textAnchor="middle" dominantBaseline="middle" fontSize={n.type==='hub'?8.5:8} fontWeight="700" fill="white" fontFamily="Inter, system-ui" style={{letterSpacing:'-0.01em'}}>{n.label}</text>
                <text x={n.x} y={n.y+9} textAnchor="middle" dominantBaseline="middle" fontSize={5.5} fontWeight="700" fill={n.color} fontFamily="Inter, system-ui" opacity={0.9}>{n.sub}</text>
              </>
            )}
            {n.type === 'vendor' && (
              <text x={n.x+(n.x>290?14:-14)} y={n.y} textAnchor={n.x>290?'start':'end'} dominantBaseline="middle" fontSize={7.5} fontWeight="500" fill="#6B7589" fontFamily="Inter, system-ui">{n.label}</text>
            )}
          </g>
        ))}
        <rect x={244} y={260} width={88} height={15} rx={4} fill="rgba(0,177,220,0.12)" stroke="rgba(0,177,220,0.4)" strokeWidth={0.8} />
        <text x={288} y={268} textAnchor="middle" dominantBaseline="middle" fontSize={5.5} fontWeight="600" fill="#0092C4" fontFamily="Inter">CERT-In Verified ✓</text>
      </svg>

    </div>
  );
}
