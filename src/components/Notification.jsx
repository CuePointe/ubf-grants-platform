import React, { useEffect, useState } from 'react'

const COLORS = {
  success: { bg: '#22c55e', icon: '✓' },
  warn:    { bg: '#f97316', icon: '!' },
  error:   { bg: '#ef4444', icon: '✕' },
  info:    { bg: '#3b82f6', icon: 'i' },
}

export default function Notification({ message, type = 'success', onDone }) {
  const [visible, setVisible] = useState(true)
  const { bg, icon } = COLORS[type] || COLORS.info

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), 3200)
    const done = setTimeout(onDone, 3600)
    return () => { clearTimeout(hide); clearTimeout(done) }
  }, [onDone])

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
      display: 'flex', alignItems: 'center', gap: 10,
      background: bg, color: '#fff',
      padding: '12px 18px', borderRadius: 10,
      boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
      fontSize: 13, fontWeight: 500,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(24px)',
      transition: 'opacity 0.35s ease, transform 0.35s ease',
      maxWidth: 320,
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: '50%',
        background: 'rgba(255,255,255,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700, flexShrink: 0,
      }}>{icon}</span>
      <span>{message}</span>
    </div>
  )
}
