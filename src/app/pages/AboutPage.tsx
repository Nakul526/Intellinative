import { Link } from 'react-router';
import { Shield, Zap, Lock, Globe, Users, Target, ArrowRight, CheckCircle2, Building2, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { openDemoModal } from '../components/DemoModal';

const values = [
  {
    icon: Shield,
    color: '#4361EE',
    title: 'Compliance First',
    description: 'Every feature we ship is grounded in what India\'s regulators actually require not generic SBOM best practices. We read every CERT-In circular so you don\'t have to.'
  },
  {
    icon: Lock,
    color: '#00D4AA',
    title: 'Security by Design',
    description: 'Air-gapped deployment, zero data egress for classified environments, and end-to-end encryption for all BOM data in transit and at rest.'
  },
  {
    icon: Zap,
    color: '#8B5CF6',
    title: 'Automation at Scale',
    description: 'Manual SBOM review doesn\'t scale. We automate field-by-field validation across thousands of components so your compliance team can focus on decisions, not data entry.'
  },
  {
    icon: Globe,
    color: '#F59E0B',
    title: 'India-Native',
    description: 'Built for India\'s regulatory landscape CERT-In, RBI, MeitY, NCIIPC, SEBI. Not adapted from a US or EU tool. Designed from the ground up for Indian infrastructure.'
  },
  {
    icon: Users,
    color: '#EF4444',
    title: 'Vendor-Agnostic',
    description: 'We validate SBOMs regardless of how they were generated. Syft, cdxgen, Trivy, CycloneDX Maven all supported. Your tool choice, our compliance guarantee.'
  },
  {
    icon: Heart,
    color: '#00D4AA',
    title: 'Customer Obsessed',
    description: 'Our customers walk into regulatory audits. The stakes are real. We treat every support request with the urgency of a compliance deadline because it often is.'
  }
];

const milestones = [
  { year: '2023', event: 'Founded in Bengaluru after witnessing a major Indian PSU fail a CERT-In audit due to missing SBOM fields.' },
  { year: 'Q1 2024', event: 'First enterprise pilot with a Tier-1 Indian bank. Validated 40,000+ components against RBI Advisory requirements.' },
  { year: 'Q3 2024', event: 'RBI Advisory 11/2024 issued validated our approach. Onboarded 12 regulated entities in 60 days.' },
  { year: 'Q1 2025', event: 'Launched CBOM and QBOM modules. First post-quantum readiness assessments for NCIIPC-designated critical infrastructure.' },
  { year: 'Q2 2025', event: 'AIBOM and HBOM added. Became the only Indian platform with all five BOM types in production.' },
  { year: '2026', event: 'CERT-In v2.0 effective. 160+ entities protected across banking, government, defence, and capital markets.' },
];

const stats = [
  { number: '160+', label: 'Regulated entities protected' },
  { number: '5M+', label: 'Components validated' },
  { number: '21', label: 'CERT-In fields automated' },
  { number: '99%', label: 'Audit pass rate' },
];

const team = [
  { name: 'Arjun Mehta', role: 'CEO & Co-Founder', bg: '#4361EE', initials: 'AM', bio: 'Former CISO at a Fortune 500 Indian conglomerate. Led software supply chain security for 8 years.' },
  { name: 'Priya Krishnan', role: 'CTO & Co-Founder', bg: '#00D4AA', initials: 'PK', bio: 'Ex-CERT-In advisory board member. Deep expertise in cryptographic standards and post-quantum migration.' },
  { name: 'Rohan Dasgupta', role: 'VP Engineering', bg: '#8B5CF6', initials: 'RD', bio: 'Previously built compliance automation at a leading Indian RegTech. 10+ years in DevSecOps.' },
  { name: 'Sneha Iyer', role: 'Head of Compliance', bg: '#F59E0B', initials: 'SI', bio: 'Chartered accountant turned cybersecurity compliance expert. Audited 50+ SEBI and RBI entities.' },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--app-bg)' }}>

      {/* Hero */}
      <section
        className="pt-24 pb-14 px-6"
        style={{ background: `radial-gradient(ellipse 80% 60% at 50% -10%, rgba(67,97,238,0.15) 0%, transparent 70%), var(--app-bg)` }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
              style={{ background: 'rgba(67,97,238,0.08)', border: '1px solid rgba(67,97,238,0.25)' }}
            >
              <Target className="w-3.5 h-3.5 text-[#4361EE]" />
              <span className="text-[11px] uppercase tracking-[0.14em] text-[#4361EE] font-bold">About IntelliXBOM</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-[-0.03em] mb-6" style={{ color: 'var(--app-text-primary)' }}>
              Built for India's<br />
              <span style={{ background: 'linear-gradient(90deg, #4361EE, #00D4AA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Digital Sovereignty.
              </span>
            </h1>
            <p className="text-xl leading-[1.75] max-w-[640px] mx-auto mb-10" style={{ color: 'var(--app-text-muted)' }}>
              IntelliXBOM was founded after watching India's regulated organisations fail audits not because they lacked SBOMs 
              but because the SBOMs they had didn't meet CERT-In's 21 mandatory fields.
              We built the tool we wished existed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={openDemoModal}
                className="px-7 py-3.5 text-base font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5"
                style={{ background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)', boxShadow: '0 0 32px rgba(67,97,238,0.4)' }}
              >
                Request a Demo →
              </button>
              <Link
                to="/compliance"
                className="px-7 py-3.5 text-base font-medium rounded-xl border transition-all"
                style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)'; }}
              >
                View Compliance Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Row */}
      <section style={{ background: 'var(--app-bg-alt)', borderTop: '1px solid var(--app-border)', borderBottom: '1px solid var(--app-border)' }}>
        <div className="max-w-[1440px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center py-8 px-6"
                style={i < stats.length - 1 ? { borderRight: '1px solid var(--app-border)' } : {}}
              >
                <div className="text-4xl font-bold text-[#4361EE] mb-1">{stat.number}</div>
                <div className="text-sm" style={{ color: 'var(--app-text-muted)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>OUR MISSION</p>
              <h2 className="text-4xl font-bold mb-5 leading-tight" style={{ color: 'var(--app-text-primary)' }}>
                Make SBOM compliance automatic for every regulated organisation in India.
              </h2>
              <p className="text-lg leading-[1.75] mb-6" style={{ color: 'var(--app-text-muted)' }}>
                India's regulatory landscape around software supply chain security is the most prescriptive in Asia.
                CERT-In v2.0 mandates 21 specific fields. RBI requires continuous vendor monitoring.
                NCIIPC demands hardware supply chain visibility. SEBI extends this to capital markets.
              </p>
              <p className="text-lg leading-[1.75]" style={{ color: 'var(--app-text-muted)' }}>
                No generic SBOM tool was built for this. IntelliXBOM is purpose-built field by field,
                framework by framework for the compliance reality of Indian regulated infrastructure.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { label: 'CERT-In 21-field validation', detail: 'Automated, per component, per release' },
                { label: 'Five BOM types in one platform', detail: 'SBOM, CBOM, QBOM, AIBOM, HBOM' },
                { label: 'Vendor SBOM collection & scoring', detail: 'Automated procurement workflows' },
                { label: 'Air-gapped deployment available', detail: 'For defence and classified environments' },
                { label: 'Regulator-ready audit exports', detail: 'CERT-In, RBI, SEBI, NCIIPC formats' },
                { label: 'CI/CD integration for continuous compliance', detail: 'Every build, every release' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="flex items-start gap-3 p-4 rounded-xl"
                  style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}
                >
                  <CheckCircle2 className="w-5 h-5 text-[#00D4AA] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold mb-0.5" style={{ color: 'var(--app-text-primary)' }}>{item.label}</div>
                    <div className="text-xs" style={{ color: 'var(--app-text-muted)' }}>{item.detail}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Story / Timeline */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg-alt)' }}>
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>OUR STORY</p>
            <h2 className="text-4xl font-bold" style={{ color: 'var(--app-text-primary)' }}>From a failed audit to a platform</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px" style={{ background: 'var(--app-border)' }} />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  className="flex gap-5 items-start"
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold relative z-10"
                    style={{ background: 'var(--app-card)', border: '2px solid #4361EE', color: '#4361EE' }}
                  >
                    <div className="text-center leading-[1.2]" style={{ fontSize: '8px' }}>{m.year}</div>
                  </div>
                  <div className="pt-2 pb-2">
                    <p className="text-sm leading-[1.7]" style={{ color: 'var(--app-text-muted)' }}>{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>OUR VALUES</p>
            <h2 className="text-4xl font-bold" style={{ color: 'var(--app-text-primary)' }}>What we believe in</h2>
          </div>
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: 'var(--app-border)' }}
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.07, duration: 0.45 }}
                className="p-8 transition-colors"
                style={{ background: 'var(--app-bg)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'var(--app-card)')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'var(--app-bg)')}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ background: `${v.color}15` }}
                >
                  <v.icon className="w-5 h-5" style={{ color: v.color }} />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--app-text-primary)' }}>{v.title}</h3>
                <p className="text-sm leading-[1.7]" style={{ color: 'var(--app-text-muted)' }}>{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 px-6" style={{ background: 'var(--app-bg-alt)' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>THE TEAM</p>
            <h2 className="text-4xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>Compliance experts, not just engineers</h2>
            <p className="text-lg max-w-[500px] mx-auto" style={{ color: 'var(--app-text-muted)' }}>
              Our team has lived inside India's regulatory ecosystem as auditors, CISO advisors, and CERT-In advisory board members.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                className="rounded-2xl p-6 text-center"
                style={{ background: 'var(--app-card)', border: '1px solid var(--app-border)' }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black text-white mx-auto mb-4"
                  style={{ background: `linear-gradient(135deg, ${member.bg}, ${member.bg}99)` }}
                >
                  {member.initials}
                </div>
                <h3 className="text-sm font-bold mb-0.5" style={{ color: 'var(--app-text-primary)' }}>{member.name}</h3>
                <p className="text-[11px] font-medium mb-3" style={{ color: '#4361EE' }}>{member.role}</p>
                <p className="text-xs leading-[1.65]" style={{ color: 'var(--app-text-muted)' }}>{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Backed by / Regulators */}
      <section className="py-10 px-6" style={{ background: 'var(--app-bg)', borderTop: '1px solid var(--app-border)' }}>
        <div className="max-w-[900px] mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-6" style={{ color: 'var(--app-text-dimmer)' }}>
            TRUSTED ACROSS REGULATED SECTORS
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {['Banking & NBFCs', 'Critical Infrastructure', 'Government IT', 'Capital Markets', 'Defence PSUs', 'Healthcare'].map((sector, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ background: 'var(--app-elevated)', border: '1px solid var(--app-border)' }}
              >
                <Building2 className="w-3.5 h-3.5" style={{ color: 'var(--app-text-dimmer)' }} />
                <span className="text-[12px] font-medium" style={{ color: 'var(--app-text-muted)' }}>{sector}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-14 px-6"
        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(67,97,238,0.1), transparent), var(--app-bg-alt)` }}
      >
        <div className="max-w-[640px] mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--app-text-primary)' }}>
            Join the compliance-first teams.
          </h2>
          <p className="text-lg mb-10" style={{ color: 'var(--app-text-muted)' }}>
            See how IntelliXBOM has helped 160+ regulated entities across India achieve
            and maintain CERT-In compliance automatically.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openDemoModal}
              className="px-7 py-3.5 text-base font-semibold text-white rounded-xl transition-all hover:-translate-y-0.5 flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)', boxShadow: '0 0 32px rgba(67,97,238,0.4)' }}
            >
              Get a Free Demo
              <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              to="/why"
              className="px-7 py-3.5 text-base font-medium rounded-xl border transition-all"
              style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)'; }}
            >
              Why IxBOM
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
