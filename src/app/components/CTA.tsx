import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';
import { openDemoModal } from './DemoModal';

export default function CTA() {
  return (
    <section
      className="relative py-14 md:py-20 px-6 overflow-hidden"
      style={{ background: 'var(--app-bg-alt)' }}
    >
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute rounded-full animate-float"
          style={{
            width: 700, height: 700,
            background: 'radial-gradient(circle, rgba(67,97,238,0.18) 0%, transparent 65%)',
            top: '50%', left: '50%', transform: 'translate(-50%, -55%)',
            filter: 'blur(2px)'
          }}
        />
        <div
          className="absolute rounded-full animate-float-b"
          style={{
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 65%)',
            top: '10%', right: '-60px'
          }}
        />
        <div
          className="absolute rounded-full animate-float-c"
          style={{
            width: 350, height: 350,
            background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 65%)',
            bottom: '5%', left: '-40px'
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.022] animate-grid-pan"
          style={{
            backgroundImage: `linear-gradient(var(--app-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--app-grid-line) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-[760px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
            style={{ background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.25)' }}
          >
            <Zap className="w-3.5 h-3.5 text-[#4361EE]" />
            <span className="text-[11px] uppercase tracking-[0.14em] text-[#4361EE] font-bold select-none">
              Get started in 60 seconds
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-[60px] font-black leading-tight tracking-tight mb-5" style={{ color: 'var(--app-text-primary)' }}>
            Ready to Achieve
            <span
              className="block mt-1"
              style={{
                background: 'linear-gradient(135deg, #4361EE 0%, #00D4AA 50%, #8B5CF6 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradientShift 5s ease infinite'
              }}
            >
              Complete Digital Trust?
            </span>
          </h2>

          <p className="text-lg mb-10 max-w-[500px] mx-auto leading-relaxed" style={{ color: 'var(--app-text-dim)' }}>
            Start with a free CERT-In compliance audit of your vendor's SBOM.
            Results in 60 seconds.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={openDemoModal}
              className="group relative flex items-center gap-2 px-9 py-4 text-base font-black text-white rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)',
                boxShadow: '0 0 32px rgba(67,97,238,0.45)'
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 52px rgba(67,97,238,0.7)')}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.boxShadow = '0 0 32px rgba(67,97,238,0.45)')}
            >
              <span className="relative z-10">Get Free Compliance Audit</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" />
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={openDemoModal}
              className="flex items-center gap-2 px-9 py-4 text-base font-semibold rounded-2xl transition-all duration-200"
              style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border-dim)';
                (e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)';
                (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--app-border)';
                (e.currentTarget as HTMLElement).style.background = 'transparent';
                (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)';
              }}
            >
              Talk to an Expert
            </motion.button>
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-5">
            {[
              { Icon: CheckCircle2, text: 'No credit card' },
              { Icon: Shield,       text: 'Instant validation' },
              { Icon: Zap,          text: 'CERT-In report in 60s' },
            ].map(({ Icon, text }, i) => (
              <div key={i} className="flex items-center gap-1.5 text-[13px]" style={{ color: 'var(--app-text-dimmer)' }}>
                <Icon className="w-4 h-4 text-[#00D4AA]" />
                {text}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
