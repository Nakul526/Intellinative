/**
 * Challenge  light theme, matching reference screenshot exactly.
 * Layout:
 *   1. Centered eyebrow pill + H2 + subtitle
 *   2. Two wide stat cards (78% donut | 3 building icon)
 *   3. Five equal challenge cards in one row (01–05)
 */
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  AlertTriangle, ShieldAlert, Lock, Calendar,
  HardDrive, Landmark,
} from 'lucide-react';


/* ── Five challenge cards ──────────────────────────────────── */
const CHALLENGES = [
  {
    num: '01',
    icon: ShieldAlert,
    color: '#8B5CF6',
    bg: '#F3EEFE',
    border: 'rgba(139,92,246,0.22)',
    tag: 'Q-Day',
    title: 'Quantum Threat',
    body: 'Quantum computers will break RSA-2048 and ECDSA in as few as 8 years. Without a QBOM today, you cannot map  let alone migrate  vulnerable crypto before the deadline.',
  },
  {
    num: '02',
    icon: AlertTriangle,
    color: '#E53935',
    bg: '#FEF2F2',
    border: 'rgba(229,57,53,0.22)',
    tag: 'Supply Chain',
    title: 'Supply Chain Attacks',
    body: "SolarWinds, XZ Utils, Log4Shell. Attackers compromise upstream packages that ship inside trusted software. Without an SBOM, you have no way to know if your vendor's build is compromised.",
  },
  {
    num: '03',
    icon: Lock,
    color: '#5B6CFF',
    bg: '#EEEFFE',
    border: 'rgba(91,108,255,0.22)',
    tag: 'Crypto Debt',
    title: 'Cryptographic Debt',
    body: 'TLS 1.0/1.1, MD5, SHA-1, and 1024-bit keys still linger in production systems years after deprecation. A CBOM surfaces the debt so your teams can eliminate it before regulators do.',
  },
  {
    num: '04',
    icon: Calendar,
    color: '#C8941F',
    bg: '#FBF5E5',
    border: 'rgba(200,148,31,0.22)',
    tag: 'Regulatory',
    title: 'Regulatory Deadlines',
    body: 'CERT-In Technical Guidelines v2.0, RBI Advisory 11/2024, and MeitY SBOM mandates are in force now. Non-compliance carries financial penalties and operational restrictions.',
  },
  {
    num: '05',
    icon: HardDrive,
    color: '#4A5570',
    bg: '#EBEDF2',
    border: 'rgba(74,85,112,0.22)',
    tag: 'Hardware',
    title: 'Hardware Trust Gaps',
    body: 'Untracked firmware, opaque chips, and undocumented components create invisible risks. Without HBOM, you cannot attest to hardware integrity.',
  },
];

/* ── Animated donut ring (78 %) ────────────────────────────── */
function DonutRing({ inView }: { inView: boolean }) {
  const r = 24, sw = 5;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="60" height="60" viewBox="0 0 60 60" className="flex-shrink-0">
      <circle cx="30" cy="30" r={r} fill="none" stroke="rgba(239,83,80,0.15)" strokeWidth={sw} />
      <motion.circle
        cx="30" cy="30" r={r}
        fill="none" stroke="#EF5350" strokeWidth={sw} strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={inView ? { strokeDashoffset: circ * (1 - 0.78) } : { strokeDashoffset: circ }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '50% 50%', transform: 'rotate(-90deg)' }}
      />
    </svg>
  );
}

