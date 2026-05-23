/**
 * SocialProof "Trusted by teams operating under"
 * Logo marquee strip only. Testimonial is now in Testimonial.tsx.
 */
import { motion } from 'motion/react';

const logos = [
  { name: 'CERT-In',   color: '#00B1DC' },
  { name: 'RBI',       color: '#C8941F' },
  { name: 'SEBI',      color: '#8B5CF6' },
  { name: 'NCIIPC',    color: '#10B981' },
  { name: 'MeitY',     color: '#5B6CFF' },
  { name: 'NIC India', color: '#00B1DC' },
  { name: 'IRDAI',     color: '#C8941F' },
  { name: 'NPCI',      color: '#8B5CF6' },
  { name: 'SEBI',      color: '#8B5CF6' },
  { name: 'RBI',       color: '#C8941F' },
];

export default function SocialProof() {
  return (
    <section
      className="py-10"
      style={{ background: 'var(--p2)', borderTop: '1px solid var(--p3)', borderBottom: '1px solid var(--p3)' }}
    >
      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-5"
      >
        <span
          className="text-[10px] uppercase tracking-[0.18em] font-semibold select-none"
          style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}
        >
          Trusted by teams operating under
        </span>
      </motion.div>

      {/* Marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--p2), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--p2), transparent)' }} />

        <div className="flex gap-3 animate-marquee pause-marquee" style={{ width: 'max-content' }}>
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-lg select-none cursor-default"
              style={{ background: 'var(--p0)', border: '1px solid var(--p3)' }}
            >
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: logo.color }} />
              <span
                className="text-[12px] font-semibold whitespace-nowrap"
                style={{ color: 'var(--ink-700)', fontFamily: 'var(--f-m)' }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
