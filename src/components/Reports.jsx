import { useState } from 'react'
import { jsPDF } from 'jspdf'

// ── Data ──────────────────────────────────────────────────────────────────────
const MONTHLY_REPORTS = [
  { label: 'Jan', v: 310 }, { label: 'Feb', v: 345 }, { label: 'Mar', v: 362 },
  { label: 'Apr', v: 398 }, { label: 'May', v: 445 }, { label: 'Jun', v: 480 },
]

const BOM_TYPE_DATA = [
  { label: 'SBOM', value: 156, color: '#3b82f6' },
  { label: 'CBOM', value: 89, color: '#f0d060' },
  { label: 'AI BOM', value: 67, color: '#a855f7' },
  { label: 'HBOM', value: 78, color: '#3fb950' },
  { label: 'MBOM', value: 45, color: '#f0883e' },
  { label: 'Other', value: 22, color: '#6e7681' },
]

const TREND_DATA = [
  { label: 'Jan', reports: 310, vulns: 320 }, { label: 'Feb', reports: 345, vulns: 335 },
  { label: 'Mar', reports: 362, vulns: 348 }, { label: 'Apr', reports: 398, vulns: 362 },
  { label: 'May', reports: 445, vulns: 380 }, { label: 'Jun', reports: 480, vulns: 395 },
]

const RECENT_REPORTS = [
  { name: 'Full Security Audit Q1 2024', generated: '2024-03-20', size: '2.4 MB', downloads: 45, status: 'Ready', type: 'SBOM' },
  { name: 'BOM Compliance Report', generated: '2024-03-18', size: '1.1 MB', downloads: 32, status: 'Ready', type: 'CBOM' },
  { name: 'Vulnerability Assessment', generated: '2024-03-15', size: '3.2 MB', downloads: 67, status: 'Ready', type: 'SBOM' },
  { name: 'Cryptography Inventory', generated: '2024-03-10', size: '890 KB', downloads: 28, status: 'Ready', type: 'CBOM' },
  { name: 'AI Model Registry Q1', generated: '2024-03-08', size: '1.7 MB', downloads: 19, status: 'Ready', type: 'AI BOM' },
  { name: 'Hardware Component Audit', generated: '2024-03-05', size: '2.1 MB', downloads: 14, status: 'Ready', type: 'HBOM' },
]

const MACHINES = ['WEB-SERVER-01', 'API-GATEWAY-03', 'BUILD-SERVER-02', 'DB-SERVER-01', 'WEB-SERVER-07']

// ── Chart components ───────────────────────────────────────────────────────────

function BarChart({ data }) {
  const [hovered, setHovered] = useState(null)
  const W = 420, H = 180, PAD = { t: 15, r: 20, b: 35, l: 45 }
  const iW = W - PAD.l - PAD.r, iH = H - PAD.t - PAD.b
  const max = Math.max(...data.map(d => d.v)) * 1.2
  const barW = iW / data.length * 0.55
  const gap = iW / data.length

  return (
    <div style={{ position: 'relative' }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} onMouseLeave={() => setHovered(null)} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="1"/>
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8"/>
          </linearGradient>
          <linearGradient id="bar-grad-hov" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="1"/>
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.9"/>
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
          const y = PAD.t + f * iH
          return (
            <g key={i}>
              <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
              <text x={PAD.l - 6} y={y + 3} textAnchor="end" fontSize="8" fill="#8b949e">{Math.round(max * (1 - f))}</text>
            </g>
          )
        })}
        {data.map((d, i) => {
          const barH = (d.v / max) * iH
          const x = PAD.l + i * gap + (gap - barW) / 2
          const y = PAD.t + iH - barH
          const isHov = hovered?.label === d.label
          return (
            <g key={d.label}
              onMouseEnter={() => setHovered(d)}
              style={{ cursor: 'pointer' }}
            >
              <rect x={x} y={PAD.t + iH} width={barW} height={1} rx="2" fill="rgba(59,130,246,0.2)"/>
              <rect x={x} y={y} width={barW} height={barH} rx="4"
                fill={isHov ? 'url(#bar-grad-hov)' : 'url(#bar-grad)'}
                opacity={hovered ? (isHov ? 1 : 0.45) : 0.9}
                style={{ filter: isHov ? 'drop-shadow(0 0 10px rgba(59,130,246,0.7))' : 'drop-shadow(0 0 4px rgba(59,130,246,0.3))', transition: 'all 0.15s' }}
              />
              <text x={x + barW / 2} y={y - 5} textAnchor="middle" fontSize="8" fill={isHov ? '#60a5fa' : '#3b82f6'} fontWeight="700">{d.v}</text>
              <text x={PAD.l + i * gap + gap / 2} y={H - PAD.b + 12} textAnchor="middle" fontSize="9" fill={isHov ? '#e6edf3' : '#8b949e'} fontWeight={isHov ? '700' : '400'}>{d.label}</text>
            </g>
          )
        })}
      </svg>
      {hovered && (
        <div style={{
          position: 'absolute', top: 4, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(13,17,23,0.97)', border: '1px solid rgba(59,130,246,0.4)',
          borderRadius: 8, padding: '7px 14px', pointerEvents: 'none', zIndex: 100,
          whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
        }}>
          <span style={{ fontSize: 11, color: '#8b949e' }}>{hovered.label}: </span>
          <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{hovered.v}</span>
          <span style={{ fontSize: 10, color: '#8b949e', marginLeft: 6 }}>reports</span>
        </div>
      )}
    </div>
  )
}

function DonutChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const cx = 85, cy = 85, R = 62, r = 42
  let angle = -Math.PI / 2

  const slices = data.map(d => {
    const sweep = (d.value / total) * Math.PI * 2
    const x1 = cx + R * Math.cos(angle), y1 = cy + R * Math.sin(angle)
    angle += sweep
    const x2 = cx + R * Math.cos(angle), y2 = cy + R * Math.sin(angle)
    const ix1 = cx + r * Math.cos(angle - sweep), iy1 = cy + r * Math.sin(angle - sweep)
    const ix2 = cx + r * Math.cos(angle), iy2 = cy + r * Math.sin(angle)
    const large = sweep > Math.PI ? 1 : 0
    return { ...d, path: `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${r} ${r} 0 ${large} 0 ${ix1} ${iy1} Z` }
  })

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <svg width="170" height="170" viewBox="0 0 170 170">
        <defs>
          <filter id="donut-glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} opacity="0.9" filter="url(#donut-glow)"
            style={{ transition: 'opacity 0.2s' }}/>
        ))}
        <circle cx={cx} cy={cy} r={r - 2} fill="var(--bg-card)"/>
        <text x={cx} y={cy - 6} textAnchor="middle" fontSize="18" fontWeight="800" fill="var(--text-primary)" fontFamily="JetBrains Mono">{total}</text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontSize="8" fill="var(--text-muted)">Total Reports</text>
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }}/>
            <span style={{ fontSize: 10, color: 'var(--text-secondary)', flex: 1 }}>{d.label}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>{d.value}</span>
            <span style={{ fontSize: 9, color: 'var(--text-muted)' }}>{((d.value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DualLineChart({ data }) {
  const [hovered, setHovered] = useState(null)
  const W = 620, H = 180, PAD = { t: 20, r: 20, b: 35, l: 50 }
  const iW = W - PAD.l - PAD.r, iH = H - PAD.t - PAD.b
  const maxR = Math.max(...data.map(d => d.reports)) * 1.1
  const maxV = Math.max(...data.map(d => d.vulns)) * 1.1
  const scaleR = v => PAD.t + (1 - v / maxR) * iH
  const scaleV = v => PAD.t + (1 - v / maxV) * iH

  const rPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${PAD.l + (i / (data.length - 1)) * iW} ${scaleR(d.reports)}`).join(' ')
  const vPath = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${PAD.l + (i / (data.length - 1)) * iW} ${scaleV(d.vulns)}`).join(' ')

  const pts = data.map((d, i) => ({
    x: PAD.l + (i / (data.length - 1)) * iW,
    yr: scaleR(d.reports),
    yv: scaleV(d.vulns),
    ...d,
  }))

  return (
    <div style={{ position: 'relative' }}>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} onMouseLeave={() => setHovered(null)} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id="rline-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
          </linearGradient>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
          <line key={i} x1={PAD.l} y1={PAD.t + f * iH} x2={W - PAD.r} y2={PAD.t + f * iH} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
        ))}
        <path d={`${rPath} L ${W - PAD.r} ${H - PAD.b} L ${PAD.l} ${H - PAD.b} Z`} fill="url(#rline-grad)"/>
        <path d={rPath} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d={vPath} fill="none" stroke="#f85149" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3"/>

        {/* Hover guide */}
        {hovered && (
          <line x1={hovered.x} y1={PAD.t} x2={hovered.x} y2={PAD.t + iH}
            stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3,3"
            style={{ pointerEvents: 'none' }} />
        )}

        {pts.map((p, i) => {
          const isHov = hovered?.label === p.label
          return (
            <g key={i}>
              {/* Invisible hit area */}
              <rect x={p.x - 15} y={PAD.t} width={30} height={iH}
                fill="transparent"
                onMouseEnter={() => setHovered(p)}
                style={{ cursor: 'crosshair' }}
              />
              <circle cx={p.x} cy={p.yr} r={isHov ? 5 : 3.5} fill="#3b82f6" stroke="#0d1117" strokeWidth="1.5" style={{ pointerEvents: 'none', transition: 'r 0.1s' }}/>
              <circle cx={p.x} cy={p.yv} r={isHov ? 4.5 : 3} fill="#f85149" stroke="#0d1117" strokeWidth="1.5" style={{ pointerEvents: 'none', transition: 'r 0.1s' }}/>
              <text x={p.x} y={H - PAD.b + 12} textAnchor="middle" fontSize="9" fill={isHov ? '#e6edf3' : '#8b949e'} fontWeight={isHov ? '700' : '400'}>{p.label}</text>
            </g>
          )
        })}
        <text x={PAD.l} y={PAD.t - 6} fontSize="8" fill="rgba(59,130,246,0.8)" fontWeight="600">▬ Report Generation</text>
        <text x={PAD.l + 130} y={PAD.t - 6} fontSize="8" fill="rgba(248,81,73,0.8)" fontWeight="600">╌ Vulnerability Trends</text>
      </svg>

      {hovered && (
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          background: 'rgba(13,17,23,0.97)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 9, padding: '9px 16px',
          pointerEvents: 'none', zIndex: 100,
          whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          display: 'flex', gap: 18,
        }}>
          <div>
            <div style={{ fontSize: 9, color: '#8b949e', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{hovered.label}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6' }}/>
            <span style={{ fontSize: 10, color: '#8b949e' }}>Reports </span>
            <span style={{ fontSize: 13, color: '#3b82f6', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{hovered.reports}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f85149' }}/>
            <span style={{ fontSize: 10, color: '#8b949e' }}>Vulns </span>
            <span style={{ fontSize: 13, color: '#f85149', fontWeight: 700, fontFamily: 'JetBrains Mono' }}>{hovered.vulns}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ── PDF Generation ─────────────────────────────────────────────────────────────
function generateReportPDF(config, org) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const W = 210, margin = 14

  // Cover page
  doc.setFillColor(8, 12, 20)
  doc.rect(0, 0, W, 297, 'F')

  // Accent gradient (simulated)
  doc.setFillColor(88, 166, 255)
  doc.rect(0, 0, 5, 297, 'F')
  doc.setFillColor(168, 85, 247)
  doc.rect(0, 140, W, 3, 'F')

  doc.setTextColor(88, 166, 255)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.text('INTELLIBOM SECURITY PLATFORM', margin, 40)

  doc.setTextColor(230, 237, 243)
  doc.setFontSize(28)
  doc.text('Security BOM Report', margin, 65)

  doc.setTextColor(139, 148, 158)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Organization: ${org}`, margin, 80)
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, 88)
  doc.text(`Report Type: ${config.bomTypes.join(', ')}`, margin, 96)
  doc.text(`Machines: ${config.machines.length > 0 ? config.machines.join(', ') : 'All'}`, margin, 104)

  // Stats section
  doc.setFillColor(17, 24, 39)
  doc.roundedRect(margin, 120, W - margin * 2, 48, 4, 4, 'F')

  const stats = [
    ['1,247', 'Total Reports'], ['534', 'This Month'], ['17.8', 'Avg per Day'], ['3,421', 'Downloads'],
  ]
  stats.forEach((s, i) => {
    const x = margin + 8 + i * 46
    doc.setTextColor(88, 166, 255)
    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text(s[0], x, 140)
    doc.setTextColor(77, 90, 106)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text(s[1], x, 148)
    if (i < 3) {
      doc.setDrawColor(30, 42, 58)
      doc.line(x + 38, 123, x + 38, 165)
    }
  })

  // Recent reports on cover
  doc.setTextColor(139, 148, 158)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('INCLUDED REPORT TYPES', margin, 182)

  config.bomTypes.forEach((t, i) => {
    const colors = { SBOM: [59, 130, 246], CBOM: [240, 208, 96], 'AI BOM': [168, 85, 247], HBOM: [63, 185, 80] }
    const rgb = colors[t] || [88, 166, 255]
    doc.setFillColor(...rgb)
    doc.roundedRect(margin + i * 48, 188, 44, 18, 3, 3, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(t, margin + i * 48 + 22, 199, { align: 'center' })
  })

  // Page 2: Summary
  doc.addPage()
  doc.setFillColor(8, 12, 20)
  doc.rect(0, 0, W, 297, 'F')
  doc.setFillColor(88, 166, 255)
  doc.rect(0, 0, 5, 297, 'F')

  doc.setTextColor(88, 166, 255)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('REPORT SUMMARY', margin, 20)

  doc.setTextColor(230, 237, 243)
  doc.setFontSize(16)
  doc.text('Reports & Analytics Summary', margin, 32)

  // BOM type breakdown table
  let y = 45
  doc.setTextColor(139, 148, 158)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.text('BOM TYPE', margin, y)
  doc.text('REPORTS', margin + 60, y)
  doc.text('% TOTAL', margin + 95, y)
  doc.text('DOWNLOADS', margin + 125, y)
  y += 4
  doc.setDrawColor(30, 42, 58)
  doc.line(margin, y, W - margin, y)
  y += 5

  BOM_TYPE_DATA.forEach((b, i) => {
    doc.setFillColor(i % 2 === 0 ? 17 : 15, i % 2 === 0 ? 24 : 21, i % 2 === 0 ? 39 : 32)
    doc.rect(margin, y - 3, W - margin * 2, 7, 'F')
    const rgb = b.color.startsWith('#') ? [
      parseInt(b.color.slice(1, 3), 16),
      parseInt(b.color.slice(3, 5), 16),
      parseInt(b.color.slice(5, 7), 16)
    ] : [88, 166, 255]
    doc.setFillColor(...rgb)
    doc.rect(margin, y - 3, 3, 7, 'F')
    doc.setTextColor(230, 237, 243)
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'bold')
    doc.text(b.label, margin + 5, y + 1.5)
    doc.setFont('helvetica', 'normal')
    doc.text(String(b.value), margin + 60, y + 1.5)
    const total = BOM_TYPE_DATA.reduce((s, d) => s + d.value, 0)
    doc.text(`${((b.value / total) * 100).toFixed(1)}%`, margin + 95, y + 1.5)
    doc.text(String(Math.round(b.value * 22)), margin + 125, y + 1.5)
    y += 7
  })

  y += 10

  // Recent reports table
  doc.setTextColor(139, 148, 158)
  doc.setFontSize(7)
  doc.setFont('helvetica', 'bold')
  doc.text('RECENT REPORTS', margin, y)
  y += 4
  doc.line(margin, y, W - margin, y)
  y += 2

  doc.setFontSize(7)
  doc.text('REPORT NAME', margin, y + 3)
  doc.text('DATE', margin + 90, y + 3)
  doc.text('SIZE', margin + 120, y + 3)
  doc.text('DOWNLOADS', margin + 145, y + 3)
  doc.text('STATUS', margin + 168, y + 3)
  y += 7

  RECENT_REPORTS.forEach((r, i) => {
    if (y > 270) { doc.addPage(); y = 20 }
    doc.setFillColor(i % 2 === 0 ? 17 : 15, i % 2 === 0 ? 24 : 21, i % 2 === 0 ? 39 : 32)
    doc.rect(margin, y - 3, W - margin * 2, 7, 'F')
    doc.setTextColor(230, 237, 243)
    doc.setFont('helvetica', 'normal')
    doc.text(r.name.length > 38 ? r.name.slice(0, 37) + '…' : r.name, margin + 2, y + 1.5)
    doc.text(r.generated, margin + 90, y + 1.5)
    doc.text(r.size, margin + 120, y + 1.5)
    doc.text(String(r.downloads), margin + 145, y + 1.5)
    doc.setTextColor(63, 185, 80)
    doc.text(r.status, margin + 168, y + 1.5)
    y += 7
  })

  // Footer on all pages
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFillColor(13, 18, 32)
    doc.rect(0, 284, W, 13, 'F')
    doc.setTextColor(77, 90, 106)
    doc.setFontSize(7)
    doc.setFont('helvetica', 'normal')
    doc.text('IntelliBOM — Confidential Security Report', margin, 291)
    doc.text(`Page ${i} of ${pageCount}`, W - margin, 291, { align: 'right' })
  }

  doc.save(`intellibom-report-${new Date().toISOString().slice(0, 10)}.pdf`)
}

// ── Generate Report Modal ──────────────────────────────────────────────────────
function GenerateModal({ onClose, onGenerate, orgName }) {
  const [step, setStep] = useState(1)
  const [selectedMachines, setSelectedMachines] = useState([])
  const [selectedApps, setSelectedApps] = useState([])
  const [selectedBomTypes, setSelectedBomTypes] = useState(['SBOM'])
  const [config, setConfig] = useState({ format: 'PDF', schedule: 'One-time', notify: true })

  const APPS_LIST = ['nginx-proxy', 'api-service', 'data-pipeline', 'frontend-app', 'auth-service']
  const BOM_TYPES = ['SBOM', 'CBOM', 'AI BOM', 'HBOM']
  const BOM_COLORS = { SBOM: '#3b82f6', CBOM: '#f0d060', 'AI BOM': '#a855f7', HBOM: '#3fb950' }

  const toggleItem = (arr, setArr, item) => {
    setArr(p => p.includes(item) ? p.filter(x => x !== item) : [...p, item])
  }

  const steps = ['Assets', 'Applications', 'BOM Types', 'Configure']

  const handleFinish = () => {
    const reportConfig = { machines: selectedMachines, apps: selectedApps, bomTypes: selectedBomTypes, ...config }
    generateReportPDF(reportConfig, orgName)
    onGenerate(reportConfig)
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'var(--modal-overlay)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(8px)' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 18, width: '90%', maxWidth: 560, boxShadow: 'var(--card-shadow), 0 24px 80px rgba(0,0,0,0.25)', overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Modal header */}
        <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>Generate New Report</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>Step {step} of {steps.length}</div>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(128,128,128,0.1)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 8, width: 32, height: 32, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', padding: '14px 22px', gap: 6, alignItems: 'center', background: 'rgba(0,0,0,0.04)' }}>
          {steps.map((s, i) => {
            const n = i + 1
            const done = n < step, active = n === step
            return (
              <React.Fragment key={s}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <div style={{ width: 26, height: 26, borderRadius: '50%', background: done ? '#3fb950' : active ? '#3b82f6' : 'rgba(255,255,255,0.06)', border: `2px solid ${done ? '#3fb950' : active ? '#3b82f6' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 800, color: done || active ? '#fff' : 'var(--text-muted)', flexShrink: 0, boxShadow: active ? '0 0 12px rgba(59,130,246,0.4)' : 'none', transition: 'all 0.25s' }}>
                    {done ? '✓' : n}
                  </div>
                  <span style={{ fontSize: 11, fontWeight: active ? 700 : 500, color: active ? 'var(--text-primary)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>{s}</span>
                </div>
                {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: n < step ? '#3fb950' : 'var(--border)', borderRadius: 1, transition: 'background 0.3s' }}/>}
              </React.Fragment>
            )
          })}
        </div>

        {/* Step content */}
        <div style={{ padding: '18px 22px', flex: 1, overflowY: 'auto' }}>
          {step === 1 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Select Assets (Machines)</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>Choose which machines to include in the report</div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                <input placeholder="Search machines..." className="search-bar" style={{ flex: 1, fontSize: 11 }}/>
                <button onClick={() => setSelectedMachines([...MACHINES])} style={{ fontSize: 10, padding: '6px 12px', borderRadius: 7, border: '1px solid rgba(88,166,255,0.3)', background: 'rgba(88,166,255,0.1)', color: '#58a6ff', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>Select All</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {MACHINES.map(m => {
                  const sel = selectedMachines.includes(m)
                  return (
                    <div key={m} onClick={() => toggleItem(selectedMachines, setSelectedMachines, m)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: `1px solid ${sel ? 'rgba(88,166,255,0.4)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', background: sel ? 'rgba(88,166,255,0.08)' : 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${sel ? '#58a6ff' : 'var(--border-accent)'}`, background: sel ? '#58a6ff' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <span style={{ color: '#fff', fontSize: 11, fontWeight: 800 }}>✓</span>}
                      </div>
                      <div style={{ width: 28, height: 28, background: 'rgba(88,166,255,0.12)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="14" height="14" fill="none" stroke="#58a6ff" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>{m}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>42 apps · 3,421 libraries</div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'var(--text-muted)' }}>Selected: {selectedMachines.length} / {MACHINES.length} machines</div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Select Applications</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>Choose which applications to include</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {APPS_LIST.map(a => {
                  const sel = selectedApps.includes(a)
                  return (
                    <div key={a} onClick={() => toggleItem(selectedApps, setSelectedApps, a)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', border: `1px solid ${sel ? 'rgba(168,85,247,0.4)' : 'var(--border)'}`, borderRadius: 10, cursor: 'pointer', background: sel ? 'rgba(168,85,247,0.08)' : 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}>
                      <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${sel ? '#a855f7' : 'var(--border-accent)'}`, background: sel ? '#a855f7' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {sel && <span style={{ color: '#fff', fontSize: 11, fontWeight: 800 }}>✓</span>}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{a}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>Select BOM Types</div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 14 }}>Choose report formats to generate</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {BOM_TYPES.map(t => {
                  const sel = selectedBomTypes.includes(t)
                  const color = BOM_COLORS[t]
                  return (
                    <div key={t} onClick={() => toggleItem(selectedBomTypes, setSelectedBomTypes, t)} style={{ padding: '14px 16px', border: `2px solid ${sel ? color : 'var(--border)'}`, borderRadius: 12, cursor: 'pointer', background: sel ? `${color}12` : 'rgba(255,255,255,0.02)', transition: 'all 0.2s', boxShadow: sel ? `0 0 12px ${color}30` : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontSize: 13, fontWeight: 800, color: sel ? color : 'var(--text-primary)' }}>{t}</span>
                        {sel && <span style={{ fontSize: 14, color }}>✓</span>}
                      </div>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>
                        {t === 'SBOM' ? 'Software Bill of Materials' : t === 'CBOM' ? 'Cryptography BOM' : t === 'AI BOM' ? 'AI Model Inventory' : 'Hardware BOM'}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 14 }}>Configure Report Options</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { label: 'Output Format', options: ['PDF', 'JSON', 'CSV', 'XML'], state: config.format, key: 'format' },
                  { label: 'Schedule', options: ['One-time', 'Daily', 'Weekly', 'Monthly'], state: config.schedule, key: 'schedule' },
                ].map(item => (
                  <div key={item.label}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>{item.label}</div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {item.options.map(o => (
                        <button key={o} onClick={() => setConfig(c => ({ ...c, [item.key]: o }))} style={{ flex: 1, padding: '7px 0', borderRadius: 8, border: `1px solid ${config[item.key] === o ? 'rgba(88,166,255,0.4)' : 'var(--border)'}`, background: config[item.key] === o ? 'rgba(88,166,255,0.12)' : 'transparent', color: config[item.key] === o ? '#58a6ff' : 'var(--text-muted)', fontSize: 11, fontWeight: config[item.key] === o ? 700 : 500, cursor: 'pointer', transition: 'all 0.15s' }}>{o}</button>
                      ))}
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border)', borderRadius: 10 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>Email notification when ready</span>
                  <div onClick={() => setConfig(c => ({ ...c, notify: !c.notify }))} style={{ width: 40, height: 22, borderRadius: 11, background: config.notify ? '#3b82f6' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: 'background 0.25s', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ position: 'absolute', top: 3, left: config.notify ? 20 : 3, width: 14, height: 14, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}/>
                  </div>
                </div>
                <div style={{ background: 'rgba(88,166,255,0.06)', border: '1px solid rgba(88,166,255,0.2)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#58a6ff', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Report Summary</div>
                  <div style={{ display: 'flex', gap: 18, fontSize: 11, color: 'var(--text-secondary)' }}>
                    <span>Machines: <strong style={{ color: 'var(--text-primary)' }}>{selectedMachines.length || 'All'}</strong></span>
                    <span>Apps: <strong style={{ color: 'var(--text-primary)' }}>{selectedApps.length || 'All'}</strong></span>
                    <span>BOM Types: <strong style={{ color: 'var(--text-primary)' }}>{selectedBomTypes.join(', ')}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.04)' }}>
          <button onClick={() => step > 1 ? setStep(s => s - 1) : onClose()} style={{ padding: '8px 18px', borderRadius: 8, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>
            {step > 1 ? 'Previous' : 'Cancel'}
          </button>
          <button
            onClick={() => step < 4 ? setStep(s => s + 1) : handleFinish()}
            style={{ padding: '9px 22px', borderRadius: 8, border: 'none', background: step === 4 ? 'linear-gradient(135deg, #3b82f6, #a855f7)' : 'var(--accent-blue)', color: '#fff', cursor: 'pointer', fontSize: 12, fontWeight: 700, boxShadow: '0 0 14px rgba(59,130,246,0.35)', display: 'flex', alignItems: 'center', gap: 7 }}
          >
            {step === 4 ? (
              <><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Generate PDF</>
            ) : 'Next →'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Stat Card ──────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, trend, color, sub }) {
  return (
    <div className="card" style={{ background: `linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))`, borderTop: `3px solid ${color}`, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -10, right: -10, width: 60, height: 60, borderRadius: '50%', background: `${color}12` }}/>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}20`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {icon}
        </div>
        {trend && <span style={{ fontSize: 10, fontWeight: 700, color: '#3fb950', background: 'rgba(63,185,80,0.12)', padding: '2px 7px', borderRadius: 20, border: '1px solid rgba(63,185,80,0.3)' }}>+{trend}</span>}
      </div>
      <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color, fontFamily: 'JetBrains Mono', lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{sub}</div>}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function Reports({ osFilter, activeOrg }) {
  const [timePeriod, setTimePeriod] = useState('30')
  const [showModal, setShowModal] = useState(false)
  const [generatedReports, setGeneratedReports] = useState([])

  const orgName = { acme: 'Acme Corp', globex: 'Globex Inc', initech: 'Initech LLC', umbrella: 'Umbrella Corp' }[activeOrg] || 'Acme Corp'

  const allReports = [...generatedReports.map(r => ({
    name: `Custom Report — ${r.bomTypes.join(', ')}`,
    generated: new Date().toISOString().slice(0, 10),
    size: '—', downloads: 0, status: 'Ready', type: r.bomTypes[0] || 'SBOM'
  })), ...RECENT_REPORTS]

  return (
    <div className="main-content">

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 42, height: 42, background: 'linear-gradient(135deg, #3b82f6, #a855f7)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(59,130,246,0.35)', flexShrink: 0 }}>
            <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>Reports & Analytics</h1>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
              Comprehensive insights and exported reports · {orgName}
              {osFilter && <span style={{ color: 'var(--accent-blue)', fontWeight: 600 }}> · {osFilter}</span>}
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Time period */}
          <div style={{ display: 'flex', gap: 2, background: 'var(--bg-secondary)', border: '1px solid var(--border)', borderRadius: 9, padding: 3 }}>
            {[['7', 'Last 7 Days'], ['30', 'Last 30 Days'], ['90', 'Last 90 Days']].map(([val, label]) => (
              <button key={val} onClick={() => setTimePeriod(val)} style={{ padding: '5px 12px', borderRadius: 7, border: 'none', fontSize: 11, fontWeight: 600, cursor: 'pointer', transition: 'all 0.18s', background: timePeriod === val ? 'var(--accent-blue)' : 'transparent', color: timePeriod === val ? '#fff' : 'var(--text-muted)' }}>{label}</button>
            ))}
          </div>
          <button
            onClick={() => setShowModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 18px', background: 'linear-gradient(135deg, #3b82f6, #a855f7)', border: 'none', borderRadius: 10, color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer', boxShadow: '0 0 16px rgba(59,130,246,0.3)', transition: 'all 0.2s' }}
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Generate New Report
          </button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid-4 section">
        <StatCard icon={<svg width="16" height="16" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16"/><polyline points="14 2 14 8 20 8"/></svg>} label="Total Reports" value="1,247" trend="18%" color="#3b82f6" sub="All time across all orgs"/>
        <StatCard icon={<svg width="16" height="16" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/></svg>} label="This Month" value="534" trend="12%" color="#a855f7" sub="March 2024"/>
        <StatCard icon={<svg width="16" height="16" fill="none" stroke="#3fb950" strokeWidth="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} label="Avg per Day" value="17.8" trend="5%" color="#3fb950" sub="Daily generation rate"/>
        <StatCard icon={<svg width="16" height="16" fill="none" stroke="#f0883e" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>} label="Total Downloads" value="3,421" trend="23%" color="#f0883e" sub="PDF & JSON exports"/>
      </div>

      {/* ── Sub-stats ── */}
      <div className="grid-4 section">
        {[['SBOM Reports', '156', '#3b82f6', '+12%'], ['CBOM Reports', '89', '#f0d060', '+8%'], ['AIBOM Reports', '67', '#a855f7', '+15%'], ['HBOM Reports', '78', '#3fb950', '+5%']].map(([label, val, color, trend]) => (
          <div key={label} className="card" style={{ background: `linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))`, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="18" height="18" fill="none" stroke={color} strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color, fontFamily: 'JetBrains Mono', lineHeight: 1.2 }}>{val}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#3fb950', background: 'rgba(63,185,80,0.1)', padding: '2px 7px', borderRadius: 20, border: '1px solid rgba(63,185,80,0.25)' }}>{trend}</span>
          </div>
        ))}
      </div>

      <div className="grid-2 section" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {/* ── Monthly Bar Chart ── */}
        <div className="card" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 3, height: 14, background: '#3b82f6', borderRadius: 2 }}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Monthly Report Generation</span>
          </div>
          <BarChart data={MONTHLY_REPORTS}/>
        </div>

        {/* ── BOM Type Donut ── */}
        <div className="card" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <div style={{ width: 3, height: 14, background: '#a855f7', borderRadius: 2 }}/>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Reports by BOM Type</span>
          </div>
          <DonutChart data={BOM_TYPE_DATA}/>
        </div>
      </div>

      {/* ── Dual Trend Chart ── */}
      <div className="card section" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, background: 'linear-gradient(180deg, #3b82f6, #f85149)', borderRadius: 2 }}/>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Report Generation vs Vulnerability Trends</span>
        </div>
        <DualLineChart data={TREND_DATA}/>
      </div>

      {/* ── Recent Reports Table ── */}
      {/* <div className="card section" style={{ background: 'linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
          <div style={{ width: 3, height: 14, background: '#3fb950', borderRadius: 2 }}/>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Recent Reports</span>
          <span style={{ marginLeft: 'auto', fontSize: 11, color: '#58a6ff', cursor: 'pointer', fontWeight: 600 }}>View All →</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                {['Report Name', 'Generated', 'Size', 'Downloads', 'Status', 'Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {allReports.map((r, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="13" height="13" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16"/><polyline points="14 2 14 8 20 8"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)' }}>{r.name}</div>
                        <div style={{ fontSize: 9, color: 'var(--text-muted)' }}>{r.type}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      {r.generated}
                    </div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)', fontSize: 11, fontFamily: 'JetBrains Mono' }}>{r.size}</td>
                  <td><span style={{ color: '#58a6ff', fontWeight: 700, fontFamily: 'JetBrains Mono', fontSize: 12 }}>{r.downloads}</span></td>
                  <td>
                    <span style={{ background: 'rgba(63,185,80,0.12)', color: '#3fb950', border: '1px solid rgba(63,185,80,0.3)', padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700 }}>{r.status}</span>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        const doc = new jsPDF()
                        doc.setFillColor(8, 12, 20)
                        doc.rect(0, 0, 210, 297, 'F')
                        doc.setTextColor(88, 166, 255)
                        doc.setFontSize(20)
                        doc.text(r.name, 14, 30)
                        doc.setTextColor(139, 148, 158)
                        doc.setFontSize(10)
                        doc.text(`Generated: ${r.generated}  |  Size: ${r.size}  |  Downloads: ${r.downloads}`, 14, 42)
                        doc.setTextColor(230, 237, 243)
                        doc.setFontSize(11)
                        doc.text('This report was generated by IntelliBOM Security Platform.', 14, 60)
                        doc.text(`Organization: ${orgName}`, 14, 72)
                        doc.save(`${r.name.replace(/\s+/g, '-').toLowerCase()}.pdf`)
                      }}
                      style={{ display: 'flex', alignItems: 'center', gap: 5, background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.25)', color: '#58a6ff', borderRadius: 7, padding: '5px 12px', cursor: 'pointer', fontSize: 11, fontWeight: 600, transition: 'all 0.15s' }}
                    >
                      <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/></svg>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div> */}

      {/* ── Action Cards ── */}
      <div className="grid-3 section">
        {[
          { icon: <svg width="22" height="22" fill="none" stroke="#3b82f6" strokeWidth="1.8" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: 'Schedule Report', sub: 'Set up automated reporting', color: '#3b82f6' },
          { icon: <svg width="22" height="22" fill="none" stroke="#3fb950" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>, label: 'Export Data', sub: 'Download raw BOM data', color: '#3fb950' },
          { icon: <svg width="22" height="22" fill="none" stroke="#a855f7" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>, label: 'Share Report', sub: 'Send reports to team', color: '#a855f7' },
        ].map(a => (
          <div key={a.label} className="card" style={{ background: `linear-gradient(145deg, var(--bg-card), var(--card-gradient-end))`, cursor: 'pointer', border: `1px solid ${a.color}22`, transition: 'all 0.25s', textAlign: 'center', padding: '24px 16px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.color}55`; e.currentTarget.style.boxShadow = `0 8px 30px ${a.color}20` }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${a.color}22`; e.currentTarget.style.boxShadow = 'none' }}
          >
            <div style={{ width: 52, height: 52, borderRadius: 14, background: `${a.color}18`, border: `1px solid ${a.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: `0 0 16px ${a.color}20` }}>
              {a.icon}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>{a.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{a.sub}</div>
          </div>
        ))}
      </div>

      {showModal && <GenerateModal onClose={() => setShowModal(false)} onGenerate={r => setGeneratedReports(p => [r, ...p])} orgName={orgName}/>}
    </div>
  )
}
