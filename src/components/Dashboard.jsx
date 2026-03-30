import React, { useState } from 'react'
import DonutChart from './DonutChart'
import SparkLine from './SparkLine'
import LineChart from './LineChart'
import RadarChart from './RadarChart'

// ── Data ──────────────────────────────────────────────────────────────────────

const bomDonutData = [
  { label: 'SBOM', value: 9826, color: '#f0d060' },
  { label: 'CBOM', value: 4913, color: '#3b82f6' },
  { label: 'AI BOM', value: 3685, color: '#a855f7' },
  { label: 'HBOM', value: 3685, color: '#3fb950' },
  { label: 'MBOM', value: 2458, color: '#f85149' },
  { label: 'Other', value: 1000, color: '#8b949e' },
]

const cryptoAlgos = [
  { name: 'AES-256-GCM', type: 'Symmetric', keyLen: '256 bits', usage: '1,247', status: 'ok', quantum: false },
  { name: 'RSA-2048', type: 'Asymmetric', keyLen: '2048 bits', usage: '1,205', status: 'warn', quantum: true },
  { name: 'SHA-256', type: 'Hash', keyLen: '256 bits', usage: '2,168', status: 'ok', quantum: false },
  { name: 'CRYSTALS-Kyber', type: 'Symmetric', keyLen: '256 bits', usage: '887', status: 'ok', quantum: false },
  { name: 'ChaCha20-Poly1305', type: 'Symmetric', keyLen: '256 bits', usage: '887', status: 'ok', quantum: false },
  { name: 'ECDSA P-256', type: 'Asymmetric', keyLen: '256 bits', usage: '432', status: 'critical', quantum: true },
]

const aiModels = [
  { name: 'sentiment-analyzer-v2', framework: 'TensorFlow', type: 'Classification', acc: 94.2, size: '245 MB', lastSeen: '2023-12-01', risk: 'low' },
  { name: 'image-classifier-resnet', framework: 'PyTorch', type: 'CNN', acc: 89.1, size: '1.2 GB', lastSeen: '2024-01-04', risk: 'high' },
  { name: 'text-generation-gpt', framework: 'Hugging Face', type: 'Generation', acc: 93.5, size: '12 GB', lastSeen: '2023-11-01', risk: 'low' },
  { name: 'fraud-detection-ensemble', framework: 'auto-learn', type: 'Ensemble', acc: 96.4, size: '480 MB', lastSeen: '2023-10-20', risk: 'medium' },
  { name: 'recommendation-engine', framework: 'TensorFlow', type: 'Collaborative', acc: 97.8, size: '575 MB', lastSeen: '2023-10-15', risk: 'medium' },
]

const hardwareComponents = [
  { name: 'Intel(R) i9-3980-s4', type: 'Processor', mfr: 'Intel Corp', firmware: 'Intel', eolDate: '2024-01-10', risk: 'critical' },
  { name: 'Samsung 870 EVO Plus 1TB', type: 'Storage', mfr: 'Samsung', firmware: 'SD3G3-AV1', eolDate: 'VMV-TB', risk: 'critical' },
  { name: 'Intel I360 Gigabit NIC', type: 'Network', mfr: 'Intel', firmware: '1.0.T3', eolDate: '1.0.T3', risk: 'critical' },
  { name: 'NVIDIA Tesla T4 16GB', type: 'Graphics', mfr: 'NVIDIA', firmware: '00.14.AC', eolDate: '00.14.AC', risk: 'critical' },
  { name: 'Kingston DDR4 32GB EC2', type: 'Memory', mfr: 'Kingston', firmware: 'SCN', eolDate: '', risk: 'low' },
]

const certData = [
  { label: 'Jan', v: 2 }, { label: 'Feb', v: 5 }, { label: 'Mar', v: 3 },
  { label: 'Apr', v: 8 }, { label: 'May', v: 4 }, { label: 'Jun', v: 12 },
  { label: 'Jul', v: 6 }, { label: 'Aug', v: 15 }, { label: 'Sep', v: 9 },
  { label: 'Oct', v: 18 }, { label: 'Nov', v: 7 }, { label: 'Dec', v: 22 },
]

