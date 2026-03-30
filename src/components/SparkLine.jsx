import React from 'react'

export default function SparkLine({ data, color = '#58a6ff', height = 30, width = 80, fill = false }) {
  if (!data || data.length < 2) return null
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const padX = 2, padY = 2
  const w = width - padX * 2
  const h = height - padY * 2
  const pts = data.map((v, i) => {
    const x = padX + (i / (data.length - 1)) * w
    const y = padY + h - ((v - min) / range) * h
    return `${x},${y}`
  })
  const path = `M${pts.join(' L')}`
  const fillPath = `${path} L${padX + w},${padY + h} L${padX},${padY + h} Z`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {fill && <path d={fillPath} fill={color} fillOpacity="0.1" />}
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
