import React from 'react'
import { TEAM } from '../lib/constants.js'
import { daysLeft, formatDate, urgencyColor, statusColor } from '../lib/helpers.js'

export default function TeamPage({ grants }) {
  return (
    <div style={{ animation: 'fadeIn 0.25s ease' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1a6b3c' }}>Team View</h1>
        <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
          Grant assignments and workload across the UBF grants team
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
        {TEAM.map(member => {
          const assigned = grants.filter(g =>
            g.assignee && g.assignee.toLowerCase().includes(member.name.toLowerCase().split('.')[1]?.trim() || member.name)
          )
          const active = assigned.filter(g => !['Awarded', 'Rejected', 'On Hold'].includes(g.status))
          const urgent = active.filter(g => { const d = daysLeft(g.deadline); return d !== null && d >= 0 && d <= 21 })

          return (
            <div key={member.id} style={{
              background: '#fff', borderRadius: 12, padding: 20,
              boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
            }}>
              {/* Member header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid #f1f5f9' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: '#1a6b3c', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16, fontWeight: 700, flexShrink: 0,
                }}>
                  {member.name.split('.').map(p => p.trim()[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{member.name}</div>
                  <div style={{ fontSize: 11, color: '#64748b' }}>{member.role}</div>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: '#1a6b3c' }}>{active.length}</div>
                  <div style={{ fontSize: 10, color: '#94a3b8' }}>active</div>
                </div>
              </div>

              {urgent.length > 0 && (
                <div style={{
                  background: '#fef2f2', borderRadius: 6, padding: '6px 10px',
                  marginBottom: 10, fontSize: 12, color: '#b91c1c', fontWeight: 500,
                }}>
                  ⚠️ {urgent.length} urgent deadline{urgent.length > 1 ? 's' : ''} within 21 days
                </div>
              )}

              {active.length === 0 ? (
                <p style={{ fontSize: 12, color: '#94a3b8' }}>No active grants assigned</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {active.slice(0, 5).map(g => {
                    const d = daysLeft(g.deadline)
                    return (
                      <div key={g.id} style={{
                        padding: '7px 10px', borderRadius: 6,
                        background: '#f8fafc', border: '1px solid #f1f5f9',
                      }}>
                        <div style={{ fontWeight: 600, fontSize: 12, marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {g.name}
                        </div>
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <span style={{
                            fontSize: 10, padding: '1px 5px', borderRadius: 3,
                            background: statusColor(g.status) + '22', color: statusColor(g.status), fontWeight: 600,
                          }}>{g.status}</span>
                          {d !== null && d >= 0 && (
                            <span style={{ fontSize: 10, color: urgencyColor(d), fontWeight: 600 }}>
                              {d === 0 ? 'TODAY' : `${d}d`}
                            </span>
                          )}
                          {g.deadline && <span style={{ fontSize: 10, color: '#94a3b8', marginLeft: 'auto' }}>{formatDate(g.deadline)}</span>}
                        </div>
                      </div>
                    )
                  })}
                  {active.length > 5 && (
                    <div style={{ fontSize: 11, color: '#94a3b8', textAlign: 'center', padding: '4px' }}>
                      +{active.length - 5} more
                    </div>
                  )}
                </div>
              )}

              <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid #f1f5f9' }}>
                <a href={`mailto:${member.email}`} style={{ fontSize: 11, color: '#1a6b3c', fontWeight: 500 }}>
                  ✉ {member.email}
                </a>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
