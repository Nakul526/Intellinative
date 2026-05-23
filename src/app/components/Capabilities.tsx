import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Zap, Activity, Shield, Map, FileText, CircleDot, ArrowUpRight } from 'lucide-react';

const capabilities = [
  {
    icon: Zap,
    color: 'var(--c5)',
    hexColor: '#00B1DC',
    title: 'Automated BOM Generation',
    description: 'Runtime discovery and continuous inventory with zero manual effort. Scheduled at daily, weekly, or custom intervals across every environment.',
    featured: true,
    badge: 'Runtime Discovery',
  },
  {
    icon: Activity,
    color: '#10B981',
    hexColor: '#10B981',
    title: 'Continuous Validation',
    description: 'Real-time change detection and alerting. Instant notification when any component deviates from your approved security baseline.',
    badge: 'Real-Time Alerting',
  },
  {
    icon: Shield,
    color: '#8B5CF6',
    hexColor: '#8B5CF6',
    title: 'Tamper-Evident Records',
    description: 'Immutable audit trails with cryptographic verification. Every change timestamped and sealed — unforgeable, indefinitely retained.',
    badge: 'Cryptographic Audit',
  },
  {
    icon: Map,
    color: '#00B1DC',
    hexColor: '#00B1DC',
    title: 'Air-Gapped Deployment',
    description: 'Full capability in classified, regulated environments with zero internet connectivity. Complete data sovereignty — no external SaaS, ever.',
    badge: 'Data Sovereignty',
  },
  {
    icon: FileText,
    color: '#5B6CFF',
    hexColor: '#5B6CFF',
    title: 'Regulator-Ready Reports',
    description: 'One-click compliance packages formatted for CERT-In, RBI, and MeitY submissions. Audit-ready in minutes, not weeks.',
    badge: 'Auto-Generated',
  },
  {
    icon: CircleDot,
    color: '#C8941F',
    hexColor: '#C8941F',
    title: 'Policy-Driven Controls',
    description: 'Automated governance enforcement. Define policies once — applied uniformly across your entire infrastructure without human intervention.',
    badge: 'Zero-Touch Governance',
  },
];

function hexToRgb(hex: string) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1], 16)}, ${parseInt(r[2], 16)}, ${parseInt(r[3], 16)}` : '0, 177, 220';
}

export default function Capabilities() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' });

  return (
    <section
      className="relative py-14 md:py-20 px-6 overflow-hidden"
      style={{ background: 'var(--p1)', borderTop: '1px solid var(--p3)' }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,177,220,0.07), transparent 70%)' }}
      />

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: 'var(--c1)', border: '1px solid var(--c2)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c5)' }} />
            <span
              className="text-[11px] uppercase tracking-[0.1em] font-bold select-none"
              style={{ color: 'var(--c6)', fontFamily: 'var(--f-m)' }}
            >
              Platform
            </span>
          </div>

          <h2
            className="text-4xl md:text-[52px] font-bold tracking-tight leading-[1.05] mb-4"
            style={{ color: 'var(--ink-950)', letterSpacing: '-0.025em' }}
          >
            Enterprise-Grade{' '}
            <span style={{ color: 'var(--c5)' }}>Capabilities</span>
          </h2>
          <p
            className="text-[15px] max-w-[520px] leading-relaxed"
            style={{ color: 'var(--ink-600)' }}
          >
            Zero tolerance for blind spots. Every feature purpose-built for mission-critical
            regulated environments.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div
          ref={gridRef}
          className="grid md:grid-cols-3 gap-3.5"
        >
          {/* Featured card 2 cols × 2 rows */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={gridInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 md:row-span-2 group relative rounded-2xl overflow-hidden cursor-default"
            style={{
              background: 'var(--p0)',
              border: '1px solid var(--p3)',
              boxShadow: 'var(--sh-sm)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--c3)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--sh-glow)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'var(--p3)';
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--sh-sm)';
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: 'var(--c5)' }}
            />

            <div className="relative z-10 p-9 h-full flex flex-col">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                style={{ background: 'var(--c1)', border: '1px solid var(--c2)' }}
              >
                <Zap className="w-6 h-6" style={{ color: 'var(--c5)' }} />
              </div>

              <h3
                className="text-xl font-bold mb-3 leading-tight"
                style={{ color: 'var(--ink-950)', letterSpacing: '-0.015em' }}
              >
                {capabilities[0].title}
              </h3>
              <p className="text-[15px] leading-relaxed flex-1" style={{ color: 'var(--ink-600)' }}>
                {capabilities[0].description}
              </p>

              <div className="flex gap-2 mt-5">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.07em] px-2.5 py-1 rounded"
                  style={{
                    background: 'var(--c1)',
                    color: 'var(--c7)',
                    border: '1px solid var(--c2)',
                    fontFamily: 'var(--f-m)',
                  }}
                >
                  <div className="w-1 h-1 rounded-full" style={{ background: 'var(--c5)' }} />
                  {capabilities[0].badge}
                </span>
              </div>

              <div
                className="mt-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-250"
                style={{ transform: 'translateY(4px)' }}
              >
                <span className="text-sm font-semibold" style={{ color: 'var(--c5)' }}>Learn more</span>
                <ArrowUpRight className="w-4 h-4" style={{ color: 'var(--c5)' }} />
              </div>
            </div>
          </motion.div>

          {/* Smaller cards */}
          {capabilities.slice(1).map((cap, i) => {
            const Icon = cap.icon;
            const rgb = hexToRgb(cap.hexColor);
            return (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 22 }}
                animate={gridInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.14 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group relative rounded-2xl overflow-hidden cursor-default"
                style={{
                  background: 'var(--p0)',
                  border: '1px solid var(--p3)',
                  boxShadow: 'var(--sh-xs)',
                  minHeight: '180px',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `rgba(${rgb}, 0.45)`;
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px rgba(${rgb}, 0.12)`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--p3)';
                  (e.currentTarget as HTMLElement).style.boxShadow = 'var(--sh-xs)';
                }}
              >
                {/* Top stripe */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{ background: cap.hexColor }}
                />

                <div className="relative z-10 p-6 h-full flex flex-col pt-8">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `rgba(${rgb}, 0.10)`,
                      border: `1px solid rgba(${rgb}, 0.22)`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: cap.hexColor }} />
                  </div>

                  <h3
                    className="text-[13px] font-bold mb-1.5 leading-tight"
                    style={{ color: 'var(--ink-950)' }}
                  >
                    {cap.title}
                  </h3>
                  <p
                    className="text-[11px] leading-[1.6] line-clamp-3 flex-1"
                    style={{ color: 'var(--ink-600)' }}
                  >
                    {cap.description}
                  </p>

                  <div className="mt-3">
                    <span
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.06em] px-2 py-0.5 rounded"
                      style={{
                        background: `rgba(${rgb}, 0.08)`,
                        border: `1px solid rgba(${rgb}, 0.22)`,
                        color: cap.hexColor,
                        fontFamily: 'var(--f-m)',
                      }}
                    >
                      <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cap.hexColor }} />
                      {cap.badge}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
