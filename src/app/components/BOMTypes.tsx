import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

type BOMType = 'SBOM' | 'CBOM' | 'QBOM' | 'AIBOM' | 'HBOM';

const bomData = {
  SBOM: {
    color: '#4361EE',
    category: 'SOFTWARE BILL OF MATERIALS',
    title: 'Complete Software Transparency',
    description: 'Track every package, dependency, and library in your software supply chain. Auto-verify against CERT-In mandatory fields with real-time CVE monitoring.',
    features: [
      'Automatic dependency graph generation',
      'CERT-In 21-field compliance validation',
      'Real-time CVE & license risk alerts',
      'CycloneDX & SPDX format support'
    ],
    tags: ['NPM', 'Maven', 'PyPI', 'Go Modules'],
    code: { components: 247, vulnerabilities: 12, licenseTypes: 8, certInStatus: 'COMPLIANT' }
  },
  CBOM: {
    color: '#00D4AA',
    category: 'CRYPTOGRAPHIC BILL OF MATERIALS',
    title: 'Crypto Asset Visibility',
    description: 'Inventory every cryptographic asset, certificate, and key across your infrastructure. Detect weak algorithms and expiring certificates before they fail.',
    features: [
      'Certificate expiry monitoring',
      'Weak algorithm detection (MD5, SHA1)',
      'Key rotation compliance tracking',
      'Post-quantum readiness assessment'
    ],
    tags: ['TLS 1.3', 'RSA', 'ECC', 'Certificates'],
    code: { tlsVersions: ['1.2', '1.3'], certificates: { expiring: 3, weakKey: 1 }, algorithms: ['RSA-2048', 'ECDSA-P256'], certInStatus: 'ACTION REQUIRED' }
  },
  QBOM: {
    color: '#8B5CF6',
    category: 'QUANTUM BILL OF MATERIALS',
    title: 'Quantum-Safe Migration',
    description: 'Identify quantum-vulnerable cryptography in your systems and track migration to post-quantum algorithms. Stay ahead of Y2Q.',
    features: [
      'Quantum vulnerability scanning',
      'NIST PQC algorithm mapping',
      'Migration priority scoring',
      'Hybrid crypto deployment tracking'
    ],
    tags: ['CRYSTALS-Kyber', 'Dilithium', 'SPHINCS+'],
    code: { quantumVulnerable: ['RSA-2048', 'ECDSA-P256'], quantumSafe: ['CRYSTALS-Kyber', 'Dilithium'], migrationScore: 42, hybridDeployment: true }
  },
  AIBOM: {
    color: '#F59E0B',
    category: 'AI BILL OF MATERIALS',
    title: 'AI Model Governance',
    description: 'Track AI/ML models, training datasets, and inference pipelines. Ensure compliance with emerging AI regulations and detect bias risks.',
    features: [
      'Model lineage & versioning',
      'Training data provenance tracking',
      'Bias & fairness scoring',
      'Responsible AI compliance reporting'
    ],
    tags: ['TensorFlow', 'PyTorch', 'ONNX', 'Hugging Face'],
    code: { model: 'gpt-4-turbo-fine-tuned', framework: 'OpenAI API', trainingData: { records: 125000, piiPresent: false }, biasScore: 0.23, govStatus: 'UNDER REVIEW' }
  },
  HBOM: {
    color: '#EF4444',
    category: 'HARDWARE BILL OF MATERIALS',
    title: 'Hardware Supply Chain Security',
    description: 'Inventory physical components, firmware versions, and TPM modules. Track hardware supply chain risks and enforce firmware update policies.',
    features: [
      'Firmware version tracking',
      'TPM & secure boot verification',
      'Hardware supply chain risk scoring',
      'BIOS/UEFI update compliance'
    ],
    tags: ['Intel', 'AMD', 'ARM', 'TPM 2.0'],
    code: { server: 'Dell PowerEdge R750', cpu: 'Intel Xeon Gold 6338', firmware: { bios: '2.15.1', updateRequired: true }, tpm: '2.0', supplyChainRisk: 'MEDIUM' }
  }
};

