/**
 * Testimonial  horizontal layout: author left | quote right
 */
import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Quote, TrendingUp, Star, ShieldCheck } from 'lucide-react';

const stats = [
  {
    Icon: TrendingUp,
    color: 'var(--sem-success)',
    value: '₹2 Crore',
    label: 'Contract risk avoided',
  },
  {
    Icon: ShieldCheck,
    color: 'var(--c5)',
    value: '14 violations',
    label: 'Caught automatically',
  },
  {
    Icon: Star,
    color: 'var(--gold-5)',
    value: '60 seconds',
    label: 'Time to first result',
  },
];

export default function Testimonial() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-16 md:py-20 px-6"
      style={{ background: 'var(--p1)', borderTop: '1px solid var(--p3)' }}
    >
      <div className="max-w-[1200px] mx-auto">

        {/* Eyebrow */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4"
            style={{ background: 'var(--c1)', border: '1px solid var(--c2)' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--c5)', animation: 'pulse-dot 2s infinite' }} />
            <span className="text-[11px] uppercase tracking-[0.1em] font-bold select-none"
              style={{ color: 'var(--c6)', fontFamily: 'var(--f-m)' }}>
              Customer Story
            </span>
          </div>
          <h2 className="text-3xl md:text-[40px] font-bold leading-tight"
            style={{ color: 'var(--ink-950)', letterSpacing: '-0.025em' }}>
            Trusted by India's security leaders.
          </h2>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative rounded-2xl overflow-hidden"
          style={{ background: 'var(--p0)', border: '1px solid var(--p3)', boxShadow: 'var(--sh-lg)' }}
        >
          {/* Gold→cyan left stripe */}
          <div className="absolute top-0 left-0 bottom-0 w-1"
            style={{ background: 'linear-gradient(180deg, var(--gold-5), var(--c5))' }} />

          {/* Top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,148,31,0.5), rgba(0,177,220,0.4), transparent)' }} />

          {/* Horizontal grid: left author | right quote */}
          <div className="relative z-10 flex flex-col md:flex-row">

            {/* ── LEFT: Author details ── */}
            <div className="flex-shrink-0 flex flex-col gap-5 p-8 md:p-10 md:border-r"
              style={{ borderColor: 'var(--p3)', background: 'var(--p1)', width: '100%', maxWidth: 260 }}>

              {/* Quote icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--c1)', border: '1px solid var(--c2)' }}>
                <Quote className="w-5 h-5" style={{ color: 'var(--c5)' }} />
              </motion.div>

              {/* Avatar + name */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white mb-3"
                  style={{
                    background: 'linear-gradient(135deg, var(--c5), var(--c6))',
                    boxShadow: '0 2px 8px rgba(0,177,220,0.35)',
                  }}>
                  AS
                </div>
                <div className="text-[14px] font-bold leading-tight mb-0.5" style={{ color: 'var(--ink-950)' }}>
                  Arun Sharma
                </div>
                <div className="text-[12px] leading-relaxed mb-4" style={{ color: 'var(--ink-500)' }}>
                  CISO, National Bank<br />of Commerce
                </div>

                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[1,2,3,4,5].map(n => (
                    <Star key={n} className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--gold-5)' }} />
                  ))}
                </div>

                {/* Verified badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-semibold"
                  style={{
                    background: 'var(--sem-success-bg)',
                    color: 'var(--sem-success)',
                    border: '1px solid rgba(16,185,129,0.2)',
                    fontFamily: 'var(--f-m)',
                  }}>
                  <div className="w-1.5 h-1.5 rounded-full"
                    style={{ background: 'var(--sem-success)', animation: 'pulse-dot 2s infinite' }} />
                  Verified Customer
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT: Quote + stats ── */}
            <div className="flex flex-col justify-center flex-1 p-8 md:p-12">
              {/* Decorative quote mark */}
              <div className="text-[72px] leading-none font-serif select-none mb-2 -mt-2"
                style={{ color: 'rgba(0,177,220,0.12)', fontFamily: 'Georgia, serif', lineHeight: 1 }}>
                "
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xl md:text-2xl lg:text-[26px] font-medium leading-[1.65] mb-8"
                style={{ color: 'var(--ink-700)', fontStyle: 'italic' }}
              >
                IntelliXBOM found{' '}
                <span className="font-bold not-italic" style={{ color: 'var(--sem-critical)' }}>
                  14 critical CERT-In violations
                </span>{' '}
                in our vendor's SBOM that our procurement team had completely missed.
                We caught this before signing a{' '}
                <span className="font-bold not-italic" style={{ color: 'var(--ink-950)' }}>
                  ₹2 crore contract.
                </span>
              </motion.p>

              {/* Stats chips */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-3 flex-wrap"
              >
                {stats.map((item, i) => (
                  <div key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'var(--p1)', border: '1px solid var(--p3)' }}>
                    <item.Icon className="w-4 h-4 flex-shrink-0" style={{ color: item.color }} />
                    <div>
                      <div className="text-sm font-bold" style={{ color: 'var(--ink-950)', fontFamily: 'var(--f-m)' }}>
                        {item.value}
                      </div>
                      <div className="text-[11px]" style={{ color: 'var(--ink-500)' }}>{item.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
