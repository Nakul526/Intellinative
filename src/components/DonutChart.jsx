import React from 'react'

export default function DonutChart({ size = 100, data, centerText, centerSub }) {
  const r = (size - 20) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r

  const total = data.reduce((s, d) => s + d.value, 0)
  let offset = 0

  const segments = data.map((d, i) => {
    const pct = d.value / total
    const dash = pct * circumference
    const seg = {
      color: d.color,
      dash,
      offset: circumference - offset,
      pct,
      label: d.label,
      value: d.value,
    }
    offset += dash
    return seg
  })

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background circle */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="14" />
      {segments.map((s, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={s.color}
          strokeWidth="14"
          strokeDasharray={`${s.dash} ${circumference - s.dash}`}
          strokeDashoffset={s.offset}
          strokeLinecap="butt"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ transition: 'stroke-dasharray 0.5s ease' }}
        />
      ))}
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
  )
}
