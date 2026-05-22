import { motion } from 'motion/react';
import { CloudUpload, GitBranch, ShieldCheck, RotateCw, Brain, Cpu, Check, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';

export default function Services() {
  const services = [
    {
      icon: CloudUpload,
      title: 'Cloud-Native Architecture',
      tagline: 'Built for scale, designed for resilience',
      description: 'Transform your infrastructure with Kubernetes-native platforms engineered for multi-cloud environments, automatic scaling, and cost optimization.',
      color: '#00D4FF',
      details: [
        'Multi-cloud strategy and architecture design',
        'Kubernetes platform setup and optimization',
        'Microservices architecture and API gateway design',
        'Service mesh implementation (Istio, Linkerd)',
        'Container orchestration and runtime security',
        'Cloud cost optimization and FinOps',
        'Infrastructure as Code (Terraform, Crossplane)',
        'GitOps workflows and continuous delivery'
      ],
      useCases: [
        'E-commerce platform serving 10M+ users with 99.99% uptime',
        'Financial services migration to multi-cloud architecture',
        'Healthcare platform with HIPAA-compliant Kubernetes'
      ]
    },
    {
      icon: GitBranch,
      title: 'Platform Engineering',
      tagline: 'Developer productivity at enterprise scale',
      description: 'Build Internal Developer Platforms (IDPs) that provide golden paths, self-service infrastructure, and accelerate time-to-production.',
      color: '#7B2FFF',
      details: [
        'Internal Developer Platform (IDP) design and implementation',
        'Self-service infrastructure provisioning',
        'CI/CD pipeline automation and optimization',
        'Golden path templates and guardrails',
        'Developer portal and documentation',
        'Platform observability and metrics',
        'Secret management and credential rotation',
        'Environment management and ephemeral environments'
      ],
      useCases: [
        'Reduced deployment time from weeks to hours for Fortune 100 retailer',
        'Self-service platform supporting 200+ development teams',
        'Automated compliance checks integrated into developer workflow'
      ]
    },
    {
      icon: ShieldCheck,
      title: 'Security & Observability',
      tagline: 'See everything, protect everything',
      description: 'Comprehensive security posture with full-stack observability, threat detection, and automated incident response powered by AI.',
      color: '#00FF88',
      details: [
        'Zero-trust security architecture',
        'Runtime security with Falco and eBPF',
        'SIEM/SOAR integration and automation',
        'Distributed tracing (OpenTelemetry, Jaeger)',
        'Metrics and monitoring (Prometheus, Grafana)',
        'Log aggregation and analysis (Loki, ELK)',
        'AIOps and anomaly detection',
        'Security policy as code (OPA, Kyverno)'
      ],
      useCases: [
        'Detected and prevented security breach in under 2 minutes',
        'Reduced MTTR by 75% with AI-powered root cause analysis',
        'Real-time compliance monitoring across 50+ clusters'
      ]
    },
    {
      icon: RotateCw,
      title: 'Application Modernization',
      tagline: 'Legacy to cloud-native, seamlessly',
      description: 'Modernize monolithic applications into cloud-native microservices with zero downtime migration strategies.',
      color: '#FF9D00',
      details: [
        'Strangler pattern migration strategies',
        'Monolith to microservices decomposition',
        'API-first design and implementation',
        'Database modernization and migration',
        'Serverless architecture and FaaS',
        'Event-driven architecture design',
        'Legacy integration and API gateways',
        'Performance optimization and caching'
      ],
      useCases: [
        'Migrated 15-year-old monolith to microservices over 18 months',
        'Zero-downtime migration for mission-critical banking application',
        '10x performance improvement after modernization'
      ]
    },
    {
      icon: Brain,
      title: 'AI-Driven AIOps',
      tagline: 'Intelligence that never sleeps',
      description: 'Leverage machine learning and AI to automate operations, predict failures, and optimize infrastructure performance.',
      color: '#FF2E88',
      details: [
        'Anomaly detection and predictive analytics',
        'Automated incident response and remediation',
        'Capacity planning and resource optimization',
        'Intelligent alerting and noise reduction',
        'Root cause analysis automation',
        'Performance forecasting and trend analysis',
        'ChatOps and natural language operations',
        'ML model deployment and serving (MLOps)'
      ],
      useCases: [
        'Prevented 95% of outages through predictive maintenance',
        'Reduced alert noise by 80% with AI-powered correlation',
        'Automated 60% of L1/L2 support tickets'
      ]
    },
    {
      icon: Cpu,
      title: 'OT Observability',
      tagline: 'Edge to cloud visibility',
      description: 'Monitor and optimize operational technology, IoT devices, and edge computing infrastructure with real-time analytics.',
      color: '#00FFD4',
      details: [
        'Edge computing platform design',
        'IoT device management and monitoring',
        'OT/IT convergence and integration',
        'Real-time data processing and analytics',
        'Predictive maintenance for industrial systems',
        'Edge ML inference and optimization',
        'Protocol translation and data normalization',
        'Time-series data storage and analysis'
      ],
      useCases: [
        'Real-time monitoring of 10,000+ industrial sensors',
        'Predictive maintenance reducing downtime by 40%',
        'Edge-to-cloud pipeline processing 1TB/day'
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <PageHero
        badge="WHAT WE BUILD"
        headline="Intelligent services,"
        headlineGradient="end to end."
        subtext="From cloud-native architecture to AI-driven operations — every capability your enterprise needs to scale with confidence."
        variant="services"
        badgeColor="#7B2FFF"
      />

      {/* Service Details */}
      {services.map((service, i) => (
        <section
          key={i}
          className={`py-20 ${i > 0 ? 'border-t border-[rgba(255,255,255,0.05)]' : ''}`}
          style={{
            background: i % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent'
          }}
        >
          <div className="max-w-[1200px] mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 rounded-xl" style={{ background: `${service.color}15` }}>
                    <service.icon size={40} style={{ color: service.color }} />
                  </div>
                  <div>
                    <h2 className="mb-1">{service.title}</h2>
                    <p className="text-lg" style={{ color: service.color }}>{service.tagline}</p>
                  </div>
                </div>
                <p className="text-lg text-[#8A9BB5] mb-8 leading-relaxed">{service.description}</p>

                <button className="px-6 py-3 rounded-full border border-[rgba(255,255,255,0.2)] text-[#F0F4FF] hover:border-opacity-40 hover:bg-[rgba(255,255,255,0.03)] transition-all inline-flex items-center gap-2">
                  Get Started
                  <ArrowRight size={18} />
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="p-6 rounded-2xl border border-[rgba(255,255,255,0.07)]" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <h3 className="text-xl mb-4 text-[#F0F4FF]">What We Deliver</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {service.details.map((detail, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-[#8A9BB5]">
                        <Check size={16} className="mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-2xl" style={{
                  background: `linear-gradient(135deg, ${service.color}10 0%, transparent 100%)`,
                  border: `1px solid ${service.color}20`
                }}>
                  <h3 className="text-xl mb-4 text-[#F0F4FF]">Success Stories</h3>
                  <div className="space-y-3">
                    {service.useCases.map((useCase, j) => (
                      <div key={j} className="flex items-start gap-2 text-sm text-[#8A9BB5]">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: service.color }} />
                        {useCase}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-6">Ready to transform your infrastructure?</h2>
            <p className="text-xl text-[#8A9BB5] mb-8 max-w-2xl mx-auto">
              Let's discuss how our services can accelerate your cloud-native journey
            </p>
            <button
              className="px-10 py-5 rounded-full font-bold text-[#050810] text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
              }}
            >
              Schedule a Consultation
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
