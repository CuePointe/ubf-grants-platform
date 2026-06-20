import React, { useEffect, useState } from 'react'

export default function Notification({ message, type = 'success', onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 300)
    }, 3000)
    return () => clearTimeout(t)
  }, [])

  const bg    = type === 'error' ? '#C62828' : type === 'warn' ? '#E65100' : '#1B5E20'
  const icon  = type === 'error' ? '⚠️' : type === 'warn' ? '⚠️' : '✅'

  return (
    <div className="slide-in" style={{
      position: 'fixed', top: 20, right: 20, zIndex: 9999,
      background: bg, color: 'white',
      padding: '12px 18px', borderRadius: 10,
      boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      fontSize: 13, fontWeight: 500,
      display: 'flex', alignItems: 'center', gap: 8,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.3s ease',
      maxWidth: 320,
    }}>
      <span>{icon}</span>
      <span>{message}</span>
    </div>
  )
}
