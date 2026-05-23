import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Shield, Zap, Mail } from 'lucide-react';
import { openDemoModal } from './DemoModal';

export default function CTA() {
  return (
    <section
      className="relative py-16 md:py-24 px-6 overflow-hidden"
      style={{ background: 'var(--p1)', borderTop: '1px solid var(--p3)' }}
    >
      {/* Subtle cyan glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            background: 'radial-gradient(circle, rgba(0,177,220,0.08) 0%, transparent 65%)',
            top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[780px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
            style={{ background: 'rgba(0,177,220,0.08)', border: '1px solid rgba(0,177,220,0.25)' }}
          >
            <Zap className="w-3.5 h-3.5" style={{ color: 'var(--c5)' }} />
            <span
              className="text-[11px] uppercase tracking-[0.1em] font-bold select-none"
              style={{ color: 'var(--c6)', fontFamily: 'var(--f-m)' }}
            >
              Get started today
            </span>
          </div>

          {/* Headline */}
          <h2
            className="text-4xl md:text-[52px] font-bold leading-tight mb-5"
            style={{ color: 'var(--ink-950)', letterSpacing: '-0.035em', fontFamily: 'var(--f-d)' }}
          >
            Ready to achieve{' '}
            <span style={{ color: 'var(--c5)' }}>complete digital trust?</span>
          </h2>

          <p
            className="text-[16px] mb-10 max-w-[500px] mx-auto leading-relaxed"
            style={{ color: 'var(--ink-500)' }}
          >
            Start with a free CERT-In compliance audit of your vendor's SBOM results in 60 seconds.
            Or talk to our team about a full deployment.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.03, translateY: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={openDemoModal}
              className="group flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-semibold text-white rounded-xl"
              style={{
                background: 'var(--c5)',
                boxShadow: '0 2px 20px rgba(0,177,220,0.35)',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 4px 32px rgba(0,177,220,0.5)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 2px 20px rgba(0,177,220,0.35)')}
            >
              Get Free Compliance Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openDemoModal}
              className="flex items-center justify-center gap-2 px-8 py-4 text-[15px] font-medium rounded-xl transition-all duration-200"
              style={{
                color: 'var(--ink-950)',
                border: '1px solid var(--p3)',
                background: 'var(--p0)',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,177,220,0.4)';
                (e.currentTarget as HTMLElement).style.color = 'var(--c5)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--p3)';
                (e.currentTarget as HTMLElement).style.color = 'var(--ink-950)';
              }}
            >
              Contact Sales
            </motion.button>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
            {[
              { Icon: CheckCircle2, text: 'No credit card' },
              { Icon: Shield,       text: 'Instant validation' },
              { Icon: Zap,          text: 'CERT-In report in 60s' },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[13px]"
                style={{ color: 'var(--ink-500)' }}>
                <Icon className="w-4 h-4" style={{ color: 'var(--c5)' }} />
                {text}
              </div>
            ))}
          </div>

          {/* Email */}
          <div className="flex items-center justify-center gap-2" style={{ color: 'var(--ink-400)' }}>
            <Mail className="w-3.5 h-3.5" style={{ color: 'var(--c5)' }} />
            <span className="text-[13px]">Enterprise enquiries: </span>
            <a
              href="mailto:sales@intellixbom.com"
              className="text-[13px] font-medium transition-colors"
              style={{ color: 'var(--c5)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c6)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'var(--c5)')}
            >
              sales@intellixbom.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
