import { CheckCircle2, FileText, Shield, AlertTriangle } from 'lucide-react';
import { openDemoModal } from '../components/DemoModal';

const frameworks = [
  {
    id: 'cert-in',
    shortName: 'CERT-In',
    color: '#22C55E',
    fullName: 'CERT-In SBOM Technical Guidelines v2.0',
    jurisdiction: 'India (National)',
    effectiveDate: 'July 2025',
    sector: 'All regulated sectors',
    percentage: 94,
    overview: 'India\'s most comprehensive SBOM standard. CERT-In v2.0 mandates 21 specific fields across all BOM types and applies to software used in critical information infrastructure, government systems, and regulated industries.',
    requirements: [
      '21 mandatory fields per component',
      'Support for SBOM, CBOM, QBOM, AIBOM, HBOM',
      'Machine-readable format (CycloneDX or SPDX)',
      'Continuous update with every software release',
      'Supplier and provenance data included',
      'Vulnerability and license information mandatory',
    ],
    intellixbomCoverage: [
      'Full 21-field automated validation',
      'All five BOM types supported',
      'Automated format compliance checking',
      'CI/CD integration for continuous compliance',
      'One-click CERT-In compliance report export',
    ]
  },
  {
    id: 'rbi',
    shortName: 'RBI',
    color: '#4361EE',
    fullName: 'RBI Advisory on Software Supply Chain Security 11/2024',
    jurisdiction: 'India (Banking)',
    effectiveDate: 'November 2024',
    sector: 'Banks, NBFCs, payment systems',
    percentage: 89,
    overview: 'The Reserve Bank of India\'s advisory mandates that all regulated financial entities maintain comprehensive software bills of materials for third-party software, with specific requirements for vendor risk assessment and continuous monitoring.',
    requirements: [
      'Third-party SBOM collection and validation',
      'Vendor software supply chain risk assessment',
      'Continuous monitoring of critical components',
      'Incident response procedures for SBOM gaps',
      'Board-level reporting on supply chain risk',
    ],
    intellixbomCoverage: [
      'Automated vendor SBOM collection workflows',
      'Risk scoring dashboard for all vendors',
      'Continuous CVE monitoring on vendor components',
      'Board-ready compliance summary reports',
      'RBI-formatted audit exports',
    ]
  },
  {
    id: 'meity',
    shortName: 'MeitY',
    color: '#8B5CF6',
    fullName: 'MeitY Software Security Guidelines 2025',
    jurisdiction: 'India (Technology)',
    effectiveDate: 'January 2025',
    sector: 'Government IT, cloud providers, SaaS',
    percentage: 92,
    overview: 'Ministry of Electronics and Information Technology\'s 2025 guidelines extend SBOM requirements to all software procured or deployed by government entities and their vendors, with emphasis on cryptographic inventory and AI model disclosure.',
    requirements: [
      'Software supply chain security documentation',
      'Cryptographic inventory (CBOM required)',
      'AI/ML model disclosure for AI-enabled software',
      'Vulnerability disclosure timeline compliance',
      'Open-source license risk assessment',
    ],
    intellixbomCoverage: [
      'Full BOM suite including CBOM and AIBOM',
      'Automated open-source license scanning',
      'Vulnerability disclosure workflow integration',
      'MeitY-formatted compliance exports',
      'AI model provenance tracking',
    ]
  },
  {
    id: 'nciipc',
    shortName: 'NCIIPC',
    color: '#EF4444',
    fullName: 'NCIIPC Critical Information Infrastructure Protection Guidelines',
    jurisdiction: 'India (Critical Infrastructure)',
    effectiveDate: 'Ongoing',
    sector: 'Power, telecom, defence, finance',
    percentage: 87,
    overview: 'National Critical Information Infrastructure Protection Centre guidelines mandate strict software and hardware supply chain controls for operators of critical infrastructure, including hardware bill of materials and firmware verification.',
    requirements: [
      'Hardware supply chain documentation (HBOM)',
      'Firmware version control and verification',
      'Air-gapped deployment capability',
      'TPM and secure boot compliance',
      'Supply chain provenance for all critical components',
    ],
    intellixbomCoverage: [
      'Full HBOM support with firmware tracking',
      'Air-gapped deployment option',
      'TPM and secure boot validation',
      'Hardware provenance risk scoring',
      'NCIIPC-formatted incident reports',
    ]
  },
  {
    id: 'sebi',
    shortName: 'SEBI',
    color: '#F59E0B',
    fullName: 'SEBI Circular on Cybersecurity and Cyber Resilience Framework',
    jurisdiction: 'India (Capital Markets)',
    effectiveDate: 'July 2025',
    sector: 'Brokers, exchanges, depositories, MFs',
    percentage: 85,
    overview: 'SEBI\'s July 2025 circular extends software supply chain requirements to the capital markets ecosystem, requiring all regulated entities to maintain and validate SBOMs for trading and settlement systems.',
    requirements: [
      'SBOM for all trading system software',
      'Third-party software risk assessment',
      'Incident reporting for supply chain events',
      'Continuous monitoring of critical dependencies',
      'Annual supply chain security audit',
    ],
    intellixbomCoverage: [
      'Trading system SBOM generation and validation',
      'Vendor risk scoring and benchmarking',
      'Automated incident detection and alerting',
      'SEBI-formatted audit-ready reports',
      'Annual compliance summary exports',
    ]
  },
];

