import React, { useState } from 'react'

const initialAssets = [
  { id: 1, name: 'prod-web-01', ip: '192.168.1.10', os: 'Linux', status: 'active' },
  { id: 2, name: 'prod-db-01',  ip: '192.168.1.20', os: 'Linux', status: 'active' },
  { id: 3, name: 'prod-api-01', ip: '192.168.1.30', os: 'Windows', status: 'inactive' },
]

function RegisterModal({ onClose, onAdd }) {
  const [tab, setTab] = useState('manual')
  const [form, setForm] = useState({ name: '', ip: '', username: '', password: '', os: '', port: '22', pem: null })

  function handleChange(e) {
    const { name, value, files } = e.target
    setForm(f => ({ ...f, [name]: files ? files[0] : value }))
  }

  function handleSubmit() {
    if (!form.name || !form.ip || !form.username || !form.os) return
    onAdd({ id: Date.now(), name: form.name, ip: form.ip, os: form.os, status: 'active' })
    onClose()
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200 }}>
      <div style={{ background: '#111827', border: '1px solid var(--border-accent)', borderRadius: 14, width: 480, padding: '28px 28px 24px', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}>
        {/* Header */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-blue)', marginBottom: 4 }}>Register a machine</div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Provide connection details to run remote BOM capture tasks. Import from CSV is coming soon, so manual entry is available today.
          </div>
        </div>
        <button onClick={onClose} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 4 }}>✕</button>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 0, marginTop: 18, marginBottom: 20, background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: 3 }}>
          {['manual', 'upload'].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: '6px 0', fontSize: 12, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer', transition: 'all 0.15s',
              background: tab === t ? 'var(--accent-blue)' : 'transparent',
              color: tab === t ? '#fff' : 'var(--text-muted)',
            }}>
              {t === 'manual' ? 'Manual entry' : 'Upload BOM'}
            </button>
          ))}
        </div>

        {tab === 'manual' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Machine name <span style={{ color: 'var(--accent-red)' }}>*</span></label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g., prod-web-01" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>IP address <span style={{ color: 'var(--accent-red)' }}>*</span></label>
                <input name="ip" value={form.ip} onChange={handleChange} placeholder="e.g., 192.168.1.10" style={inputStyle} />
              </div>
            </div>
            {/* Row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Username <span style={{ color: 'var(--accent-red)' }}>*</span></label>
                <input name="username" value={form.username} onChange={handleChange} placeholder="e.g., admin" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Password</label>
                <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Optional if using PEM key" style={inputStyle} />
              </div>
            </div>
            {/* Row 3 */}
            <div>
              <label style={labelStyle}>Operating system <span style={{ color: 'var(--accent-red)' }}>*</span></label>
              <input name="os" value={form.os} onChange={handleChange} placeholder="" style={inputStyle} />
            </div>
            {/* Row 4 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>SSH port</label>
                <input name="port" value={form.port} onChange={handleChange} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>PEM key file</label>
                <label style={{ ...inputStyle, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                  Choose file
                  <input type="file" name="pem" onChange={handleChange} style={{ display: 'none' }} />
                </label>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>Optional if using password authentication</div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 12 }}>
            CSV import coming soon
          </div>
        )}

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={cancelBtnStyle}>Cancel</button>
          <button onClick={handleSubmit} style={primaryBtnStyle}>Add machine</button>
        </div>
      </div>
    </div>
  )
}

const labelStyle = { display: 'block', fontSize: 11, color: 'var(--text-secondary)', marginBottom: 5, fontWeight: 500 }
const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-accent)', borderRadius: 7, padding: '8px 12px', color: 'var(--text-primary)', fontSize: 12, outline: 'none' }
const cancelBtnStyle = { padding: '8px 18px', borderRadius: 8, border: '1px solid var(--border-accent)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }
const primaryBtnStyle = { padding: '8px 18px', borderRadius: 8, border: 'none', background: 'var(--accent-blue)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }

export default function Assets() {
  const [assets, setAssets] = useState(initialAssets)
  const [showModal, setShowModal] = useState(false)

  const total = assets.length
  const active = assets.filter(a => a.status === 'active').length
  const inactive = assets.filter(a => a.status === 'inactive').length

  function handleAdd(asset) {
    setAssets(prev => [...prev, asset])
  }

  return (
    <div className="main-content">
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>Assets</h1>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Manage your machines and infrastructure</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 16px', background: 'var(--accent-blue)', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', boxShadow: '0 0 12px rgba(88,166,255,0.3)' }}>
          <span style={{ fontSize: 16, lineHeight: 1 }}>+</span> Add Asset
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid-3" style={{ marginBottom: 20 }}>
        <SummaryCard
          icon={<ServerIcon color="#58a6ff" />}
          dot="#58a6ff"
          value={total}
          label="Total Assets"
          glow="rgba(88,166,255,0.08)"
          border="rgba(88,166,255,0.15)"
        />
        <SummaryCard
          icon={<ServerIcon color="#3fb950" />}
          dot="#3fb950"
          value={active}
          label="Active"
          glow="rgba(63,185,80,0.08)"
          border="rgba(63,185,80,0.15)"
        />
        <SummaryCard
          icon={<NetworkIcon color="#f0883e" />}
          dot="#f0883e"
          value={inactive}
          label="Inactive"
          glow="rgba(240,136,62,0.08)"
          border="rgba(240,136,62,0.15)"
        />
      </div>

      {/* Asset list */}
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 16 }}>Asset List</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Machine Name</th>
              <th>IP Address</th>
              <th>Operating System</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 26, height: 26, background: 'rgba(88,166,255,0.08)', border: '1px solid rgba(88,166,255,0.15)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ServerIcon color="#58a6ff" size={13} />
                    </div>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{asset.name}</span>
                  </div>
                </td>
                <td>{asset.ip}</td>
                <td>{asset.os}</td>
                <td>
                  <span className={`status ${asset.status === 'active' ? 'status-ok' : 'status-na'}`}>
                    {asset.status}
                  </span>
                </td>
                <td>
                  <span style={{ color: 'var(--accent-blue)', cursor: 'pointer', fontWeight: 500 }}>Configure</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && <RegisterModal onClose={() => setShowModal(false)} onAdd={handleAdd} />}
    </div>
  )
}

