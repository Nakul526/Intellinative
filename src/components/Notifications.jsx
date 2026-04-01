import React, { useState } from 'react'

const assetsData = [
  { id: 1, name: 'prod-web-01',   ip: '192.168.0.1', os: 'Ubuntu 22.04',        status: 'online'  },
  { id: 2, name: 'prod-db-02',    ip: '192.168.0.2', os: 'CentOS 8',            status: 'online'  },
  { id: 3, name: 'prod-api-03',   ip: '192.168.0.3', os: 'Windows Server 2022', status: 'online'  },
  { id: 4, name: 'prod-cache-04', ip: '192.168.0.4', os: 'Debian 11',           status: 'offline' },
]

const MACHINE_VULNS = {
  1: [
    { id: 'v1', component: 'libssl.so.3',  version: '1.6.0',  cves: 3, risk: 'HIGH',   cveIds: ['CVE-2023-0286', 'CVE-2023-0215', 'CVE-2022-4304'], description: 'Multiple vulnerabilities in OpenSSL affecting TLS handshake' },
    { id: 'v2', component: 'libz.so.1',    version: '2.6.2',  cves: 2, risk: 'MEDIUM', cveIds: ['CVE-2022-37434', 'CVE-2018-25032'], description: 'Heap-based buffer overflow in zlib inflate' },
    { id: 'v3', component: 'openssl',      version: '3.0.2',  cves: 4, risk: 'HIGH',   cveIds: ['CVE-2023-2650', 'CVE-2023-1255', 'CVE-2022-4203', 'CVE-2022-0778'], description: 'Critical OpenSSL vulnerabilities allowing DoS and data exposure' },
    { id: 'v4', component: 'libpthread.so.0', version: '1.25.0', cves: 1, risk: 'MEDIUM', cveIds: ['CVE-2021-3999'], description: 'Buffer overflow in getcwd in glibc pthread' },
  ],
  2: [
    { id: 'v5', component: 'openssl',    version: '3.0.2',  cves: 4, risk: 'HIGH',   cveIds: ['CVE-2023-2650', 'CVE-2023-1255', 'CVE-2022-4203', 'CVE-2022-0778'], description: 'Critical OpenSSL vulnerabilities' },
    { id: 'v6', component: 'libz.so.1',  version: '2.6.2',  cves: 2, risk: 'MEDIUM', cveIds: ['CVE-2022-37434', 'CVE-2018-25032'], description: 'Heap-based buffer overflow in zlib inflate' },
    { id: 'v7', component: 'libpthread.so.0', version: '1.25.0', cves: 1, risk: 'MEDIUM', cveIds: ['CVE-2021-3999'], description: 'Buffer overflow in getcwd' },
  ],
  3: [
    { id: 'v8',  component: 'libssl.so.3', version: '1.6.0', cves: 3, risk: 'HIGH',   cveIds: ['CVE-2023-0286', 'CVE-2023-0215', 'CVE-2022-4304'], description: 'Multiple TLS vulnerabilities' },
    { id: 'v9',  component: 'openssl',     version: '3.0.2', cves: 4, risk: 'HIGH',   cveIds: ['CVE-2023-2650', 'CVE-2023-1255', 'CVE-2022-4203', 'CVE-2022-0778'], description: 'Critical OpenSSL vulnerabilities' },
    { id: 'v10', component: 'libz.so.1',   version: '2.6.2', cves: 2, risk: 'MEDIUM', cveIds: ['CVE-2022-37434', 'CVE-2018-25032'], description: 'Heap-based buffer overflow in zlib' },
    { id: 'v11', component: 'glibc',       version: '2.35',  cves: 1, risk: 'LOW',    cveIds: ['CVE-2023-4911'], description: 'Buffer overflow in GNU C Library dynamic loader' },
  ],
  4: [
    { id: 'v12', component: 'libpthread.so.0', version: '1.25.0', cves: 1, risk: 'MEDIUM', cveIds: ['CVE-2021-3999'], description: 'Buffer overflow in getcwd' },
  ],
}

