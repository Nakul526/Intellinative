import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { openDemoModal } from './DemoModal';
import sbomImage  from '../../assets/BOM TYPE/SBOM.jpeg';
import cbomImage  from '../../assets/BOM TYPE/CBOM.jpeg';
import aibomImage from '../../assets/BOM TYPE/AIBOM.jpeg';
import hbomImage  from '../../assets/BOM TYPE/HBOM.jpeg';

type BOMType = 'SBOM' | 'CBOM' | 'QBOM' | 'AIBOM' | 'HBOM';

/* Brand module colors from guidelines v1.1 */
const bomData = {
  SBOM: {
    color: '#00B1DC',
    bg: '#E6F7FC',
    border: 'rgba(0,177,220,0.3)',
    image: sbomImage,
    category: 'SOFTWARE BILL OF MATERIALS',
    title: 'Complete Software Transparency',
    description: 'Real-time visibility into every software component, dependency, and library across your entire application estate from containers to cloud. Auto-verify against CERT-In mandatory fields.',
    features: [
      'Direct & transitive dependency mapping',
      'CERT-In 21-field compliance validation',
      'Real-time CVE & license risk alerts',
      'CycloneDX 1.5 & SPDX 2.3 format support',
      'Container images & OS package scanning',
    ],
    tags: ['NPM', 'Maven', 'PyPI', 'Go Modules', 'Docker'],
    code: {
      bomFormat: 'CycloneDX',
      specVersion: '1.5',
      certInStatus: 'PASS ✓',
      components: [
        { name: 'log4j-core', version: '2.20.0', risk: 'NONE' },
        { name: 'openssl', version: '3.0.8', risk: 'HIGH' },
      ],
      totalComponents: 247,
    },
  },
  CBOM: {
    color: '#5B6CFF',
    bg: '#EEEFFE',
    border: 'rgba(91,108,255,0.3)',
    image: cbomImage,
    category: 'CRYPTOGRAPHIC BILL OF MATERIALS',
    title: 'Cryptographic Asset Visibility',
    description: 'Inventory every cipher suite, certificate, and key across your infrastructure. Detect weak algorithms and expiring certificates before auditors or attackers do.',
    features: [
      'TLS 1.0/1.1 & deprecated cipher detection',
      'Certificate expiry monitoring (30/7-day alerts)',
      'Weak algorithm flagging: MD5, SHA-1, 1024-bit RSA',
      'Key rotation compliance tracking',
      'Post-quantum readiness assessment',
    ],
    tags: ['TLS 1.3', 'RSA-4096', 'ECDSA', 'X.509', 'PKCS#11'],
    code: {
      cryptoAssets: {
        tlsActive: ['TLS 1.3', 'TLS 1.2'],
        deprecated: ['TLS 1.0', 'TLS 1.1'],
        certificates: { total: 12, expiringSoon: 3, expired: 0 },
      },
      status: 'ACTION REQUIRED',
    },
  },
  QBOM: {
    color: '#8B5CF6',
    bg: '#F3EEFE',
    border: 'rgba(139,92,246,0.3)',
    image: cbomImage,
    category: 'QUANTUM BILL OF MATERIALS',
    title: 'Quantum-Safe Migration Tracking',
    description: 'Identify quantum-vulnerable cryptography in your systems and track migration to NIST PQC standards. The Q-Day deadline is ~8 years migration planning starts today.',
    features: [
      'RSA-2048 / ECDSA vulnerability identification',
      'NIST PQC algorithm readiness mapping',
      'Migration priority scoring per asset',
      'Hybrid classical + PQC deployment tracking',
      'Y2Q timeline exposure reporting',
    ],
    tags: ['CRYSTALS-Kyber', 'CRYSTALS-Dilithium', 'SPHINCS+', 'FALCON'],
    code: {
      quantumRisk: {
        vulnerable: { 'RSA-2048': 'CRITICAL', 'ECDSA-P256': 'HIGH' },
        safe: { 'CRYSTALS-Kyber': 'NIST PQC', 'Dilithium3': 'NIST PQC' },
      },
      migrationScore: 42,
      yToQ: '~8 years',
      hybridReady: false,
    },
  },
  AIBOM: {
    color: '#C8941F',
    bg: '#FBF5E5',
    border: 'rgba(200,148,31,0.3)',
    image: aibomImage,
    category: 'AI BILL OF MATERIALS',
    title: 'AI Model & Dataset Governance',
    description: 'Track AI/ML models, training datasets, and inference pipelines across your estate. Ensure compliance with emerging AI regulations and surface bias risks before they become headlines.',
    features: [
      'Model lineage, versioning & provenance',
      'Training dataset PII & bias scanning',
      'Inference pipeline dependency tracking',
      'MeitY AI governance compliance checks',
      'Responsible AI fairness scoring',
    ],
    tags: ['TensorFlow', 'PyTorch', 'XGBoost', 'ONNX', 'Hugging Face'],
    code: {
      model: {
        name: 'fraud-detection-v2',
        type: 'XGBoost Classifier',
        version: '2.1.4',
      },
      dataset: { records: 2400000, piiPresent: false, verified: true },
      biasScore: 0.08,
      govStatus: 'COMPLIANT',
    },
  },
  HBOM: {
    color: '#4A5570',
    bg: '#EBEDF2',
    border: 'rgba(74,85,112,0.3)',
    image: hbomImage,
    category: 'HARDWARE BILL OF MATERIALS',
    title: 'Hardware Supply Chain Security',
    description: 'Inventory physical nodes, firmware versions, and TPM modules. Detect counterfeit CPUs, outdated BIOS, and untracked HSMs before NCIIPC auditors find them first.',
    features: [
      'CPU, NIC & HSM inventory with provenance',
      'Firmware & BIOS version compliance checks',
      'TPM 2.0 & Secure Boot verification',
      'Hardware supply chain risk scoring',
      'NCIIPC audit ready evidence export',
    ],
    tags: ['Intel', 'AMD', 'ARM', 'TPM 2.0', 'UEFI'],
    code: {
      node: 'PROD-DB-NODE-07',
      cpu: { model: 'Intel Xeon Gold 6338', verified: true },
      firmware: { bios: '2.15.1', updateRequired: true },
      tpm: '2.0',
      secureBootEnabled: true,
      supplyChainRisk: 'MEDIUM',
    },
  },
};

