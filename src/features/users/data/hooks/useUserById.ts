import { useEffect, useState } from 'react'
import { fetchUserById } from '~/features/users/data/api/users.api'
import type { User } from '~/features/users/domain/types'

type UseUserByIdResult = {
  user: User | null
  loading: boolean
  error: string | null
  retry: () => void
}

export function useUserById(userId: number | null): UseUserByIdResult {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (userId === null) {
      setUser(null)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    fetchUserById(userId)
      .then((data) => {
        if (!cancelled) {
          setUser(data)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          setUser(null)
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [userId, attempt])

  return {
    user,
    loading,
    error,
    retry: () => setAttempt((n) => n + 1),
  }
}
