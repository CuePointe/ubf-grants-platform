import React from 'react'
import { TEAM, PROGRAM_WINDOWS, UBF_KBAS } from '../lib/constants.js'
import { daysLeft, batchStyle } from '../lib/helpers.js'

export default function TeamPage({ grants }) {
  return (
    <div className="animate-in">
      <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1B2E1B', marginBottom: 20 }}>👥 Grants Team</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14, marginBottom: 24 }}>
        {TEAM.map(member => {
          const assigned = grants.filter(g => g.assignee === member.email)
          const urgentA  = assigned.filter(g => { const d = daysLeft(g.deadline); return d !== null && d >= 0 && d <= 21 })
          return (
            <div key={member.id} style={{ background: 'white', borderRadius: 14, padding: 20, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: member.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {member.avatar}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1B2E1B' }}>{member.name}</div>
                  <div style={{ fontSize: 11, color: '#888' }}>{member.role}</div>
                </div>
              </div>
              <div style={{ fontSize: 10, color: '#AAA', marginBottom: 12, wordBreak: 'break-all' }}>{member.email}</div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5, marginBottom: 14 }}>{member.description}</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                <div style={{ flex: 1, padding: '10px', background: '#F8F9F8', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#1B5E20' }}>{assigned.length}</div>
                  <div style={{ fontSize: 10, color: '#888' }}>Assigned</div>
                </div>
                <div style={{ flex: 1, padding: '10px', background: urgentA.length > 0 ? '#FFEBEE' : '#F8F9F8', borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: urgentA.length > 0 ? '#C62828' : '#888' }}>{urgentA.length}</div>
                  <div style={{ fontSize: 10, color: urgentA.length > 0 ? '#C62828' : '#888' }}>Urgent</div>
                </div>
              </div>
              {assigned.length > 0 && (
                <div>
                  {assigned.slice(0, 3).map(g => {
                    const bs = batchStyle(g.batch)
                    return (
                      <div key={g.id} style={{ fontSize: 10, color: '#666', padding: '4px 0', borderTop: '1px solid #F5F5F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</span>
                        <span style={{ color: bs.color, fontWeight: 600, flexShrink: 0, fontSize: 9, background: bs.bg, padding: '1px 5px', borderRadius: 8 }}>B{g.batch}</span>
                      </div>
                    )
                  })}
                  {assigned.length > 3 && <div style={{ fontSize: 10, color: '#AAA', marginTop: 4 }}>+{assigned.length - 3} more</div>}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Program Windows */}
      <div style={{ background: 'white', borderRadius: 14, padding: 22, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', marginBottom: 16 }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1B2E1B', marginBottom: 14 }}>🪟 UBF Program Windows (BFP V4, Jan 2026)</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {PROGRAM_WINDOWS.map(pw => (
            <div key={pw} style={{ padding: '6px 14px', background: '#E3F2FD', borderRadius: 20, fontSize: 12, color: '#1565C0', fontWeight: 500 }}>
              {pw}
            </div>
          ))}
        </div>
      </div>

      {/* KBAs */}
      <div style={{ background: 'white', borderRadius: 14, padding: 22, boxShadow: '0 1px 6px rgba(0,0,0,0.06)' }}>
        <h2 style={{ fontSize: 14, fontWeight: 600, color: '#1B2E1B', marginBottom: 14 }}>🗺️ UBF Key Biodiversity Areas (45 KBA sites)</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {UBF_KBAS.map(kba => (
            <span key={kba} style={{ padding: '4px 10px', borderRadius: 20, background: '#E8F5E9', color: '#2E7D32', fontSize: 11 }}>{kba}</span>
          ))}
          <span style={{ padding: '4px 10px', borderRadius: 20, background: '#F3E5F5', color: '#6A1B9A', fontSize: 11 }}>+25 additional KBA sites across Uganda</span>
        </div>
      </div>
    </div>
  )
}
