import { useState, useCallback, useRef } from 'react'
import { AGENT_SYSTEM_PROMPT } from '../lib/constants.js'

export function useAgent(grants) {
  const [messages, setMessages] = useState([])
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const buildContext = useCallback(() => {
    if (!grants || grants.length === 0) return ''
    const summary = grants.slice(0, 20).map(g =>
      `- ${g.name} | ${g.donor || 'Unknown donor'} | Deadline: ${g.deadline || 'TBD'} | Status: ${g.status} | Priority: ${g.priority}`
    ).join('\n')
    return `\n\nCurrent UBF grants pipeline (${grants.length} total):\n${summary}`
  }, [grants])

  const sendMessage = useCallback(async (userText, apiKey) => {
    if (!userText.trim() || streaming) return

    if (!apiKey) {
      setError('No API key provided. Enter your Anthropic API key in the settings panel.')
      return
    }

    const userMsg = { role: 'user', content: userText }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setStreaming(true)
    setError(null)

    const systemPrompt = AGENT_SYSTEM_PROMPT + buildContext()

    const assistantMsg = { role: 'assistant', content: '' }
    setMessages(prev => [...prev, assistantMsg])

    try {
      const controller = new AbortController()
      abortRef.current = controller

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 2048,
          stream: true,
          system: systemPrompt,
          messages: newMessages,
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err?.error?.message || `API error ${response.status}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop()

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue
          try {
            const event = JSON.parse(data)
            if (event.type === 'content_block_delta' && event.delta?.type === 'text_delta') {
              setMessages(prev => {
                const updated = [...prev]
                const last = updated[updated.length - 1]
                updated[updated.length - 1] = { ...last, content: last.content + event.delta.text }
                return updated
              })
            }
          } catch {
            // malformed SSE line — skip
          }
        }
      }
    } catch (err) {
      if (err.name === 'AbortError') return
      setError(err.message)
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setStreaming(false)
      abortRef.current = null
    }
  }, [messages, streaming, buildContext])

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, streaming, error, sendMessage, stopStreaming, clearMessages }
}