const HASH_TO_TAB: Record<string, BOMType> = {
  '#sbom': 'SBOM', '#cbom': 'CBOM', '#qbom': 'QBOM', '#aibom': 'AIBOM', '#hbom': 'HBOM',
};

export default function BOMTypes() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<BOMType>('SBOM');
  const active = bomData[activeTab];

  useEffect(() => {
    const tab = HASH_TO_TAB[location.hash.toLowerCase()];
    if (tab) {
      setActiveTab(tab);
      document.getElementById('bom-types')?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [location.hash]);

  return (
    <section id="bom-types" className="py-8 md:py-14" style={{ background: 'var(--p0)' }}>
      <div className="max-w-[1440px] mx-auto px-6">

        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <p
            className="text-[11px] uppercase tracking-[0.1em] font-semibold mb-3"
            style={{ color: 'var(--ink-500)', fontFamily: 'var(--f-m)' }}
          >
            Five BOM Types · One Platform
          </p>
          <h2
            className="text-[26px] sm:text-[36px] md:text-[52px] font-bold mb-3 sm:mb-4"
            style={{ color: 'var(--ink-700)', letterSpacing: '-0.025em', lineHeight: '1.05' }}
          >
            Five BOM types.{' '}
            <span style={{ color: '#00B1DC' }}>One unified platform.</span>
          </h2>
          <p className="text-lg" style={{ color: 'var(--ink-600)' }}>
            From software packages to quantum cryptography and physical hardware fully governed, continuously validated, and regulator ready.
          </p>
        </div>

        {/* Tab Row module-colored chips */}
        <div className="flex flex-wrap gap-3 mb-2">
          {(Object.keys(bomData) as BOMType[]).map(type => {
            const cfg = bomData[type];
            const isActive = activeTab === type;
            return (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className="flex items-center gap-2 sm:gap-2.5 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-[13px] sm:text-[15px] transition-all duration-200 cursor-pointer"
                style={
                  isActive
                    ? { background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color, boxShadow: `0 2px 14px ${cfg.border}` }
                    : { background: 'var(--p1)', border: '1px solid var(--p3)', color: 'var(--ink-600)' }
                }
                onMouseEnter={e => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = cfg.bg;
                    el.style.borderColor = cfg.border;
                    el.style.color = cfg.color;
                    el.style.boxShadow = `0 2px 10px ${cfg.border}`;
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'var(--p1)';
                    el.style.borderColor = 'var(--p3)';
                    el.style.color = 'var(--ink-600)';
                    el.style.boxShadow = 'none';
                  }
                }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: isActive ? cfg.color : 'var(--ink-500)' }}
                />
                {type}
              </button>
            );
          })}
        </div>
        <p className="text-[11px] mb-8" style={{ color: 'var(--ink-400)', fontFamily: 'var(--f-m)' }}>
          ↑ Click each tab to explore
        </p>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
            className="grid md:grid-cols-2 gap-6 sm:gap-10 items-start"
          >
            {/* Left: Text  pushed below terminal on mobile */}
            <div className="order-2 md:order-1 flex flex-col justify-start md:overflow-y-auto md:pr-2 custom-scrollbar">


              <h3
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: 'var(--ink-700)', letterSpacing: '-0.025em' }}
              >
                {active.title}
              </h3>

              <p
                className="text-[11px] uppercase tracking-[0.08em] font-semibold mb-4"
                style={{ color: active.color, fontFamily: 'var(--f-m)' }}
              >
                {active.category}
              </p>

              <p className="text-[14px] leading-[1.75] mb-6" style={{ color: 'var(--ink-600)' }}>
                {active.description}
              </p>

              <div className="space-y-3 mb-6">
                {active.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 mt-0.5 flex-shrink-0"
                      style={{ color: active.color }}
                    />
                    <span className="text-[14px]" style={{ color: 'var(--ink-700)' }}>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded text-[11px] font-medium"
                    style={{
                      background: active.bg,
                      color: active.color,
                      fontFamily: 'var(--f-m)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Image or terminal card — image first on mobile */}
            <div className="order-1 md:order-2 overflow-y-auto custom-scrollbar" style={{ maxHeight: '420px' }}>
              {active.image
                ? <BrowserFrame src={active.image} label={`${activeTab} · IntelliXBOM`} accentColor={active.color} />
                : <TerminalCard type={activeTab} data={active.code} color={active.color} />
              }
            </div>
          </motion.div>
        </AnimatePresence>

      </div>

      {/* ── CTA Banner ── full width */}
      <div
        className="relative mt-10 overflow-hidden"
        style={{ background: 'var(--ink-700)' }}
      >
        {/* Ambient glow blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute rounded-full" style={{ width: 320, height: 320, background: 'radial-gradient(circle, rgba(61,199,246,0.10), transparent 65%)', top: -100, left: -60 }} />
          <div className="absolute rounded-full" style={{ width: 280, height: 280, background: 'radial-gradient(circle, rgba(91,108,255,0.10), transparent 65%)', bottom: -80, right: 80 }} />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 px-4 sm:px-8 py-5 sm:py-7">
          {/* Left: text block */}
          <div className="flex items-start gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(61,199,246,0.1)', border: '1px solid rgba(61,199,246,0.25)' }}
            >
              <Shield className="w-5 h-5" style={{ color: '#3DC7F6' }} />
            </div>
            <div>
              <p
                className="text-[17px] md:text-[19px] font-bold mb-1 leading-snug"
                style={{ color: '#FFFFFF', letterSpacing: '-0.02em' }}
              >
                Need to compare BOM types for your compliance team?
              </p>
              <p className="text-[13px]" style={{ color: 'rgba(197,204,216,0.75)' }}>
                Get a personalised walkthrough across SBOM, CBOM, QBOM, AIBOM &amp; HBOM mapped to your regulatory environment.
              </p>
            </div>
          </div>

          {/* Right: CTA */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={openDemoModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold cursor-pointer"
              style={{
                background: '#3DC7F6',
                color: '#ffffff',
                // boxShadow: '0 0 24px rgba(61,199,246,0.35)',
              }}
            >
              Request a Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrowserFrame({ src, label, accentColor }: { src: string; label: string; accentColor: string }) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: '1px solid var(--p3)',
        boxShadow: '0 16px 56px rgba(14,26,46,0.10)',
      }}
    >
      {/* Chrome bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: 'var(--p2)', borderBottom: '1px solid var(--p3)' }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#E53935' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#F59E0B' }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#10B981' }} />
        </div>
        <div
          className="flex-1 mx-3 px-3 flex items-center gap-2"
          style={{
            background: 'var(--p0)',
            border: '1px solid var(--p3)',
            borderRadius: 6,
            height: 24,
          }}
        >
          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: accentColor, opacity: 0.7 }} />
          <span style={{ fontSize: 11, color: 'var(--ink-500)', fontFamily: 'var(--f-m)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            app.intellixbom.com · {label}
          </span>
        </div>
      </div>

      {/* Screenshot */}
      <div style={{ lineHeight: 0 }}>
        <img
          src={src}
          alt={label}
          className="w-full"
          style={{ display: 'block' }}
        />
      </div>
    </div>
  );
}

function TerminalCard({ type, data }: { type: BOMType; data: object; color?: string }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: '#060B14',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'var(--sh-md)',
      }}
    >
      {/* Title bar */}
      <div
        className="h-9 flex items-center justify-between px-4"
        style={{ background: '#0E1A2E', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E53935]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
        </div>
        <div style={{ fontFamily: 'var(--f-m)', fontSize: 11, color: '#6B7589' }}>
          ixbom://{type.toLowerCase()}/inventory
        </div>
      </div>

      {/* Code body */}
      <div className="p-5" style={{ fontFamily: 'var(--f-m)', fontSize: 13, lineHeight: 1.7 }}>
        <pre style={{ color: '#C5CCD8' }}>
          {JSON.stringify(data, null, 2)
            .split('\n')
            .map((line, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }} />
            ))}
        </pre>
      </div>
    </div>
  );
}

function syntaxHighlight(line: string): string {
  // keys: navy 3
  line = line.replace(/"([^"]+)":/g, '<span style="color:#8FDAED">"$1":</span>');
  // string values: gold
  line = line.replace(/: "([^"]+)"/g, ': <span style="color:#E8B259">"$1"</span>');
  // numbers: indigo
  line = line.replace(/: (\d+\.?\d*)/g, ': <span style="color:#8B9BFF">$1</span>');
  // true: success green
  line = line.replace(/: true/g, ': <span style="color:#10B981">true</span>');
  // false: red
  line = line.replace(/: false/g, ': <span style="color:#E53935">false</span>');
  return line;
}
