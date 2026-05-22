import { motion } from 'motion/react';
import { ShieldCheck, Award, Eye, Lock, Search, Bell, FileCheck, Activity, Zap } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function Pillars() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Security',
      tagline: 'Defense in depth, zero trust by default',
      description: 'Our security-first approach ensures your infrastructure is protected at every layer, from code to cloud to edge.',
      color: '#00D4FF',
      features: [
        {
          icon: Lock,
          title: 'Zero Trust Architecture',
          description: 'Never trust, always verify. Implement continuous authentication and authorization across your entire stack.'
        },
        {
          icon: ShieldCheck,
          title: 'Shift-Left Security',
          description: 'Integrate security from day one with automated SAST, DAST, and container scanning in your CI/CD pipeline.'
        },
        {
          icon: Search,
          title: 'Threat Detection',
          description: 'Real-time threat intelligence with AI-powered anomaly detection and automated incident response.'
        },
        {
          icon: FileCheck,
          title: 'eBPF Security',
          description: 'Kernel-level observability and security with eBPF-based runtime protection and network policies.'
        }
      ]
    },
    {
      icon: Award,
      title: 'Compliance',
      tagline: 'Audit-ready infrastructure, always',
      description: 'Meet and exceed regulatory requirements with automated compliance frameworks and continuous monitoring.',
      color: '#7B2FFF',
      features: [
        {
          icon: Award,
          title: 'ISO 27001 & SOC 2',
          description: 'Full compliance automation for information security management and service organization controls.'
        },
        {
          icon: FileCheck,
          title: 'GDPR & DPDP Act',
          description: 'Data privacy compliance for global operations with automated data governance and privacy controls.'
        },
        {
          icon: Search,
          title: 'NIST & CIS Controls',
          description: 'Industry-standard security frameworks implemented with continuous validation and reporting.'
        },
        {
          icon: Bell,
          title: 'Continuous Compliance',
          description: 'Automated policy enforcement, real-time compliance monitoring, and audit trail generation.'
        }
      ]
    },
    {
      icon: Eye,
      title: 'Observability',
      tagline: 'See everything, understand everything',
      description: 'Full-stack visibility with AI-powered insights that transform data into actionable intelligence.',
      color: '#00FF88',
      features: [
        {
          icon: Activity,
          title: 'Metrics & Monitoring',
          description: 'Prometheus, Grafana, and custom dashboards for real-time performance and health monitoring.'
        },
        {
          icon: Search,
          title: 'Distributed Tracing',
          description: 'OpenTelemetry-based tracing across microservices for complete request lifecycle visibility.'
        },
        {
          icon: Zap,
          title: 'AIOps Intelligence',
          description: 'AI-powered anomaly detection, predictive analytics, and automated root cause analysis.'
        },
        {
          icon: Eye,
          title: 'Log Aggregation',
          description: 'Centralized logging with intelligent search, correlation, and long-term retention strategies.'
        }
      ]
    }
  ];

  const technologies = [
    { name: 'Kubernetes', category: 'Orchestration' },
    { name: 'Istio', category: 'Service Mesh' },
    { name: 'Cilium', category: 'eBPF Security' },
    { name: 'Falco', category: 'Runtime Security' },
    { name: 'OPA', category: 'Policy Engine' },
    { name: 'Vault', category: 'Secrets Management' },
    { name: 'Prometheus', category: 'Metrics' },
    { name: 'Grafana', category: 'Visualization' },
    { name: 'OpenTelemetry', category: 'Tracing' },
    { name: 'Loki', category: 'Logging' },
    { name: 'Jaeger', category: 'Distributed Tracing' },
    { name: 'Crossplane', category: 'Infrastructure as Code' }
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        badge="OUR FOUNDATION"
        headline="Three pillars."
        headlineGradient="One standard."
        subtext="Security, compliance, and observability — the non-negotiable foundation behind every platform we engineer."
        variant="pillars"
        badgeColor="#00FF88"
      />

      {/* Detailed Pillars */}
      {pillars.map((pillar, i) => (
        <section
          key={i}
          className={`py-20 ${i > 0 ? 'border-t border-[rgba(255,255,255,0.05)]' : ''}`}
          style={{
            background: i % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent'
          }}
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 rounded-xl" style={{ background: `${pillar.color}15` }}>
                  <pillar.icon size={40} style={{ color: pillar.color }} />
                </div>
                <div>
                  <h2 className="mb-1">{pillar.title}</h2>
                  <p className="text-lg" style={{ color: pillar.color }}>{pillar.tagline}</p>
                </div>
              </div>
              <p className="text-lg text-[#8A9BB5] max-w-3xl">{pillar.description}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {pillar.features.map((feature, j) => (
                <motion.div
                  key={j}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: j * 0.1 }}
                  className="flex gap-4 p-6 rounded-2xl border border-[rgba(255,255,255,0.07)] hover:border-opacity-20 transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    borderColor: `${pillar.color}30`
                  }}
                >
                  <div className="p-2 rounded-lg h-fit" style={{ background: `${pillar.color}10` }}>
                    <feature.icon size={24} style={{ color: pillar.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg mb-2 text-[#F0F4FF]">{feature.title}</h3>
                    <p className="text-sm text-[#8A9BB5] leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Technology Stack */}
      <section className="py-20 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <h2 className="mb-4">Technology Stack</h2>
            <p className="text-lg text-[#8A9BB5] max-w-2xl mx-auto">
              Best-in-class tools and frameworks powering our three pillars
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {technologies.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl border border-[rgba(255,255,255,0.07)] hover:border-[rgba(0,212,255,0.3)] transition-all text-center"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="font-medium text-[#F0F4FF] mb-1">{tech.name}</div>
                <div className="text-xs text-[#4A5568]">{tech.category}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
