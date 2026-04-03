import { useState } from 'react'

export default function LineChart({ data, width = 200, height = 80, color = '#f0883e', showDots = true, fill = true, gridLines = true }) {
  const [hovered, setHovered] = useState(null)

  if (!data || data.length < 2) return null
  const vals = data.map(d => d.v)
  const max = Math.max(...vals)
  const min = Math.min(...vals)
  const range = max - min || 1
  const padX = 8, padY = 8
  const w = width - padX * 2
  const h = height - padY * 2

  const pts = data.map((d, i) => {
    const x = padX + (i / (data.length - 1)) * w
    const y = padY + h - ((d.v - min) / range) * h
    return { x, y, label: d.label, value: d.v }
  })

  const pathStr = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const fillStr = `${pathStr} L${pts[pts.length - 1].x},${padY + h} L${padX},${padY + h} Z`

  return (
    <div style={{ position: 'relative' }}>
      <svg
        width={width} height={height} viewBox={`0 0 ${width} ${height}`}
        onMouseLeave={() => setHovered(null)}
        style={{ overflow: 'visible' }}
      >
        {gridLines && [0.25, 0.5, 0.75, 1].map((l, i) => (
          <line key={i} x1={padX} y1={padY + h * (1 - l)} x2={padX + w} y2={padY + h * (1 - l)}
            stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" strokeDasharray="3,3" />
        ))}
        {fill && <path d={fillStr} fill={color} fillOpacity="0.08" />}
        <path d={pathStr} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />

        {/* Hover guide line */}
        {hovered && (
          <line x1={hovered.x} y1={padY} x2={hovered.x} y2={padY + h}
            stroke={color} strokeWidth="1" strokeDasharray="3,3" opacity="0.4"
            style={{ pointerEvents: 'none' }}
          />
        )}

        {pts.map((p, i) => (
          <g key={i}>
            {/* Invisible wider hit area */}
            <circle cx={p.x} cy={p.y} r="8" fill="transparent"
              onMouseEnter={() => setHovered(p)}
              onMouseMove={() => setHovered(p)}
              style={{ cursor: 'crosshair' }}
            />
            {(showDots || hovered?.x === p.x) && (
              <circle
                cx={p.x} cy={p.y}
                r={hovered?.x === p.x ? 4.5 : 3}
                fill={color}
                stroke="var(--bg-card)" strokeWidth="1.5"
                style={{ pointerEvents: 'none', transition: 'r 0.1s' }}
              />
            )}
            {hovered?.x === p.x && (
              <circle cx={p.x} cy={p.y} r="10" fill="none" stroke={color} strokeWidth="1" opacity="0.3"
                style={{ pointerEvents: 'none' }} />
            )}
          </g>
        ))}
      </svg>

      {hovered && (
        <div style={{
          position: 'absolute',
          left: Math.min(hovered.x + 12, width - 105),
          top: Math.max(0, hovered.y - 44),
          background: 'rgba(13,17,23,0.97)',
          border: `1px solid ${color}55`,
          borderRadius: 7,
          padding: '6px 11px',
          pointerEvents: 'none',
          zIndex: 100,
          whiteSpace: 'nowrap',
          boxShadow: `0 4px 16px rgba(0,0,0,0.5)`,
        }}>
          <div style={{ fontSize: 10, color: '#8b949e', marginBottom: 2 }}>{hovered.label}</div>
          <div style={{ fontSize: 13, color, fontWeight: 700, fontFamily: 'JetBrains Mono' }}>
            {hovered.value.toLocaleString()}
          </div>
        </div>
      )}
    </div>
  )
}
