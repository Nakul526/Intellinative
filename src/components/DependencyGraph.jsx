import React, { useState, useEffect } from 'react'

const riskColor = { NONE: '#3fb950', LOW: '#58a6ff', MEDIUM: '#f0883e', HIGH: '#f85149', CRITICAL: '#ff0066' }

// ── Radial graph ──────────────────────────────────────────────────────────────

function buildGraph(components, appName) {
  const nodes = [
    { id: 'root', label: appName, type: 'app', risk: 'NONE', version: '', cves: 0, isRoot: true },
    ...components.map((c, i) => ({ id: `c${i}`, label: c.name, type: c.type, risk: c.risk, version: c.version, cves: c.cves, loaded: c.loaded })),
  ]
  const edges = components.map((_, i) => ({ from: 'root', to: `c${i}` }))
  if (components.length > 2) { edges.push({ from: 'c0', to: 'c2', dashed: true }); edges.push({ from: 'c1', to: 'c3', dashed: true }) }
  if (components.length > 5) { edges.push({ from: 'c3', to: 'c5', dashed: true }); edges.push({ from: 'c2', to: 'c4', dashed: true }) }
  return { nodes, edges }
}

function layoutRadial(nodes) {
  const W = 960, H = 540, cx = W / 2, cy = H / 2, r1 = 190, r2 = 350
  const comps = nodes.filter(n => !n.isRoot)
  const inner = comps.filter((_, i) => i % 2 === 0)
  const outer = comps.filter((_, i) => i % 2 === 1)
  const placed = { root: { x: cx, y: cy } }
  inner.forEach((n, i) => { const a = (i / Math.max(inner.length, 1)) * Math.PI * 2 - Math.PI / 2; placed[n.id] = { x: cx + r1 * Math.cos(a), y: cy + r1 * Math.sin(a) } })
  outer.forEach((n, i) => { const a = (i / Math.max(outer.length, 1)) * Math.PI * 2 - Math.PI / 2 + Math.PI / outer.length; placed[n.id] = { x: cx + r2 * Math.cos(a), y: cy + r2 * Math.sin(a) } })
  return placed
}

// ── Collapsible tree ──────────────────────────────────────────────────────────

const NW = 178, NH = 50, COL = 288, ROW = 70, PX = 80, PY = 50

function buildTree(components, appName) {
  const dc = Math.min(Math.ceil(components.length * 0.45), 6)
  const direct = components.slice(0, dc)
  const trans = components.slice(dc)
  return {
    id: 'root', label: appName, risk: 'NONE', version: '', cves: 0, isRoot: true,
    children: direct.map((c, i) => ({
      id: `d${i}`, label: c.name, risk: c.risk, version: c.version,
      cves: c.cves, loaded: c.loaded, type: c.type,
      children: trans.filter((_, ti) => ti % dc === i).map((tc, ti) => ({
        id: `t${i}_${ti}`, label: tc.name, risk: tc.risk, version: tc.version,
        cves: tc.cves, loaded: tc.loaded, type: tc.type, children: []
      }))
    }))
  }
}

function countRows(node, col) {
  if (col.has(node.id) || !node.children.length) return 1
  return node.children.reduce((s, c) => s + countRows(c, col), 0)
}

function placeNodes(node, col, depth, startRow, out = {}) {
  const span = countRows(node, col)
  out[node.id] = { cx: PX + depth * COL + NW / 2, cy: PY + (startRow + span / 2) * ROW, node }
  if (!col.has(node.id)) {
    let r = startRow
    for (const ch of node.children) { placeNodes(ch, col, depth + 1, r, out); r += countRows(ch, col) }
  }
  return out
}

function collectEdges(node, col, pos, acc = []) {
  if (!col.has(node.id)) {
    for (const ch of node.children) {
      const p = pos[node.id], c = pos[ch.id]
      if (p && c) acc.push({ fx: p.cx + NW / 2 + 14, fy: p.cy, tx: c.cx - NW / 2, ty: c.cy, risk: ch.risk })
      collectEdges(ch, col, pos, acc)
    }
  }
  return acc
}

function getAllNodeIds(node, ids = new Set()) {
  if (node.children.length) { ids.add(node.id); node.children.forEach(c => getAllNodeIds(c, ids)) }
  return ids
}

// ── Graph Tab ─────────────────────────────────────────────────────────────────

