import { useState, useCallback, useRef } from 'react'
import { AGENT_SYSTEM_PROMPT } from '../lib/constants.js'

export function useAgent(grants) {
  const [messages, setMessages]   = useState([])
  const [streaming, setStreaming] = useState('')
  const [loading, setLoading]     = useState(false)
  const abortRef = useRef(null)

  const send = useCallback(async (query) => {
    if (!query.trim() || loading) return

    const userMsg = { role: 'user', content: query, ts: new Date().toISOString() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)
    setStreaming('')

    const grantContext = grants.length > 0
      ? `CURRENT GRANTS IN SYSTEM (${grants.length} total):\n` +
        grants.map(g =>
          `- ${g.name} | Donor: ${g.donor} | Deadline: ${g.deadline} | ` +
          `Batch ${g.batch} | Status: ${g.status} | Size: ${g.size}`
        ).join('\n')
      : 'No grants currently in the system — the tracker is empty and ready for new entries.'

    const fullQuery = `${grantContext}\n\nUser query: ${query}`

    let full = ''
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 1000,
          stream: true,
          system: AGENT_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: fullQuery }],
        }),
      })

      const reader = res.body.getReader()
      const dec = new TextDecoder()
      let buf = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buf += dec.decode(value, { stream: true })
        const lines = buf.split('\n')
        buf = lines.pop()
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const d = line.slice(6)
          if (d === '[DONE]') continue
          try {
            const p = JSON.parse(d)
            if (p.type === 'content_block_delta' && p.delta?.text) {
              full += p.delta.text
              setStreaming(full)
            }
          } catch (_) {}
        }
      }

      const assistantMsg = {
        role: 'assistant',
        content: full || 'No response received. Please try again.',
        ts: new Date().toISOString(),
      }
      setMessages(prev => [...prev, assistantMsg])
    } catch (err) {
      const errMsg = {
        role: 'assistant',
        content: '⚠️ Could not connect to the AI agent. Please check your internet connection and try again.',
        ts: new Date().toISOString(),
      }
      setMessages(prev => [...prev, errMsg])
    }

    setStreaming('')
    setLoading(false)
  }, [grants, loading])

  const clearChat = useCallback(() => {
    setMessages([])
    setStreaming('')
  }, [])

  return { messages, streaming, loading, send, clearChat }
}