export default function CompliancePage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--app-bg)' }}>
      {/* Hero */}
      <section
        className="pt-24 pb-12 px-6"
        style={{
          background: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(34,197,94,0.15) 0%, transparent 60%), var(--app-bg)`
        }}
      >
        <div className="max-w-[860px] mx-auto text-center">
          <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>COMPLIANCE</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-[-0.03em] mb-6" style={{ color: 'var(--app-text-primary)' }}>
            Every Regulation.<br />
            <span style={{ background: 'linear-gradient(90deg, #22C55E, #4361EE)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Every Requirement.
            </span>
          </h1>
          <p className="text-xl leading-[1.75] max-w-[600px] mx-auto mb-10" style={{ color: 'var(--app-text-muted)' }}>
            Comprehensive, automated coverage of India's five major regulatory frameworks —
            CERT-In, RBI, MeitY, NCIIPC, and SEBI — with continuous monitoring and audit-ready reporting.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-w-[600px] mx-auto">
            {frameworks.map(fw => (
              <a
                key={fw.id}
                href={`#${fw.id}`}
                className="rounded-lg py-2 px-3 text-center text-sm font-semibold transition-all"
                style={{
                  background: `${fw.color}15`,
                  border: `1px solid ${fw.color}40`,
                  color: fw.color
                }}
              >
                {fw.shortName}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="py-10 px-6" style={{ background: 'var(--app-bg-alt)', borderTop: '1px solid var(--app-border)', borderBottom: '1px solid var(--app-border)' }}>
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            <StatColumn number="5" label="Regulatory frameworks" />
            <StatColumn number="21" label="CERT-In mandatory fields" />
            <StatColumn number="99%" label="Audit pass rate" />
            <StatColumn number="162" label="Entities protected" isLast />
          </div>
        </div>
      </section>

      {/* Framework Cards */}
      <section className="px-6 py-14" style={{ background: 'var(--app-bg)' }}>
        <div className="max-w-[1440px] mx-auto space-y-8">
          {frameworks.map((fw) => (
            <FrameworkCard key={fw.id} framework={fw} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-14 px-6"
        style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(67,97,238,0.12), transparent), var(--app-bg-alt)` }}
      >
        <div className="max-w-[640px] mx-auto text-center">
          <AlertTriangle className="w-10 h-10 text-[#F59E0B] mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4" style={{ color: 'var(--app-text-primary)' }}>Not sure if you're compliant?</h2>
          <p className="text-lg mb-10" style={{ color: 'var(--app-text-muted)' }}>
            Upload a vendor SBOM and get a free CERT-In compliance audit in 60 seconds.
            See exactly which fields pass, fail, or need attention.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={openDemoModal}
              className="px-7 py-3.5 text-base font-semibold text-white rounded-lg transition-all hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #4361EE 0%, #3A0CA3 100%)', boxShadow: '0 0 32px rgba(67,97,238,0.45)' }}
            >
              Free Compliance Audit →
            </button>
            <button
              onClick={openDemoModal}
              className="px-7 py-3.5 text-base font-medium rounded-lg border transition-all"
              style={{ color: 'var(--app-text-muted)', border: '1px solid var(--app-border)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--app-elevated)'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-primary)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--app-text-muted)'; }}
            >
              Talk to a Compliance Expert
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

function FrameworkCard({ framework: fw }: { framework: typeof frameworks[0] }) {
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - fw.percentage / 100);

  return (
    <div
      id={fw.id}
      className="rounded-2xl overflow-hidden"
      style={{ border: '1px solid var(--app-border)', scrollMarginTop: '88px' }}
    >
      {/* Color header bar */}
      <div className="h-1" style={{ background: fw.color }} />

      <div className="p-8 grid md:grid-cols-[1fr_auto] gap-8 items-start" style={{ background: 'var(--app-card)' }}>
        <div>
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: `${fw.color}18`, color: fw.color }}
            >
              {fw.shortName}
            </span>
            <span className="text-xs rounded px-2 py-1" style={{ color: 'var(--app-text-dimmer)', border: '1px solid var(--app-border)' }}>{fw.jurisdiction}</span>
            <span className="text-xs rounded px-2 py-1" style={{ color: 'var(--app-text-dimmer)', border: '1px solid var(--app-border)' }}>Effective: {fw.effectiveDate}</span>
          </div>
          <h2 className="text-xl font-bold mb-3" style={{ color: 'var(--app-text-primary)' }}>{fw.fullName}</h2>
          <p className="text-sm leading-[1.7] mb-6" style={{ color: 'var(--app-text-muted)' }}>{fw.overview}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Requirements */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4" style={{ color: 'var(--app-text-dimmer)' }} />
                <p className="text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: 'var(--app-text-dimmer)' }}>KEY REQUIREMENTS</p>
              </div>
              <div className="space-y-2">
                {fw.requirements.map((req, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: fw.color }} />
                    <span className="text-sm" style={{ color: 'var(--app-text-muted)' }}>{req}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* IntelliXBOM coverage */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4" style={{ color: 'var(--app-text-dimmer)' }} />
                <p className="text-[11px] uppercase tracking-[0.08em] font-medium" style={{ color: 'var(--app-text-dimmer)' }}>INTELLIXBOM COVERS</p>
              </div>
              <div className="space-y-2">
                {fw.intellixbomCoverage.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: fw.color }} />
                    <span className="text-sm" style={{ color: 'var(--app-text-primary)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Meter */}
        <div className="flex flex-col items-center min-w-[140px]">
          <div className="relative">
            <svg width="100" height="100" className="-rotate-90">
              <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--app-border)" strokeWidth={strokeWidth} />
              <circle cx="50" cy="50" r={radius} fill="none" stroke={fw.color} strokeWidth={strokeWidth}
                strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-xl font-bold" style={{ color: fw.color }}>{fw.percentage}%</div>
            </div>
          </div>
          <div className="text-[11px] mt-2 text-center" style={{ color: 'var(--app-text-dimmer)' }}>Compliance Rate</div>
          <div
            className="mt-4 px-3 py-1 rounded-full text-[10px] font-medium"
            style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}
          >
            Actively monitored
          </div>
        </div>
      </div>
    </div>
  );
}

function StatColumn({ number, label, isLast = false }: { number: string; label: string; isLast?: boolean }) {
  return (
    <div className="text-center px-10 py-4" style={!isLast ? { borderRight: '1px solid var(--app-border)' } : {}}>
      <div className="text-4xl md:text-5xl font-bold text-[#4361EE] mb-1">{number}</div>
      <div className="text-sm" style={{ color: 'var(--app-text-muted)' }}>{label}</div>
    </div>
  );
}