function GraphTab({ nodes, edges, positions, eased, activeNode, setHovered, setSelected, selected }) {
  return (
    <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
      <svg width="960" height="540" style={{ flex: 1, background: 'radial-gradient(ellipse at 50% 50%, rgba(88,166,255,0.04) 0%, transparent 70%)' }}>
        <defs>
          {Object.entries(riskColor).map(([risk, color]) => (
            <filter key={risk} id={`gw-${risk}`}>
              <feGaussianBlur stdDeviation="4" result="b"/>
              <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          ))}
          <filter id="gw-root"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {[...Array(9)].map((_, i) => <line key={`h${i}`} x1="0" y1={i*68} x2="960" y2={i*68} stroke="rgba(128,128,128,0.03)" strokeWidth="1"/>)}
        {[...Array(14)].map((_, i) => <line key={`v${i}`} x1={i*72} y1="0" x2={i*72} y2="540" stroke="rgba(128,128,128,0.03)" strokeWidth="1"/>)}
        <circle cx="480" cy="270" r="190" fill="none" stroke="rgba(88,166,255,0.05)" strokeWidth="1" strokeDasharray="4 8"/>
        <circle cx="480" cy="270" r="350" fill="none" stroke="rgba(168,85,247,0.03)" strokeWidth="1" strokeDasharray="4 12"/>

        {edges.map((edge, i) => {
          const from = positions[edge.from], to = positions[edge.to]
          if (!from || !to) return null
          const toNode = nodes.find(n => n.id === edge.to)
          const color = toNode ? (riskColor[toNode.risk] || '#58a6ff') : '#58a6ff'
          const isHl = activeNode && (edge.from === activeNode.id || edge.to === activeNode.id)
          const dx = to.x - from.x, dy = to.y - from.y, len = Math.sqrt(dx*dx+dy*dy)
          const nx = dx/len, ny = dy/len
          const sR = edge.from === 'root' ? 22 : 14
          const x1 = from.x+nx*sR, y1 = from.y+ny*sR, x2 = to.x-nx*14, y2 = to.y-ny*14
          const mx = (x1+x2)/2+ny*20, my = (y1+y2)/2-nx*20
          const pl = Math.sqrt((x2-x1)**2+(y2-y1)**2)*1.1
          return <path key={i} d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`} fill="none"
            stroke={isHl ? color : `${color}40`} strokeWidth={isHl ? 2 : 1}
            strokeDasharray={edge.dashed ? '4 6' : 'none'}
            strokeDashoffset={edge.dashed ? 0 : pl*(1-eased)} strokeLinecap="round"
            style={{ transition: 'stroke 0.2s' }}/>
        })}

        {nodes.map(node => {
          const pos = positions[node.id]; if (!pos) return null
          const color = node.isRoot ? '#00e5ff' : (riskColor[node.risk] || '#58a6ff')
          const isActive = activeNode?.id === node.id, r = node.isRoot ? 22 : 14
          return (
            <g key={node.id} transform={`translate(${pos.x},${pos.y}) scale(${eased})`}
              style={{ cursor: 'pointer', transformOrigin: `${pos.x}px ${pos.y}px` }}
              onMouseEnter={() => setHovered(node)} onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(selected?.id === node.id ? null : node)}>
              {(isActive||node.isRoot) && <circle cx="0" cy="0" r={r+8} fill={`${color}15`} stroke={`${color}40`} strokeWidth="1"/>}
              {node.isRoot && <circle cx="0" cy="0" r={r+14} fill="none" stroke={`${color}20`} strokeWidth="1" strokeDasharray="3 5"/>}
              <circle cx="0" cy="0" r={r} fill={`${color}22`} stroke={color} strokeWidth={isActive?2.5:1.5} filter={`url(#gw-${node.isRoot?'root':node.risk})`}/>
              <circle cx="0" cy="0" r={r*0.3} fill={color}/>
              <text x="0" y={r+14} textAnchor="middle" fill={isActive?color:'var(--text-secondary)'} fontSize={node.isRoot?11:9} fontWeight={node.isRoot?700:500} fontFamily="JetBrains Mono,monospace">
                {node.label.length>14?node.label.slice(0,13)+'…':node.label}
              </text>
              {node.version && <text x="0" y={r+24} textAnchor="middle" fill="rgba(139,148,158,0.7)" fontSize="8" fontFamily="JetBrains Mono">{node.version}</text>}
              {node.cves>0 && <g transform={`translate(${r-4},${-r+4})`}><circle cx="0" cy="0" r="7" fill="#f85149" stroke="var(--bg-card)" strokeWidth="1.5"/><text x="0" y="3" textAnchor="middle" fill="white" fontSize="7" fontWeight="700">{node.cves}</text></g>}
            </g>
          )
        })}
      </svg>

      <div style={{ width: 250, borderLeft: '1px solid var(--border)', padding: 16, display: 'flex', flexDirection: 'column', gap: 12, overflowY: 'auto', background: 'rgba(0,0,0,0.04)' }}>
        {activeNode ? (
          <>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'JetBrains Mono', wordBreak: 'break-all' }}>{activeNode.label}</div>
            {activeNode.version && <DR label="Version" value={activeNode.version}/>}
            {activeNode.type && !activeNode.isRoot && <DR label="Type" value={activeNode.type}/>}
            {!activeNode.isRoot && <DR label="Risk" value={activeNode.risk} color={riskColor[activeNode.risk]}/>}
            {activeNode.cves > 0 && <DR label="CVEs" value={`${activeNode.cves} found`} color="#f85149"/>}
            {activeNode.loaded !== undefined && <DR label="Status" value={activeNode.loaded ? 'Loaded' : 'Not Loaded'} color={activeNode.loaded ? '#3fb950' : '#6e7681'}/>}
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10 }}>
              <div style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Connections</div>
              {edges.filter(e => e.from === activeNode.id || e.to === activeNode.id).map((e, i) => {
                const otherId = e.from === activeNode.id ? e.to : e.from
                const other = nodes.find(n => n.id === otherId)
                return other ? <div key={i} style={{ fontSize: 10, color: 'var(--text-secondary)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: riskColor[other.risk]||'#58a6ff', flexShrink: 0 }}/>
                  {other.label.length>16?other.label.slice(0,15)+'…':other.label}
                </div> : null
              })}
            </div>
          </>
        ) : <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.6 }}>Hover or click a node to see details</div>}
        <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Risk Summary</div>
          {Object.entries(riskColor).slice(0,4).map(([risk, color]) => {
            const count = nodes.filter(n => !n.isRoot && n.risk === risk).length
            return count > 0 ? <div key={risk} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--text-muted)' }}><span style={{ width: 6, height: 6, borderRadius: '50%', background: color }}/>{risk}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color, fontFamily: 'JetBrains Mono' }}>{count}</span>
            </div> : null
          })}
        </div>
      </div>
    </div>
  )
}

