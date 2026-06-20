import { useState, useCallback } from 'react'
import { genId, classifyBatch } from '../lib/helpers.js'

const STORAGE_KEY = 'ubf_grants_v1'

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

const save = (grants) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(grants)) } catch {}
}

export function useGrants() {
  const [grants, setGrants] = useState(() => load())

  const addGrant = useCallback((data) => {
    const grant = {
      id: genId(),
      batch: classifyBatch(data.highUsd),
      status: 'Not Started',
      assignee: null,
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    }
    setGrants(prev => {
      const next = [grant, ...prev]
      save(next)
      return next
    })
    return grant
  }, [])

  const updateGrant = useCallback((id, patch) => {
    setGrants(prev => {
      const next = prev.map(g =>
        g.id === id ? { ...g, ...patch, updatedAt: new Date().toISOString() } : g
      )
      save(next)
      return next
    })
  }, [])

  const deleteGrant = useCallback((id) => {
    setGrants(prev => {
      const next = prev.filter(g => g.id !== id)
      save(next)
      return next
    })
  }, [])

  const clearAll = useCallback(() => {
    setGrants([])
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return { grants, addGrant, updateGrant, deleteGrant, clearAll }
}