const INITIAL_GROUPS = [
  {
    id: 1,
    name: 'Security Team',
    description: 'Primary security incident response',
    color: '#f85149',
    members: [
      { id: 1, name: 'Alice Johnson',  designation: 'Security Engineer',  email: 'alice@acme.com',  phone: '+1-555-0101', role: 'Admin' },
      { id: 2, name: 'Bob Smith',      designation: 'SOC Analyst',        email: 'bob@acme.com',    phone: '+1-555-0102', role: 'Editor' },
    ]
  },
  {
    id: 2,
    name: 'DevOps Team',
    description: 'Infrastructure and deployment operations',
    color: '#58a6ff',
    members: [
      { id: 3, name: 'Carol White',    designation: 'Site Reliability Engineer', email: 'carol@acme.com',  phone: '+1-555-0201', role: 'Editor' },
      { id: 4, name: 'Dave Martinez',  designation: 'DevOps Engineer',    email: 'dave@acme.com',   phone: '+1-555-0202', role: 'Viewer' },
    ]
  },
]

const riskBg    = { HIGH: 'rgba(248,81,73,0.12)',   MEDIUM: 'rgba(240,136,62,0.12)',  LOW: 'rgba(88,166,255,0.1)',  CRITICAL: 'rgba(255,0,102,0.12)' }
const riskColor = { HIGH: '#f85149',                MEDIUM: '#f0883e',               LOW: '#58a6ff',              CRITICAL: '#ff0066' }

// ── Member management modal ───────────────────────────────────────────────────