const growthData = [
  { label: 'Jan', v: 20000 }, { label: 'Feb', v: 21500 }, { label: 'Mar', v: 22000 },
  { label: 'Apr', v: 21000 }, { label: 'May', v: 23000 }, { label: 'Jun', v: 22500 },
  { label: 'Jul', v: 24000 }, { label: 'Aug', v: 24567 }, { label: 'Sep', v: 25000 },
]

const radarData = [
  { label: 'Integrity', value: 72 },
  { label: 'Avail', value: 85 },
  { label: 'Confid', value: 60 },
  { label: 'Auth', value: 78 },
  { label: 'Risk', value: 55 },
]

const activityFeed = [
  { color: '#58a6ff', text: 'Critical vulnerability CVE-2024-1754 detected in file log4j-2.14 across multiple dependencies.', time: '3 minutes ago', badge: 'CRITICAL', badgeColor: '#f85149' },
  { color: '#f0883e', text: 'SBOM scan completed for nginx-image-processor: 2,341 components analyzed, 12 new issues found.', time: '25 min ago', badge: 'NEW', badgeColor: '#f0883e' },
  { color: '#3fb950', text: 'Certificate ap.example.com expiring in 30 days. Renewal required before expiration date.', time: '1 hour ago', badge: 'INFO', badgeColor: '#3fb950' },
  { color: '#a855f7', text: 'New AI model registration: fastapi>=0.110.0 in ml-pipeline registered, activate >=2 approvals required.', time: '2 hours ago', badge: 'UPDATE', badgeColor: '#a855f7' },
  { color: '#f85149', text: 'RSA-2048 algorithm flagged as quantum-vulnerable in 47 components. Migration to post-quantum recommended.', time: '3 hours ago', badge: 'WARN', badgeColor: '#d29922' },
  { color: '#3fb950', text: 'Hardware firmware update available for Samsung 870 EVO. Update recommended to patch security vulnerabilities.', time: '5 hours ago', badge: 'UPDATE', badgeColor: '#3fb950' },
]

// ── Helper components ─────────────────────────────────────────────────────────

function StatCard({ title, value, sub, trend, trendVal, color, children }) {
  return (
    <div className="card">
      <div className="card-title">{title}</div>
      <div className="card-value" style={{ color: color || 'var(--text-primary)' }}>{value}</div>
      {sub && <div className="card-meta">{sub}</div>}
      {trend && (
        <div style={{ marginTop: 4, fontSize: 10 }} className={trend === 'up' ? 'trend-up' : 'trend-down'}>
          {trend === 'up' ? '▲' : '▼'} {trendVal}
        </div>
      )}
      {children}
    </div>
  )
}

function SectionHeader({ label, isNew, color = '#58a6ff', badge }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      {badge ? (
        <span style={{ background: `${color}22`, color, border: `1px solid ${color}44`, fontSize: 9, padding: '2px 6px', borderRadius: 3, fontWeight: 700 }}>{badge}</span>
      ) : (
        <div style={{ width: 3, height: 14, background: color, borderRadius: 2 }} />
      )}
      {isNew && <span className="badge" style={{ background: 'var(--accent-red)', color: 'white', fontSize: 9 }}>NEW</span>}
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>
    </div>
  )
}

function RiskGauge({ score, size = 100 }) {
  const r = size / 2 - 10
  const cx = size / 2
  const cy = size / 2
  const circumference = Math.PI * r
  const pct = score / 100
  const fill = circumference * pct
  const color = score >= 70 ? '#f85149' : score >= 40 ? '#f0883e' : '#3fb950'

  return (
    <div className="gauge-container">
      <svg width={size} height={size / 2 + 14} viewBox={`0 0 ${size} ${size / 2 + 14}`}>
        <path d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
          fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
        <path d={`M ${cx - r},${cy} A ${r},${r} 0 0 1 ${cx + r},${cy}`}
          fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={`${fill} ${circumference}`} strokeLinecap="round" />
        <text x={cx} y={cy + 6} textAnchor="middle" fill={color} fontSize="18" fontWeight="700" fontFamily="JetBrains Mono">
          {score}
        </text>
      </svg>
      <div style={{ fontSize: 9, color: 'var(--text-muted)', marginTop: -8 }}>Quantum Risk Score</div>
    </div>
  )
}

