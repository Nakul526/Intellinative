/**
 * BreachStats — light theme
 * Two-part section placed after Challenge:
 *  1. Editorial split headline "black box" strikethrough + supporting text
 *  2. Light dual-panel Breach Math (78%) left | Regulatory Clock (4 mandates) right
 */
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Activity, Clock, ShieldCheck, Landmark, Building2, TrendingUp } from 'lucide-react';

const MANDATES = [
  {
    num: '01',
    name: 'CERT-In Technical Guidelines v2.0',
    desc: 'Software bill of materials for all CII operators',
    icon: ShieldCheck,
    iconColor: '#10B981',
    iconBg: 'rgba(16,185,129,0.12)',
    iconBorder: 'rgba(16,185,129,0.28)',
  },
  {
    num: '02',
    name: 'RBI Cybersecurity Advisory 11/2024',
    desc: 'Component-level governance for regulated entities',
    icon: Landmark,
    iconColor: '#00B1DC',
    iconBg: 'rgba(0,177,220,0.12)',
    iconBorder: 'rgba(0,177,220,0.28)',
  },
  {
    num: '03',
    name: 'MeitY SBOM Procurement Norms',
    desc: 'Mandatory SBOM for government software procurement',
    icon: Building2,
    iconColor: '#8B5CF6',
    iconBg: 'rgba(139,92,246,0.12)',
    iconBorder: 'rgba(139,92,246,0.28)',
  },
  {
    num: '04',
    name: 'CSCRF Annexure C — SEBI',
    desc: 'Crypto + supply chain disclosures — phased rollout',
    icon: TrendingUp,
    iconColor: '#C8941F',
    iconBg: 'rgba(200,148,31,0.12)',
    iconBorder: 'rgba(200,148,31,0.28)',
  },
];

