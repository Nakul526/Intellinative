/**
 * Sectors "Securing India's Digital Infrastructure"
 * Banking & BFSI, Critical Infrastructure, AI-Driven Systems, GovTech/PSUs
 */
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Building2, Zap, BrainCircuit, Landmark, ArrowRight } from 'lucide-react';

const sectors = [
  {
    icon: Building2,
    label: 'Banking & BFSI',
    tag: 'RBI / SEBI',
    readiness: 95,
    color: '#00B1DC',
    bg: '#E6F7FC',
    border: 'rgba(0,177,220,0.3)',
    description:
      'RBI Advisory 11/2024 mandates SBOM for all technology service providers. IntelliXBOM generates, validates, and tracks BOM compliance for banks, NBFCs, and payment processors.',
    useCases: [
      'Vendor SBOM validation before onboarding',
      'Core banking software supply chain audit',
      'PCI-DSS cryptographic asset inventory',
    ],
  },
  {
    icon: Zap,
    label: 'Critical Infrastructure',
    tag: 'NCIIPC',
    readiness: 88,
    color: '#8B5CF6',
    bg: '#F3EEFE',
    border: 'rgba(139,92,246,0.3)',
    description:
      'NCIIPC mandates asset-level BOM visibility for power grids, telecom, and transport sectors. IntelliXBOM provides the HBOM and SBOM evidence required by sector CISO offices.',
    useCases: [
      'OT/ICS component firmware inventory',
      'Hardware supply chain risk scoring',
      'NCIIPC audit evidence package export',
    ],
  },
  {
    icon: BrainCircuit,
    label: 'AI Driven Systems',
    tag: 'MeitY AI Guidelines',
    readiness: 82,
    color: '#C8941F',
    bg: '#FBF5E5',
    border: 'rgba(200,148,31,0.3)',
    description:
      'MeitY\'s AI governance framework requires model provenance, dataset traceability, and bias reporting. IntelliXBOM\'s AIBOM module is the first Indian platform to address this natively.',
    useCases: [
      'ML model lineage & version tracking',
      'Training dataset PII & bias audit',
      'AI governance compliance report',
    ],
  },
  {
    icon: Landmark,
    label: 'GovTech & PSUs',
    tag: 'CERT-In / NIC',
    readiness: 76,
    color: '#4A5570',
    bg: '#EBEDF2',
    border: 'rgba(74,85,112,0.3)',
    description:
      'CERT-In Technical Guidelines v2.0 apply to all government IT vendors and PSUs. IntelliXBOM\'s self-hosted model meets NIC\'s data sovereignty requirements with zero cloud dependency.',
    useCases: [
      'CERT-In 21-field SBOM generation',
      'Air gapped NIC compliant deployment',
      'Cross-department BOM consolidation',
    ],
  },
];

function ReadinessBar({ value, color, inView, delay }: { value: number; color: string; inView: boolean; delay: number }) {
  return (
    <div className="mt-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] uppercase tracking-[0.08em] font-semibold"
          style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>
          Readiness Score
        </span>
        <span className="text-[13px] font-bold tabular-nums" style={{ color }}>{value}%</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--p3)' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}

export default function Sectors() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      style={{ background: 'var(--n10)' }}
    >
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 40% at 50% 100%, rgba(0,177,220,0.10), transparent 70%)' }} />

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="mb-12"
        >
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
            style={{ background: 'rgba(0,177,220,0.12)', border: '1px solid rgba(0,177,220,0.3)' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c4)', animation: 'pulse-dot 2s infinite' }} />
            <span
              className="text-[11px] uppercase tracking-[0.1em] font-bold select-none"
              style={{ color: 'var(--c4)', fontFamily: 'var(--f-m)' }}
            >
              Who We Protect
            </span>
          </div>

          <h2
            className="text-4xl md:text-[52px] font-bold leading-[1.05] mb-4"
            style={{ color: '#FFFFFF', letterSpacing: '-0.025em' }}
          >
            Securing India's{' '}
            <span style={{ color: 'var(--c4)' }}>Digital Infrastructure.</span>
          </h2>
          <p
            className="text-lg max-w-[520px] leading-relaxed"
            style={{ color: 'var(--n3)' }}
          >
            From BFSI to critical national infrastructure IntelliXBOM is trusted by regulated entities
            across India's most sensitive sectors.
          </p>
        </motion.div>

        {/* Sector grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <motion.div
                key={sector.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group rounded-2xl p-7 cursor-default"
                style={{ background: 'var(--n9)', border: '1px solid var(--n8)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = `${sector.color}55`;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--n8)';
                }}
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${sector.color}18`, border: `1px solid ${sector.color}35` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: sector.color }} />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-bold" style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>
                        {sector.label}
                      </h3>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded"
                        style={{
                          background: `${sector.color}18`,
                          color: sector.color,
                          fontFamily: 'var(--f-m)',
                          letterSpacing: '0.04em',
                        }}
                      >
                        {sector.tag}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[13px] leading-[1.65] mb-4" style={{ color: 'var(--n5)' }}>
                  {sector.description}
                </p>

                <div className="space-y-2 mb-4">
                  {sector.useCases.map((uc, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ background: sector.color }}
                      />
                      <span className="text-[12px]" style={{ color: 'var(--n4)' }}>{uc}</span>
                    </div>
                  ))}
                </div>

                <ReadinessBar value={sector.readiness} color={sector.color} inView={inView} delay={0.1 + i * 0.1} />
              </motion.div>
            );
          })}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-5 rounded-2xl px-7 py-6"
          style={{ background: 'rgba(0,177,220,0.07)', border: '1px solid rgba(0,177,220,0.2)' }}
        >
          <div>
            <div className="text-[15px] font-bold mb-1" style={{ color: '#FFFFFF' }}>
              Don't see your sector?
            </div>
            <div className="text-[13px]" style={{ color: 'var(--n4)' }}>
              IntelliXBOM is framework-agnostic. Talk to our team about your specific regulatory requirements.
            </div>
          </div>
          <button
            className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{ background: 'var(--c5)', color: '#FFF' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--c6)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--c5)')}
          >
            Talk to an Expert
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
