import { useCallback, useEffect, useState } from 'react'
import { fetchUsers } from '~/features/users/data/api/users.api'
import type { User } from '~/features/users/domain/types'

type UseUsersResult = {
  users: User[]
  loading: boolean
  error: string | null
  retry: () => void
}

export function useUsers(): UseUsersResult {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => {
    setAttempt((n) => n + 1)
  }, [])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchUsers()
      .then((data) => {
        if (!cancelled) {
          setUsers(data)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          setUsers([])
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  return { users, loading, error, retry }
}