export default function BOMTypes() {
  const [activeTab, setActiveTab] = useState<BOMType>('SBOM');

  return (
    <section id="bom-types" className="py-12 md:py-16 px-6" style={{ background: 'var(--app-bg)' }}>
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-[11px] uppercase tracking-[0.1em] font-medium mb-3" style={{ color: 'var(--app-text-dimmer)' }}>
            FIVE BOM TYPES. ONE PLATFORM.
          </p>
          <h2 className="text-4xl md:text-[44px] font-bold tracking-[-0.02em] mb-4" style={{ color: 'var(--app-text-primary)' }}>
            Complete Visibility Across Every Layer
          </h2>
          <p className="text-lg max-w-[560px] mx-auto" style={{ color: 'var(--app-text-muted)' }}>
            From software packages to quantum cryptography — governed, validated, and compliant.
          </p>
        </div>

        {/* Tab Row */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(Object.keys(bomData) as BOMType[]).map((type) => (
            <button
              key={type}
              onClick={() => setActiveTab(type)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-200 font-semibold"
              style={
                activeTab === type
                  ? {
                      background: `rgba(${hexToRgb(bomData[type].color)}, 0.15)`,
                      border: `1px solid rgba(${hexToRgb(bomData[type].color)}, 0.5)`,
                      boxShadow: `0 0 16px rgba(${hexToRgb(bomData[type].color)}, 0.25)`,
                      color: bomData[type].color
                    }
                  : {
                      color: 'var(--app-text-muted)',
                      background: 'var(--app-elevated)',
                      border: '1px solid var(--app-border)'
                    }
              }
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: bomData[type].color }} />
              {type}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            {/* Left: Text Content */}
            <div>
              <div
                className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold mb-3"
                style={{
                  background: `rgba(${hexToRgb(bomData[activeTab].color)}, 0.15)`,
                  color: bomData[activeTab].color
                }}
              >
                {activeTab}
              </div>

              <h3 className="text-3xl md:text-4xl font-bold mb-2" style={{ color: 'var(--app-text-primary)' }}>
                {bomData[activeTab].title}
              </h3>

              <p
                className="text-[11px] uppercase tracking-[0.08em] font-medium mb-4"
                style={{ color: bomData[activeTab].color }}
              >
                {bomData[activeTab].category}
              </p>

              <p className="text-lg leading-[1.75] mb-6" style={{ color: 'var(--app-text-muted)' }}>
                {bomData[activeTab].description}
              </p>

              <div className="space-y-3 mb-6">
                {bomData[activeTab].features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: bomData[activeTab].color }}
                    />
                    <span className="text-[15px]" style={{ color: 'var(--app-text-primary)' }}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {bomData[activeTab].tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-[11px] font-medium"
                    style={{
                      background: `rgba(${hexToRgb(bomData[activeTab].color)}, 0.1)`,
                      color: bomData[activeTab].color
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={`#explore-${activeTab.toLowerCase()}`}
                className="inline-flex items-center gap-1 text-sm font-semibold transition-colors"
                style={{ color: bomData[activeTab].color }}
              >
                Explore {activeTab} →
              </a>
            </div>

            {/* Right: Terminal Card — always dark */}
            <div>
              <TerminalCard type={activeTab} data={bomData[activeTab].code} color={bomData[activeTab].color} />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Comparison Teaser */}
        <div
          className="mt-8 p-4 md:p-6 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4"
          style={{
            background: 'rgba(67,97,238,0.07)',
            border: '1px solid rgba(67,97,238,0.2)'
          }}
        >
          <p className="text-sm md:text-base" style={{ color: 'var(--app-text-primary)' }}>
            Need to compare BOM types for your compliance team?
          </p>
          <a href="#comparison" className="text-sm font-semibold text-[#4361EE] hover:text-[#5371FF] transition-colors whitespace-nowrap">
            View Full Comparison →
          </a>
        </div>
      </div>
    </section>
  );
}

function TerminalCard({ type, data, color }: { type: BOMType; data: any; color: string }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: '#0D1117', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      <div className="h-7 bg-[#141A26] flex items-center justify-between px-3">
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
        </div>
        <div className="font-mono text-[11px] text-[#4B5563]">
          ixbom://{type.toLowerCase()}/inventory
        </div>
      </div>

      <div className="p-5 font-mono text-xs md:text-[13px] leading-relaxed">
        <pre className="text-[#94A3B8]">
          {JSON.stringify(data, null, 2)
            .split('\n')
            .map((line, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: syntaxHighlight(line, color) }} />
            ))}
        </pre>
      </div>
    </div>
  );
}

function syntaxHighlight(line: string, accentColor: string): string {
  line = line.replace(/"([^"]+)":/g, '<span style="color: #94A3B8">"$1":</span>');
  line = line.replace(/: "([^"]+)"/g, ': <span style="color: #00D4AA">"$1"</span>');
  line = line.replace(/: (\d+\.?\d*)/g, ': <span style="color: #F59E0B">$1</span>');
  line = line.replace(/: true/g, ': <span style="color: #22C55E">true</span>');
  line = line.replace(/: false/g, ': <span style="color: #EF4444">false</span>');
  return line;
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '67, 97, 238';
}
