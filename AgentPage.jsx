import React, { useState, useRef, useEffect } from 'react'

const QUICK_PROMPTS = [
  'Search for new biodiversity grants available in Uganda right now',
  'Which grants should we prioritise this week?',
  'Find grants for Forest Restoration and Climate Resilience',
  'Who on the team should lead the EU/AICS application?',
  'What grants are available for community livelihoods in Karamoja?',
  'Find Batch 3 ($1M+) grants for conservation in the Albertine Rift',
  'What documents does UBF typically need for a grant application?',
  'Find grants for nature finance and carbon markets in Africa',
]

export default function AgentPage({ grants, user, agent }) {
  const { messages, streaming, loading, send, clearChat } = agent
  const [query, setQuery] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, streaming])

  const handleSend = () => {
    if (!query.trim() || loading) return
    send(query)
    setQuery('')
  }

  return (
    <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1B2E1B', margin: 0 }}>🤖 UBF AI Grants Agent</h1>
          <p style={{ color: '#666', marginTop: 4, fontSize: 12 }}>
            Ask the agent to search for grants, analyse alignment with UBF priorities, or advise on applications.
            <br />The agent knows UBF's thematic areas, KBAs, team roles, and all {grants.length} grants in the system.
          </p>
        </div>
        {messages.length > 0 && (
          <button onClick={clearChat} style={{ padding: '7px 14px', background: 'white', border: '1.5px solid #E0E0E0', borderRadius: 8, fontSize: 12, color: '#666', cursor: 'pointer' }}>
            🗑 Clear Chat
          </button>
        )}
      </div>

      {/* Quick prompts */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 14 }}>
        {QUICK_PROMPTS.map(p => (
          <button key={p} onClick={() => { setQuery(p) }} style={{
            padding: '6px 12px', background: 'white', border: '1.5px solid #C8E6C9',
            borderRadius: 20, fontSize: 11, color: '#2E7D32', cursor: 'pointer', fontWeight: 500,
            transition: 'all 0.1s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = '#E8F5E9' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white' }}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div style={{ flex: 1, background: 'white', borderRadius: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, overflowY: 'auto', padding: 20 }}>
          {messages.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#888' }}>
              <div style={{ fontSize: 44, marginBottom: 14 }}>🌿</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: '#555', marginBottom: 8 }}>UBF Grants Intelligence Agent</div>
              <div style={{ fontSize: 12, lineHeight: 1.7 }}>
                I know UBF's Biodiversity Funding Program V4 priorities,<br />
                your 45 Key Biodiversity Areas, 5 program windows,<br />
                and all {grants.length} grants currently in your tracker.<br /><br />
                Ask me anything — in plain English.
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className="animate-in" style={{
              marginBottom: 18, display: 'flex', gap: 10,
              flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                background: msg.role === 'user' ? user.color : '#1B5E20',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: msg.role === 'user' ? 11 : 16, fontWeight: 700,
              }}>
                {msg.role === 'user' ? user.avatar : '🌿'}
              </div>
              <div style={{
                maxWidth: '78%', padding: '12px 16px',
                borderRadius: msg.role === 'user' ? '14px 4px 14px 14px' : '4px 14px 14px 14px',
                background: msg.role === 'user' ? user.color : '#F8F9F8',
                color: msg.role === 'user' ? 'white' : '#1B2E1B',
                fontSize: 13, lineHeight: 1.65, whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
                <div style={{ fontSize: 10, opacity: 0.5, marginTop: 4 }}>
                  {new Date(msg.ts).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: '#1B5E20', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
                🌿
              </div>
              <div style={{ maxWidth: '78%', padding: '12px 16px', borderRadius: '4px 14px 14px 14px', background: '#F8F9F8', color: '#1B2E1B', fontSize: 13, lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
                {streaming || <span className="pulse" style={{ color: '#888' }}>Searching and analysing grants...</span>}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ borderTop: '1px solid #F0F0F0', padding: '14px 18px', display: 'flex', gap: 10 }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
            placeholder="Ask the agent — e.g. 'Find conservation grants for Bwindi Impenetrable NP area' ..."
            style={{ flex: 1 }}
          />
          <button
            onClick={handleSend}
            disabled={loading || !query.trim()}
            style={{
              padding: '9px 22px',
              background: loading || !query.trim() ? '#E0E0E0' : '#1B5E20',
              color: loading || !query.trim() ? '#888' : 'white',
              border: 'none', borderRadius: 9, fontSize: 13, fontWeight: 500,
              cursor: loading || !query.trim() ? 'not-allowed' : 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {loading ? '...' : 'Send →'}
          </button>
        </div>
      </div>
    </div>
  )
}
