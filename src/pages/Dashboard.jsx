import React from 'react'
import { daysLeft, formatDate, urgencyColor, statusColor, formatCurrency, sortByDeadline } from '../lib/helpers.js'
import { STATUSES } from '../lib/constants.js'

function KPICard({ label, value, sub, color = '#1a6b3c', onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff', borderRadius: 12, padding: '20px 24px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        borderLeft: `4px solid ${color}`,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'box-shadow 0.15s',
      }}
      onMouseEnter={e => onClick && (e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)')}
      onMouseLeave={e => onClick && (e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.08)')}
    >
      <div style={{ fontSize: 28, fontWeight: 800, color }}>{value}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: '#1e293b', marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 2 }}>{sub}</div>}
    </div>
  )
}

export default function Dashboard({ grants, user, onViewGrant, onNavigate }) {
  const total = grants.length
  const awarded = grants.filter(g => g.status === 'Awarded').length
  const inProgress = grants.filter(g => ['In Progress', 'Submitted', 'Under Review'].includes(g.status)).length
  const urgent = grants.filter(g => { const d = daysLeft(g.deadline); return d !== null && d >= 0 && d <= 21 }).length
  const totalValue = grants.filter(g => g.status === 'Awarded' && g.high_usd).reduce((s, g) => s + (g.high_usd || 0), 0)
  const pipeline = grants.filter(g => g.status !== 'Awarded' && g.status !== 'Rejected' && g.high_usd).reduce((s, g) => s + (g.high_usd || 0), 0)

  const upcomingDeadlines = sortByDeadline(grants)
    .filter(g => { const d = daysLeft(g.deadline); return d !== null && d >= 0 })
    .slice(0, 6)

  const statusBreakdown = STATUSES.map(s => ({
    label: s,
    count: grants.filter(g => g.status === s).length,
  })).filter(s => s.count > 0)

  const highPriority = grants.filter(g => g.priority === 'high' && g.status !== 'Awarded' && g.status !== 'Rejected')

  const firstName = user?.name?.split('.')?.[1]?.trim() || user?.name?.split(' ')?.[0] || 'there'

  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a6b3c' }}>
          Good day, {firstName} 👋
        </h1>
        <p style={{ color: '#64748b', fontSize: 13, marginTop: 4 }}>
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          {' · '}Uganda Biodiversity Fund Grants Dashboard
        </p>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        <KPICard label="Total Grants" value={total} sub="in pipeline" color="#1a6b3c" onClick={() => onNavigate('grants')} />
        <KPICard label="Active / In Progress" value={inProgress} sub="being worked on" color="#3b82f6" onClick={() => onNavigate('grants')} />
        <KPICard label="Awarded" value={awarded} sub={totalValue ? `~${formatCurrency(totalValue)} secured` : 'grants won'} color="#22c55e" />
        <KPICard label="Urgent Deadlines" value={urgent} sub="due within 21 days" color={urgent > 0 ? '#ef4444' : '#94a3b8'} onClick={() => onNavigate('pipeline')} />
        {pipeline > 0 && <KPICard label="Pipeline Value" value={formatCurrency(pipeline)} sub="potential funding" color="#8b5cf6" />}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
        {/* Upcoming deadlines */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Upcoming Deadlines</span>
            <button
              onClick={() => onNavigate('pipeline')}
              style={{ fontSize: 11, color: '#1a6b3c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
            >View all →</button>
          </h3>
          {upcomingDeadlines.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: 13 }}>No upcoming deadlines</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {upcomingDeadlines.map(g => {
                const d = daysLeft(g.deadline)
                return (
                  <div
                    key={g.id}
                    onClick={() => onViewGrant(g)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '8px 10px', borderRadius: 8,
                      background: '#f8fafc', cursor: 'pointer',
                      border: '1px solid #f1f5f9',
                    }}
                  >
                    <div style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: urgencyColor(d), flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {g.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{g.donor || '—'}</div>
                    </div>
                    <div style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: urgencyColor(d) }}>
                        {d === 0 ? 'TODAY' : `${d}d`}
                      </div>
                      <div style={{ fontSize: 10, color: '#94a3b8' }}>{formatDate(g.deadline)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Status breakdown */}
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Status Breakdown</h3>
          {statusBreakdown.length === 0 ? (
            <p style={{ color: '#94a3b8', fontSize: 13 }}>No grants yet. <button onClick={() => onNavigate('grants')} style={{ color: '#1a6b3c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Add one →</button></p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {statusBreakdown.map(({ label, count }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: statusColor(label), flexShrink: 0 }} />
                  <span style={{ flex: 1, fontSize: 13, color: '#334155' }}>{label}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>{count}</span>
                  <div style={{
                    height: 6, width: `${Math.round((count / total) * 80)}px`,
                    background: statusColor(label), borderRadius: 3, opacity: 0.6,
                    minWidth: 6,
                  }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* High priority grants */}
      {highPriority.length > 0 && (
        <div style={{ background: '#fff', borderRadius: 12, padding: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 14, color: '#ef4444' }}>
            🔴 High Priority Grants
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 10 }}>
            {highPriority.slice(0, 6).map(g => {
              const d = daysLeft(g.deadline)
              return (
                <div
                  key={g.id}
                  onClick={() => onViewGrant(g)}
                  style={{
                    padding: '10px 14px', borderRadius: 8,
                    border: '1.5px solid #fee2e2', background: '#fff7f7',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 3 }}>{g.name}</div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: '#64748b' }}>{g.donor || 'No donor'}</span>
                    {d !== null && d >= 0 && (
                      <span style={{ fontSize: 11, color: urgencyColor(d), fontWeight: 600 }}>
                        {d}d left
                      </span>
                    )}
                    <span style={{
                      fontSize: 10, padding: '1px 6px', borderRadius: 4,
                      background: statusColor(g.status) + '22', color: statusColor(g.status),
                      fontWeight: 600,
                    }}>{g.status}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {total === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
          <p style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>No grants in your pipeline yet</p>
          <p style={{ fontSize: 13, marginBottom: 20 }}>Start by adding your first grant opportunity</p>
          <button
            onClick={() => onNavigate('grants')}
            style={{
              background: '#1a6b3c', color: '#fff', border: 'none',
              borderRadius: 8, padding: '10px 20px', fontSize: 14,
              fontWeight: 600, cursor: 'pointer',
            }}
          >Add First Grant</button>
        </div>
      )}
    </div>
  )
}
