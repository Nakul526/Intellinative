import React from 'react'

export default function RadarChart({ size = 120, data, color = '#a855f7' }) {
  const cx = size / 2
  const cy = size / 2
  const r = size / 2 - 14
  const n = data.length

  const angle = (i) => (i * 2 * Math.PI) / n - Math.PI / 2

  const gridLevels = [0.25, 0.5, 0.75, 1.0]
  const gridPolys = gridLevels.map(lvl => {
    const pts = data.map((_, i) => {
      const a = angle(i)
      return `${cx + lvl * r * Math.cos(a)},${cy + lvl * r * Math.sin(a)}`
    })
    return pts.join(' ')
  })

  const dataPoints = data.map((d, i) => {
    const a = angle(i)
    const v = d.value / 100
    return `${cx + v * r * Math.cos(a)},${cy + v * r * Math.sin(a)}`
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Grid */}
      {gridPolys.map((pts, i) => (
        <polygon key={i} points={pts} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
      ))}
      {/* Axes */}
      {data.map((_, i) => {
        const a = angle(i)
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={cx + r * Math.cos(a)} y2={cy + r * Math.sin(a)}
            stroke="rgba(255,255,255,0.06)" strokeWidth="0.8"
          />
        )
      })}
      {/* Data polygon */}
      <polygon points={dataPoints.join(' ')} fill={color} fillOpacity="0.25" stroke={color} strokeWidth="1.5" />
      {/* Data points */}
      {data.map((d, i) => {
        const a = angle(i)
        const v = d.value / 100
        return <circle key={i} cx={cx + v * r * Math.cos(a)} cy={cy + v * r * Math.sin(a)} r="2.5" fill={color} />
      })}
      {/* Labels */}
      {data.map((d, i) => {
        const a = angle(i)
        const lr = r + 10
        const x = cx + lr * Math.cos(a)
        const y = cy + lr * Math.sin(a)
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="rgba(139,148,158,0.8)" fontSize="7">
            {d.label}
          </text>
        )
      })}
    </svg>
  )
}
