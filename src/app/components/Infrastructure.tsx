/**
 * Infrastructure "Built for Resilience & Sovereignty"
 * Active-Active HA architecture diagram section.
 */
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Server, Shield, HardDrive, Lock, Cpu, Network } from 'lucide-react';

const archNodes = [
  {
    id: 'lb',
    label: 'Load Balancer',
    sub: 'Active-Active HA',
    icon: Network,
    color: '#00B1DC',
    bg: '#E6F7FC',
    border: 'rgba(0,177,220,0.35)',
    col: 1,
    row: 1,
  },
  {
    id: 'api1',
    label: 'API Node A',
    sub: 'Zone 1',
    icon: Server,
    color: '#5B6CFF',
    bg: '#EEEFFE',
    border: 'rgba(91,108,255,0.3)',
    col: 0,
    row: 2,
  },
  {
    id: 'api2',
    label: 'API Node B',
    sub: 'Zone 2',
    icon: Server,
    color: '#5B6CFF',
    bg: '#EEEFFE',
    border: 'rgba(91,108,255,0.3)',
    col: 2,
    row: 2,
  },
  {
    id: 'vault',
    label: 'Key Vault',
    sub: 'HSM Backed',
    icon: Lock,
    color: '#8B5CF6',
    bg: '#F3EEFE',
    border: 'rgba(139,92,246,0.3)',
    col: 1,
    row: 2,
  },
  {
    id: 'db',
    label: 'Distributed DB',
    sub: 'RAFT consensus',
    icon: HardDrive,
    color: '#C8941F',
    bg: '#FBF5E5',
    border: 'rgba(200,148,31,0.3)',
    col: 1,
    row: 3,
  },
  {
    id: 'tpm',
    label: 'TPM / Secure Boot',
    sub: 'Hardware Root of Trust',
    icon: Cpu,
    color: '#10B981',
    bg: '#E6F8F2',
    border: 'rgba(16,185,129,0.3)',
    col: 0,
    row: 3,
  },
  {
    id: 'audit',
    label: 'Audit Log Store',
    sub: 'Tamper-Evident',
    icon: Shield,
    color: '#4A5570',
    bg: '#EBEDF2',
    border: 'rgba(74,85,112,0.3)',
    col: 2,
    row: 3,
  },
];

const properties = [
  {
    label: 'Air-Gap Capable',
    description: 'Zero external network dependencies. Deploy fully offline in classified environments.',
    color: '#00B1DC',
    bg: '#E6F7FC',
  },
  {
    label: 'Active-Active HA',
    description: 'Multi-zone replication with automatic failover 99.99% uptime SLA for critical infra.',
    color: '#5B6CFF',
    bg: '#EEEFFE',
  },
  {
    label: 'HSM Backed Keys',
    description: 'All BOM signing keys stored in FIPS 140-2 Level 3 validated Hardware Security Modules.',
    color: '#8B5CF6',
    bg: '#F3EEFE',
  },
  {
    label: 'RBAC + Audit Logs',
    description: 'Role-based access control with cryptographically signed, tamper-evident audit trails.',
    color: '#10B981',
    bg: '#E6F8F2',
  },
  {
    label: 'Data Sovereignty',
    description: 'All data stays within your perimeter. No cloud telemetry. No vendor lock-in.',
    color: '#C8941F',
    bg: '#FBF5E5',
  },
  {
    label: 'Regulator Ready',
    description: 'Pre-built evidence packages for CERT-In, RBI, MeitY, and NCIIPC audit submissions.',
    color: '#4A5570',
    bg: '#EBEDF2',
  },
];

