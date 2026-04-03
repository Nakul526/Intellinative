import React, { useState } from 'react'
import DonutChart from './DonutChart'
import SparkLine from './SparkLine'
import LineChart from './LineChart'
import RadarChart from './RadarChart'

// ── Data ──────────────────────────────────────────────────────────────────────

const bomDonutData = [
  { label: 'SBOM',   value: 9826, color: '#f0d060', pct: '42.5%', desc: 'Software components & libraries' },
  { label: 'CBOM',   value: 4913, color: '#3b82f6', pct: '21.3%', desc: 'Cryptographic algorithms & certs' },
  { label: 'AI BOM', value: 3685, color: '#a855f7', pct: '15.9%', desc: 'AI/ML models & training data' },
  { label: 'HBOM',   value: 3685, color: '#3fb950', pct: '15.9%', desc: 'Hardware components & firmware' },
  { label: 'Other',  value: 1000, color: '#8b949e', pct: '4.3%',  desc: 'Uncategorized & miscellaneous' },
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

// ── Framework Bar Chart ────────────────────────────────────────────────────────
function FrameworkBarChart({ data }) {
  const [hovered, setHovered] = useState(null)
  const W = 300, H = 130, padB = 32, padT = 14, padL = 8, padR = 8
  const iW = W - padL - padR
  const iH = H - padT - padB
  const max = Math.max(...data.map(d => d.value))
  const barW = iW / data.length * 0.58
  const gap = iW / data.length

  return (
    <div style={{ position: 'relative' }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} onMouseLeave={() => setHovered(null)} style={{ overflow: 'visible' }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((f, i) => (
          <line key={i} x1={padL} y1={padT + iH * (1 - f)} x2={W - padR} y2={padT + iH * (1 - f)}
            stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="3,4" />
        ))}

        {data.map((d, i) => {
          const barH = (d.value / max) * iH
          const x = padL + i * gap + (gap - barW) / 2
          const y = padT + iH - barH
          const isHov = hovered?.label === d.label
          return (
            <g key={d.label} onMouseEnter={() => setHovered(d)} style={{ cursor: 'pointer' }}>
              {/* Shadow */}
              <rect x={x + 2} y={y + 2} width={barW} height={barH} rx="4"
                fill="rgba(0,0,0,0.25)" style={{ pointerEvents: 'none' }} />
              {/* Bar */}
              <rect x={x} y={y} width={barW} height={barH} rx="4"
                fill={d.color}
                opacity={hovered ? (isHov ? 1 : 0.35) : 0.82}
                style={{ transition: 'opacity 0.15s', filter: isHov ? `drop-shadow(0 0 10px ${d.color}90)` : 'none' }}
              />
              {/* Top cap glow */}
              {isHov && (
                <rect x={x} y={y} width={barW} height={4} rx="4" fill={d.color} opacity="0.9"
                  style={{ filter: `drop-shadow(0 0 6px ${d.color})` }} />
              )}
              {/* Value label */}
              <text x={x + barW / 2} y={y - 5} textAnchor="middle"
                fill={isHov ? d.color : 'transparent'} fontSize="9" fontWeight="700" fontFamily="JetBrains Mono">
                {d.value}
              </text>
              {/* X-axis label */}
              <text x={x + barW / 2} y={H - 6} textAnchor="middle"
                fill={isHov ? '#e6edf3' : '#8b949e'} fontSize="7.5" fontWeight={isHov ? '700' : '400'}>
                {d.label.length > 8 ? d.label.slice(0, 7) + '…' : d.label}
              </text>
            </g>
          )
        })}

        {/* Baseline */}
        <line x1={padL} y1={padT + iH} x2={W - padR} y2={padT + iH}
          stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
      </svg>

      {hovered && (
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(13,17,23,0.97)', border: `1px solid ${hovered.color}55`,
          borderRadius: 7, padding: '6px 14px', pointerEvents: 'none', zIndex: 100,
          whiteSpace: 'nowrap', boxShadow: `0 4px 16px rgba(0,0,0,0.5)`,
        }}>
          <span style={{ fontSize: 10, color: '#8b949e' }}>{hovered.label}: </span>
          <span style={{ fontSize: 13, color: hovered.color, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{hovered.value}</span>
          <span style={{ fontSize: 10, color: '#8b949e', marginLeft: 4 }}>models</span>
        </div>
      )}
    </div>
  )
}

// ── Main Dashboard ─────────────────────────────────────────────────────────────
const ASSETS = [
  { id: 'all',   label: 'All Assets',      ip: '',              status: null },
  { id: 'web1',  label: 'prod-web-01',     ip: '192.168.0.1',   status: 'online'  },
  { id: 'db1',   label: 'prod-db-02',      ip: '192.168.0.2',   status: 'online'  },
  { id: 'api1',  label: 'prod-api-03',     ip: '192.168.0.3',   status: 'online'  },
  { id: 'cch1',  label: 'prod-cache-04',   ip: '192.168.0.4',   status: 'offline' },
  { id: 'web2',  label: 'prod-web-07',     ip: '192.168.0.7',   status: 'online'  },
  { id: 'bld1',  label: 'build-server-01', ip: '192.168.1.10',  status: 'online'  },
  { id: 'bld2',  label: 'build-server-02', ip: '192.168.1.11',  status: 'offline' },
  { id: 'gw1',   label: 'api-gateway-03',  ip: '192.168.2.3',   status: 'online'  },
  { id: 'db2',   label: 'db-replica-01',   ip: '192.168.3.1',   status: 'online'  },
  { id: 'mq1',   label: 'mq-broker-01',    ip: '192.168.4.1',   status: 'online'  },
  { id: 'mon1',  label: 'monitor-01',      ip: '192.168.5.1',   status: 'offline' },
]

function AssetDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [dropPos, setDropPos] = useState({ top: 0, left: 0 })
  const ref = React.useRef(null)

  const current = ASSETS.find(a => a.id === value) || ASSETS[0]
  const filtered = ASSETS.filter(a =>
    a.label.toLowerCase().includes(search.toLowerCase()) ||
    a.ip.includes(search)
  )

  React.useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      {/* Trigger */}
      <button
        onClick={() => {
          if (!open && ref.current) {
            const rect = ref.current.getBoundingClientRect()
            setDropPos({ top: rect.bottom + 6, left: rect.left })
          }
          setOpen(o => !o)
        }}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: open ? 'rgba(88,166,255,0.1)' : 'var(--bg-card)',
          border: `1px solid ${open ? 'rgba(88,166,255,0.5)' : 'var(--border-accent)'}`,
          borderRadius: 9, padding: '7px 12px', cursor: 'pointer',
          color: 'var(--text-primary)', fontSize: 12, fontWeight: 600,
          minWidth: 210, transition: 'all 0.15s',
          boxShadow: open ? '0 0 0 3px rgba(88,166,255,0.12)' : 'none',
        }}
      >
        <svg width="13" height="13" fill="none" stroke="#58a6ff" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/>
        </svg>
        {current.status && (
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: current.status === 'online' ? '#3fb950' : '#6e7681', flexShrink: 0, boxShadow: current.status === 'online' ? '0 0 5px #3fb950' : 'none' }} />
        )}
        <span style={{ flex: 1, textAlign: 'left', fontFamily: current.id === 'all' ? 'inherit' : 'JetBrains Mono, monospace', fontSize: current.id === 'all' ? 12 : 11 }}>
          {current.label}
        </span>
        {value !== 'all' && (
          <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 4, background: 'rgba(88,166,255,0.15)', color: '#58a6ff', fontFamily: 'monospace' }}>
            {current.ip}
          </span>
        )}
        <svg width="12" height="12" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" viewBox="0 0 24 24"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position: 'fixed', top: dropPos.top, left: dropPos.left,
          background: '#0d1117', border: '1px solid rgba(88,166,255,0.25)',
          borderRadius: 11, width: 300, zIndex: 99999,
          boxShadow: '0 16px 48px rgba(0,0,0,0.6), 0 0 0 1px rgba(88,166,255,0.08)',
          overflow: 'hidden',
        }}>
          {/* Search */}
          <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ position: 'relative' }}>
              <svg width="11" height="11" fill="none" stroke="#4d5a6a" strokeWidth="2" viewBox="0 0 24 24"
                style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search assets or IP..."
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, padding: '6px 10px 6px 28px', color: '#e6edf3', fontSize: 11, outline: 'none' }}
              />
            </div>
          </div>

          {/* Count */}
          <div style={{ padding: '6px 14px', fontSize: 10, color: '#4d5a6a', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
            {filtered.length} asset{filtered.length !== 1 ? 's' : ''} found
          </div>

          {/* List */}
          <div style={{ maxHeight: 280, overflowY: 'auto' }}>
            {filtered.map(a => {
              const isSelected = value === a.id
              return (
                <div
                  key={a.id}
                  onClick={() => { onChange(a.id); setOpen(false); setSearch('') }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '9px 14px', cursor: 'pointer',
                    background: isSelected ? 'rgba(88,166,255,0.1)' : 'transparent',
                    borderLeft: isSelected ? '3px solid #58a6ff' : '3px solid transparent',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(255,255,255,0.04)' }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
                >
                  {a.id === 'all' ? (
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="11" height="11" fill="none" stroke="#58a6ff" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>
                    </div>
                  ) : (
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: a.status === 'online' ? '#3fb950' : '#6e7681', flexShrink: 0, boxShadow: a.status === 'online' ? '0 0 5px #3fb950' : 'none' }} />
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: isSelected ? 700 : 500, color: isSelected ? '#58a6ff' : '#e6edf3', fontFamily: a.id === 'all' ? 'inherit' : 'JetBrains Mono, monospace', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {a.label}
                    </div>
                    {a.ip && <div style={{ fontSize: 10, color: '#4d5a6a', fontFamily: 'JetBrains Mono' }}>{a.ip}</div>}
                  </div>
                  {a.status && (
                    <span style={{ fontSize: 9, fontWeight: 700, color: a.status === 'online' ? '#3fb950' : '#6e7681' }}>
                      {a.status.toUpperCase()}
                    </span>
                  )}
                  {isSelected && (
                    <svg width="12" height="12" fill="none" stroke="#58a6ff" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </div>
              )
            })}
            {filtered.length === 0 && (
              <div style={{ padding: '20px 14px', textAlign: 'center', fontSize: 11, color: '#4d5a6a' }}>No assets match "{search}"</div>
            )}
          </div>

          {/* Footer */}
          <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#4d5a6a' }}>
            <span>{ASSETS.filter(a => a.status === 'online').length} online · {ASSETS.filter(a => a.status === 'offline').length} offline</span>
            {value !== 'all' && (
              <button onClick={() => { onChange('all'); setOpen(false) }} style={{ background: 'none', border: 'none', color: '#58a6ff', cursor: 'pointer', fontSize: 10, padding: 0 }}>
                Clear selection
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('All SBOM')
  const [activeAsset, setActiveAsset] = useState('all')
  const show = (tab) => activeTab === 'All SBOM' || activeTab === tab

  const currentAsset = ASSETS.find(a => a.id === activeAsset)

  return (
    <div className="main-content">

      {/* ── Asset Dropdown Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>Viewing:</div>
          <AssetDropdown value={activeAsset} onChange={setActiveAsset} />
        </div>

      </div>

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
          <div style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: 24, alignItems: 'start' }}>

            {/* Left – Donut + legend */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <DonutChart size={190} data={bomDonutData} centerText="23,109" centerSub="Total BOMs" />
              </div>
              {/* Legend */}
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {bomDonutData.map((d, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: 'var(--text-primary)', fontWeight: 600, flex: 1 }}>{d.label}</span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace" }}>{d.value.toLocaleString()}</span>
                    <span style={{ fontSize: 10, color: d.color, fontWeight: 700, minWidth: 36, textAlign: 'right' }}>{d.pct}</span>
                  </div>
                ))}
                <div style={{ marginTop: 4, paddingTop: 8, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)' }}>
                  <span>Total tracked BOMs</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', monospace" }}>23,109</span>
                </div>
              </div>
            </div>

            {/* Right – 4 tiles (2×2) */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {[
                { label: 'SBOM',   fullName: 'Software Bill of Materials',    value: '9,826', pct: '42.5%', color: '#f0d060', tag: 'Software', desc: 'Open-source & third-party software libraries tracked across your assets' },
                { label: 'CBOM',   fullName: 'Cryptography Bill of Materials', value: '4,913', pct: '21.3%', color: '#3b82f6', tag: 'Crypto',   desc: 'Encryption algorithms, certificates, and cryptographic primitives in use' },
                { label: 'AI BOM', fullName: 'AI Bill of Materials',           value: '3,685', pct: '15.9%', color: '#a855f7', tag: 'AI/ML',    desc: 'Machine learning models, datasets, and AI dependencies registered' },
                { label: 'HBOM',   fullName: 'Hardware Bill of Materials',     value: '3,685', pct: '15.9%', color: '#3fb950', tag: 'Hardware', desc: 'Physical hardware components, firmware versions, and device inventory' },
              ].map((item, i) => {
                const isActive = activeTab === item.label
                return (
                  <div key={i} className="mini-stat" onClick={() => setActiveTab(isActive ? 'All SBOM' : item.label)} style={{ borderLeft: `3px solid ${item.color}`, cursor: 'pointer', transition: 'all 0.18s', background: isActive ? `${item.color}14` : undefined, boxShadow: isActive ? `0 0 14px ${item.color}30, inset 0 0 20px ${item.color}08` : undefined, transform: isActive ? 'translateY(-1px)' : undefined, padding: '12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                      <div>
                        <div style={{ fontSize: 9, color: isActive ? item.color : 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{item.label}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>{item.fullName}</div>
                      </div>
                      <span className="badge" style={{ background: isActive ? `${item.color}22` : 'rgba(255,255,255,0.05)', color: isActive ? item.color : 'var(--text-muted)', fontSize: 9, border: isActive ? `1px solid ${item.color}44` : undefined, flexShrink: 0 }}>{item.tag}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
                      <div className="mini-stat-value" style={{ color: isActive ? item.color : undefined, fontSize: 22 }}>{item.value}</div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: item.color }}>{item.pct}</span>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4 }}>{item.desc}</div>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </div>

      {/* ── Software Bill of Materials ── */}
      {show('SBOM') && <div className="section">
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

        {/* ── License Distribution ── */}
        <div className="card" style={{ marginTop: 12 }}>
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

        {/* ── Package Ecosystems ── */}
        <div className="card" style={{ marginTop: 12 }}>
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
      </div>}

      {/* ── Cryptography Bill of Materials ── */}
      {show('CBOM') && <div className="section">
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
      </div>}

      {/* ── AI Bill of Materials ── */}
      {show('AI BOM') && <div className="section">
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
            <FrameworkBarChart data={[
              { label: 'TensorFlow', value: 70, color: '#f0883e' },
              { label: 'PyTorch',    value: 55, color: '#f85149' },
              { label: 'Keras',      value: 40, color: '#a855f7' },
              { label: 'HuggingFace', value: 30, color: '#3fb950' },
              { label: 'Other',      value: 15, color: '#8b949e' },
            ]} />
          </div>
          <div className="card">
            <div className="section-title">Performance Metrics</div>
            <div className="radar-container">
              <RadarChart size={160} data={radarData} color="#a855f7" />
            </div>
          </div>
        </div>
      </div>}

      {/* ── Hardware Bill of Materials ── */}
      {show('HBOM') && <div className="section">
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
      </div>}

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