function SummaryCard({ icon, dot, value, label, glow, border }) {
  return (
    <div style={{ background: 'var(--bg-card)', border: `1px solid ${border}`, borderRadius: 12, padding: '18px 20px', position: 'relative', boxShadow: `inset 0 0 40px ${glow}` }}>
      <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', background: dot, boxShadow: `0 0 6px ${dot}` }} />
      <div style={{ marginBottom: 12 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-primary)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>{label}</div>
    </div>
  )
}

function ServerIcon({ color = 'currentColor', size = 22 }) {
  return (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="2" y="3" width="20" height="5" rx="1"/>
      <rect x="2" y="10" width="20" height="5" rx="1"/>
      <rect x="2" y="17" width="20" height="4" rx="1"/>
      <circle cx="6" cy="5.5" r="0.8" fill={color} stroke="none"/>
      <circle cx="6" cy="12.5" r="0.8" fill={color} stroke="none"/>
    </svg>
  )
}

function NetworkIcon({ color = 'currentColor', size = 22 }) {
  return (
    <svg width={size} height={size} fill="none" stroke={color} strokeWidth="1.8" viewBox="0 0 24 24">
      <rect x="9" y="2" width="6" height="4" rx="1"/>
      <rect x="2" y="10" width="6" height="4" rx="1"/>
      <rect x="16" y="10" width="6" height="4" rx="1"/>
      <rect x="9" y="18" width="6" height="4" rx="1"/>
      <line x1="12" y1="6" x2="5" y2="10"/>
      <line x1="12" y1="6" x2="19" y2="10"/>
      <line x1="5" y1="14" x2="12" y2="18"/>
      <line x1="19" y1="14" x2="12" y2="18"/>
    </svg>
  )
}