function ProgressBar({ value, max, color, height = 6 }) {
  const pct = Math.min((value / max) * 100, 100)
  return (
    <div className="progress-bar" style={{ height }}>
      <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
    </div>
  )
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('All SBOM')

  return (
    <div className="main-content">

      {/* ── Top KPI Row ── */}
      <div className="grid-4 section">
        <div className="card kpi-card kpi-blue">
          <div className="card-title">Total Components</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 6 }}>
            <div>
              <div className="card-value" style={{ color: '#58a6ff' }}>24,567</div>
              <div className="card-meta" style={{ marginTop: 4 }}>Total Software BOM</div>
            </div>
            <SparkLine data={[18000, 19500, 21000, 20200, 22000, 23100, 24567]} color="#58a6ff" width={70} height={36} fill />
          </div>
          <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span className="badge badge-green" style={{ fontSize: 10 }}>▲ +4.1%</span>
            <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>vs last month</span>
          </div>
        </div>

        <div className="card kpi-card kpi-red">
          <div className="card-title">Vulnerabilities</div>
          <div className="card-value" style={{ color: '#f85149', marginTop: 6 }}>284</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 6 }}>
            {[['18', '#f85149', 'Critical'], ['66', '#f0883e', 'High'], ['142', '#d29922', 'Med']].map(([n, c, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4, background: `${c}18`, border: `1px solid ${c}30`, borderRadius: 5, padding: '3px 7px' }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: c, display: 'inline-block', boxShadow: `0 0 5px ${c}` }} />
                <span style={{ fontSize: 10, color: c, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{n}</span>
                <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card kpi-card kpi-orange" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card-title" style={{ alignSelf: 'flex-start' }}>Risk Score</div>
          <RiskGauge score={87} size={90} />
        </div>

        <div className="card kpi-card kpi-purple">
          <div className="card-title">Quantum Readiness</div>
          <div className="card-value" style={{ color: '#a855f7', marginTop: 6 }}>42%</div>
          <div style={{ marginTop: 10 }}>
            <ProgressBar value={42} max={100} color="linear-gradient(90deg, #a855f7, #ec4899)" height={7} />
          </div>
          <div style={{ marginTop: 6, fontSize: 10, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#a855f7', fontWeight: 600 }}>▲ 3.2%</span> from last scan
          </div>
        </div>
      </div>

      {/* ── Filter Bar ── */}
      <div className="filter-bar section">
        <span className="filter-bar-label">Filter by BOM Type:</span>
        {[
          { label: 'All SBOM', color: '#58a6ff' },
          { label: 'SBOM',     color: '#f0d060' },
          { label: 'CBOM',     color: '#3b82f6' },
          { label: 'AI BOM',   color: '#a855f7' },
          { label: 'HBOM',     color: '#f0883e' },
        ].map(({ label, color }) => {
          const isActive = activeTab === label
          return (
            <button
              key={label}
              className={`filter-chip${isActive ? ' active' : ''}`}
              onClick={() => setActiveTab(label)}
              style={isActive ? {
                background: `${color}22`,
                borderColor: `${color}66`,
                color,
                boxShadow: `0 0 10px ${color}33`,
              } : {}}
            >
              <span className="chip-dot" style={{ background: color }} />
              {label}
            </button>
          )
        })}
      </div>

      {/* ── BOM Distribution ── */}
      <div className="section">
        <SectionHeader label="BOM Distribution" />
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 20, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <DonutChart size={150} data={bomDonutData} centerText="24,567" centerSub="Total SBOM" />
            </div>
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[
                  { label: 'SBOM', value: '9,826', sub: '41.1%', color: '#f0d060', tag: 'NPM' },
                  { label: 'CBOM', value: '4,913', sub: '20.0%', color: '#3b82f6', tag: 'PyPI' },
                  { label: 'AI BOM', value: '3,685', sub: '15.0%', color: '#a855f7', tag: 'Docker' },
                  { label: 'HBOM', value: '3,685', sub: '15.0%', color: '#3fb950', tag: 'Maven' },
                  { label: 'MBOM', value: '2,458', sub: '10.0%', color: '#f85149', tag: 'Conan' },
                  { label: 'OBom', value: '', sub: '', color: '#8b949e', tag: 'Galaxy' },
                ].map((item, i) => (
                  <div key={i} className="mini-stat" style={{ borderLeft: `2px solid ${item.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.label}</div>
                        {item.value && <div className="mini-stat-value">{item.value}</div>}
                        {item.sub && <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{item.sub}</div>}
                      </div>
                      <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: 9 }}>{item.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Software Bill of Materials ── */}
      <div className="section">
        <SectionHeader label="Software Bill of Materials" badge="SBOM" color="#3fb950" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 10 }}>
          <div className="sbom-highlight-card sbom-blue">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--accent-blue)', marginBottom: 4 }}>Total Components</div>
                <div className="big-number" style={{ color: '#58a6ff' }}>10</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Inter Component ←</div>
              </div>
              <div style={{ color: 'var(--accent-blue)', fontSize: 16 }}>⬡</div>
            </div>
          </div>
          <div className="sbom-highlight-card sbom-purple">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--accent-purple)', marginBottom: 4 }}>Vulnerabilities</div>
                <div className="big-number" style={{ color: '#a855f7' }}>4</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Lightspeed</div>
              </div>
              <div style={{ color: 'var(--accent-purple)', fontSize: 16 }}>⚡</div>
            </div>
          </div>
          <div className="sbom-highlight-card sbom-green">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 10, color: 'var(--accent-green)', marginBottom: 4 }}>Licenses</div>
                <div className="big-number" style={{ color: '#3fb950' }}>10</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Licenses</div>
              </div>
              <div style={{ color: 'var(--accent-green)', fontSize: 16 }}>📋</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>Tidy Libraries</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>7</div>
              <div style={{ marginTop: 6 }}>
                <div style={{ fontSize: 10, color: 'var(--accent-orange)' }}>60 failed in memory</div>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>Loaded</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>675</div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>675 loaded in memory</div>
            </div>
          </div>
          <div className="divider" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>Vulnerabilities</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-red)' }}>4</div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>with 4 components</div>
            </div>
            <div>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>Dependencies on</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>12</div>
              <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>Total dependency</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── License Distribution ── */}
      <div className="section">
        <div className="card">
          <div className="section-title">License Distribution</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { label: 'MIT', value: 11200, max: 24567, color: '#3fb950' },
              { label: 'Apache 2.0', value: 7800, max: 24567, color: '#3b82f6' },
              { label: 'BSD 3-Clause', value: 3200, max: 24567, color: '#a855f7' },
              { label: 'GPL v2.0', value: 1200, max: 24567, color: '#f0883e' },
              { label: 'None', value: 600, max: 24567, color: '#8b949e' },
            ].map((item, i) => (
              <div className="chart-bar-horizontal" key={i}>
                <div className="chart-bar-label">{item.label}</div>
                <div className="chart-bar-track">
                  <div className="chart-bar-fill" style={{ width: `${(item.value / item.max) * 100}%`, background: item.color }} />
                </div>
                <div className="chart-bar-value">{item.value.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Package Ecosystems ── */}
      <div className="section">
        <div className="card">
          <div className="section-title">Package Ecosystems</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {[
              { name: 'npm', count: '4,523', color: '#cc3534', icon: 'N' },
              { name: 'PyPI', count: '2,891', color: '#3b82f6', icon: 'Py' },
              { name: 'Maven', count: '1,432', color: '#f0883e', icon: 'M' },
              { name: 'NuGet', count: '980', color: '#a855f7', icon: '.N' },
            ].map((pkg, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 6, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, background: pkg.color, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: 'white' }}>{pkg.icon}</div>
                <div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{pkg.name}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{pkg.count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Cryptography Bill of Materials ── */}
      <div className="section">
        <SectionHeader label="Cryptography Bill of Materials" isNew badge="CBOM" color="#a855f7" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 12 }}>
          <div className="card">
            <div className="section-title">Cryptographic Algorithms</div>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ALGORITHM</th>
                  <th>TYPE</th>
                  <th>KEY LENGTH</th>
                  <th>USAGE</th>
                  <th>STATUS</th>
                  <th>QUANTUM RISK</th>
                </tr>
              </thead>
              <tbody>
                {cryptoAlgos.map((algo, i) => (
                  <tr key={i}>
                    <td style={{ color: 'var(--text-primary)', fontFamily: 'JetBrains Mono', fontSize: 11 }}>{algo.name}</td>
                    <td>{algo.type}</td>
                    <td style={{ fontFamily: 'JetBrains Mono' }}>{algo.keyLen}</td>
                    <td style={{ fontFamily: 'JetBrains Mono' }}>{algo.usage}</td>
                    <td>
                      <span className={`status status-${algo.status}`}>
                        {algo.status === 'ok' ? 'SECURE' : algo.status === 'warn' ? 'WARNING' : 'CRITICAL'}
                      </span>
                    </td>
                    <td>
                      {algo.quantum
                        ? <span style={{ color: '#f85149', fontSize: 14 }}>⚠</span>
                        : <span style={{ color: '#3fb950', fontSize: 12 }}>✓</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Quantum Vulnerability</div>
            <RiskGauge score={73} size={110} />
            <div style={{ fontSize: 10, color: 'var(--text-muted)', textAlign: 'center' }}>
              <span style={{ color: '#f85149' }}>73%</span> algorithms are post-quantum vulnerable
            </div>
            <button style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.3)', color: '#a855f7', borderRadius: 5, padding: '5px 12px', fontSize: 10, cursor: 'pointer' }}>
              View Migration Plan
            </button>
          </div>
        </div>

        {/* Protocol usage + Cert expiry */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <div className="card">
            <div className="section-title">Protocol Usage</div>
            {[
              { label: 'TLS 1.3', value: 8872, pct: 87, color: '#3fb950' },
              { label: 'TLS 1.2', value: 1186, pct: 11, color: '#f0883e' },
              { label: 'SSH 2.0', value: 714, pct: 7, color: '#f85149' },
            ].map((p, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 5 }}>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, display: 'inline-block', boxShadow: `0 0 5px ${p.color}` }} />
                    {p.label}
                  </span>
                  <span style={{ color: p.color, fontFamily: 'JetBrains Mono', fontSize: 10, fontWeight: 600 }}>{p.value.toLocaleString()} instances</span>
                </div>
                <div style={{ position: 'relative' }}>
                  <ProgressBar value={p.pct} max={100} color={`linear-gradient(90deg, ${p.color}, ${p.color}99)`} height={6} />
                </div>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="section-title">Certificate Expiry Forecast</div>
            <LineChart data={certData} width={300} height={90} color="#f0883e" />
            <div style={{ display: 'flex', gap: 12, marginTop: 6, justifyContent: 'center' }}>
              {['Active', 'Expiring', 'Expired'].map((l, i) => (
                <span key={i} className="legend-item">
                  <span className="legend-dot" style={{ background: ['#3fb950', '#f0883e', '#f85149'][i] }} />
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Bill of Materials ── */}
      <div className="section">
        <SectionHeader label="AI Bill of Materials" isNew badge="AI BOM" color="#3b82f6" />
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="section-title">AI Model Inventory</div>
          <table className="data-table">
            <thead>
              <tr>
                <th>MODEL</th>
                <th>FRAMEWORK</th>
                <th>TYPE</th>
                <th>ACCURACY</th>
                <th>SIZE</th>
                <th>LAST TRAINED</th>
                <th>RISK</th>
              </tr>
            </thead>
            <tbody>
              {aiModels.map((m, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text-primary)', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{m.name}</td>
                  <td>{m.framework}</td>
                  <td>{m.type}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <ProgressBar value={m.acc} max={100} color="#3fb950" height={4} />
                      <span style={{ fontFamily: 'JetBrains Mono', fontSize: 10, minWidth: 32 }}>{m.acc}%</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 10 }}>{m.size}</td>
                  <td style={{ fontSize: 10 }}>{m.lastSeen}</td>
                  <td>
                    <span className={`status status-${m.risk === 'high' ? 'critical' : m.risk === 'medium' ? 'warn' : 'ok'}`}>
                      {m.risk.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Framework dist + Radar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="card">
            <div className="section-title">Framework Distribution</div>
            <div className="framework-bar">
              {[
                { label: 'TensorFlow', height: 70, color: '#f0883e' },
                { label: 'PyTorch', height: 55, color: '#f85149' },
                { label: 'Keras', height: 40, color: '#a855f7' },
                { label: 'HuggingFace', height: 30, color: '#3fb950' },
                { label: 'Other', height: 15, color: '#8b949e' },
              ].map((bar, i) => (
                <div className="bar-col" key={i}>
                  <div className="bar-rect" style={{ height: bar.height, background: bar.color }} />
                  <div className="bar-label">{bar.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="section-title">Performance Metrics</div>
            <div className="radar-container">
              <RadarChart size={160} data={radarData} color="#a855f7" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Hardware Bill of Materials ── */}
      <div className="section">
        <SectionHeader label="Hardware Bill of Materials" badge="HBOM" color="#f0883e" />
        <div className="card" style={{ marginBottom: 12 }}>
          <div className="section-title">Hardware Components</div>
          <table className="data-table">
            <thead>
              <tr>
                <th>COMPONENT</th>
                <th>CATEGORY</th>
                <th>MANUFACTURER</th>
                <th>FIRMWARE</th>
                <th>EOL DATE</th>
                <th>SECURITY</th>
              </tr>
            </thead>
            <tbody>
              {hardwareComponents.map((hw, i) => (
                <tr key={i}>
                  <td style={{ color: 'var(--text-primary)', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{hw.name}</td>
                  <td>{hw.type}</td>
                  <td>{hw.mfr}</td>
                  <td>{hw.firmware}</td>
                  <td style={{ fontFamily: 'JetBrains Mono', fontSize: 10 }}>{hw.eolDate || '-'}</td>
                  <td>
                    <span className={`status status-${hw.risk === 'critical' ? 'critical' : 'ok'}`}>
                      {hw.risk.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Components by Manufacturer */}
        <div className="card">
          <div className="section-title">Components by Manufacturer</div>
          {[
            { label: 'Intel', value: 8420, max: 10000, color: '#3b82f6' },
            { label: 'Samsung', value: 5200, max: 10000, color: '#3fb950' },
            { label: 'Qualcomm', value: 3800, max: 10000, color: '#f0883e' },
            { label: 'NVIDIA', value: 2900, max: 10000, color: '#a855f7' },
            { label: 'Other', value: 1800, max: 10000, color: '#8b949e' },
          ].map((item, i) => (
            <div className="chart-bar-horizontal" key={i} style={{ marginBottom: 8 }}>
              <div className="chart-bar-label">{item.label}</div>
              <div className="chart-bar-track" style={{ height: 10 }}>
                <div className="chart-bar-fill" style={{ width: `${(item.value / item.max) * 100}%`, background: item.color }} />
              </div>
              <div className="chart-bar-value">{item.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── File Intelligence + Security Intelligence ── */}
      <div className="section">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600 }}>File Intelligence</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className="badge badge-blue">16/24</span>
                <span className="badge badge-orange">12/14</span>
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              {[
                { label: 'Python', color: '#3b82f6', count: '3,175' },
                { label: 'JavaScript', color: '#f0d060', count: '1,802' },
                { label: 'TypeScript', color: '#00e5ff', count: '1,421' },
                { label: 'Shell', color: '#3fb950', count: '845' },
                { label: 'YAML', color: '#a855f7', count: '612' },
              ].map((lang, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span className="inline-flex">
                    <span className="dot" style={{ background: lang.color }} />
                    <span style={{ fontSize: 10, color: 'var(--text-secondary)' }}>{lang.label}</span>
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'JetBrains Mono' }}>{lang.count}</span>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>SB Composition</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {[
                { lang: 'Python', pct: '53.9%', color: '#3b82f6', bg: 'rgba(59,130,246,0.15)' },
                { lang: 'Shell', pct: '16.0%', color: '#3fb950', bg: 'rgba(63,185,80,0.15)' },
                { lang: 'YAML', pct: '3.8 4.8', color: '#f85149', bg: 'rgba(248,81,73,0.15)' },
                { lang: 'Java', pct: '48.1%', color: '#a855f7', bg: 'rgba(168,85,247,0.25)', wide: true },
              ].map((item, i) => (
                <div key={i} style={{
                  background: item.bg,
                  borderRadius: 6,
                  padding: '8px 10px',
                  gridColumn: item.wide ? 'span 2' : 'auto',
                }}>
                  <div style={{ fontSize: 10, color: item.color, fontWeight: 600 }}>{item.lang}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: item.color, fontFamily: 'JetBrains Mono' }}>{item.pct}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 10 }}>Security Intelligence</div>
            <div style={{ height: 100, display: 'flex', alignItems: 'flex-end', gap: 4, marginBottom: 8 }}>
              {[30, 45, 20, 60, 35, 55, 25, 70, 40, 65, 30, 50].map((h, i) => (
                <div key={i} style={{ flex: 1, background: i > 8 ? '#3b82f6' : 'rgba(59,130,246,0.3)', borderRadius: '2px 2px 0 0', height: `${h}%` }} />
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 6 }}>
              {[
                { label: 'critical', color: '#f85149' },
                { label: 'high', color: '#f0883e' },
                { label: 'medium', color: '#d29922' },
                { label: 'TeamViewer', color: '#a855f7' },
              ].map((item, i) => (
                <span key={i} className="inline-flex">
                  <span className="dot" style={{ background: item.color }} />
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{item.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Component Growth Trends ── */}
      <div className="section">
        <div className="card">
          <div className="section-title">Component Growth Trends</div>
          <LineChart data={growthData} width={700} height={80} color="#f0d060" fill showDots />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            {growthData.map((d, i) => (
              <span key={i} style={{ fontSize: 9, color: 'var(--text-muted)' }}>{d.label}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            {[
              { label: '● SBOM', color: '#f0d060' },
              { label: '● AI BOM', color: '#a855f7' },
              { label: '● H/W BOM', color: '#3b82f6' },
              { label: '● Patch', color: '#3fb950' },
            ].map((item, i) => (
              <span key={i} style={{ fontSize: 10, color: item.color }}>{item.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Live Activity Feed ── */}
      <div className="section">
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ position: 'relative', width: 10, height: 10, flexShrink: 0 }}>
              <span style={{ position: 'absolute', inset: 0, background: '#3fb950', borderRadius: '50%', animation: 'pulse-ring 1.8s ease-out infinite', opacity: 0.4 }} />
              <span style={{ position: 'absolute', inset: 1, background: '#3fb950', borderRadius: '50%', boxShadow: '0 0 6px #3fb950' }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>Live Activity Feed</span>
            <span style={{ marginLeft: 'auto', fontSize: 9, color: '#3fb950', background: 'rgba(63,185,80,0.1)', border: '1px solid rgba(63,185,80,0.25)', padding: '2px 8px', borderRadius: 20, fontWeight: 600, letterSpacing: '0.05em' }}>LIVE</span>
          </div>
          {activityFeed.map((item, i) => (
            <div className="activity-item" key={i} style={{ borderLeft: `2px solid ${item.color}30`, paddingLeft: 12, marginLeft: -2 }}>
              <div className="activity-dot" style={{ background: item.color, boxShadow: `0 0 6px ${item.color}, 0 0 12px ${item.color}55` }} />
              <div style={{ flex: 1 }}>
                <div className="activity-text">{item.text}</div>
                <div className="activity-time">{item.time}</div>
              </div>
              <span className="activity-badge">
                <span className="badge" style={{ background: `${item.badgeColor}18`, color: item.badgeColor, border: `1px solid ${item.badgeColor}35` }}>{item.badge}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
