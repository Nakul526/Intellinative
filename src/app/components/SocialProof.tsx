/**
 * SocialProof  "Guidelines Supported"
 * Static 2-row grid, full width, larger chips.
 */
import { motion } from 'motion/react';

const ROW1 = [
  { name: 'CERT-In',   color: '#00B1DC' },
  { name: 'RBI',       color: '#C8941F' },
  { name: 'SEBI',      color: '#8B5CF6' },
  { name: 'NCIIPC',    color: '#10B981' },
  { name: 'MeitY',     color: '#5B6CFF' },
];

const ROW2 = [
  { name: 'NIC India', color: '#00B1DC' },
  { name: 'IRDAI',     color: '#C8941F' },
  { name: 'NPCI',      color: '#8B5CF6' },
  { name: 'DPDP',      color: '#F97316' },
  { name: 'CSCRF',     color: '#10B981' },
];

function LogoChip({ name, color }: { name: string; color: string }) {
  return (
    <div
      className="flex items-center gap-3 px-6 py-3 rounded-xl select-none cursor-default flex-1 justify-center min-w-[120px]"
      style={{
        background: 'var(--p0)',
        border: '1px solid var(--p3)',
        boxShadow: '0 1px 4px rgba(14,26,46,0.05)',
      }}
    >
      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color }} />
      <span
        className="text-[14px] font-semibold whitespace-nowrap"
        style={{ color: 'var(--ink-700)', fontFamily: 'var(--f-m)' }}
      >
        {name}
      </span>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section
      className="py-12"
      style={{ background: 'var(--p1)', borderBottom: '1px solid var(--p3)' }}
    >
      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <span
          className="text-[20px] uppercase tracking-[0.20em] font-semibold select-none"
          style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}
        >
          Guidelines Supported
        </span>
      </motion.div>

      {/* Static 2-row grid  full width */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="max-w-[1200px] mx-auto px-6 lg:px-14 flex flex-col gap-4"
      >
        {/* Row 1 */}
        <div className="flex gap-4">
          {ROW1.map(logo => (
            <LogoChip key={logo.name} {...logo} />
          ))}
        </div>
        {/* Row 2 */}
        <div className="flex gap-4">
          {ROW2.map(logo => (
            <LogoChip key={logo.name} {...logo} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