// ── Tree Tab ──────────────────────────────────────────────────────────────────

function TreeTab({ components, appName }) {
  const root = buildTree(components, appName)
  const [col, setCol] = useState(new Set())

  const toggle = (id) => setCol(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n })
  const expandAll = () => setCol(new Set())
  const collapseAll = () => setCol(getAllNodeIds(root))

  const totalRows = countRows(root, col)
  const svgH = PY * 2 + totalRows * ROW
  const svgW = PX + 2 * COL + NW + 80
  const pos = placeNodes(root, col, 0, 0)
  const edges = collectEdges(root, col, pos)

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 6, padding: '8px 16px', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.03)', alignItems: 'center', flexShrink: 0 }}>
        <button onClick={expandAll} style={{ fontSize: 10, padding: '4px 11px', borderRadius: 6, border: '1px solid rgba(88,166,255,0.3)', background: 'rgba(88,166,255,0.08)', color: '#58a6ff', cursor: 'pointer', fontWeight: 600 }}>
          + Expand All
        </button>
        <button onClick={collapseAll} style={{ fontSize: 10, padding: '4px 11px', borderRadius: 6, border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 600 }}>
          − Collapse All
        </button>
        <span style={{ fontSize: 10, color: 'var(--text-muted)', marginLeft: 6 }}>
          {totalRows} visible · {components.length + 1} total nodes
        </span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 14 }}>
          {Object.entries(riskColor).slice(0, 4).map(([risk, color]) => (
            <span key={risk} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 9, color: 'var(--text-muted)' }}>
              <span style={{ width: 7, height: 7, borderRadius: 2, background: color }}/>
              {risk}
            </span>
          ))}
        </div>
      </div>

      {/* Scrollable canvas */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <svg width={svgW} height={Math.max(svgH, 420)} style={{ display: 'block' }}>
          {/* Level labels + guide lines */}
          {[['ROOT', '#00e5ff'], ['DIRECT DEPS', '#58a6ff'], ['TRANSITIVE', '#a855f7']].map(([label, color], d) => {
            const lx = PX + d * COL + NW / 2
            return (
              <g key={d}>
                <line x1={lx} y1={28} x2={lx} y2={Math.max(svgH, 420) - 8} stroke={`${color}08`} strokeWidth="1" strokeDasharray="3 9"/>
                <text x={lx} y={20} textAnchor="middle" fontSize="8" fontWeight="700" fill={`${color}60`} fontFamily="JetBrains Mono">{label}</text>
              </g>
            )
          })}

          {/* Edges */}
          {edges.map((e, i) => {
            const color = riskColor[e.risk] || '#58a6ff'
            const mx = (e.fx + e.tx) / 2
            return (
              <path key={i} d={`M ${e.fx} ${e.fy} C ${mx} ${e.fy}, ${mx} ${e.ty}, ${e.tx} ${e.ty}`}
                fill="none" stroke={`${color}55`} strokeWidth="1.5" strokeLinecap="round"/>
            )
          })}

          {/* Nodes */}
          {Object.values(pos).map(({ cx, cy, node }) => {
            const color = node.isRoot ? '#00e5ff' : (riskColor[node.risk] || '#58a6ff')
            const isCollapsed = col.has(node.id)
            const hasKids = node.children.length > 0
            const bx = cx - NW / 2, by = cy - NH / 2

            return (
              <g key={node.id}>
                {/* Shadow */}
                <rect x={bx+2} y={by+3} width={NW} height={NH} rx="9" fill="rgba(0,0,0,0.12)"/>
                {/* Node rect */}
                <rect x={bx} y={by} width={NW} height={NH} rx="9"
                  fill={`${color}${node.isRoot ? '18' : '0d'}`}
                  stroke={color} strokeWidth={node.isRoot ? 2 : 1.5}/>
                {/* Left accent bar */}
                <rect x={bx} y={by + 6} width="4" height={NH - 12} rx="2" fill={color} opacity="0.8"/>

                {/* Name */}
                <text x={bx + 16} y={cy + (node.version ? -7 : 2)}
                  fill={node.isRoot ? color : 'var(--text-primary)'}
                  fontSize={node.isRoot ? 11 : 10} fontWeight="700" fontFamily="JetBrains Mono,monospace">
                  {node.label.length > 18 ? node.label.slice(0, 17) + '…' : node.label}
                </text>

                {/* Version + type */}
                {node.version && (
                  <text x={bx + 16} y={cy + 8} fill="var(--text-muted)" fontSize="8" fontFamily="JetBrains Mono">
                    v{node.version}{node.type ? `  ·  ${node.type}` : ''}
                  </text>
                )}

                {/* Risk badge */}
                {!node.isRoot && (
                  <>
                    <rect x={bx + NW - 52} y={by + 8} width="44" height="14" rx="4" fill={`${color}20`} stroke={`${color}45`} strokeWidth="1"/>
                    <text x={bx + NW - 30} y={by + 18} textAnchor="middle" fill={color} fontSize="7" fontWeight="700" letterSpacing="0.05em">{node.risk}</text>
                  </>
                )}

                {/* CVE badge */}
                {node.cves > 0 && (
                  <g transform={`translate(${bx + NW - 7}, ${by - 3})`}>
                    <circle cx="0" cy="0" r="8" fill="#f85149" stroke="var(--bg-card)" strokeWidth="1.5"/>
                    <text x="0" y="3.5" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="700">{node.cves}</text>
                  </g>
                )}

                {/* +/− toggle button */}
                {hasKids && (
                  <g onClick={() => toggle(node.id)} style={{ cursor: 'pointer' }}>
                    {/* Connector line from node to button */}
                    <line x1={cx + NW / 2} y1={cy} x2={cx + NW / 2 + 6} y2={cy} stroke={color} strokeWidth="1.5" opacity="0.6"/>
                    {/* Circle */}
                    <circle cx={cx + NW / 2 + 18} cy={cy} r="13"
                      fill={isCollapsed ? `${color}25` : 'var(--bg-card)'}
                      stroke={color} strokeWidth="1.5"
                      style={{ filter: `drop-shadow(0 0 4px ${color}40)` }}/>
                    {/* Symbol */}
                    <text x={cx + NW / 2 + 18} y={cy + 5} textAnchor="middle"
                      fill={color} fontSize="17" fontWeight="700" fontFamily="system-ui"
                      style={{ userSelect: 'none' }}>
                      {isCollapsed ? '+' : '−'}
                    </text>
                    {/* Collapsed count */}
                    {isCollapsed && (
                      <text x={cx + NW / 2 + 18} y={cy + 22} textAnchor="middle" fill="var(--text-muted)" fontSize="8">
                        {node.children.length} hidden
                      </text>
                    )}
                  </g>
                )}
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

// ── Shared helpers ────────────────────────────────────────────────────────────

function DR({ label, value, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <span style={{ fontSize: 9, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
      <span style={{ fontSize: 11, color: color || 'var(--text-secondary)', fontWeight: 600 }}>{value}</span>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────────────────────

const TABS = [
  { id: 'graph', label: 'Radial Graph', icon: <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><line x1="7" y1="11.5" x2="17" y2="6.5"/><line x1="7" y1="12.5" x2="17" y2="17.5"/></svg> },
  { id: 'tree',  label: 'Tree View',   icon: <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg> },
]

export default function DependencyGraph({ components, appName, onClose }) {
  const [activeTab, setActiveTab] = useState('graph')
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)
  const [tick, setTick] = useState(0)

  const { nodes, edges } = buildGraph(components, appName)
  const positions = layoutRadial(nodes)

  useEffect(() => {
    const id = setInterval(() => setTick(t => Math.min(t + 1, 60)), 16)
    return () => clearInterval(id)
  }, [])

  const eased = 1 - Math.pow(1 - Math.min(tick / 40, 1), 3)
  const activeNode = selected || hovered
  const vulnCount = components.filter(c => c.cves > 0).length

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, backdropFilter: 'blur(10px)' }}>
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-accent)', borderRadius: 18, width: '96vw', maxWidth: 1440, height: '92vh', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 120px rgba(0,0,0,0.65)', overflow: 'hidden' }}>

        {/* Header */}
        <div style={{ padding: '15px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #00e5ff, #a855f7)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 0 16px rgba(0,229,255,0.3)' }}>
            <svg width="17" height="17" fill="none" stroke="#000" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><line x1="7" y1="11.5" x2="17" y2="6.5"/><line x1="7" y1="12.5" x2="17" y2="17.5"/></svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)' }}>Dependency Graph — {appName}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>{components.length} components · {edges.length} edges · {vulnCount} vulnerable</div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 18, alignItems: 'center', marginRight: 14 }}>
            {Object.entries(riskColor).slice(0, 4).map(([risk, color]) => (
              <span key={risk} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: 'var(--text-muted)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: `0 0 5px ${color}` }}/>
                {risk}
              </span>
            ))}
          </div>
          <button onClick={onClose} style={{ background: 'rgba(128,128,128,0.1)', border: '1px solid var(--border)', color: 'var(--text-muted)', borderRadius: 8, width: 34, height: 34, cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>✕</button>
        </div>

        {/* Tab bar */}
        <div style={{ display: 'flex', gap: 2, padding: '7px 18px 0', borderBottom: '1px solid var(--border)', background: 'rgba(0,0,0,0.04)', flexShrink: 0 }}>
          {TABS.map(t => {
            const active = activeTab === t.id
            return (
              <button key={t.id} onClick={() => setActiveTab(t.id)}
                style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '8px 18px', border: 'none', cursor: 'pointer', borderRadius: '8px 8px 0 0', background: active ? 'var(--bg-card)' : 'transparent', color: active ? 'var(--accent-blue)' : 'var(--text-muted)', fontSize: 12, fontWeight: active ? 700 : 500, borderBottom: active ? '2px solid var(--accent-blue)' : '2px solid transparent', marginBottom: -1, transition: 'all 0.15s' }}>
                {t.icon} {t.label}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
          {activeTab === 'graph' && (
            <GraphTab nodes={nodes} edges={edges} positions={positions} eased={eased}
              activeNode={activeNode} setHovered={setHovered} setSelected={setSelected} selected={selected}/>
          )}
          {activeTab === 'tree' && <TreeTab components={components} appName={appName}/>}
        </div>
      </div>
    </div>
  )
}