export default function BreachStats() {
  const headerRef = useRef(null);
  const panelRef  = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const panelInView  = useInView(panelRef,  { once: true, margin: '-60px' });

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--p0)', borderTop: '1px solid var(--p3)' }}
    >
      {/* ── 1. EDITORIAL HEADER ─────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 pt-16 md:pt-20 pb-12 md:pb-14">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-7"
            style={{ background: 'rgba(229,57,53,0.08)', border: '1px solid rgba(229,57,53,0.22)' }}
          >
            <Activity className="w-3.5 h-3.5" style={{ color: '#EF5350' }} />
            <span
              className="text-[11px] uppercase tracking-[0.12em] font-bold"
              style={{ color: '#EF5350', fontFamily: 'var(--f-m)' }}
            >
              The Breach
            </span>
          </div>

          {/* Full-width headline with strikethrough */}
          <h2
            className="font-bold leading-[1.08]"
            style={{
              color: 'var(--ink-950)',
              letterSpacing: '-0.035em',
              fontSize: 'clamp(36px, 5.5vw, 72px)',
              fontFamily: 'var(--f-d)',
              maxWidth: '100%',
            }}
          >
            Modern digital infrastructure
            <br className="hidden sm:block" />
            {' '}is a{' '}
            <span
              style={{
                textDecoration: 'line-through',
                textDecorationColor: '#EF5350',
                textDecorationThickness: '4px',
                color: 'var(--ink-950)',
              }}
            >
              black box.
            </span>
            <br className="hidden sm:block" />
            {' '}Regulated India needs{' '}
            <span style={{ color: 'var(--c5)', fontStyle: 'italic' }}>
              IntelliXBOM.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* ── 2. LIGHT STATS PANEL ─────────────────────────────────── */}
      <motion.div
        ref={panelRef}
        initial={{ opacity: 0, y: 32 }}
        animate={panelInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mx-6 mb-6 md:mx-10 md:mb-10 xl:mx-auto xl:max-w-[1200px] rounded-2xl overflow-hidden"
        style={{ background: 'var(--p1)', border: '1px solid var(--p3)', boxShadow: '0 8px 40px rgba(14,26,46,0.08)' }}
      >
        <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x"
          style={{ '--tw-divide-opacity': 1, borderColor: 'var(--p3)' } as React.CSSProperties}>

          {/* ── LEFT: Breach Math ── */}
          <div className="relative p-8 md:p-10 overflow-hidden">
            {/* Subtle red glow */}
            <div className="absolute top-0 left-0 w-64 h-64 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(239,83,80,0.07), transparent 70%)' }} />

            {/* Label */}
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#EF5350', animation: 'pulse-dot 2s infinite' }} />
              <span className="text-[10px] uppercase tracking-[0.15em] font-bold"
                style={{ color: 'rgba(239,83,80,0.8)', fontFamily: 'var(--f-m)' }}>
                The Breach Math
              </span>
            </div>

            {/* Giant number */}
            <div className="flex items-end gap-0 mb-6 leading-none">
              <motion.span
                initial={{ opacity: 0, scale: 0.7 }}
                animate={panelInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="font-bold tabular-nums"
                style={{
                  fontSize: 'clamp(96px, 14vw, 148px)',
                  color: 'var(--ink-950)',
                  letterSpacing: '-0.05em',
                  fontFamily: 'var(--f-d)',
                  lineHeight: 1,
                }}
              >
                78
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={panelInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="font-bold mb-3"
                style={{
                  fontSize: 'clamp(40px, 6vw, 60px)',
                  color: '#EF5350',
                  letterSpacing: '-0.03em',
                  fontFamily: 'var(--f-d)',
                  lineHeight: 1,
                }}
              >
                %
              </motion.span>
            </div>

            {/* Description */}
            <p className="text-[14px] leading-[1.75] max-w-[320px]" style={{ color: 'var(--ink-500)' }}>
              of breaches exploit{' '}
              <span className="font-bold" style={{ color: 'var(--ink-950)' }}>known</span>{' '}
              vulnerabilities hiding inside untracked, transitively-pulled
              software components.
            </p>

            {/* Citation */}
            <div className="mt-4 mb-6">
              <span
                className="text-[10px] uppercase tracking-[0.1em]"
                style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}
              >
                Verizon DBIR 2025 Cohort
              </span>
            </div>

            {/* Q-Day callout */}
            <div className="relative rounded-xl overflow-hidden"
              style={{ background: 'rgba(0,177,220,0.06)', border: '1px solid rgba(0,177,220,0.22)' }}>
              <div className="absolute top-0 left-0 right-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, #00b1dc, #3DE0DC)' }} />
              <div className="px-4 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: '#00b1dc', animation: 'pulse-dot 2s infinite' }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em]"
                    style={{ color: '#00b1dc', fontFamily: 'var(--f-m)' }}>
                    Q-Day · Quantum Threat
                  </span>
                </div>
                <p className="text-[13px] leading-[1.65]" style={{ color: 'var(--ink-500)' }}>
                  Quantum computers will break RSA-2048 and ECDSA in as few as{' '}
                  <span className="font-bold" style={{ color: 'var(--ink-950)' }}>8 years.</span>{' '}
                  Without a QBOM today, you cannot map — let alone migrate — vulnerable
                  crypto before the deadline.
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Regulatory Clock ── */}
          <div className="relative p-8 md:p-10 overflow-hidden">
            {/* Subtle cyan glow */}
            <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,177,220,0.07), transparent 70%)' }} />

            {/* Label row */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5" style={{ color: 'rgba(0,177,220,0.8)' }} />
                <span className="text-[10px] uppercase tracking-[0.15em] font-bold"
                  style={{ color: 'rgba(0,177,220,0.8)', fontFamily: 'var(--f-m)' }}>
                  The Regulatory Clock
                </span>
              </div>
              <div
                className="px-2.5 py-1 rounded text-[10px] font-bold"
                style={{
                  background: 'rgba(200,148,31,0.12)',
                  border: '1px solid rgba(200,148,31,0.35)',
                  color: '#C8941F',
                  fontFamily: 'var(--f-m)',
                  letterSpacing: '0.05em',
                }}
              >
                IN FORCE TODAY
              </div>
            </div>

            {/* Heading */}
            <h3
              className="text-[18px] md:text-[20px] font-bold leading-[1.35] mb-7"
              style={{ color: 'var(--ink-950)', letterSpacing: '-0.02em' }}
            >
              3 Indian mandates already require SBOM / CBOM
              evidence with more landing in 2026.
            </h3>

            {/* Mandate list */}
            <div className="space-y-3">
              {MANDATES.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.num}
                    initial={{ opacity: 0, x: 16 }}
                    animate={panelInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.45, delay: 0.35 + i * 0.08 }}
                    className="flex items-center gap-3 py-3 px-4 rounded-xl"
                    style={{ background: 'var(--p0)', border: '1px solid var(--p3)' }}
                  >
                    {/* Number */}
                    <span
                      className="flex-shrink-0 text-[10px] font-bold w-5 tabular-nums"
                      style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}
                    >
                      {m.num}
                    </span>

                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: m.iconBg, border: `1px solid ${m.iconBorder}` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: m.iconColor }} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-semibold leading-tight mb-0.5"
                        style={{ color: 'var(--ink-950)' }}>
                        {m.name}
                      </div>
                      <div className="text-[11px]" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>
                        {m.desc}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