export default function Challenge() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      style={{ background: 'var(--p0)', borderTop: '1px solid var(--p3)' }}
    >
      <div className="max-w-[1200px] mx-auto" ref={ref}>

        {/* ── 1. CENTERED HEADER ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          {/* Eyebrow pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(229,57,53,0.07)', border: '1px solid rgba(229,57,53,0.25)' }}>
            <AlertTriangle className="w-3.5 h-3.5" style={{ color: '#EF5350' }} />
            <span className="text-[11px] uppercase tracking-[0.13em] font-bold"
              style={{ color: '#EF5350', fontFamily: 'var(--f-m)' }}>
              The Challenge
            </span>
          </div>

          {/* Heading */}
          <h2
            className="font-bold leading-[1.1] mb-5"
            style={{
              color: 'var(--ink-950)',
              letterSpacing: '-0.028em',
              fontSize: 'clamp(30px, 4.8vw, 60px)',
              fontFamily: 'var(--f-d)',
            }}
          >
            Why India's Regulated Entities Need
            <br />
            <span style={{ color: 'var(--c5)' }}>IntelliXBOM</span>
          </h2>

          {/* Subtitle */}
          <p className="text-[15px] leading-[1.75] max-w-[500px] mx-auto"
            style={{ color: 'var(--ink-500)' }}>
            Modern digital infrastructure is a black box. Without BOM visibility,
            you're flying blind in a threat landscape that punishes ignorance.
          </p>
        </motion.div>

        {/* ── 2. STAT CARDS ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="grid md:grid-cols-2 gap-4 mb-8"
        >
          {/* 78% card */}
          <div className="flex items-center gap-5 px-6 py-5 rounded-2xl"
            style={{ background: 'var(--p1)', border: '1px solid var(--p3)', boxShadow: 'var(--sh-sm)' }}>
            <DonutRing inView={inView} />
            <div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-bold tabular-nums"
                  style={{ fontSize: 'clamp(32px, 4vw, 44px)', color: '#EF5350', letterSpacing: '-0.04em', fontFamily: 'var(--f-d)', lineHeight: 1 }}>
                  78%
                </span>
              </div>
              <p className="text-[13px] leading-[1.5]" style={{ color: 'var(--ink-500)' }}>
                of breaches exploit known vulnerabilities
                <br />hidden in untracked software components
              </p>
            </div>
          </div>

          {/* 3 mandates card */}
          <div className="flex items-center gap-5 px-6 py-5 rounded-2xl"
            style={{ background: 'var(--p1)', border: '1px solid var(--p3)', boxShadow: 'var(--sh-sm)' }}>
            {/* Gold institution icon circle */}
            <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(200,148,31,0.12)', border: '2px solid rgba(200,148,31,0.28)' }}>
              <Landmark className="w-6 h-6" style={{ color: 'var(--gold-5)' }} />
            </div>
            <div>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="font-bold tabular-nums"
                  style={{ fontSize: 'clamp(32px, 4vw, 44px)', color: 'var(--gold-5)', letterSpacing: '-0.04em', fontFamily: 'var(--f-d)', lineHeight: 1 }}>
                  3
                </span>
              </div>
              <p className="text-[13px] leading-[1.5]" style={{ color: 'var(--ink-500)' }}>
                Indian regulatory mandates now require
                <br />SBOM/CBOM compliance  in force today
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── 3. FIVE CHALLENGE CARDS ────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CHALLENGES.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.num}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.22 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col rounded-2xl p-5 cursor-default transition-all duration-200"
                style={{
                  background: 'var(--p0)',
                  border: '1px solid var(--p3)',
                  boxShadow: 'var(--sh-xs)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = c.border.replace('0.22', '0.55');
                  el.style.background = c.bg;
                  el.style.boxShadow = `0 8px 28px ${c.color}12`;
                  el.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--p3)';
                  el.style.background = 'var(--p0)';
                  el.style.boxShadow = 'var(--sh-xs)';
                  el.style.transform = 'translateY(0)';
                }}
              >
                {/* Top accent bar on hover */}
                <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: c.color }} />

                {/* Number + icon row */}
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold select-none flex-shrink-0"
                    style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}`, fontFamily: 'var(--f-m)' }}>
                    {c.num}
                  </div>
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: c.bg, border: `1px solid ${c.border}` }}>
                    <Icon className="w-[18px] h-[18px]" style={{ color: c.color }} />
                  </div>
                </div>

                {/* Tag */}
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-3 self-start"
                  style={{ background: c.bg, color: c.color, border: `1px solid ${c.border}`, fontFamily: 'var(--f-m)', letterSpacing: '0.04em' }}>
                  {c.tag}
                </span>

                {/* Title */}
                <h3 className="text-[14px] font-bold mb-2 leading-snug"
                  style={{ color: 'var(--ink-950)', letterSpacing: '-0.01em' }}>
                  {c.title}
                </h3>

                {/* Body */}
                <p className="text-[12px] leading-[1.65]" style={{ color: 'var(--ink-500)' }}>
                  {c.body}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
