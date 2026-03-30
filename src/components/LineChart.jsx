import React from 'react'

export default function LineChart({ data, width = 200, height = 80, color = '#f0883e', showDots = true, fill = true, gridLines = true }) {
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
    return { x, y, label: d.label }
  })

  const pathStr = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const fillStr = `${pathStr} L${pts[pts.length - 1].x},${padY + h} L${padX},${padY + h} Z`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {gridLines && [0.25, 0.5, 0.75, 1].map((l, i) => (
        <line key={i} x1={padX} y1={padY + h * (1 - l)} x2={padX + w} y2={padY + h * (1 - l)}
          stroke="rgba(255,255,255,0.04)" strokeWidth="0.8" strokeDasharray="3,3" />
      ))}
      {fill && <path d={fillStr} fill={color} fillOpacity="0.08" />}
      <path d={pathStr} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      {showDots && pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3" fill={color} stroke="var(--bg-card)" strokeWidth="1.5" />
      ))}
    </svg>
  )
}
