import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Shield, Zap, Mail } from 'lucide-react';
import { openDemoModal } from './DemoModal';

export default function CTA() {
  return (
    <section
      className="relative py-20 md:py-28 px-6 overflow-hidden"
      style={{ background: '#060B14', borderTop: '1px solid #1A2030' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            background: 'radial-gradient(circle, rgba(61,199,246,0.07) 0%, transparent 65%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -55%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[820px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
            style={{
              background: 'rgba(61,199,246,0.08)',
              border: '1px solid rgba(61,199,246,0.2)',
            }}
          >
            <Zap className="w-3.5 h-3.5" style={{ color: '#3DC7F6' }} />
            <span
              className="text-[11px] uppercase tracking-[0.1em] font-bold select-none"
              style={{ color: '#3DC7F6', fontFamily: 'var(--f-m)' }}
            >
              Platform
            </span>
          </div>

          {/* Headline */}
          <h2
            className="text-[36px] md:text-[52px] font-bold leading-[1.05] mb-5"
            style={{ color: '#FFFFFF', letterSpacing: '-0.03em' }}
          >
            See everything.<br />
            <span style={{ color: '#3DC7F6' }}>Miss nothing.</span>
          </h2>

          <p
            className="text-[17px] mb-10 max-w-[520px] mx-auto leading-[1.75]"
            style={{ color: '#C5CCD8' }}
          >
            IntelliXBOM gives your security, compliance, and engineering teams
            a single unified view across every BOM type  live, validated, and
            regulator-ready.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={openDemoModal}
              className="group flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold rounded-xl"
              style={{
                background: '#3DC7F6',
                color: '#060B14',
                boxShadow: '0 2px 24px rgba(61,199,246,0.35)',
              }}
            >
              Get Free Compliance Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <motion.button
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openDemoModal}
              className="flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-medium rounded-xl transition-all duration-200"
              style={{
                color: '#C5CCD8',
                border: '1px solid #1A2030',
                background: '#0E1A2E',
              }}
            >
              Contact Sales
            </motion.button>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {[
              { Icon: CheckCircle2, text: 'No credit card' },
              { Icon: Shield,       text: 'Instant validation' },
              { Icon: Zap,          text: 'CERT-In report in 60s' },
            ].map(({ Icon, text }, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-[13px]"
                style={{ color: '#4B5570' }}
              >
                <Icon className="w-4 h-4" style={{ color: '#3DC7F6' }} />
                {text}
              </div>
            ))}
          </div>

          {/* Email */}
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-3.5 h-3.5" style={{ color: '#3DC7F6' }} />
            <span className="text-[13px]" style={{ color: '#4B5570' }}>Enterprise enquiries: </span>
            <a
              href="mailto:sales@intellixbom.com"
              className="text-[13px] font-medium transition-colors"
              style={{ color: '#3DC7F6' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#7DDCF8')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = '#3DC7F6')}
            >
              sales@intellixbom.com
            </a>
          </div>

          {/* Dark stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
            {[
              { value: '5',    label: 'BOM Types',     sub: 'SBOM · CBOM · QBOM · AIBOM · HBOM' },
              { value: '21',   label: 'CERT-In Fields', sub: 'Auto-validated on every push' },
              { value: '10+',  label: 'Regulators',    sub: 'CERT-In · RBI · SEBI · MeitY' },
              { value: '100%', label: 'On-Premise',    sub: 'Air-gap & data sovereignty ready' },
            ].map((s, i) => (
              <div
                key={i}
                className="rounded-xl p-5 text-left"
                style={{ background: '#0E1A2E', border: '1px solid #1A2030' }}
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ color: '#3DC7F6', letterSpacing: '-0.03em' }}
                >
                  {s.value}
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: '#FFFFFF' }}>
                  {s.label}
                </div>
                <div
                  className="text-[11px] leading-[1.5]"
                  style={{ color: '#4B5570', fontFamily: 'var(--f-m)' }}
                >
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