function MembersModal({ group, onClose, onAddMember, onRemoveMember }) {
  const [form, setForm] = useState({ name: '', designation: '', email: '', phone: '', role: 'Viewer' })
  const [err, setErr] = useState('')
  const [showForm, setShowForm] = useState(false)

  function handleAdd() {
    if (!form.name.trim() || !form.email.trim()) { setErr('Name and email are required.'); return }
    onAddMember(group.id, { ...form, id: Date.now() })
    setForm({ name: '', designation: '', email: '', phone: '', role: 'Viewer' })
    setErr('')
    setShowForm(false)
  }

  const inp = { background: 'var(--bg-card2)', border: '1px solid var(--border-accent)', borderRadius: 7, padding: '7px 10px', color: 'var(--text-primary)', fontSize: 11, outline: 'none', width: '100%' }
  const roleColors = { Admin: '#f85149', Editor: '#f0883e', Viewer: '#58a6ff', 'Read-Only': '#8b949e' }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 400, backdropFilter: 'blur(6px)' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 14, width: 700, maxWidth: '92vw', maxHeight: '86vh', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 64px rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: `linear-gradient(135deg, ${group.color}40, ${group.color}20)`, border: `1px solid ${group.color}50`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: group.color }}>
            {group.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{group.name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{group.description} · {group.members.length} members</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button onClick={() => setShowForm(f => !f)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 7, border: `1px solid ${group.color}50`, background: `${group.color}12`, color: group.color, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
              <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add Member
            </button>
            <button onClick={onClose} style={{ background: 'rgba(128,128,128,0.1)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 7, width: 30, height: 30, cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Add member form */}
          {showForm && (
            <div style={{ background: `${group.color}08`, border: `1px solid ${group.color}30`, borderRadius: 10, padding: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>New Member Details</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
                {[
                  { key: 'name',        label: 'Full Name *',    placeholder: 'e.g. John Doe' },
                  { key: 'designation', label: 'Designation',    placeholder: 'e.g. Security Analyst' },
                  { key: 'email',       label: 'Email *',        placeholder: 'user@company.com' },
                  { key: 'phone',       label: 'Phone',          placeholder: '+1-555-0000' },
                ].map(f => (
                  <div key={f.key}>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</div>
                    <input value={form[f.key]} onChange={e => setForm(x => ({ ...x, [f.key]: e.target.value }))}
                      placeholder={f.placeholder} style={inp}/>
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Role</div>
                  <select value={form.role} onChange={e => setForm(x => ({ ...x, role: e.target.value }))}
                    style={{ ...inp, cursor: 'pointer' }}>
                    {['Admin', 'Editor', 'Viewer', 'Read-Only'].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              {err && <div style={{ fontSize: 10, color: '#f85149', marginBottom: 8 }}>{err}</div>}
              <div style={{ display: 'flex', gap: 8 }}>
                <button onClick={handleAdd} style={{ padding: '6px 16px', borderRadius: 7, border: `1px solid ${group.color}50`, background: `${group.color}18`, color: group.color, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Save Member</button>
                <button onClick={() => { setShowForm(false); setErr('') }} style={{ padding: '6px 14px', borderRadius: 7, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 11, cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          )}

          {/* Members table */}
          {group.members.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)', fontSize: 11 }}>
              No members yet. Add the first member above.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11 }}>
              <thead>
                <tr style={{ background: 'var(--bg-card2)' }}>
                  {['Member', 'Designation', 'Email', 'Phone', 'Role', ''].map(h => (
                    <th key={h} style={{ padding: '8px 14px', textAlign: 'left', fontSize: 9, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.members.map(m => (
                  <tr key={m.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.12s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '10px 14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: `linear-gradient(135deg, ${group.color}40, ${group.color}20)`, border: `1px solid ${group.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: group.color, flexShrink: 0 }}>
                          {m.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{m.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-secondary)' }}>{m.designation}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--accent-blue)', fontFamily: 'JetBrains Mono', fontSize: 10 }}>{m.email}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-muted)', fontSize: 10 }}>{m.phone || '—'}</td>
                    <td style={{ padding: '10px 14px' }}>
                      <span style={{ fontSize: 9, padding: '2px 8px', borderRadius: 4, fontWeight: 700, background: `${roleColors[m.role] || '#8b949e'}15`, color: roleColors[m.role] || '#8b949e', border: `1px solid ${roleColors[m.role] || '#8b949e'}35` }}>{m.role}</span>
                    </td>
                    <td style={{ padding: '10px 14px' }}>
                      <button onClick={() => onRemoveMember(group.id, m.id)}
                        style={{ fontSize: 10, padding: '3px 8px', borderRadius: 5, border: '1px solid rgba(248,81,73,0.25)', background: 'rgba(248,81,73,0.08)', color: '#f85149', cursor: 'pointer' }}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Main ──────────────────────────────────────────────────────────────────────

export default function Notifications() {
  const [selectedAsset, setSelectedAsset] = useState(assetsData[0])
  const [groups, setGroups] = useState(INITIAL_GROUPS)
  const [managingGroup, setManagingGroup] = useState(null)
  const [sentAlerts, setSentAlerts] = useState({})

  // Create group form state
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newGroup, setNewGroup] = useState({ name: '', description: '', color: '#58a6ff' })
  const [createErr, setCreateErr] = useState('')

  const vulns = MACHINE_VULNS[selectedAsset.id] || []
  const GROUP_COLORS = ['#58a6ff', '#f85149', '#3fb950', '#f0883e', '#a855f7', '#00e5ff']

  function createGroup() {
    if (!newGroup.name.trim()) { setCreateErr('Group name is required.'); return }
    setGroups(g => [...g, { id: Date.now(), ...newGroup, members: [] }])
    setNewGroup({ name: '', description: '', color: '#58a6ff' })
    setShowCreateForm(false)
    setCreateErr('')
  }

  function deleteGroup(id) {
    setGroups(g => g.filter(x => x.id !== id))
    if (managingGroup?.id === id) setManagingGroup(null)
  }

  function addMember(groupId, member) {
    setGroups(g => g.map(gr => gr.id === groupId ? { ...gr, members: [...gr.members, member] } : gr))
    setManagingGroup(prev => prev?.id === groupId ? { ...prev, members: [...prev.members, member] } : prev)
  }

  function removeMember(groupId, memberId) {
    setGroups(g => g.map(gr => gr.id === groupId ? { ...gr, members: gr.members.filter(m => m.id !== memberId) } : gr))
    setManagingGroup(prev => prev?.id === groupId ? { ...prev, members: prev.members.filter(m => m.id !== memberId) } : prev)
  }

  function sendAlert(vulnId, groupId) {
    const key = `${vulnId}_${groupId}`
    setSentAlerts(s => ({ ...s, [key]: true }))
    setTimeout(() => setSentAlerts(s => { const n = { ...s }; delete n[key]; return n }), 4000)
  }

  function sendAllToGroup(groupId) {
    const updates = {}
    vulns.forEach(v => { updates[`${v.id}_${groupId}`] = true })
    setSentAlerts(s => ({ ...s, ...updates }))
    setTimeout(() => setSentAlerts(s => {
      const n = { ...s }
      vulns.forEach(v => { delete n[`${v.id}_${groupId}`] })
      return n
    }), 4000)
  }

  const inp = { background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 7, padding: '7px 10px', color: 'var(--text-primary)', fontSize: 11, outline: 'none', width: '100%' }

  return (
    <div className="main-content" style={{ display: 'flex', flexDirection: 'column', gap: 0, height: '100%', overflow: 'hidden' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 16 }}>
        <div style={{ width: 34, height: 34, background: 'linear-gradient(135deg, #f85149, #f0883e)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
        </div>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>Notifications & Alerts</h1>
          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Vulnerability alerts and notification group management per machine</div>
        </div>
        {/* Summary badges */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
          <div style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(248,81,73,0.1)', border: '1px solid rgba(248,81,73,0.25)' }}>
            <div style={{ fontSize: 9, color: '#f85149', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Active Alerts</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#f85149', fontFamily: 'JetBrains Mono', lineHeight: 1.2 }}>{vulns.length}</div>
          </div>
          <div style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)' }}>
            <div style={{ fontSize: 9, color: '#a855f7', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Groups</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#a855f7', fontFamily: 'JetBrains Mono', lineHeight: 1.2 }}>{groups.length}</div>
          </div>
          <div style={{ padding: '6px 14px', borderRadius: 8, background: 'rgba(88,166,255,0.1)', border: '1px solid rgba(88,166,255,0.25)' }}>
            <div style={{ fontSize: 9, color: '#58a6ff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Members</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#58a6ff', fontFamily: 'JetBrains Mono', lineHeight: 1.2 }}>{groups.reduce((s, g) => s + g.members.length, 0)}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, flex: 1, overflow: 'hidden' }}>

        {/* Left: Machine list */}
        <div style={{ width: 240, background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ padding: '12px 14px 10px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="13" height="13" fill="none" stroke="#f85149" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/></svg>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Machines</span>
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {assetsData.map(asset => {
              const vcount = (MACHINE_VULNS[asset.id] || []).length
              const sel = selectedAsset.id === asset.id
              return (
                <div key={asset.id} onClick={() => setSelectedAsset(asset)}
                  style={{ padding: '11px 14px', borderBottom: '1px solid var(--border)', cursor: 'pointer', background: sel ? 'rgba(248,81,73,0.07)' : 'transparent', borderLeft: sel ? '3px solid #f85149' : '3px solid transparent', transition: 'all 0.15s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
                    <span style={{ fontWeight: 600, fontSize: 12, color: sel ? '#f85149' : 'var(--text-primary)' }}>{asset.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      {vcount > 0 && (
                        <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 10, background: 'rgba(248,81,73,0.15)', color: '#f85149', fontWeight: 800, border: '1px solid rgba(248,81,73,0.3)' }}>{vcount}</span>
                      )}
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: asset.status === 'online' ? '#3fb950' : '#6e7681', boxShadow: asset.status === 'online' ? '0 0 5px #3fb950' : 'none', display: 'block' }}/>
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 4 }}>{asset.os}</div>
                  {vcount > 0
                    ? <div style={{ fontSize: 9, color: '#f85149', fontWeight: 600 }}>{vcount} vulnerability alert{vcount > 1 ? 's' : ''}</div>
                    : <div style={{ fontSize: 9, color: '#3fb950', fontWeight: 600 }}>No alerts</div>
                  }
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>

          {/* Groups section */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <svg width="13" height="13" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>Notification Groups</span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{groups.length} groups · {groups.reduce((s, g) => s + g.members.length, 0)} total members</span>
              <button onClick={() => setShowCreateForm(f => !f)} style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 7, border: '1px solid rgba(168,85,247,0.35)', background: 'rgba(168,85,247,0.1)', color: '#a855f7', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
                <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                New Group
              </button>
            </div>

            {/* Create group form */}
            {showCreateForm && (
              <div style={{ padding: '14px 16px', borderBottom: '1px solid var(--border)', background: 'rgba(168,85,247,0.04)' }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 10 }}>Create Notification Group</div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
                  <div style={{ flex: 2 }}>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Group Name *</div>
                    <input value={newGroup.name} onChange={e => setNewGroup(x => ({ ...x, name: e.target.value }))} placeholder="e.g. Security Team" style={inp}/>
                  </div>
                  <div style={{ flex: 3 }}>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Description</div>
                    <input value={newGroup.description} onChange={e => setNewGroup(x => ({ ...x, description: e.target.value }))} placeholder="e.g. Handles critical security incidents" style={inp}/>
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Color</div>
                    <div style={{ display: 'flex', gap: 5 }}>
                      {GROUP_COLORS.map(c => (
                        <button key={c} onClick={() => setNewGroup(x => ({ ...x, color: c }))}
                          style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: newGroup.color === c ? `2px solid #fff` : '2px solid transparent', cursor: 'pointer', outline: 'none', boxShadow: newGroup.color === c ? `0 0 6px ${c}` : 'none' }}/>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={createGroup} style={{ padding: '7px 16px', borderRadius: 7, border: '1px solid rgba(168,85,247,0.4)', background: 'rgba(168,85,247,0.15)', color: '#a855f7', fontSize: 11, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>Create</button>
                    <button onClick={() => { setShowCreateForm(false); setCreateErr('') }} style={{ padding: '7px 12px', borderRadius: 7, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 11, cursor: 'pointer' }}>Cancel</button>
                  </div>
                </div>
                {createErr && <div style={{ fontSize: 10, color: '#f85149', marginTop: 8 }}>{createErr}</div>}
              </div>
            )}

            {/* Group cards */}
            <div style={{ padding: 14, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
              {groups.length === 0 ? (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '20px 0', color: 'var(--text-muted)', fontSize: 11 }}>No groups yet. Create one above.</div>
              ) : groups.map(g => (
                <div key={g.id} style={{ background: 'var(--bg-card2)', border: `1px solid ${g.color}30`, borderRadius: 10, padding: 14, position: 'relative', overflow: 'hidden' }}>
                  {/* Top color accent */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: g.color, opacity: 0.7 }}/>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: `${g.color}20`, border: `1px solid ${g.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: g.color, flexShrink: 0 }}>
                      {g.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>{g.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.description}</div>
                    </div>
                  </div>
                  {/* Member avatars */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                    <div style={{ display: 'flex' }}>
                      {g.members.slice(0, 4).map((m, i) => (
                        <div key={m.id} style={{ width: 22, height: 22, borderRadius: '50%', background: `${g.color}30`, border: `1.5px solid var(--bg-card)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: g.color, marginLeft: i > 0 ? -6 : 0, zIndex: 4 - i }}>
                          {m.name.slice(0, 1)}
                        </div>
                      ))}
                      {g.members.length > 4 && (
                        <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--border)', border: '1.5px solid var(--bg-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 7, fontWeight: 700, color: 'var(--text-muted)', marginLeft: -6 }}>
                          +{g.members.length - 4}
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{g.members.length} member{g.members.length !== 1 ? 's' : ''}</span>
                  </div>
                  {/* Actions */}
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button onClick={() => setManagingGroup(g)} style={{ flex: 1, padding: '5px 0', borderRadius: 6, border: `1px solid ${g.color}40`, background: `${g.color}12`, color: g.color, fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
                      Manage Members
                    </button>
                    <button onClick={() => sendAllToGroup(g.id)} style={{ flex: 1, padding: '5px 0', borderRadius: 6, border: '1px solid rgba(248,81,73,0.3)', background: 'rgba(248,81,73,0.08)', color: '#f85149', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>
                      Send All Alerts
                    </button>
                    <button onClick={() => deleteGroup(g.id)} style={{ padding: '5px 8px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: 10, cursor: 'pointer' }}>✕</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts section */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
              <svg width="13" height="13" fill="none" stroke="#f85149" strokeWidth="2" viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                Vulnerability Alerts — <span style={{ color: '#f85149' }}>{selectedAsset.name}</span>
              </span>
              {vulns.length > 0 && (
                <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 10, background: 'rgba(248,81,73,0.15)', color: '#f85149', fontWeight: 800, border: '1px solid rgba(248,81,73,0.3)' }}>{vulns.length} active</span>
              )}
            </div>

            <div style={{ flex: 1, overflowY: 'auto' }}>
              {vulns.length === 0 ? (
                <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <svg width="28" height="28" fill="none" stroke="#3fb950" strokeWidth="1.5" viewBox="0 0 24 24" style={{ display: 'block', margin: '0 auto 10px' }}><polyline points="20 6 9 17 4 12"/></svg>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#3fb950' }}>No vulnerabilities detected</div>
                  <div style={{ fontSize: 10, marginTop: 4 }}>This machine is clean</div>
                </div>
              ) : vulns.map((v, i) => (
                <div key={v.id} style={{ padding: '14px 16px', borderBottom: i < vulns.length - 1 ? '1px solid var(--border)' : 'none', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  {/* Icon */}
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: riskBg[v.risk] || riskBg.MEDIUM, border: `1px solid ${riskColor[v.risk] || '#f0883e'}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="16" height="16" fill="none" stroke={riskColor[v.risk] || '#f0883e'} strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono' }}>{v.component}</span>
                      <span style={{ fontSize: 9, padding: '2px 7px', borderRadius: 4, fontWeight: 700, background: riskBg[v.risk], color: riskColor[v.risk], border: `1px solid ${riskColor[v.risk]}40` }}>{v.risk}</span>
                      <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 4, background: 'rgba(248,81,73,0.1)', color: '#f85149', border: '1px solid rgba(248,81,73,0.25)', fontWeight: 700 }}>
                        {v.cves} CVE{v.cves > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 6 }}>{v.description}</div>
                    {/* CVE IDs */}
                    <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 8 }}>
                      {v.cveIds.map(cid => (
                        <span key={cid} style={{ fontSize: 9, padding: '1px 6px', borderRadius: 3, background: 'rgba(88,166,255,0.08)', color: '#58a6ff', border: '1px solid rgba(88,166,255,0.2)', fontFamily: 'JetBrains Mono', fontWeight: 600 }}>{cid}</span>
                      ))}
                    </div>
                    {/* Version */}
                    <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Version <span style={{ fontFamily: 'JetBrains Mono', color: 'var(--text-secondary)' }}>{v.version}</span> · {selectedAsset.name}</div>
                  </div>
                  {/* Send to group buttons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5, flexShrink: 0 }}>
                    {groups.length === 0 ? (
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>No groups</span>
                    ) : groups.map(g => {
                      const key = `${v.id}_${g.id}`
                      const sent = sentAlerts[key]
                      return (
                        <button key={g.id} onClick={() => sendAlert(v.id, g.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 9, padding: '5px 10px', borderRadius: 6, border: sent ? `1px solid ${g.color}60` : `1px solid ${g.color}35`, background: sent ? `${g.color}18` : `${g.color}08`, color: g.color, cursor: 'pointer', fontWeight: 700, whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
                          {sent
                            ? <><svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg> Sent</>
                            : <><svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg> → {g.name}</>
                          }
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Members modal */}
      {managingGroup && (
        <MembersModal
          group={groups.find(g => g.id === managingGroup.id) || managingGroup}
          onClose={() => setManagingGroup(null)}
          onAddMember={addMember}
          onRemoveMember={removeMember}
        />
      )}
    </div>
  )
}
