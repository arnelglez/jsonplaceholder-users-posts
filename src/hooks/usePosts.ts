import { useCallback, useEffect, useState } from 'react'
import { getPostsByUserId } from '../api/client'
import type { Post } from '../api/types'

type UsePostsResult = {
  posts: Post[]
  loading: boolean
  error: string | null
  retry: () => void
  prependPost: (post: Post) => void
}

export function usePosts(userId: number | null): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => {
    setAttempt((n) => n + 1)
  }, [])

  const prependPost = useCallback((post: Post) => {
    setPosts((current) => [post, ...current])
  }, [])

  useEffect(() => {
    if (userId === null) {
      setPosts([])
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    getPostsByUserId(userId)
      .then((data) => {
        if (!cancelled) {
          setPosts(data)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          setPosts([])
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
  }, [userId, attempt])

  return { posts, loading, error, retry, prependPost }
}