export default function Infrastructure() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      style={{ background: 'var(--p1)', borderTop: '1px solid var(--p3)' }}
    >
      {/* Subtle bg glow */}
      <div
        className="absolute bottom-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(91,108,255,0.06), transparent 70%)' }}
      />

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
            style={{ background: 'var(--c1)', border: '1px solid var(--c2)' }}
          >
            <Server className="w-3.5 h-3.5" style={{ color: 'var(--c5)' }} />
            <span
              className="text-[11px] uppercase tracking-[0.1em] font-bold select-none"
              style={{ color: 'var(--c6)', fontFamily: 'var(--f-m)' }}
            >
              Architecture
            </span>
          </div>

          <h2
            className="text-4xl md:text-[52px] font-bold leading-[1.05] mb-4"
            style={{ color: 'var(--ink-950)', letterSpacing: '-0.025em' }}
          >
            Built for Resilience{' '}
            <span style={{ color: 'var(--c5)' }}>&amp; Sovereignty.</span>
          </h2>
          <p
            className="text-lg max-w-[520px] leading-relaxed"
            style={{ color: 'var(--ink-600)' }}
          >
            IntelliXBOM is engineered for India's most demanding regulated environments —
            air gapped deployments, HSM key storage, and zero external dependencies.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Architecture diagram */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: 'var(--p0)',
              border: '1px solid var(--p3)',
              boxShadow: 'var(--sh-md)',
            }}
          >
            {/* Grid background */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  'linear-gradient(var(--p3) 1px, transparent 1px), linear-gradient(90deg, var(--p3) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            <div className="relative z-10">
              <div className="text-[11px] font-bold mb-6 uppercase tracking-[0.1em]"
                style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>
                IntelliXBOM Active-Active HA Deployment
              </div>

              {/* Architecture grid */}
              <div className="grid grid-cols-3 gap-3">
                {archNodes.map((node, i) => {
                  const Icon = node.icon;
                  // Position using CSS grid area
                  const gridStyle: React.CSSProperties = {
                    gridColumn: node.col + 1,
                    gridRow: node.row,
                  };
                  return (
                    <motion.div
                      key={node.id}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl cursor-default"
                      style={{
                        ...gridStyle,
                        background: node.bg,
                        border: `1px solid ${node.border}`,
                      }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${node.color}22`, border: `1px solid ${node.border}` }}
                      >
                        <Icon className="w-4 h-4" style={{ color: node.color }} />
                      </div>
                      <div className="text-center">
                        <div className="text-[11px] font-bold leading-tight" style={{ color: node.color }}>
                          {node.label}
                        </div>
                        <div className="text-[9px] mt-0.5" style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}>
                          {node.sub}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Connection lines label */}
              <div
                className="mt-5 flex items-center gap-2 text-[11px]"
                style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}
              >
                <div className="w-6 h-[2px] rounded" style={{ background: 'var(--c5)' }} />
                <span>mTLS encrypted inter-node communication</span>
              </div>
            </div>
          </motion.div>

          {/* Right Property grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {properties.map((prop, i) => (
              <motion.div
                key={prop.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.07 }}
                className="group rounded-xl p-5 cursor-default"
                style={{
                  background: 'var(--p0)',
                  border: '1px solid var(--p3)',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = prop.border || `${prop.color}55`;
                  (e.currentTarget as HTMLElement).style.background = prop.bg;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--p3)';
                  (e.currentTarget as HTMLElement).style.background = 'var(--p0)';
                }}
              >
                <div
                  className="inline-block text-[10px] font-bold px-2.5 py-1 rounded mb-2"
                  style={{
                    background: prop.bg,
                    color: prop.color,
                    border: `1px solid ${prop.color}33`,
                    fontFamily: 'var(--f-m)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {prop.label}
                </div>
                <p className="text-[12px] leading-[1.6]" style={{ color: 'var(--ink-600)' }}>
                  {prop.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.65 }}
          className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl px-7 py-5"
          style={{ background: 'var(--c1)', border: '1px solid var(--c2)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: 'var(--c2)', border: '1px solid var(--c3)' }}
            >
              <Shield className="w-4 h-4" style={{ color: 'var(--c5)' }} />
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--ink-950)' }}>
                100% self-hosted. Zero data leaves your perimeter.
              </div>
              <div className="text-[12px] mt-0.5" style={{ color: 'var(--ink-600)' }}>
                Deploy on-premise, in a private cloud, or in a fully air gapped environment.
              </div>
            </div>
          </div>
          <a
            href="/architecture"
            className="flex-shrink-0 text-sm font-semibold whitespace-nowrap transition-opacity"
            style={{ color: 'var(--c5)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.7')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            View Architecture Docs →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
