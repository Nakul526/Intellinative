import { useState } from 'react'

function polarToXY(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function arcPath(cx, cy, outerR, innerR, startDeg, endDeg) {
  const s1 = polarToXY(cx, cy, outerR, endDeg)
  const e1 = polarToXY(cx, cy, outerR, startDeg)
  const s2 = polarToXY(cx, cy, innerR, startDeg)
  const e2 = polarToXY(cx, cy, innerR, endDeg)
  const large = endDeg - startDeg > 180 ? 1 : 0
  return `M ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 ${large} 0 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerR} ${innerR} 0 ${large} 1 ${e2.x} ${e2.y} Z`
}

export default function DonutChart({ size = 100, data, centerText, centerSub }) {
  const [hovered, setHovered] = useState(null)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const r = (size - 16) / 2
  const ir = r * 0.6
  const cx = size / 2
  const cy = size / 2
  const total = data.reduce((s, d) => s + d.value, 0)

  let angle = 0
  const segments = data.map(d => {
    const sweep = (d.value / total) * 359.99
    const start = angle
    const end = angle + sweep
    angle = end
    return { ...d, start, end }
  })

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <svg
        width={size} height={size} viewBox={`0 0 ${size} ${size}`}
        onMouseLeave={() => setHovered(null)}
        style={{ overflow: 'visible' }}
      >
        {/* Track ring */}
        <circle cx={cx} cy={cy} r={(r + ir) / 2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={r - ir} />

        {segments.map((s, i) => {
          const isHov = hovered?.label === s.label
          const outerR = isHov ? r + 5 : r
          return (
            <path
              key={i}
              d={arcPath(cx, cy, outerR, ir, s.start, s.end)}
              fill={s.color}
              opacity={hovered ? (isHov ? 1 : 0.55) : 0.88}
              style={{
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                filter: isHov ? `drop-shadow(0 0 8px ${s.color}80)` : 'none',
              }}
              onMouseEnter={e => { setHovered(s); setMouse({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY }) }}
              onMouseMove={e => setMouse({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })}
            />
          )
        })}

        {centerText && (
          <>
            <text x={cx} y={cy - 4} textAnchor="middle" fill="#e6edf3" fontSize={size > 100 ? 14 : 11} fontWeight="700" fontFamily="JetBrains Mono">
              {centerText}
            </text>
            {centerSub && (
              <text x={cx} y={cy + 12} textAnchor="middle" fill="#8b949e" fontSize={size > 100 ? 10 : 8}>
                {centerSub}
              </text>
            )}
          </>
        )}
      </svg>

      {hovered && (
        <div style={{
          position: 'absolute',
          left: mouse.x + 10,
          top: mouse.y - 12,
          background: 'rgba(13,17,23,0.97)',
          border: `1px solid ${hovered.color}55`,
          borderRadius: 8,
          padding: '8px 12px',
          pointerEvents: 'none',
          zIndex: 200,
          boxShadow: `0 4px 20px rgba(0,0,0,0.6), 0 0 12px ${hovered.color}20`,
          whiteSpace: 'nowrap',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: hovered.color, flexShrink: 0 }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: '#e6edf3' }}>{hovered.label}</span>
          </div>
          <div style={{ fontSize: 13, color: hovered.color, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
            {hovered.value.toLocaleString()}
          </div>
          <div style={{ fontSize: 10, color: '#8b949e', marginTop: 2 }}>
            {((hovered.value / total) * 100).toFixed(1)}% of total
          </div>
        </div>
      )}
    </div>
  )
}
