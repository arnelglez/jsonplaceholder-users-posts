import { useCallback, useState } from 'react'
import { createPostRequest } from '~/features/posts/data/api/posts.api'
import type { CreatePostInput, Post } from '~/features/posts/domain/types'

type UseCreatePostResult = {
  submitting: boolean
  error: string | null
  create: (input: CreatePostInput) => Promise<Post | null>
  clearError: () => void
}

export function useCreatePost(): UseCreatePostResult {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const create = useCallback(async (input: CreatePostInput): Promise<Post | null> => {
    setSubmitting(true)
    setError(null)
    try {
      const post = await createPostRequest(input)
      return post
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la publicación')
      return null
    } finally {
      setSubmitting(false)
    }
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { submitting, error, create, clearError }
}
