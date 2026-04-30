import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Quote, TrendingUp } from 'lucide-react';

const logos = [
  { name: 'CERT-In', color: '#4361EE' },
  { name: 'RBI', color: '#00D4AA' },
  { name: 'SEBI', color: '#8B5CF6' },
  { name: 'NCIIPC', color: '#F59E0B' },
  { name: 'MeitY', color: '#EF4444' },
  { name: 'NIC India', color: '#4361EE' },
  { name: 'IRDAI', color: '#00D4AA' },
  { name: 'NPCI', color: '#8B5CF6' },
];

export default function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      className="py-10"
      style={{ background: 'var(--app-bg-alt)', borderTop: '1px solid var(--app-border-subtle)' }}
    >
      {/* Trusted by label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <span className="text-[10px] uppercase tracking-[0.18em] font-bold select-none" style={{ color: 'var(--app-text-dimmer)' }}>
          Trusted by teams operating under
        </span>
      </motion.div>

      {/* Logo marquee */}
      <div className="relative overflow-hidden mb-10">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--app-bg-alt), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--app-bg-alt), transparent)' }}
        />

        <div className="flex gap-5 animate-marquee pause-marquee" style={{ width: 'max-content' }}>
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-2.5 px-5 py-2.5 rounded-xl select-none cursor-default transition-all duration-300 hover:scale-105"
              style={{
                background: `${logo.color}09`,
                border: `1px solid ${logo.color}28`
              }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: logo.color, boxShadow: `0 0 6px ${logo.color}` }}
              />
              <span className="text-[13px] font-bold whitespace-nowrap tracking-wide" style={{ color: 'var(--app-text-dim)' }}>
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial */}
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(67,97,238,0.07) 0%, rgba(0,212,170,0.04) 60%, var(--app-card-semi) 100%)',
            border: '1px solid rgba(67,97,238,0.18)',
          }}
        >
          {/* Top gradient line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(67,97,238,0.5), rgba(0,212,170,0.4), transparent)' }}
          />

          <div
            className="absolute top-0 right-0 w-72 h-72 pointer-events-none"
            style={{ background: 'radial-gradient(circle at top right, rgba(0,212,170,0.15), transparent 65%)' }}
          />
          <div
            className="absolute bottom-0 left-0 w-56 h-56 pointer-events-none"
            style={{ background: 'radial-gradient(circle at bottom left, rgba(67,97,238,0.12), transparent 65%)' }}
          />

          <div className="relative z-10 grid md:grid-cols-[220px,1fr] gap-0">
            {/* Left sidebar */}
            <div
              className="flex flex-col justify-between p-8 md:p-10 md:border-r"
              style={{ borderColor: 'var(--app-border-subtle)' }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-8"
                style={{
                  background: 'rgba(67,97,238,0.12)',
                  border: '1px solid rgba(67,97,238,0.28)'
                }}
              >
                <Quote className="w-6 h-6 text-[#4361EE]" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-black text-white mb-3"
                  style={{ background: 'linear-gradient(135deg, #4361EE, #3A0CA3)' }}
                >
                  AS
                </div>
                <div className="text-sm font-bold leading-tight" style={{ color: 'var(--app-text-primary)' }}>Arun Sharma</div>
                <div className="text-[12px] mt-0.5 leading-relaxed" style={{ color: 'var(--app-text-dimmer)' }}>CISO, National Bank<br />of Commerce</div>
                <div
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold mt-3"
                  style={{ background: 'rgba(0,212,170,0.1)', color: '#00D4AA', border: '1px solid rgba(0,212,170,0.2)' }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00D4AA]" />
                  Verified Customer
                </div>
              </motion.div>
            </div>

            {/* Right — quote */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-xl md:text-2xl lg:text-[26px] font-medium leading-[1.65] italic mb-8"
                style={{ color: 'var(--app-text-secondary)' }}
              >
                "IntelliXBOM found{' '}
                <span
                  className="font-black not-italic"
                  style={{
                    background: 'linear-gradient(90deg, #4361EE, #00D4AA)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  14 critical CERT-In violations
                </span>{' '}
                in our vendor's SBOM that our procurement team had completely missed. We caught this before signing a{' '}
                <span className="font-bold not-italic" style={{ color: 'var(--app-text-primary)' }}>₹2 crore contract.</span>"
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-6"
              >
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{ background: 'var(--app-elevated)', border: '1px solid var(--app-border)' }}
                >
                  <TrendingUp className="w-5 h-5 text-[#00D4AA]" />
                  <div>
                    <div className="text-sm font-black" style={{ color: 'var(--app-text-primary)' }}>₹2 Crore</div>
                    <div className="text-[11px]" style={{ color: 'var(--app-text-dimmer)' }}>Contract risk avoided</div>
                  </div>
                </div>
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{ background: 'var(--app-elevated)', border: '1px solid var(--app-border)' }}
                >
                  <div className="w-5 h-5 flex items-center justify-center text-[#4361EE]">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-black" style={{ color: 'var(--app-text-primary)' }}>14 violations</div>
                    <div className="text-[11px]" style={{ color: 'var(--app-text-dimmer)' }}>Caught automatically</div>
                  </div>
                </div>

                <div className="flex gap-2 ml-auto">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="h-1 rounded-full transition-all duration-200"
                      style={{ width: i === 0 ? 24 : 8, background: i === 0 ? '#4361EE' : 'var(--app-border)' }}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
