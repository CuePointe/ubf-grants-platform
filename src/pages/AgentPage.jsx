import React, { useState, useRef, useEffect } from 'react'

const STORAGE_KEY = 'ubf_agent_apikey'

function MessageBubble({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 14,
      animation: 'fadeIn 0.2s ease',
    }}>
      {!isUser && (
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: '#1a6b3c', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, flexShrink: 0, marginRight: 8, marginTop: 2,
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: '72%',
        padding: '12px 16px',
        borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
        background: isUser ? '#1a6b3c' : '#fff',
        color: isUser ? '#fff' : '#1e293b',
        fontSize: 13,
        lineHeight: 1.65,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {msg.content || <span style={{ opacity: 0.5 }} className="pulse">●●●</span>}
      </div>
    </div>
  )
}

const SUGGESTIONS = [
  'Search for biodiversity grants open to Uganda-based NGOs right now',
  'What EU funding opportunities are there for climate adaptation in East Africa?',
  'Help me write a concept note summary for a KBA restoration project',
  'Which funders focus on nature-based livelihoods and women\'s inclusion?',
  'Review our grant pipeline and advise on strategic priorities',
  'What is the GEF Small Grants Programme and how do we apply?',
]

export default function AgentPage({ grants, user, agent }) {
  const { messages, streaming, error, sendMessage, stopStreaming, clearMessages } = agent
  const [input, setInput] = useState('')
  const [apiKey, setApiKey] = useState(() => localStorage.getItem(STORAGE_KEY) || '')
  const [showSettings, setShowSettings] = useState(false)
  const [keyDraft, setKeyDraft] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (!input.trim() || streaming) return
    sendMessage(input.trim(), apiKey)
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const saveKey = () => {
    localStorage.setItem(STORAGE_KEY, keyDraft)
    setApiKey(keyDraft)
    setShowSettings(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 56px)', animation: 'fadeIn 0.25s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1a6b3c' }}>AI Grants Agent</h1>
          <p style={{ fontSize: 13, color: '#64748b', marginTop: 2 }}>
            Powered by Claude — grant discovery, strategy, and proposal support
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              style={{ padding: '7px 14px', borderRadius: 7, border: '1.5px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
            >Clear Chat</button>
          )}
          <button
            onClick={() => { setKeyDraft(apiKey); setShowSettings(s => !s) }}
            style={{
              padding: '7px 14px', borderRadius: 7, border: '1.5px solid #e2e8f0',
              background: apiKey ? '#f0fdf4' : '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer',
              color: apiKey ? '#1a6b3c' : '#64748b',
            }}
          >
            {apiKey ? '🔑 API Key Set' : '⚙ Set API Key'}
          </button>
        </div>
      </div>

      {/* API key settings panel */}
      {showSettings && (
        <div style={{ background: '#fff', borderRadius: 10, padding: 16, marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', animation: 'fadeIn 0.2s ease' }}>
          <p style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>
            Enter your Anthropic API key. It is stored locally in your browser only.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="password"
              value={keyDraft}
              onChange={e => setKeyDraft(e.target.value)}
              placeholder="sk-ant-..."
              style={{ flex: 1 }}
            />
            <button onClick={saveKey} style={{
              padding: '8px 16px', borderRadius: 7, border: 'none',
              background: '#1a6b3c', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}>Save Key</button>
          </div>
          {apiKey && (
            <button
              onClick={() => { localStorage.removeItem(STORAGE_KEY); setApiKey(''); setKeyDraft(''); setShowSettings(false) }}
              style={{ marginTop: 8, fontSize: 11, color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
            >Remove API key</button>
          )}
        </div>
      )}

      {/* Chat area */}
      <div style={{
        flex: 1, overflowY: 'auto', background: '#f8fafc', borderRadius: 12,
        padding: '16px', marginBottom: 12,
        border: '1px solid #f1f5f9',
      }}>
        {messages.length === 0 ? (
          <div style={{ padding: '20px 0' }}>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>🤖</div>
              <p style={{ fontWeight: 600, fontSize: 14, color: '#1a6b3c' }}>UBF Grants Intelligence Agent</p>
              <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
                Ask me anything about grants, funding, proposals, or strategy.
              </p>
              {!apiKey && (
                <div style={{
                  marginTop: 12, padding: '10px 16px', background: '#fff7ed',
                  borderRadius: 8, border: '1px solid #fed7aa', fontSize: 12, color: '#92400e',
                }}>
                  ⚠️ Set your Anthropic API key above to start chatting
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {SUGGESTIONS.map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(s); inputRef.current?.focus() }}
                  style={{
                    padding: '10px 14px', borderRadius: 8,
                    border: '1.5px solid #e2e8f0', background: '#fff',
                    fontSize: 12, color: '#334155', textAlign: 'left',
                    cursor: 'pointer', lineHeight: 1.5,
                    transition: 'border-color 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#1a6b3c'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}
            {error && (
              <div style={{ padding: '10px 14px', background: '#fef2f2', borderRadius: 8, border: '1px solid #fee2e2', fontSize: 12, color: '#991b1b', marginTop: 8 }}>
                ⚠️ {error}
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end' }}>
        <textarea
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about grants, funding opportunities, proposal help..."
          rows={2}
          style={{ flex: 1, resize: 'none', borderRadius: 10, padding: '10px 14px' }}
          disabled={streaming}
        />
        {streaming ? (
          <button
            onClick={stopStreaming}
            style={{
              padding: '10px 18px', borderRadius: 8, border: 'none',
              background: '#f97316', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
            }}
          >Stop</button>
        ) : (
          <button
            onClick={handleSend}
            disabled={!input.trim() || !apiKey}
            style={{
              padding: '10px 18px', borderRadius: 8, border: 'none',
              background: input.trim() && apiKey ? '#1a6b3c' : '#e2e8f0',
              color: input.trim() && apiKey ? '#fff' : '#94a3b8',
              fontSize: 13, fontWeight: 600,
              cursor: input.trim() && apiKey ? 'pointer' : 'not-allowed',
            }}
          >Send</button>
        )}
      </div>
    </div>
  )
}
