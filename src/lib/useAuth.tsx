import { useState, useEffect } from 'react'
import type { User } from 'shared/schemas/user.schema'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ecoloop_user')
      if (raw) setUser(JSON.parse(raw))
    } catch (e) {
      setUser(null)
    }
  }, [])

  return { user, setUser }
}
